import { supabaseAdmin } from "@/lib/supabase/admin";
import {
  mapAgent,
  mapLead,
  mapProperty,
  type AgentRow,
  type LeadRow,
  type PropertyRow,
} from "@/app/admin/_lib/store";
import type { Agent, Lead, Property } from "@/app/admin/_lib/types";
import { getCurrentAgent } from "./session";

// No more RLS scoping these (that depended on Supabase Auth's auth.uid(),
// which the agent portal no longer establishes) — each of these resolves
// the signed-in agent itself via getCurrentAgent() and filters explicitly,
// using the service role. The (portal) layout already redirects unauthenticated
// visitors before any page reaches these, but each function still fails
// closed (empty / null) rather than assuming that's always true.

export async function getMyLeads(): Promise<Lead[]> {
  const result = await getCurrentAgent();
  if (result.status !== "ok") return [];

  const { data, error } = await supabaseAdmin
    .from("weeggo_leads")
    .select("*")
    .eq("assigned_agent_id", result.agent.id)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data as LeadRow[]).map(mapLead);
}

export async function getMyProperties(): Promise<Property[]> {
  const result = await getCurrentAgent();
  if (result.status !== "ok") return [];

  const { data, error } = await supabaseAdmin
    .from("weeggo_properties")
    .select("*")
    .eq("agent_id", result.agent.id)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data as PropertyRow[]).map((row) => mapProperty(row));
}

// Full profile (slug, bio, avatar, phone) for the "Mi Perfil" page — the
// dashboard/leads/properties pages only need AgentSession (see session.ts).
export async function getMyAgentProfile(): Promise<Agent | null> {
  const result = await getCurrentAgent();
  if (result.status !== "ok") return null;

  const { data, error } = await supabaseAdmin
    .from("weeggo_agents")
    .select("*")
    .eq("id", result.agent.id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data ? mapAgent(data as AgentRow) : null;
}
