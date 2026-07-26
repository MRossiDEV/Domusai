import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  mapAgent,
  mapLead,
  mapProperty,
  type AgentRow,
  type LeadRow,
  type PropertyRow,
} from "@/app/admin/_lib/store";
import type { Agent, Lead, Property } from "@/app/admin/_lib/types";

// No manual agent-id filtering here — RLS (weeggo_leads_agent_select /
// weeggo_properties_agent_select_own) already scopes these queries to
// whoever is signed in.

export async function getMyLeads(): Promise<Lead[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("weeggo_leads")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data as LeadRow[]).map(mapLead);
}

export async function getMyProperties(): Promise<Property[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("weeggo_properties")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data as PropertyRow[]).map(mapProperty);
}

// Full profile (slug, bio, avatar, phone) for the "Mi Perfil" page — the
// dashboard/leads/properties pages only need AgentSession (see session.ts).
export async function getMyAgentProfile(): Promise<Agent | null> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("weeggo_agents")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data ? mapAgent(data as AgentRow) : null;
}
