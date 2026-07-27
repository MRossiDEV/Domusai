-- =============================================================================
-- WEEGGO partners + property geo/partner fields
--
-- Adds:
-- - weeggo_partners: external realtor/agency the seller side of a listing
--   belongs to. Distinct from weeggo_agents, which is WEEGGO's own internal
--   staff — a partner is a third party, not someone with a WEEGGO login.
-- - weeggo_properties.country / department: geo metadata beyond city
--   (neighborhood). Captured for now, not yet wired into Discover's filters.
-- - weeggo_properties.partner_id: which partner (if any) a listing came from.
--
-- Run via `supabase db push`, `supabase migration up`, or paste into the
-- Supabase SQL editor.
-- =============================================================================

create table weeggo_partners (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  contact_name  text,
  email         text,
  phone         text,
  notes         text,
  active        boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

comment on table weeggo_partners is 'External realtor/agency partners on the seller side of a listing — not WEEGGO staff (see weeggo_agents).';

create index weeggo_partners_active_idx on weeggo_partners (active);

create trigger weeggo_partners_set_updated_at
  before update on weeggo_partners
  for each row execute function weeggo_set_updated_at();

alter table weeggo_properties
  add column country text not null default 'Uruguay',
  add column department text,
  add column partner_id uuid references weeggo_partners (id) on delete set null;

comment on column weeggo_properties.department is 'Uruguayan department (Montevideo, Canelones, Maldonado, etc). Nullable — not backfilled for existing rows.';
comment on column weeggo_properties.partner_id is 'External realtor/agency this listing came from, if any. Null for WEEGGO-direct or self-submitted (Sell tab) listings.';

create index weeggo_properties_partner_id_idx on weeggo_properties (partner_id);
create index weeggo_properties_department_idx on weeggo_properties (department);

alter table weeggo_partners enable row level security;

-- No anon/authenticated policies — this is an internal reference table only
-- ever read/written by the admin CRUD through the service role, which
-- bypasses RLS. Same posture as weeggo_email_templates / weeggo_email_log.
