-- =============================================================================
-- WEEGGO properties: badges (multi-select)
--
-- weeggo_properties.badge was a single free-text marketing label. Converts
-- it to a text[] (badges, plural) picked from a fixed list in the admin form
-- (see lib/discover/constants.ts's BADGES), same pattern as the existing
-- `tags` column — any existing single value is preserved as a one-element
-- array.
--
-- Run via `supabase db push`, `supabase migration up`, or paste into the
-- Supabase SQL editor.
-- =============================================================================

alter table weeggo_properties
  alter column badge type text[] using (
    case when badge is null or badge = '' then '{}'::text[] else array[badge] end
  );

alter table weeggo_properties
  alter column badge set default '{}'::text[];

alter table weeggo_properties
  alter column badge set not null;

alter table weeggo_properties
  rename column badge to badges;

comment on column weeggo_properties.badges is 'Marketing labels picked from a fixed list (see lib/discover/constants.ts BADGES) — display only, not a filter dimension like tags.';
