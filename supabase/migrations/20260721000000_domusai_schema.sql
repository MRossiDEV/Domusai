-- =============================================================================
-- DOMUSAI schema
--
-- All objects (tables, enum types, functions, triggers) are prefixed with
-- "domusai_" so this app can share a Postgres/Supabase project with other
-- apps without name collisions. Lives in the default "public" schema.
--
-- Run via `supabase db push`, `supabase migration up`, or paste into the
-- Supabase SQL editor.
-- =============================================================================

create extension if not exists "pgcrypto"; -- gen_random_uuid()


-- -----------------------------------------------------------------------------
-- Enum types
-- -----------------------------------------------------------------------------

create type domusai_agent_role as enum ('admin', 'agent');

create type domusai_property_status as enum ('draft', 'published', 'off_market');

create type domusai_lead_source as enum ('wizard', 'contact');

create type domusai_lead_status as enum ('new', 'contacted', 'closed');

create type domusai_contact_method as enum ('whatsapp', 'email', 'llamada');

create type domusai_email_status as enum ('queued', 'sent', 'failed');


-- -----------------------------------------------------------------------------
-- updated_at helper
-- -----------------------------------------------------------------------------

create or replace function domusai_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;


-- -----------------------------------------------------------------------------
-- domusai_agents
-- Admins and listing agents. `user_id` links to Supabase Auth once login is
-- wired up (see app/admin/layout.tsx TODO) — nullable until then.
-- -----------------------------------------------------------------------------

