import { cookies } from "next/headers";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { PARTNER_SESSION_COOKIE, verifyPartnerSessionToken } from "./partner-session";

export interface PartnerSession {
  id: string;
  name: string;
  email: string;
  active: boolean;
}

type PartnerSessionRow = {
  id: string;
  name: string;
  email: string | null;
  active: boolean;
};

export type CurrentPartnerResult =
  | { status: "unauthenticated" }
  | { status: "unregistered" }
  | { status: "inactive" }
  | { status: "ok"; partner: PartnerSession };

// Mirrors app/admin/_lib/session.ts / app/agent/_lib/session.ts — partner
// identity is checked once at login (email+password against
// weeggo_partners), then carried as a signed cookie, re-verified against
// the row on every request.
export async function getCurrentPartner(): Promise<CurrentPartnerResult> {
  const cookieStore = await cookies();
  const token = cookieStore.get(PARTNER_SESSION_COOKIE)?.value;
  const session = verifyPartnerSessionToken(token);

  if (!session) {
    return { status: "unauthenticated" };
  }

  const { data, error } = await supabaseAdmin
    .from("weeggo_partners")
    .select("id, name, email, active")
    .eq("id", session.id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) {
    return { status: "unregistered" };
  }

  const row = data as PartnerSessionRow;
  const partner: PartnerSession = { id: row.id, name: row.name, email: row.email ?? "", active: row.active };
  return partner.active ? { status: "ok", partner } : { status: "inactive" };
}
