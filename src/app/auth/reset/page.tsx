"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const origin =
        typeof window !== "undefined"
          ? window.location.origin
          : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

      const redirectTo = `${origin}/auth/update`;

      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
      if (error) throw error;

      setStatus("sent");
      setMessage(
        "If an account exists for that email, we’ve sent a reset link. Please check your inbox (and spam)."
      );
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setMessage(err?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-md px-4 py-16">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold">Reset your password</h1>
          <p className="mt-1 text-sm text-gray-600">
            Enter the email associated with your account. We’ll send a secure link to set a new password.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium">Email address</label>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-xl border px-3 py-2"
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading" || !email}
              className="w-full rounded-xl bg-blue-600 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {status === "loading" ? "Sending…" : "Send reset link"}
            </button>
          </form>

          {message && (
            <div
              className={`mt-4 rounded-lg border px-3 py-2 text-sm ${
                status === "error"
                  ? "border-red-200 bg-red-50 text-red-800"
                  : "border-green-200 bg-green-50 text-green-800"
              }`}
            >
              {message}
            </div>
          )}

          <div className="mt-6 text-sm text-gray-700">
            Remembered your password?{" "}
            <Link href="/auth/signin" className="text-blue-600 hover:underline">
              Back to log in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
