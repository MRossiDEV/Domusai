-- =============================================================================
-- WEEGGO admins: password-based login
--
-- Admin login moves off Supabase Auth entirely (was magic-link, briefly
-- Google OAuth) to a direct email+password check against this table, backed
-- by a custom signed-cookie session (see app/admin/_lib/admin-session.ts) —
-- proxy.ts and getCurrentAdmin() now check that cookie for /admin routes
-- instead of supabase.auth.getUser(). weeggo_agents / the agent portal are
-- untouched, still Supabase Auth magic-link.
--
-- password_hash stores a bcrypt hash, never a plaintext password — see
-- scripts/set-admin-password.ts for the only supported way to set one.
--
-- Handles both a fresh database (no password column yet) and one where a
-- plain `password` column was already added by hand (renames it in place —
-- any value already sitting in it is NOT a valid bcrypt hash and must be
-- reset via the script before that admin can log in).
--
-- Run via `supabase db push`, `supabase migration up`, or paste into the
-- Supabase SQL editor.
-- =============================================================================

do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_name = 'weeggo_admins' and column_name = 'password'
  ) then
    alter table weeggo_admins rename column password to password_hash;
  elsif not exists (
    select 1 from information_schema.columns
    where table_name = 'weeggo_admins' and column_name = 'password_hash'
  ) then
    alter table weeggo_admins add column password_hash text;
  end if;
end $$;

comment on column weeggo_admins.password_hash is 'bcrypt hash. Null until set via scripts/set-admin-password.ts — never store a plaintext password here.';
