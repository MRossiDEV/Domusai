-- Adds the "sell" lead source for the new seller-onboarding wizard
-- (app/wizard/data/sellerOnboarding.ts). Sellers submit a lead — with their
-- contact info and the property details in `assessment` — for a staff agent
-- to follow up and manually create the listing; no property row is inserted
-- directly (see 20260725000000_remove_public_property_insert.sql for why
-- public property inserts were removed).

alter type weeggo_lead_source add value 'sell';
