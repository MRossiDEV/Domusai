-- =============================================================================
-- WEEGGO properties: locality (city)
--
-- weeggo_properties.city already exists but actually holds the NEIGHBORHOOD
-- (Pocitos, Carrasco, etc — see lib/discover/constants.ts's NEIGHBORHOODS and
-- Discover's matching logic, which both treat it that way already). Renaming
-- that column would ripple through the Discover filter/matching code for no
-- functional gain, so it's left as-is; this migration instead adds the
-- actually-missing tier: the city/locality itself (Montevideo, Punta del
-- Este, Colonia del Sacramento, etc), one level above department.
--
-- Run via `supabase db push`, `supabase migration up`, or paste into the
-- Supabase SQL editor.
-- =============================================================================

alter table weeggo_properties
  add column locality text;

comment on column weeggo_properties.locality is 'City/locality (Montevideo, Punta del Este, Colonia del Sacramento, etc) — one tier above department, distinct from the city column (which despite its name holds the neighborhood). Nullable — not backfilled for existing rows.';

create index weeggo_properties_locality_idx on weeggo_properties (locality);
