-- =============================================================================
-- WEEGGO agents + partners: password-based login
--
-- Extends the admin CRM's move off Supabase Auth (see
-- 20260731000000_weeggo_admins_password.sql) to agents and partners too —
-- all three now use the same pattern: a bcrypt password_hash on their own
-- table, checked directly by a server action, carried as a signed cookie
-- (see app/agent/_lib/agent-session.ts, app/partner/_lib/partner-session.ts).
--
-- Accounts are admin-created only (no public registration) and start with
-- password_hash = null; the admin action that creates the row emails an
-- invite link (see lib/invite-token.ts) that lets the agent/partner set
-- their own password for the first time.
--
-- weeggo_agents.user_id (the old Supabase Auth linkage) and its RLS
-- policies are left in place but are now unused by the agent portal, which
-- reads/writes through the service role with explicit id checks instead —
-- not dropped, since removing them isn't necessary and a column/policy
-- clean-up can happen separately if ever desired.
--
-- Run via `supabase db push`, `supabase migration up`, or paste into the
-- Supabase SQL editor.
-- =============================================================================

alter table weeggo_agents
  add column if not exists password_hash text;

comment on column weeggo_agents.password_hash is 'bcrypt hash, set via the emailed invite link (app/agent/set-password). Null until the agent completes their invite.';

alter table weeggo_partners
  add column if not exists password_hash text;

comment on column weeggo_partners.password_hash is 'bcrypt hash, set via the emailed invite link (app/partner/set-password). Null until the partner completes their invite. Login requires partners.email to be set.';
