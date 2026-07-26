-- =============================================================================
-- WEEGGO schema
--
-- Fresh copies of the domusai_ tables under a weeggo_ prefix, for the WEEGGO
-- rebrand. This does NOT touch any domusai_ object (no renames, no alters,
-- no drops) — the domusai_ tables and their data are left exactly as they
-- are. weeggo_ tables start empty; see supabase/seed.sql for sample data.
--
-- Mirrors the final shape of domusai_ across all of its migrations
-- (20260721000000_domusai_schema.sql, 20260721010000_agent_portal_rls.sql,
-- 20260721020000_agent_profile.sql) plus the property_type/rent_price
-- columns the WEEGGO swipe-deck app needs, all folded into one fresh schema
-- rather than replayed as incremental alters.
--
-- Run via `supabase db push`, `supabase migration up`, or paste into the
-- Supabase SQL editor.
-- =============================================================================

create extension if not exists "pgcrypto"; -- gen_random_uuid()


-- -----------------------------------------------------------------------------
-- Enum types
-- -----------------------------------------------------------------------------

create type weeggo_agent_role as enum ('admin', 'agent');

create type weeggo_property_status as enum ('draft', 'published', 'off_market');

create type weeggo_property_type as enum ('apartment', 'house', 'ph', 'loft');

create type weeggo_lead_source as enum ('wizard', 'contact');

create type weeggo_lead_status as enum ('new', 'contacted', 'closed');

create type weeggo_contact_method as enum ('whatsapp', 'email', 'llamada');

create type weeggo_email_status as enum ('queued', 'sent', 'failed');


-- -----------------------------------------------------------------------------
-- updated_at helper
-- -----------------------------------------------------------------------------

create or replace function weeggo_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;


-- -----------------------------------------------------------------------------
-- weeggo_agents
-- Admins and listing agents. `user_id` links to Supabase Auth once an agent
-- signs in (see app/agent/_lib/session.ts) — nullable until then.
-- -----------------------------------------------------------------------------

