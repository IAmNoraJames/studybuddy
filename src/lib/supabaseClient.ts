// src/app/lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

/**
 * Browser/client Supabase (anon) for logged-in user interactions.
 * Uses NEXT_PUBLIC_* vars so they can be embedded in the client bundle.
 */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL in environment");
if (!anon) throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY in environment");

export const supabase = createClient(url, anon);
