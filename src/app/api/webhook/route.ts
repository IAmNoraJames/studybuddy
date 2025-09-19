// src/app/api/webhook/route.ts
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SubStatus = "trialing" | "active" | "past_due" | "canceled";

async function updateFromSubscription(sub: Stripe.Subscription) {
  const customerId =
    typeof sub.customer === "string" ? sub.customer : sub.customer?.id ?? null;
  if (!customerId) return;

  const status = sub.status as SubStatus;
  const currentPeriodEnd = sub.current_period_end
    ? new Date(sub.current_period_end * 1000).toISOString()
    : null;

  const { error } = await supabaseAdmin
    .from("profiles")
    .update({
      stripe_customer_id: customerId,
      stripe_subscription_id: sub.id,
      subscription_status: status,
      current_period_end: currentPeriodEnd,
    })
    .eq("stripe_customer_id", customerId);

  if (error) {
    console.error("Supabase update error:", error.message);
  }
}

export async function POST(req: Request) {
  const sig = headers().get("stripe-signature");
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  if (!sig || !whSecret) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  const raw = await req.text();

  try {
    event = stripe.webhooks.constructEvent(raw, sig, whSecret);
  } catch (err: any) {
    console.error("⚠️  Webhook signature verification failed:", err?.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode === "subscription" && session.subscription) {
          const subId =
            typeof session.subscription === "string"
              ? session.subscription
              : session.subscription.id;
          const sub = await stripe.subscriptions.retrieve(subId);
          await updateFromSubscription(sub);
        }
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        await updateFromSubscription(sub);
        break;
      }
      default:
        // ignore unhandled events
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("Webhook error:", err?.message, "Event:", event.type);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