create table weeggo_agents (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid unique references auth.users (id) on delete set null,
  name         text not null,
  email        text not null unique,
  phone        text,
  role         weeggo_agent_role not null default 'agent',
  avatar_url   text,
  slug         text not null unique,
  bio          text,
  active       boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

comment on table weeggo_agents is 'Admins and listing agents.';
comment on column weeggo_agents.slug is 'URL slug for the agent''s public profile page (app/agents/[slug]).';
comment on column weeggo_agents.bio is 'Short bio shown on the agent''s public profile page.';

create index weeggo_agents_role_idx on weeggo_agents (role);
create index weeggo_agents_slug_idx on weeggo_agents (slug);

create trigger weeggo_agents_set_updated_at
  before update on weeggo_agents
  for each row execute function weeggo_set_updated_at();


-- -----------------------------------------------------------------------------
-- weeggo_properties
-- -----------------------------------------------------------------------------

create table weeggo_properties (
  id                uuid primary key default gen_random_uuid(),
  slug              text not null unique,
  title             text not null,
  city              text not null,
  description       text not null,
  price             numeric(14, 2) not null check (price >= 0),
  currency          text not null default 'USD',
  bedrooms          smallint not null default 0 check (bedrooms >= 0),
  bathrooms         smallint not null default 0 check (bathrooms >= 0),
  area_m2           numeric(8, 2) not null default 0 check (area_m2 >= 0),
  badge             text,
  tags              text[] not null default '{}',
  cover_image_url   text not null,
  status            weeggo_property_status not null default 'draft',
  property_type     weeggo_property_type not null default 'apartment',
  rent_price        numeric(14, 2) check (rent_price is null or rent_price >= 0),
  featured          boolean not null default false,
  agent_id          uuid references weeggo_agents (id) on delete set null,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

comment on table weeggo_properties is 'Property listings shown on the site and managed in the admin section.';
comment on column weeggo_properties.property_type is 'Apartment / House / PH / Loft — drives the Sell form and Discover deck type filter.';
comment on column weeggo_properties.rent_price is 'Monthly rent in the property''s currency. Null if the property has no rental estimate (e.g. sale-only listings).';

create index weeggo_properties_status_idx on weeggo_properties (status);
create index weeggo_properties_featured_idx on weeggo_properties (featured) where featured = true;
create index weeggo_properties_city_idx on weeggo_properties (city);
create index weeggo_properties_agent_id_idx on weeggo_properties (agent_id);

create trigger weeggo_properties_set_updated_at
  before update on weeggo_properties
  for each row execute function weeggo_set_updated_at();


-- -----------------------------------------------------------------------------
-- weeggo_property_images
-- Additional gallery photos beyond the property's cover_image_url.
-- -----------------------------------------------------------------------------

create table weeggo_property_images (
  id           uuid primary key default gen_random_uuid(),
  property_id  uuid not null references weeggo_properties (id) on delete cascade,
  url          text not null,
  alt_text     text,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now()
);

comment on table weeggo_property_images is 'Gallery images for a property, in addition to its cover image.';

create index weeggo_property_images_property_id_idx on weeggo_property_images (property_id, sort_order);


-- -----------------------------------------------------------------------------
-- weeggo_leads
-- Submissions from the buyer wizard (app/wizard), the in-app "Request a
-- viewing" (app/(app)/actions.ts), or the general contact form.
-- -----------------------------------------------------------------------------

create table weeggo_leads (
  id                 uuid primary key default gen_random_uuid(),
  full_name          text not null,
  email              text not null,
  phone              text,
  contact_method     weeggo_contact_method not null default 'whatsapp',
  message            text,
  source             weeggo_lead_source not null,
  assessment         jsonb not null default '{}'::jsonb,
  status             weeggo_lead_status not null default 'new',
  property_id        uuid references weeggo_properties (id) on delete set null,
  assigned_agent_id  uuid references weeggo_agents (id) on delete set null,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

comment on table weeggo_leads is 'Contacts captured via the buyer wizard, the in-app viewing request, or the contact form.';
comment on column weeggo_leads.assessment is 'Wizard question-id -> answer map (see app/wizard/data/buyerAssessment.ts), or a filters snapshot for viewing requests. Empty for source = contact with neither.';

create index weeggo_leads_status_idx on weeggo_leads (status);
create index weeggo_leads_created_at_idx on weeggo_leads (created_at desc);
create index weeggo_leads_email_idx on weeggo_leads (email);
create index weeggo_leads_assessment_gin_idx on weeggo_leads using gin (assessment);

create trigger weeggo_leads_set_updated_at
  before update on weeggo_leads
  for each row execute function weeggo_set_updated_at();


-- -----------------------------------------------------------------------------
-- weeggo_email_templates / weeggo_email_log
-- -----------------------------------------------------------------------------

create table weeggo_email_templates (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  subject      text not null,
  body         text not null,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

comment on table weeggo_email_templates is 'Reusable email templates (subject/body support {{variable}} placeholders).';

create trigger weeggo_email_templates_set_updated_at
  before update on weeggo_email_templates
  for each row execute function weeggo_set_updated_at();

create table weeggo_email_log (
  id            uuid primary key default gen_random_uuid(),
  template_id   uuid references weeggo_email_templates (id) on delete set null,
  lead_id       uuid references weeggo_leads (id) on delete set null,
  recipient     text not null,
  subject       text not null,
  status        weeggo_email_status not null default 'queued',
  sent_at       timestamptz,
  created_at    timestamptz not null default now()
);

comment on table weeggo_email_log is 'Record of individual emails sent (or queued/failed) from a template.';

create index weeggo_email_log_lead_id_idx on weeggo_email_log (lead_id);
create index weeggo_email_log_sent_at_idx on weeggo_email_log (sent_at desc);


-- -----------------------------------------------------------------------------
-- weeggo_settings
-- Singleton row (id is always 1) holding site-level configuration.
-- -----------------------------------------------------------------------------

create table weeggo_settings (
  id                        smallint primary key default 1 check (id = 1),
  contact_email             text not null,
  whatsapp_number           text not null,
  instagram_url             text,
  facebook_url              text,
  default_seo_description   text,
  updated_at                timestamptz not null default now()
);

comment on table weeggo_settings is 'Singleton table (single row, id = 1) for site-wide settings.';

create trigger weeggo_settings_set_updated_at
  before update on weeggo_settings
  for each row execute function weeggo_set_updated_at();

insert into weeggo_settings (id, contact_email, whatsapp_number, instagram_url, facebook_url, default_seo_description)
values (
  1,
  'hola@weeggo.app',
  '+598 99 000 000',
  'https://instagram.com/weeggo',
  'https://facebook.com/weeggo',
  'Swipe through exclusive properties in Uruguay — buy, rent, or invest.'
)
on conflict (id) do nothing;


-- =============================================================================
-- Row Level Security
--
-- Mirrors the domusai_ RLS setup exactly (public read of published
-- properties, public lead submission, public draft-only property
-- submission, and the agent-portal self-service policies). No admin auth
-- exists yet (app/admin is intentionally auth-less, same TODO as domusai_),
-- so admin reads/writes go through the server using the Supabase service
-- role key, which bypasses RLS — no policy is needed for that path.
-- =============================================================================

alter table weeggo_agents enable row level security;
alter table weeggo_properties enable row level security;
alter table weeggo_property_images enable row level security;
alter table weeggo_leads enable row level security;
alter table weeggo_email_templates enable row level security;
alter table weeggo_email_log enable row level security;
alter table weeggo_settings enable row level security;

-- Public can read published properties and their gallery images.
create policy weeggo_properties_public_select
  on weeggo_properties for select
  to anon, authenticated
  using (status = 'published');

create policy weeggo_property_images_public_select
  on weeggo_property_images for select
  to anon, authenticated
  using (
    exists (
      select 1 from weeggo_properties p
      where p.id = weeggo_property_images.property_id
        and p.status = 'published'
    )
  );

-- Public can submit a lead (wizard, viewing request, or contact form) but
-- cannot read/update/delete leads.
create policy weeggo_leads_public_insert
  on weeggo_leads for insert
  to anon, authenticated
  with check (true);

-- Public "Sell" tab: any visitor can submit a listing, but only ever as a
-- draft — it only reaches the deck once an admin/agent publishes it from the
-- Properties CRM.
create policy weeggo_properties_public_insert_draft
  on weeggo_properties for insert
  to anon, authenticated
  with check (status = 'draft');

-- Lets getCurrentAgent() find "my own" agent row after linking.
create policy weeggo_agents_self_select
  on weeggo_agents for select
  to authenticated
  using (user_id = auth.uid());

-- Public can view active agents' profiles (name, phone, avatar, bio, etc. —
-- the public profile page only ever selects the columns it displays; this
-- policy does not itself restrict which columns are readable).
create policy weeggo_agents_public_select
  on weeggo_agents for select
  to anon, authenticated
  using (active = true);

-- Agents see only leads assigned to them.
create policy weeggo_leads_agent_select
  on weeggo_leads for select
  to authenticated
  using (
    assigned_agent_id in (
      select id from weeggo_agents where user_id = auth.uid()
    )
  );

-- Agents can update (e.g. change status of) only their own assigned leads.
create policy weeggo_leads_agent_update
  on weeggo_leads for update
  to authenticated
  using (
    assigned_agent_id in (
      select id from weeggo_agents where user_id = auth.uid()
    )
  )
  with check (
    assigned_agent_id in (
      select id from weeggo_agents where user_id = auth.uid()
    )
  );

-- Agents see all of their own listings (including drafts/off-market), not
-- just published ones. Read-only — property writes stay admin-only.
create policy weeggo_properties_agent_select_own
  on weeggo_properties for select
  to authenticated
  using (
    agent_id in (
      select id from weeggo_agents where user_id = auth.uid()
    )
  );

-- weeggo_email_templates, weeggo_email_log: no anon/authenticated policies
-- defined, so RLS denies all access from the client by default. Server-side
-- (service role) access is unaffected by RLS.