create table domusai_agents (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid unique references auth.users (id) on delete set null,
  name         text not null,
  email        text not null unique,
  phone        text,
  role         domusai_agent_role not null default 'agent',
  avatar_url   text,
  active       boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

comment on table domusai_agents is 'Admin users and listing agents.';

create index domusai_agents_role_idx on domusai_agents (role);

create trigger domusai_agents_set_updated_at
  before update on domusai_agents
  for each row execute function domusai_set_updated_at();


-- -----------------------------------------------------------------------------
-- domusai_properties
-- -----------------------------------------------------------------------------

create table domusai_properties (
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
  status            domusai_property_status not null default 'draft',
  featured          boolean not null default false,
  agent_id          uuid references domusai_agents (id) on delete set null,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

comment on table domusai_properties is 'Property listings shown on the site and managed in the admin section.';

create index domusai_properties_status_idx on domusai_properties (status);
create index domusai_properties_featured_idx on domusai_properties (featured) where featured = true;
create index domusai_properties_city_idx on domusai_properties (city);
create index domusai_properties_agent_id_idx on domusai_properties (agent_id);

create trigger domusai_properties_set_updated_at
  before update on domusai_properties
  for each row execute function domusai_set_updated_at();


-- -----------------------------------------------------------------------------
-- domusai_property_images
-- Additional gallery photos beyond the property's cover_image_url.
-- -----------------------------------------------------------------------------

create table domusai_property_images (
  id           uuid primary key default gen_random_uuid(),
  property_id  uuid not null references domusai_properties (id) on delete cascade,
  url          text not null,
  alt_text     text,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now()
);

comment on table domusai_property_images is 'Gallery images for a property, in addition to its cover image.';

create index domusai_property_images_property_id_idx on domusai_property_images (property_id, sort_order);


-- -----------------------------------------------------------------------------
-- domusai_leads
-- Submissions from the buyer wizard (app/wizard) and the general contact form.
-- -----------------------------------------------------------------------------

create table domusai_leads (
  id                 uuid primary key default gen_random_uuid(),
  full_name          text not null,
  email              text not null,
  phone              text,
  contact_method     domusai_contact_method not null default 'whatsapp',
  message            text,
  source             domusai_lead_source not null,
  assessment         jsonb not null default '{}'::jsonb,
  status             domusai_lead_status not null default 'new',
  property_id        uuid references domusai_properties (id) on delete set null,
  assigned_agent_id  uuid references domusai_agents (id) on delete set null,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

comment on table domusai_leads is 'Contacts captured via the buyer wizard or the contact form.';
comment on column domusai_leads.assessment is 'Wizard question-id -> answer map (see app/wizard/data/buyerAssessment.ts). Empty for source = contact.';

create index domusai_leads_status_idx on domusai_leads (status);
create index domusai_leads_created_at_idx on domusai_leads (created_at desc);
create index domusai_leads_email_idx on domusai_leads (email);
create index domusai_leads_assessment_gin_idx on domusai_leads using gin (assessment);

create trigger domusai_leads_set_updated_at
  before update on domusai_leads
  for each row execute function domusai_set_updated_at();


-- -----------------------------------------------------------------------------
-- domusai_email_templates / domusai_email_log
-- -----------------------------------------------------------------------------

create table domusai_email_templates (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  subject      text not null,
  body         text not null,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

comment on table domusai_email_templates is 'Reusable email templates (subject/body support {{variable}} placeholders).';

create trigger domusai_email_templates_set_updated_at
  before update on domusai_email_templates
  for each row execute function domusai_set_updated_at();

create table domusai_email_log (
  id            uuid primary key default gen_random_uuid(),
  template_id   uuid references domusai_email_templates (id) on delete set null,
  lead_id       uuid references domusai_leads (id) on delete set null,
  recipient     text not null,
  subject       text not null,
  status        domusai_email_status not null default 'queued',
  sent_at       timestamptz,
  created_at    timestamptz not null default now()
);

comment on table domusai_email_log is 'Record of individual emails sent (or queued/failed) from a template.';

create index domusai_email_log_lead_id_idx on domusai_email_log (lead_id);
create index domusai_email_log_sent_at_idx on domusai_email_log (sent_at desc);


-- -----------------------------------------------------------------------------
-- domusai_settings
-- Singleton row (id is always 1) holding site-level configuration.
-- -----------------------------------------------------------------------------

create table domusai_settings (
  id                        smallint primary key default 1 check (id = 1),
  contact_email             text not null,
  whatsapp_number           text not null,
  instagram_url             text,
  facebook_url              text,
  default_seo_description   text,
  updated_at                timestamptz not null default now()
);

comment on table domusai_settings is 'Singleton table (single row, id = 1) for site-wide settings.';

create trigger domusai_settings_set_updated_at
  before update on domusai_settings
  for each row execute function domusai_set_updated_at();

insert into domusai_settings (id, contact_email, whatsapp_number, instagram_url, facebook_url, default_seo_description)
values (
  1,
  'hola@domusai.app',
  '+598 99 000 000',
  'https://instagram.com/domusai',
  'https://facebook.com/domusai',
  'Descubrí propiedades exclusivas en Uruguay mediante una experiencia privada y personalizada.'
)
on conflict (id) do nothing;


-- =============================================================================
-- Row Level Security
--
-- Every table has RLS enabled (Supabase best practice for anything exposed
-- via the PostgREST API). No admin auth exists yet (see app/admin/layout.tsx
-- TODO), so admin reads/writes are expected to go through the server using
-- the Supabase service role key, which bypasses RLS entirely — no policy is
-- needed for that path.
--
-- The only anon/authenticated policies below are the two the public site
-- actually needs: browsing published properties, and submitting a lead
-- through the wizard or contact form. Everything else default-denies until
-- real admin auth + role checks are added, at which point replace the
-- "service role only" comments with policies keyed off domusai_agents.role.
-- =============================================================================

alter table domusai_agents enable row level security;
alter table domusai_properties enable row level security;
alter table domusai_property_images enable row level security;
alter table domusai_leads enable row level security;
alter table domusai_email_templates enable row level security;
alter table domusai_email_log enable row level security;
alter table domusai_settings enable row level security;

-- Public can read published properties and their gallery images.
create policy domusai_properties_public_select
  on domusai_properties for select
  to anon, authenticated
  using (status = 'published');

create policy domusai_property_images_public_select
  on domusai_property_images for select
  to anon, authenticated
  using (
    exists (
      select 1 from domusai_properties p
      where p.id = domusai_property_images.property_id
        and p.status = 'published'
    )
  );

-- Public can submit a lead (wizard or contact form) but cannot read/update/delete leads.
create policy domusai_leads_public_insert
  on domusai_leads for insert
  to anon, authenticated
  with check (true);

-- domusai_agents, domusai_email_templates, domusai_email_log, domusai_settings,
-- and writes to domusai_properties / domusai_property_images: no anon/authenticated
-- policies defined, so RLS denies all access from the client by default.
-- Server-side (service role) access is unaffected by RLS.
