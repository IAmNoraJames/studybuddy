import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";

type CheckoutBody = {
  priceId: string;
  customerId?: string | null;
};

export async function POST(req: Request) {
  const { priceId, customerId }: CheckoutBody = await req.json();

  if (!priceId || typeof priceId !== "string") {
    return NextResponse.json({ error: "Missing or invalid priceId" }, { status: 400 });
  }

  const origin =
    process.env.NEXT_PUBLIC_APP_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId ?? undefined,
    line_items: [{ price: priceId, quantity: 1 }],
    allow_promotion_codes: true,
    success_url: `${origin}/app?checkout=success`,
    cancel_url: `${origin}/pricing?checkout=canceled`,
  });

  return NextResponse.json({ url: session.url }, { status: 200 });
}
