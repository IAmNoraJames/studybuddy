// src/app/lib/supabaseAdmin.ts
import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Server-side admin client for webhooks and trusted server code.
 * Uses non-public SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (never expose to client).
 *
 * Assumption: your path alias "@/lib/*" resolves to "src/app/lib/*".
 * If it points to "src/lib/*", move this file there or update imports accordingly.
 */

const url = process.env.SUPABASE_URL;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url) throw new Error("Missing SUPABASE_URL in environment");
if (!serviceRole) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY in environment");

export const supabaseAdmin = createClient(url, serviceRole, {
  auth: { persistSession: false, autoRefreshToken: false },
});
