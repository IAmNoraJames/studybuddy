"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const LOGIN_PATH = "/auth/signin";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const pathname = usePathname();
  const r = useRouter();

  useEffect(() => {
    let unsub: (() => void) | undefined;

    (async () => {
      const { data } = await supabase.auth.getSession();
      const hasSession = !!data.session;
      setAuthed(hasSession);
      setEmail(data.session?.user?.email ?? null);
      setLoading(false);
      if (!hasSession) r.replace(LOGIN_PATH);

      const sub = supabase.auth.onAuthStateChange((_e, s) => {
        const ok = !!s;
        setAuthed(ok);
        setEmail(s?.user?.email ?? null);
        if (!ok) r.replace(LOGIN_PATH);
      });
      // cleanup
      unsub = sub?.data?.subscription?.unsubscribe;
    })();

    return () => {
      try {
        unsub?.();
      } catch {
        /* no-op */
      }
    };
  }, [r, pathname]);

  const nav = [
    { href: "/app", label: "Generators" },
    { href: "/app/history", label: "History" },
    { href: "/app/account", label: "Account" },
    { href: "/app/billing", label: "Billing" },
  ];

  if (loading) return <div className="p-6">Loading…</div>;
  if (!authed) return null;

  return (
    <div className="min-h-screen grid md:grid-cols-[240px_1fr]">
      {/* Sidebar */}
      <aside className="border-r p-4 space-y-4">
        <div className="text-xl font-bold">StudyBuddy</div>
        <nav className="space-y-1">
          {nav.map((n) => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`block px-3 py-2 rounded ${
                  active ? "bg-black text-white" : "hover:bg-gray-100"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content with top header */}
      <div className="flex flex-col">
        <header className="flex items-center justify-end border-b px-6 py-3">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>{email}</span>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.href = LOGIN_PATH;
              }}
              className="rounded border px-3 py-1 hover:bg-gray-50"
            >
              Log out
            </button>
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
