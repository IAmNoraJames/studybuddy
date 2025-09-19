"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function UpdatePasswordPage() {
  const [stage, setStage] = useState<"checking" | "ready" | "saving" | "done" | "error">("checking");
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    const sub = supabase.auth.onAuthStateChange((event /*, session */) => {
      if (event === "PASSWORD_RECOVERY") setStage("ready");
    });

    // Let users proceed even if already authenticated or the event didn't fire
    setStage("ready");

    return () => {
      try {
        sub.data?.subscription?.unsubscribe?.();
      } catch {
        /* no-op */
      }
    };
  }, []);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pw1.length < 8) {
      setMsg("Password must be at least 8 characters.");
      return;
    }
    if (pw1 !== pw2) {
      setMsg("Passwords do not match.");
      return;
    }

    setStage("saving");
    setMsg("");
    const { error } = await supabase.auth.updateUser({ password: pw1 });
    if (error) {
      setStage("error");
      setMsg(error.message || "Could not update password. Try the link again.");
      return;
    }
    setStage("done");
    setMsg("Password updated. Redirecting to log in…");
    setTimeout(() => router.push("/auth/signin"), 1200);
  };

  return (
    <main className="min-h-screen grid place-items-center bg-white px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">Set a new password</h1>
        <form onSubmit={onSave} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium">New password</label>
            <input
              type="password"
              value={pw1}
              onChange={(e) => setPw1(e.target.value)}
              className="mt-1 w-full rounded-xl border px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Confirm password</label>
            <input
              type="password"
              value={pw2}
              onChange={(e) => setPw2(e.target.value)}
              className="mt-1 w-full rounded-xl border px-3 py-2"
              required
            />
          </div>
          <button
            type="submit"
            disabled={stage === "saving"}
            className="w-full rounded-xl bg-blue-600 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {stage === "saving" ? "Saving…" : "Update password"}
          </button>
        </form>

        {msg && (
          <div
            className={`mt-4 rounded-lg border px-3 py-2 text-sm ${
              stage === "error"
                ? "border-red-200 bg-red-50 text-red-800"
                : "border-green-200 bg-green-50 text-green-800"
            }`}
          >
            {msg}
          </div>
        )}
      </div>
    </main>
  );
}
