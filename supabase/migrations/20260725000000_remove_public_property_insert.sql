-- =============================================================================
-- Removes public self-serve property submission.
--
-- The in-app "Sell" flow (app/(app)/sell) has been removed — properties are
-- added manually by admins/agents via the Properties CRM only, at least for
-- now. This drops the RLS policy that let anon/authenticated visitors insert
-- draft rows directly, closing that door at the database layer too (not just
-- removing the UI that used it).
-- =============================================================================

drop policy if exists weeggo_properties_public_insert_draft on weeggo_properties;
