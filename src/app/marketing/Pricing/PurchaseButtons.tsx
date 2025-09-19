"use client";

import { useState } from "react";

type Props = {
  priceId: string;
  customerId?: string | null;
  children?: React.ReactNode;
  className?: string;
};

export default function PurchaseButton({ priceId, customerId, children, className }: Props) {
  const [loading, setLoading] = useState(false);

  const startCheckout = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, customerId }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
      if (!data?.url) throw new Error("Missing checkout URL");
      window.location.href = data.url;
    } catch (e: any) {
      alert(e.message || "Failed to start checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={startCheckout}
      disabled={loading || !priceId}
      className={className || "rounded-lg border px-4 py-2"}
    >
      {loading ? "Redirecting…" : children ?? "Subscribe"}
    </button>
  );
}
