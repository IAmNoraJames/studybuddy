"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");

  return (
    <main className="min-h-screen grid place-items-center bg-white px-4">
      <div className="w-full max-w-md rounded-2xl border p-6 shadow-sm bg-white">
        <h1 className="text-2xl font-bold">Log in</h1>
        <p className="mt-1 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link href="/auth/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>

        <form
          className="mt-6 grid gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Log in not wired yet. I’ll hook up Supabase after this compiles.");
          }}
        >
          <label className="text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full rounded-lg border px-3 py-2"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Continue
          </button>
        </form>

        <div className="mt-6 text-xs text-gray-500">
          Trouble? <a href="/#faq" className="underline">See FAQ</a>
        </div>
      </div>
    </main>
  );
}
