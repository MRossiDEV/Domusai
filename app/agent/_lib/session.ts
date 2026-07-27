import { cookies } from "next/headers";

import { supabaseAdmin } from "@/lib/supabase/admin";
import type { AgentRole } from "@/app/admin/_lib/types";
import { AGENT_SESSION_COOKIE, verifyAgentSessionToken } from "./agent-session";

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

// Agent identity is checked once, at login (email+password against
// weeggo_agents — see _lib/actions/auth.ts), then carried as a signed
// cookie (agent-session.ts) rather than a Supabase Auth session. This just
// verifies that cookie and re-reads the row, so a deactivated or deleted
// agent is caught on the very next request even with a still-valid
// signature.
export async function getCurrentAgent(): Promise<CurrentAgentResult> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AGENT_SESSION_COOKIE)?.value;
  const session = verifyAgentSessionToken(token);

  if (!session) {
    return { status: "unauthenticated" };
  }

  const { data, error } = await supabaseAdmin
    .from("weeggo_agents")
    .select("id, name, email, role, active")
    .eq("id", session.id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) {
    return { status: "unregistered" };
  }

  const agent = data as AgentSessionRow;
  return agent.active ? { status: "ok", agent } : { status: "inactive" };
}
