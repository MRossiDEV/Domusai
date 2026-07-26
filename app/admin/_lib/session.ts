import { createSupabaseServerClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

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

// Resolves the signed-in Supabase Auth user to their weeggo_admins row,
// auto-linking on first sign-in by matching verified email — same pattern as
// app/agent/_lib/session.ts's getCurrentAgent(), against a separate table
// (weeggo_admins is platform admins, weeggo_agents is real-estate agents).
export async function getCurrentAdmin(): Promise<CurrentAdminResult> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { status: "unauthenticated" };
  }

  const { data: linked, error: linkedError } = await supabase
    .from("weeggo_admins")
    .select("id, name, email, active")
    .eq("user_id", user.id)
    .maybeSingle();

  if (linkedError) throw new Error(linkedError.message);

  if (linked) {
    const admin = linked as AdminSessionRow;
    return admin.active ? { status: "ok", admin } : { status: "inactive" };
  }

  if (!user.email) {
    return { status: "unregistered" };
  }

  const { data: unlinked, error: unlinkedError } = await supabaseAdmin
    .from("weeggo_admins")
    .select("id, name, email, active")
    .eq("email", user.email)
    .is("user_id", null)
    .maybeSingle();

  if (unlinkedError) throw new Error(unlinkedError.message);

  if (!unlinked) {
    return { status: "unregistered" };
  }

  const { error: updateError } = await supabaseAdmin
    .from("weeggo_admins")
    .update({ user_id: user.id })
    .eq("id", unlinked.id);

  if (updateError) throw new Error(updateError.message);

  const admin = unlinked as AdminSessionRow;
  return admin.active ? { status: "ok", admin } : { status: "inactive" };
}
