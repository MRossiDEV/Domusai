-- =============================================================================
-- Agent public profile (app/agent/(portal)/profile + public app/agents/[slug])
--
-- Adds a slug + bio to domusai_agents (mirrors domusai_properties.slug) and
-- a public-read RLS policy so anonymous visitors can view an active agent's
-- shareable profile page.
-- =============================================================================

alter table domusai_agents add column slug text;
alter table domusai_agents add column bio text;

update domusai_agents
set slug = lower(regexp_replace(regexp_replace(name, '[^a-zA-Z0-9]+', '-', 'g'), '(^-|-$)', '', 'g'))
  || '-' || substr(id::text, 1, 6)
where slug is null;

alter table domusai_agents alter column slug set not null;
alter table domusai_agents add constraint domusai_agents_slug_key unique (slug);

create index domusai_agents_slug_idx on domusai_agents (slug);

comment on column domusai_agents.slug is 'URL slug for the agent''s public profile page (app/agents/[slug]).';
comment on column domusai_agents.bio is 'Short bio shown on the agent''s public profile page.';

-- Public can view active agents' profiles (name, phone, avatar, bio, etc. —
-- the public profile page only ever selects the columns it displays; this
-- policy does not itself restrict which columns are readable).
create policy domusai_agents_public_select
  on domusai_agents for select
  to anon, authenticated
  using (active = true);
