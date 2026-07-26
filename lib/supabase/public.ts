import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !anonKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables."
  );
}

// Anon-key client, constrained by Row Level Security. Safe to use anywhere
// (server or client) — used for public reads (published properties) and the
// wizard's lead-insert action.
export const supabasePublic = createClient(supabaseUrl, anonKey, {
  auth: { persistSession: false },
});
