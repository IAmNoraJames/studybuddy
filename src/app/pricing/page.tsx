"use client";

type PriceConfig = {
  label: string;
  envKey: string; // NEXT_PUBLIC_* price id
};

const PLANS: PriceConfig[] = [
  { label: "Subscribe $5 (75 runs)", envKey: "NEXT_PUBLIC_STRIPE_PRICE_5" },
  { label: "Subscribe $10 (250 runs)", envKey: "NEXT_PUBLIC_STRIPE_PRICE_10" },
  { label: "Subscribe $15 (350 runs)", envKey: "NEXT_PUBLIC_STRIPE_PRICE_15" },
  { label: "Subscribe $20 (450 runs)", envKey: "NEXT_PUBLIC_STRIPE_PRICE_20" },
  { label: "Subscribe $40 (1000 runs)", envKey: "NEXT_PUBLIC_STRIPE_PRICE_40" },
];

function getPriceId(key: string): string | null {
  // NEXT_PUBLIC_* is inlined at build-time for client bundles
  // @ts-ignore
  const val = process.env[key];
  return typeof val === "string" && val.length > 0 ? val : null;
}

async function startCheckout(priceId: string) {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ priceId }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
  if (!data?.url) throw new Error("Missing checkout URL");
  window.location.href = data.url;
}

export default function PricingPage() {
  return (
    <main className="p-8 space-y-6">
      <h1 className="text-2xl mb-2 font-semibold">Pricing</h1>
      <p className="text-sm text-gray-600 mb-4">
        Choose a plan to start your free trial. You can change or cancel anytime in the portal.
      </p>

      <div className="flex flex-col gap-2 max-w-md">
        {PLANS.map((p) => {
          const priceId = getPriceId(p.envKey);
          const disabled = !priceId;
          return (
            <button
              key={p.envKey}
              disabled={disabled}
              className={`bg-black text-white px-4 py-2 rounded disabled:opacity-50`}
              onClick={() => priceId && startCheckout(priceId)}
              title={disabled ? `Missing ${p.envKey} in env` : ""}
            >
              {p.label}
            </button>
          );
        })}
      </div>
    </main>
  );
}
