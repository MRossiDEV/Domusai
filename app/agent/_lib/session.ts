import { createSupabaseServerClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import type { AgentRole } from "@/app/admin/_lib/types";

export interface AgentSession {
  id: string;
  name: string;
  email: string;
  role: AgentRole;
  active: boolean;
}

type AgentSessionRow = {
  id: string;
  name: string;
  email: string;
  role: AgentRole;
  active: boolean;
};

export type CurrentAgentResult =
  | { status: "unauthenticated" }
  | { status: "unregistered" }
  | { status: "inactive" }
  | { status: "ok"; agent: AgentSession };

// Resolves the signed-in Supabase Auth user to their weeggo_agents row,
// auto-linking on first sign-in by matching verified email. See
// supabase/migrations/20260721010000_agent_portal_rls.sql for the RLS this
// depends on.
export async function getCurrentAgent(): Promise<CurrentAgentResult> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { status: "unauthenticated" };
  }

  const { data: linked, error: linkedError } = await supabase
    .from("weeggo_agents")
    .select("id, name, email, role, active")
    .eq("user_id", user.id)
    .maybeSingle();

  if (linkedError) throw new Error(linkedError.message);

  if (linked) {
    const agent = linked as AgentSessionRow;
    return agent.active ? { status: "ok", agent } : { status: "inactive" };
  }

  if (!user.email) {
    return { status: "unregistered" };
  }

  const { data: unlinked, error: unlinkedError } = await supabaseAdmin
    .from("weeggo_agents")
    .select("id, name, email, role, active")
    .eq("email", user.email)
    .is("user_id", null)
    .maybeSingle();

  if (unlinkedError) throw new Error(unlinkedError.message);

  if (!unlinked) {
    return { status: "unregistered" };
  }

  const { error: updateError } = await supabaseAdmin
    .from("weeggo_agents")
    .update({ user_id: user.id })
    .eq("id", unlinked.id);

  if (updateError) throw new Error(updateError.message);

  const agent = unlinked as AgentSessionRow;
  return agent.active ? { status: "ok", agent } : { status: "inactive" };
}
