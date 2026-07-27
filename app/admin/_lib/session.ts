import { cookies } from "next/headers";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "./admin-session";

export interface AdminSession {
  id: string;
  name: string;
  email: string;
  active: boolean;
}

type AdminSessionRow = {
  id: string;
  name: string;
  email: string;
  active: boolean;
};

export type CurrentAdminResult =
  | { status: "unauthenticated" }
  | { status: "unregistered" }
  | { status: "inactive" }
  | { status: "ok"; admin: AdminSession };

// Admin identity is checked once, at login (email+password against
// weeggo_admins — see actions/auth.ts), then carried as a signed cookie
// (app/admin/_lib/admin-session.ts) rather than a Supabase Auth session.
// This just verifies that cookie and re-reads the row, so a deactivated or
// deleted admin is caught on the very next request even with a still-valid
// signature.
export async function getCurrentAdmin(): Promise<CurrentAdminResult> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  const session = verifyAdminSessionToken(token);

  if (!session) {
    return { status: "unauthenticated" };
  }

  const { data, error } = await supabaseAdmin
    .from("weeggo_admins")
    .select("id, name, email, active")
    .eq("id", session.id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) {
    return { status: "unregistered" };
  }

  const admin = data as AdminSessionRow;
  return admin.active ? { status: "ok", admin } : { status: "inactive" };
}
