// src/app/api/create-portal/route.ts
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";

type Body = {
  customerId?: string;
};

export async function POST(req: Request) {
  let body: Body = {};
  try {
    body = await req.json();
  } catch {
    // no-op; we'll validate below
  }

  if (!body?.customerId) {
    return NextResponse.json({ error: "Missing customerId" }, { status: 400 });
  }

  // Prefer explicit app URL; then Vercel URL; finally localhost
  const origin =
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: body.customerId,
      return_url: `${origin}/app/account`,
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    console.error("Stripe portal error:", e?.message || e);
    return NextResponse.json(
      { error: e?.message || "Failed to create portal session" },
      { status: 500 }
    );
  }
}
