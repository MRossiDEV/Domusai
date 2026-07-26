-- =============================================================================
-- Agent portal RLS (app/agent/**)
--
-- Additive only — does not modify 20260721000000_domusai_schema.sql.
--
-- Agents authenticate via Supabase Auth (magic link). Each domusai_agents
-- row links to auth.users via user_id, set on first sign-in (see
-- app/agent/_lib/session.ts's auto-link flow, which uses the service-role
-- client for that one write). These policies let an authenticated agent
-- read (and, for leads, update) only rows tied to their own linked agent id.
-- =============================================================================

-- Lets getCurrentAgent() find "my own" agent row after linking.
create policy domusai_agents_self_select
  on domusai_agents for select
  to authenticated
  using (user_id = auth.uid());

-- Agents see only leads assigned to them.
create policy domusai_leads_agent_select
  on domusai_leads for select
  to authenticated
  using (
    assigned_agent_id in (
      select id from domusai_agents where user_id = auth.uid()
    )
  );

-- Agents can update (e.g. change status of) only their own assigned leads.
create policy domusai_leads_agent_update
  on domusai_leads for update
  to authenticated
  using (
    assigned_agent_id in (
      select id from domusai_agents where user_id = auth.uid()
    )
  )
  with check (
    assigned_agent_id in (
      select id from domusai_agents where user_id = auth.uid()
    )
  );

-- Agents see all of their own listings (including drafts/off-market), not
-- just published ones. Read-only — property writes stay admin-only.
create policy domusai_properties_agent_select_own
  on domusai_properties for select
  to authenticated
  using (
    agent_id in (
      select id from domusai_agents where user_id = auth.uid()
    )
  );
