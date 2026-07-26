-- =============================================================================
-- weeggo_admins — a dedicated table for platform admins, separate from
-- weeggo_agents (real-estate agents). Admins log in the same way agents do
-- (Supabase Auth magic link, auto-linked to this table by verified email on
-- first sign-in — see app/admin/_lib/session.ts), but they're a distinct
-- concept: platform operators, not listing agents with public profiles.
-- =============================================================================

create table weeggo_admins (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid unique references auth.users (id) on delete set null,
  name         text not null,
  email        text not null unique,
  active       boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

comment on table weeggo_admins is 'Platform admins with access to the /admin CRM. Distinct from weeggo_agents.';

create trigger weeggo_admins_set_updated_at
  before update on weeggo_admins
  for each row execute function weeggo_set_updated_at();

alter table weeggo_admins enable row level security;

-- Lets getCurrentAdmin() find "my own" admin row after linking (same pattern
-- as weeggo_agents_self_select).
create policy weeggo_admins_self_select
  on weeggo_admins for select
  to authenticated
  using (user_id = auth.uid());

-- Seed the first admin so there's actually someone who can log in. Update
-- the email below if this isn't the right address before running.
insert into weeggo_admins (name, email, active)
values ('Maurucio Rossi', 'mrossiph@gmail.com', true)
on conflict (email) do nothing;
