"use client";
import { useState } from "react";

export default function AccountPage() {
  const [loading, setLoading] = useState(false);

  const openPortal = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/create-portal", { method: "POST" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
      if (!data?.url) throw new Error("Missing portal URL");
      window.location.href = data.url;
    } catch (e: any) {
      alert(e.message || "Could not open portal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 max-w-xl">
      <h1 className="text-2xl font-semibold">Account</h1>
      <p className="text-sm text-neutral-500">
        Manage your plan, payment method, or cancel anytime.
      </p>
      <button
        onClick={openPortal}
        disabled={loading}
        className="rounded-lg border px-4 py-2"
      >
        {loading ? "Opening…" : "Manage Subscription"}
      </button>
    </div>
  );
}
