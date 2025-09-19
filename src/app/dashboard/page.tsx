"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const checkout = searchParams.get("checkout"); // "success" | "canceled" | null

  useEffect(() => {
    const timer = setTimeout(() => {
      setData("Here is your dashboard data!");
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-4 p-6">
        <div className="h-6 w-40 bg-gray-200 rounded" />
        <div className="h-24 w-full bg-gray-200 rounded" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      {checkout === "success" && (
        <div className="p-4 rounded border border-green-300 bg-green-50 text-green-700 font-semibold">
          Payment successful! Your subscription is active.
        </div>
      )}
      {checkout === "canceled" && (
        <div className="p-4 rounded border border-red-300 bg-red-50 text-red-700 font-semibold">
          Payment was canceled. Please try again.
        </div>
      )}

      <div className="p-4 rounded border">
        <p>{data}</p>
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => alert("Button clicked!")}
        >
          Click me
        </button>
      </div>

      <div className="p-4 rounded border">
        <h2 className="font-semibold mb-2">Usage</h2>
        <p>Your monthly cap: 2 / 10 runs</p>
      </div>
    </div>
  );
}
