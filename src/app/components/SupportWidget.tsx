// src/app/components/supportwidget.tsx
"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

declare global {
  interface Window {
    $crisp: any[];
    CRISP_WEBSITE_ID: string;
  }
}

export default function SupportWidget() {
  useEffect(() => {
    const CRISP_ID = process.env.NEXT_PUBLIC_CRISP_ID || "";
    if (!CRISP_ID) {
      // No widget ID configured; do nothing
      return;
    }

    // Avoid double-injecting the script
    if (document.getElementById("crisp-chat")) return;

    // Initialize globals expected by Crisp
    window.$crisp = window.$crisp || [];
    window.CRISP_WEBSITE_ID = CRISP_ID;

    const script = document.createElement("script");
    script.id = "crisp-chat";
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://client.crisp.chat/l.js";
    document.head.appendChild(script);

    // Attach user email now and keep it updated on auth changes
    let unsub: (() => void) | undefined;

    (async () => {
      try {
        const { data } = await supabase.auth.getUser();
        const email = data.user?.email;
        if (email) {
          window.$crisp?.push(["set", "user:email", [email]]);
        }
      } catch {
        /* ignore */
      }

      const sub = supabase.auth.onAuthStateChange((_event, session) => {
        const email = session?.user?.email;
        if (email) {
          window.$crisp?.push(["set", "user:email", [email]]);
        } else {
          // If logged out, clear the email
          window.$crisp?.push(["set", "user:email", [null]]);
        }
      });
      unsub = sub?.data?.subscription?.unsubscribe;
    })();

    return () => {
      try {
        unsub?.();
      } catch {
        /* no-op */
      }
      // Optional: keep the widget across route changes if this component is in a layout.
      // If you want to fully remove it on unmount, uncomment below:
      // const el = document.getElementById("crisp-chat");
      // if (el) el.remove();
    };
  }, []);

  return null;
}
