"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function SignUpPage() {
  return (
    <main className="min-h-screen grid place-items-center bg-white px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold mb-4">Sign up</h1>
        <Auth
          supabaseClient={supabase}
          view="sign_up"
          appearance={{ theme: ThemeSupa }}
          providers={[]}
          localization={{
            variables: {
              sign_up: {
                email_label: "Email",
                password_label: "Password",
                button_label: "Create account",
              },
            },
          }}
        />
        <p className="mt-4 text-sm text-gray-700">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
