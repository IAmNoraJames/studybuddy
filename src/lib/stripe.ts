// src/app/lib/stripe.ts
import "server-only";
import Stripe from "stripe";

/**
 * Assumption: your path alias "@/lib/*" resolves to "src/app/lib/*".
 * If your alias instead points to "src/lib/*", move this file there or update imports accordingly.
 */

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  throw new Error("Missing STRIPE_SECRET_KEY in environment");
}

export const stripe = new Stripe(key, {
  // Pin to a known stable version. Cast keeps TS happy with literal type.
  apiVersion: "2024-06-20" as Stripe.LatestApiVersion,
});
