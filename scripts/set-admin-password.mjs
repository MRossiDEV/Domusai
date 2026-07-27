// One-off bootstrap script — the only supported way to set an admin's
// password, since app/admin/_lib/actions/auth.ts only ever compares against
// an existing bcrypt hash, never accepts/stores a plaintext one.
//
// Hits Supabase's REST API directly with plain fetch rather than
// @supabase/supabase-js — that package unconditionally spins up a Realtime
// client on Node < 22, which throws ("native WebSocket not found") since
// this script never needs it for a single update.
//
// Usage:
//   node --env-file=.env.local scripts/set-admin-password.mjs admin@example.com "the password"

import bcrypt from "bcryptjs";

const [, , email, password] = process.argv;

if (!email || !password) {
  console.error(
    'Usage: node --env-file=.env.local scripts/set-admin-password.mjs <email> "<password>"'
  );
  process.exit(1);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY — run with --env-file=.env.local."
  );
  process.exit(1);
}

const passwordHash = await bcrypt.hash(password, 12);

const response = await fetch(
  `${supabaseUrl}/rest/v1/weeggo_admins?email=eq.${encodeURIComponent(email)}`,
  {
    method: "PATCH",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({ password_hash: passwordHash }),
  }
);

if (!response.ok) {
  console.error(`Failed to update password: ${response.status} ${await response.text()}`);
  process.exit(1);
}

const rows = await response.json();

if (rows.length === 0) {
  console.error(
    `No weeggo_admins row found with email "${email}". Add the admin row first (see supabase/migrations/20260726000000_weeggo_admins.sql for the pattern), then run this again.`
  );
  process.exit(1);
}

console.log(`Password set for ${rows[0].name} <${rows[0].email}>.`);
