// src/app/api/create-checkout/route.ts
import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { envKey } = await req.json(); // e.g. "STRIPE_PRICE_10"
    const priceId = process.env[envKey as keyof NodeJS.ProcessEnv];

    if (!priceId) {
      return NextResponse.json({ error: `Missing env for ${envKey}` }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: String(priceId), quantity: 1 }],
      allow_promotion_codes: true,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/#pricing?sub=ok`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/#pricing?canceled=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Server error" }, { status: 500 });
  }
}
