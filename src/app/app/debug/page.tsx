"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

function mask(v: string | undefined, keep = 6) {
  if (!v) return "(undefined)";
  if (v.length <= keep) return v;
  return v.slice(0, keep) + "…" + v.slice(-keep);
}

type Result = {
  url: string | undefined;
  anon: string | undefined;
  appUrl: string | undefined;
  origin: string | undefined;
  sessionOk: boolean;
  authUrlLooksValid: boolean;
  notes: string[];
};

export default function DebugPage() {
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    (async () => {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      const appUrl = process.env.NEXT_PUBLIC_APP_URL;
      const origin =
        typeof window !== "undefined" ? window.location.origin : undefined;

      const notes: string[] = [];
      const authUrlLooksValid =
        !!url && url.startsWith("https://") && url.includes(".supabase.co");

      if (!authUrlLooksValid)
        notes.push("❌ NEXT_PUBLIC_SUPABASE_URL is missing or malformed.");
      if (!anon || !anon.startsWith("ey"))
        notes.push("❌ NEXT_PUBLIC_SUPABASE_ANON_KEY missing/looks wrong.");
      if (!appUrl) notes.push("ℹ️ NEXT_PUBLIC_APP_URL missing (not fatal).");

      const { error } = await supabase.auth.getSession();
      if (error)
        notes.push("⚠️ supabase.auth.getSession() error: " + error.message);

      setResult({
        url,
        anon,
        appUrl,
        origin,
        sessionOk: !error,
        authUrlLooksValid,
        notes,
      });
    })();
  }, []);

  if (!result) return <div className="p-6">Running checks…</div>;

  return (
    <main className="min-h-screen bg-white px-4 py-10">
      <div className="mx-auto max-w-2xl space-y-4">
        <h1 className="text-2xl font-bold">Supabase Debug</h1>

        <div className="rounded-xl border p-4">
          <div className="text-sm">
            <div>
              <b>NEXT_PUBLIC_SUPABASE_URL</b>: {mask(result.url)}
            </div>
            <div>
              <b>NEXT_PUBLIC_SUPABASE_ANON_KEY</b>: {mask(result.anon)}
            </div>
            <div>
              <b>NEXT_PUBLIC_APP_URL</b>: {result.appUrl || "(undefined)"}
            </div>
            <div>
              <b>window.origin</b>: {result.origin}
            </div>
          </div>
        </div>

        <div className="rounded-xl border p-4 text-sm">
          <div>
            Auth URL looks valid?{" "}
            <b>{result.authUrlLooksValid ? "yes" : "no"}</b>
          </div>
          <div>
            Client session call ok? <b>{result.sessionOk ? "yes" : "no"}</b>
          </div>
        </div>

        {result.notes.length > 0 && (
          <div className="rounded-xl border p-4 bg-yellow-50 text-sm">
            <b>Notes:</b>
            <ul className="list-disc pl-5 mt-2">
              {result.notes.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
