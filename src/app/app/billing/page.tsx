"use client";

export default function BillingPage() {
  return (
    <div className="space-y-2">
      <div className="text-gray-600">Billing (coming soon)</div>
      <button
        onClick={async () => (window.location.href = "/pricing")}
        className="rounded-lg border px-3 py-2 hover:bg-gray-50"
      >
        Manage Plan
      </button>
    </div>
  );
}
