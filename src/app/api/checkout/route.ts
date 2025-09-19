import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { priceId, customerId } = await req.json();

  if (!priceId) {
    return NextResponse.json({ error: "Missing priceId" }, { status: 400 });
  }

  const origin = process.env.NEXT_PUBLIC_APP_URL || `https://${process.env.VERCEL_URL}`;
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId, // optional if you create Customers up-front
    line_items: [{ price: priceId, quantity: 1 }],
    allow_promotion_codes: true,
    success_url: `${origin}/app?checkout=success`,
    cancel_url: `${origin}/pricing?checkout=canceled`,
  });

  return NextResponse.json({ url: session.url });
}
