-- =============================================================================
-- WEEGGO mock/development seed data
--
-- Mirrors the mock data previously used by the admin section's in-memory
-- store (app/admin/_lib/store.ts) so local development looks the same
-- whether the admin UI reads from that store or from this database.
--
-- Dev/local use only — running this against a database that already has
-- real data will happily insert duplicates (ids are fixed for readability,
-- not conflict-checked beyond primary keys). Supabase CLI runs this
-- automatically on `supabase db reset`; otherwise apply manually after the
-- schema migration, e.g. `supabase db execute -f supabase/seed.sql` or via
-- the SQL editor.
-- =============================================================================


-- -----------------------------------------------------------------------------
-- Agents
-- -----------------------------------------------------------------------------

insert into weeggo_agents (id, name, email, phone, role, active, slug, bio, created_at)
values
  ('a0000000-0000-0000-0000-000000000001', 'Isabela Duarte', 'isabela@weeggo.app', '+598 99 010 101', 'admin', true,  'isabela-duarte', 'Fundadora y administradora de WEEGGO.', now() - interval '200 days'),
  ('a0000000-0000-0000-0000-000000000002', 'Rodrigo Peña',   'rodrigo@weeggo.app', '+598 99 020 202', 'agent', true,  'rodrigo-pena',   'Especialista en Pocitos y Punta Carretas.', now() - interval '150 days'),
  ('a0000000-0000-0000-0000-000000000003', 'Carolina Vidal', 'carolina@weeggo.app','+598 99 030 303', 'agent', false, 'carolina-vidal', 'Especialista en propiedades de inversión.', now() - interval '90 days');


-- -----------------------------------------------------------------------------
-- Properties
-- -----------------------------------------------------------------------------

insert into weeggo_properties
  (id, slug, title, city, description, price, currency, bedrooms, bathrooms, area_m2, badge, tags, cover_image_url, status, featured, property_type, rent_price, agent_id, created_at, updated_at)
values
  (
    '00000000-0000-0000-0000-000000000101',
    'residencia-frente-al-mar-jose-ignacio',
    'Residencia Frente al Mar',
    'José Ignacio',
    'Una residencia diseñada para quienes buscan privacidad absoluta, vistas abiertas al océano y una arquitectura que se integra naturalmente con el paisaje.',
    4200000, 'USD', 5, 6, 620,
    'Off Market',
    array['Frente al mar', 'Arquitectura de autor', 'Privacidad absoluta'],
    '/images/property-1.png',
    'published', true, 'house', 14000,
    'a0000000-0000-0000-0000-000000000001',
    now() - interval '40 days', now() - interval '3 days'
  ),
  (
    '00000000-0000-0000-0000-000000000102',
    'arquitectura-contemporanea-carrasco',
    'Arquitectura Contemporánea',
    'Carrasco',
    'Diseño contemporáneo, espacios luminosos y una ubicación privilegiada en uno de los barrios más exclusivos de Montevideo.',
    2650000, 'USD', 4, 4, 540,
    'Selección Privada',
    array['Barrio exclusivo', 'Diseño contemporáneo', 'Jardín privado'],
    '/images/property-2.png',
    'published', true, 'house', 9500,
    'a0000000-0000-0000-0000-000000000002',
    now() - interval '35 days', now() - interval '10 days'
  ),
  (
    '00000000-0000-0000-0000-000000000103',
    'penthouse-exclusivo-punta-del-este',
    'Penthouse Exclusivo',
    'Punta del Este',
    'Un penthouse con vistas panorámicas al mar, amplias terrazas y una experiencia residencial pensada para disfrutar cada detalle.',
    3100000, 'USD', 4, 5, 510,
    'Vista Panorámica',
    array['Vista al océano', 'Terraza privada', 'Alta demanda'],
    '/images/property-3.png',
    'published', true, 'apartment', 11000,
    'a0000000-0000-0000-0000-000000000002',
    now() - interval '20 days', now() - interval '20 days'
  ),
  (
    '00000000-0000-0000-0000-000000000104',
    'villa-moderna-la-barra',
    'Villa Moderna',
    'La Barra',
    'Una villa contemporánea rodeada de naturaleza, ideal para quienes buscan tranquilidad sin renunciar al diseño y la exclusividad.',
    1980000, 'USD', 4, 4, 480,
    'Nueva Incorporación',
    array['Piscina', 'Entorno natural', 'Alta valorización'],
    '/images/property-4.png',
    'draft', false, 'house', 7000,
    'a0000000-0000-0000-0000-000000000003',
    now() - interval '5 days', now() - interval '5 days'
  ),
  -- Everyday Montevideo listings — gives the WEEGGO swipe deck real breadth
  -- to filter/sort across (the four above are all multi-million-dollar
  -- off-market/draft pieces that fall outside the deck's default budget
  -- sliders, so on their own the deck would look empty in dev).
  (
    '00000000-0000-0000-0000-000000000105',
    'apartamento-pocitos-2-dormitorios',
    'Apartamento en Pocitos',
    'Pocitos',
    'Luminoso 2 dormitorios a dos cuadras de la rambla de Pocitos, pisos originales de mosaico de los años 50, recientemente pintado.',
    212000, 'USD', 2, 1, 78,
    null,
    array['Balcony', 'Renovated'],
    '/images/property-1.png',
    'published', true, 'apartment', 1150,
    'a0000000-0000-0000-0000-000000000002',
    now() - interval '18 days', now() - interval '2 days'
  ),
  (
    '00000000-0000-0000-0000-000000000106',
    'apartamento-punta-carretas-3-dormitorios',
    'Apartamento en Punta Carretas',
    'Punta Carretas',
    'Unidad en esquina, luminosa, a pasos de Punta Carretas Shopping, tres dormitorios, dos baños completos y balcón envolvente.',
    298000, 'USD', 3, 2, 105,
    null,
    array['Parking', 'Balcony', 'Elevator'],
    '/images/property-2.png',
    'published', false, 'apartment', 1650,
    'a0000000-0000-0000-0000-000000000002',
    now() - interval '16 days', now() - interval '4 days'
  ),
  (
    '00000000-0000-0000-0000-000000000107',
    'loft-ciudad-vieja-restaurado',
    'Loft en Ciudad Vieja',
    'Ciudad Vieja',
    'Loft restaurado en estilo colonial con altas ventanas en arco, sobre una calle empedrada del casco histórico.',
    128000, 'USD', 1, 1, 64,
    null,
    array['Renovated', 'Pet friendly'],
    '/images/property-3.png',
    'published', false, 'loft', 720,
    'a0000000-0000-0000-0000-000000000003',
    now() - interval '12 days', now() - interval '6 days'
  ),
  (
    '00000000-0000-0000-0000-000000000108',
    'ph-cordon-terraza-compartida',
    'PH en Cordón',
    'Cordón',
    'PH renovado en una calle arbolada cerca de la zona universitaria, con terraza compartida y vistas a la ciudad.',
    112000, 'USD', 2, 1, 68,
    null,
    array['Renovated'],
    '/images/property-4.png',
    'published', false, 'ph', 640,
    'a0000000-0000-0000-0000-000000000001',
    now() - interval '10 days', now() - interval '10 days'
  ),
  (
    '00000000-0000-0000-0000-000000000109',
    'apartamento-malvin-frente-a-la-playa',
    'Apartamento en Malvín',
    'Malvín',
    'A dos cuadras de la playa de Malvín, con balcón de ancho completo y sol durante toda la mañana.',
    158000, 'USD', 2, 1, 74,
    null,
    array['Balcony'],
    '/images/property-5.png',
    'published', false, 'apartment', 860,
    'a0000000-0000-0000-0000-000000000003',
    now() - interval '8 days', now() - interval '8 days'
  ),
  (
    '00000000-0000-0000-0000-000000000110',
    'apartamento-buceo-con-piscina',
    'Apartamento en Buceo',
    'Buceo',
    'Edificio con portero y piscina, cerca del puerto del Buceo y el nuevo corredor de oficinas tecnológicas.',
    151000, 'USD', 2, 1, 70,
    null,
    array['Pool', 'Doorman', 'Parking'],
    '/images/property-1.png',
    'published', false, 'apartment', 820,
    'a0000000-0000-0000-0000-000000000002',
    now() - interval '6 days', now() - interval '6 days'
  );


-- -----------------------------------------------------------------------------
-- 50 additional listings — gives the Discover deck a real range to filter and
-- sort across (neighborhood, type, price, size, and amenities all vary)
-- instead of just the ~10 hand-authored rows above. Generated deterministically
-- rather than hand-typed, then pasted in as plain literal rows. Photos are
-- hotlinked from Unsplash for visual variety in dev — swap for real listing
-- photos before production.
-- -----------------------------------------------------------------------------

insert into weeggo_properties
  (slug, title, city, description, price, currency, bedrooms, bathrooms, area_m2, tags, cover_image_url, status, property_type, rent_price, featured, agent_id, created_at, updated_at)
values
  ('apartment-in-pocitos-1', 'Apartment in Pocitos', 'Pocitos', 'A bright and well-kept apartment in Pocitos, 4 minutes from the nearest bus route and close to everyday shops.', 127000, 'USD', 2, 1, 53, array['Pet friendly', 'Renovated'], 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=60', 'published', 'apartment', 580, false, 'a0000000-0000-0000-0000-000000000001'::uuid, now() - interval '2 days', now() - interval '2 days'),
  ('loft-in-punta-carretas-2', 'Loft in Punta Carretas', 'Punta Carretas', 'Renovated loft in the heart of Punta Carretas, with good natural light and a functional layout throughout.', 175000, 'USD', 1, 1, 69, array['Pool'], 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=60', 'published', 'loft', 880, false, 'a0000000-0000-0000-0000-000000000002'::uuid, now() - interval '4 days', now() - interval '4 days'),
  ('ph-in-carrasco-3', 'PH in Carrasco', 'Carrasco', 'Quiet PH on a tree-lined street in Carrasco, ideal for a calm day-to-day with easy access to the rambla.', 180000, 'USD', 1, 1, 73, array['Renovated', 'Pet friendly'], 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=60', 'published', 'ph', 970, false, 'a0000000-0000-0000-0000-000000000003'::uuid, now() - interval '6 days', now() - interval '6 days'),
  ('house-in-ciudad-vieja-4', 'House in Ciudad Vieja', 'Ciudad Vieja', 'Well-located house in Ciudad Vieja, walking distance to cafes, groceries, and public transport.', 296000, 'USD', 4, 3, 188, array['Balcony', 'Parking'], 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=60', 'published', 'house', 1720, false, 'a0000000-0000-0000-0000-000000000001'::uuid, now() - interval '8 days', now() - interval '8 days'),
  ('apartment-in-cordon-5', 'Apartment in Cordón', 'Cordón', 'Charming apartment in a classic Cordón building, recently painted with original details preserved.', 143000, 'USD', 3, 2, 85, array['Elevator', 'Doorman'], 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=60', 'published', 'apartment', 600, false, 'a0000000-0000-0000-0000-000000000002'::uuid, now() - interval '10 days', now() - interval '10 days'),
  ('loft-in-malvin-6', 'Loft in Malvín', 'Malvín', 'A bright and well-kept loft in Malvín, 9 minutes from the nearest bus route and close to everyday shops.', 116000, 'USD', 1, 1, 62, array['Doorman', 'Elevator'], 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=60', 'published', 'loft', 530, false, 'a0000000-0000-0000-0000-000000000003'::uuid, now() - interval '12 days', now() - interval '12 days'),
  ('ph-in-buceo-7', 'PH in Buceo', 'Buceo', 'Renovated PH in the heart of Buceo, with good natural light and a functional layout throughout.', 104000, 'USD', 2, 1, 61, array['Parking', 'Balcony'], 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=60', 'published', 'ph', 520, false, 'a0000000-0000-0000-0000-000000000001'::uuid, now() - interval '14 days', now() - interval '14 days'),
  ('house-in-pocitos-8', 'House in Pocitos', 'Pocitos', 'Quiet house on a tree-lined street in Pocitos, ideal for a calm day-to-day with easy access to the rambla.', 496000, 'USD', 5, 4, 236, array['Pet friendly', 'Renovated'], 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=60', 'published', 'house', 2680, false, 'a0000000-0000-0000-0000-000000000002'::uuid, now() - interval '16 days', now() - interval '16 days'),
  ('apartment-in-punta-carretas-9', 'Apartment in Punta Carretas', 'Punta Carretas', 'Well-located apartment in Punta Carretas, walking distance to cafes, groceries, and public transport.', 146000, 'USD', 1, 1, 53, array['Pool'], 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=60', 'published', 'apartment', 850, true, 'a0000000-0000-0000-0000-000000000003'::uuid, now() - interval '18 days', now() - interval '18 days'),
  ('loft-in-carrasco-10', 'Loft in Carrasco', 'Carrasco', 'Charming loft in a classic Carrasco building, recently painted with original details preserved.', 157000, 'USD', 1, 1, 55, array['Renovated', 'Pet friendly'], 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=900&q=60', 'published', 'loft', 660, false, 'a0000000-0000-0000-0000-000000000001'::uuid, now() - interval '20 days', now() - interval '20 days'),
  ('ph-in-ciudad-vieja-11', 'PH in Ciudad Vieja', 'Ciudad Vieja', 'A bright and well-kept PH in Ciudad Vieja, 4 minutes from the nearest bus route and close to everyday shops.', 121000, 'USD', 3, 2, 85, array['Balcony', 'Parking'], 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=900&q=60', 'draft', 'ph', 560, false, 'a0000000-0000-0000-0000-000000000002'::uuid, now() - interval '22 days', now() - interval '22 days'),
  ('house-in-cordon-12', 'House in Cordón', 'Cordón', 'Renovated house in the heart of Cordón, with good natural light and a functional layout throughout.', 241000, 'USD', 3, 2, 164, array['Elevator', 'Doorman'], 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=60', 'published', 'house', 1210, false, 'a0000000-0000-0000-0000-000000000003'::uuid, now() - interval '24 days', now() - interval '24 days'),
  ('apartment-in-malvin-13', 'Apartment in Malvín', 'Malvín', 'Quiet apartment on a tree-lined street in Malvín, ideal for a calm day-to-day with easy access to the rambla.', 173000, 'USD', 2, 1, 85, array['Doorman', 'Elevator'], 'https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?auto=format&fit=crop&w=900&q=60', 'published', 'apartment', 930, false, 'a0000000-0000-0000-0000-000000000001'::uuid, now() - interval '26 days', now() - interval '26 days'),
  ('loft-in-buceo-14', 'Loft in Buceo', 'Buceo', 'Well-located loft in Buceo, walking distance to cafes, groceries, and public transport.', 164000, 'USD', 1, 1, 83, array['Parking', 'Balcony'], 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=900&q=60', 'published', 'loft', 950, false, 'a0000000-0000-0000-0000-000000000002'::uuid, now() - interval '28 days', now() - interval '28 days'),
  ('ph-in-pocitos-15', 'PH in Pocitos', 'Pocitos', 'Charming PH in a classic Pocitos building, recently painted with original details preserved.', 139000, 'USD', 1, 1, 73, array['Pet friendly', 'Renovated'], 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=60', 'published', 'ph', 580, false, 'a0000000-0000-0000-0000-000000000003'::uuid, now() - interval '30 days', now() - interval '30 days'),
  ('house-in-punta-carretas-16', 'House in Punta Carretas', 'Punta Carretas', 'A bright and well-kept house in Punta Carretas, 9 minutes from the nearest bus route and close to everyday shops.', 512000, 'USD', 4, 3, 212, array['Pool'], 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=60', 'published', 'house', 2360, false, 'a0000000-0000-0000-0000-000000000001'::uuid, now() - interval '32 days', now() - interval '32 days'),
  ('apartment-in-carrasco-17', 'Apartment in Carrasco', 'Carrasco', 'Renovated apartment in the heart of Carrasco, with good natural light and a functional layout throughout.', 165000, 'USD', 3, 2, 53, array['Renovated', 'Pet friendly'], 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=60', 'published', 'apartment', 830, false, 'a0000000-0000-0000-0000-000000000002'::uuid, now() - interval '34 days', now() - interval '34 days'),
  ('loft-in-ciudad-vieja-18', 'Loft in Ciudad Vieja', 'Ciudad Vieja', 'Quiet loft on a tree-lined street in Ciudad Vieja, ideal for a calm day-to-day with easy access to the rambla.', 125000, 'USD', 1, 1, 76, array['Balcony', 'Parking'], 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=60', 'published', 'loft', 680, true, 'a0000000-0000-0000-0000-000000000003'::uuid, now() - interval '36 days', now() - interval '36 days'),
  ('ph-in-cordon-19', 'PH in Cordón', 'Cordón', 'Well-located PH in Cordón, walking distance to cafes, groceries, and public transport.', 81000, 'USD', 2, 1, 61, array['Elevator', 'Doorman'], 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=60', 'published', 'ph', 470, false, 'a0000000-0000-0000-0000-000000000001'::uuid, now() - interval '38 days', now() - interval '38 days'),
  ('house-in-malvin-20', 'House in Malvín', 'Malvín', 'Charming house in a classic Malvín building, recently painted with original details preserved.', 250000, 'USD', 5, 4, 140, array['Doorman', 'Elevator'], 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=60', 'published', 'house', 1050, false, 'a0000000-0000-0000-0000-000000000002'::uuid, now() - interval '40 days', now() - interval '40 days'),
  ('apartment-in-buceo-21', 'Apartment in Buceo', 'Buceo', 'A bright and well-kept apartment in Buceo, 4 minutes from the nearest bus route and close to everyday shops.', 184000, 'USD', 1, 1, 85, array['Parking', 'Balcony'], 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=60', 'published', 'apartment', 850, false, 'a0000000-0000-0000-0000-000000000003'::uuid, now() - interval '42 days', now() - interval '42 days'),
  ('loft-in-pocitos-22', 'Loft in Pocitos', 'Pocitos', 'Renovated loft in the heart of Pocitos, with good natural light and a functional layout throughout.', 152000, 'USD', 1, 1, 69, array['Pet friendly', 'Renovated'], 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=60', 'draft', 'loft', 760, false, 'a0000000-0000-0000-0000-000000000001'::uuid, now() - interval '44 days', now() - interval '44 days'),
  ('ph-in-punta-carretas-23', 'PH in Punta Carretas', 'Punta Carretas', 'Quiet PH on a tree-lined street in Punta Carretas, ideal for a calm day-to-day with easy access to the rambla.', 186000, 'USD', 3, 2, 85, array['Pool'], 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=60', 'published', 'ph', 1000, false, 'a0000000-0000-0000-0000-000000000002'::uuid, now() - interval '46 days', now() - interval '46 days'),
  ('house-in-carrasco-24', 'House in Carrasco', 'Carrasco', 'Well-located house in Carrasco, walking distance to cafes, groceries, and public transport.', 513000, 'USD', 3, 2, 188, array['Renovated', 'Pet friendly'], 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=900&q=60', 'published', 'house', 2980, false, 'a0000000-0000-0000-0000-000000000003'::uuid, now() - interval '48 days', now() - interval '48 days'),
  ('apartment-in-ciudad-vieja-25', 'Apartment in Ciudad Vieja', 'Ciudad Vieja', 'Charming apartment in a classic Ciudad Vieja building, recently painted with original details preserved.', 95000, 'USD', 2, 1, 53, array['Balcony', 'Parking'], 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=900&q=60', 'published', 'apartment', 400, false, 'a0000000-0000-0000-0000-000000000001'::uuid, now() - interval '50 days', now() - interval '50 days'),
  ('loft-in-cordon-26', 'Loft in Cordón', 'Cordón', 'A bright and well-kept loft in Cordón, 9 minutes from the nearest bus route and close to everyday shops.', 95000, 'USD', 1, 1, 62, array['Elevator', 'Doorman'], 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=60', 'published', 'loft', 440, false, 'a0000000-0000-0000-0000-000000000002'::uuid, now() - interval '52 days', now() - interval '52 days'),
  ('ph-in-malvin-27', 'PH in Malvín', 'Malvín', 'Renovated PH in the heart of Malvín, with good natural light and a functional layout throughout.', 118000, 'USD', 1, 1, 73, array['Doorman', 'Elevator'], 'https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?auto=format&fit=crop&w=900&q=60', 'published', 'ph', 590, true, 'a0000000-0000-0000-0000-000000000003'::uuid, now() - interval '54 days', now() - interval '54 days'),
  ('house-in-buceo-28', 'House in Buceo', 'Buceo', 'Quiet house on a tree-lined street in Buceo, ideal for a calm day-to-day with easy access to the rambla.', 446000, 'USD', 4, 3, 236, array['Parking', 'Balcony'], 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=900&q=60', 'published', 'house', 2410, false, 'a0000000-0000-0000-0000-000000000001'::uuid, now() - interval '56 days', now() - interval '56 days'),
  ('apartment-in-pocitos-29', 'Apartment in Pocitos', 'Pocitos', 'Well-located apartment in Pocitos, walking distance to cafes, groceries, and public transport.', 204000, 'USD', 3, 2, 85, array['Pet friendly', 'Renovated'], 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=60', 'published', 'apartment', 1180, false, 'a0000000-0000-0000-0000-000000000002'::uuid, now() - interval '58 days', now() - interval '58 days'),
  ('loft-in-punta-carretas-30', 'Loft in Punta Carretas', 'Punta Carretas', 'Charming loft in a classic Punta Carretas building, recently painted with original details preserved.', 139000, 'USD', 1, 1, 55, array['Pool'], 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=60', 'published', 'loft', 580, false, 'a0000000-0000-0000-0000-000000000003'::uuid, now() - interval '60 days', now() - interval '60 days'),
  ('ph-in-carrasco-31', 'PH in Carrasco', 'Carrasco', 'A bright and well-kept PH in Carrasco, 4 minutes from the nearest bus route and close to everyday shops.', 151000, 'USD', 2, 1, 61, array['Renovated', 'Pet friendly'], 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=60', 'published', 'ph', 690, false, 'a0000000-0000-0000-0000-000000000001'::uuid, now() - interval '62 days', now() - interval '62 days'),
  ('house-in-ciudad-vieja-32', 'House in Ciudad Vieja', 'Ciudad Vieja', 'Renovated house in the heart of Ciudad Vieja, with good natural light and a functional layout throughout.', 258000, 'USD', 5, 4, 164, array['Balcony', 'Parking'], 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=60', 'published', 'house', 1290, false, 'a0000000-0000-0000-0000-000000000002'::uuid, now() - interval '64 days', now() - interval '64 days'),
  ('apartment-in-cordon-33', 'Apartment in Cordón', 'Cordón', 'Quiet apartment on a tree-lined street in Cordón, ideal for a calm day-to-day with easy access to the rambla.', 89000, 'USD', 1, 1, 53, array['Elevator', 'Doorman'], 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=60', 'draft', 'apartment', 480, false, 'a0000000-0000-0000-0000-000000000003'::uuid, now() - interval '66 days', now() - interval '66 days'),
  ('loft-in-malvin-34', 'Loft in Malvín', 'Malvín', 'Well-located loft in Malvín, walking distance to cafes, groceries, and public transport.', 155000, 'USD', 1, 1, 83, array['Doorman', 'Elevator'], 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=60', 'published', 'loft', 900, false, 'a0000000-0000-0000-0000-000000000001'::uuid, now() - interval '68 days', now() - interval '68 days'),
  ('ph-in-buceo-35', 'PH in Buceo', 'Buceo', 'Charming PH in a classic Buceo building, recently painted with original details preserved.', 145000, 'USD', 3, 2, 85, array['Parking', 'Balcony'], 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=60', 'published', 'ph', 610, false, 'a0000000-0000-0000-0000-000000000002'::uuid, now() - interval '70 days', now() - interval '70 days'),
  ('house-in-pocitos-36', 'House in Pocitos', 'Pocitos', 'A bright and well-kept house in Pocitos, 9 minutes from the nearest bus route and close to everyday shops.', 445000, 'USD', 3, 2, 212, array['Pet friendly', 'Renovated'], 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=60', 'published', 'house', 2050, true, 'a0000000-0000-0000-0000-000000000003'::uuid, now() - interval '72 days', now() - interval '72 days'),
  ('apartment-in-punta-carretas-37', 'Apartment in Punta Carretas', 'Punta Carretas', 'Renovated apartment in the heart of Punta Carretas, with good natural light and a functional layout throughout.', 235000, 'USD', 2, 1, 85, array['Pool'], 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=60', 'published', 'apartment', 1180, false, 'a0000000-0000-0000-0000-000000000001'::uuid, now() - interval '74 days', now() - interval '74 days'),
  ('loft-in-carrasco-38', 'Loft in Carrasco', 'Carrasco', 'Quiet loft on a tree-lined street in Carrasco, ideal for a calm day-to-day with easy access to the rambla.', 217000, 'USD', 1, 1, 76, array['Renovated', 'Pet friendly'], 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=900&q=60', 'published', 'loft', 1170, false, 'a0000000-0000-0000-0000-000000000002'::uuid, now() - interval '76 days', now() - interval '76 days'),
  ('ph-in-ciudad-vieja-39', 'PH in Ciudad Vieja', 'Ciudad Vieja', 'Well-located PH in Ciudad Vieja, walking distance to cafes, groceries, and public transport.', 104000, 'USD', 1, 1, 73, array['Balcony', 'Parking'], 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=900&q=60', 'published', 'ph', 600, false, 'a0000000-0000-0000-0000-000000000003'::uuid, now() - interval '78 days', now() - interval '78 days'),
  ('house-in-cordon-40', 'House in Cordón', 'Cordón', 'Charming house in a classic Cordón building, recently painted with original details preserved.', 206000, 'USD', 4, 3, 140, array['Elevator', 'Doorman'], 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=60', 'published', 'house', 870, false, 'a0000000-0000-0000-0000-000000000001'::uuid, now() - interval '80 days', now() - interval '80 days'),
  ('apartment-in-malvin-41', 'Apartment in Malvín', 'Malvín', 'A bright and well-kept apartment in Malvín, 4 minutes from the nearest bus route and close to everyday shops.', 108000, 'USD', 3, 2, 53, array['Doorman', 'Elevator'], 'https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?auto=format&fit=crop&w=900&q=60', 'published', 'apartment', 500, false, 'a0000000-0000-0000-0000-000000000002'::uuid, now() - interval '82 days', now() - interval '82 days'),
  ('loft-in-buceo-42', 'Loft in Buceo', 'Buceo', 'Renovated loft in the heart of Buceo, with good natural light and a functional layout throughout.', 137000, 'USD', 1, 1, 69, array['Parking', 'Balcony'], 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=900&q=60', 'published', 'loft', 690, false, 'a0000000-0000-0000-0000-000000000003'::uuid, now() - interval '84 days', now() - interval '84 days'),
  ('ph-in-pocitos-43', 'PH in Pocitos', 'Pocitos', 'Quiet PH on a tree-lined street in Pocitos, ideal for a calm day-to-day with easy access to the rambla.', 116000, 'USD', 2, 1, 61, array['Pet friendly', 'Renovated'], 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=60', 'published', 'ph', 630, false, 'a0000000-0000-0000-0000-000000000001'::uuid, now() - interval '86 days', now() - interval '86 days'),
  ('house-in-punta-carretas-44', 'House in Punta Carretas', 'Punta Carretas', 'Well-located house in Punta Carretas, walking distance to cafes, groceries, and public transport.', 454000, 'USD', 5, 4, 188, array['Pool'], 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=60', 'draft', 'house', 2630, false, 'a0000000-0000-0000-0000-000000000002'::uuid, now() - interval '88 days', now() - interval '88 days'),
  ('apartment-in-carrasco-45', 'Apartment in Carrasco', 'Carrasco', 'Charming apartment in a classic Carrasco building, recently painted with original details preserved.', 265000, 'USD', 1, 1, 85, array['Renovated', 'Pet friendly'], 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=60', 'published', 'apartment', 1110, true, 'a0000000-0000-0000-0000-000000000003'::uuid, now() - interval '90 days', now() - interval '90 days'),
  ('loft-in-ciudad-vieja-46', 'Loft in Ciudad Vieja', 'Ciudad Vieja', 'A bright and well-kept loft in Ciudad Vieja, 9 minutes from the nearest bus route and close to everyday shops.', 102000, 'USD', 1, 1, 62, array['Balcony', 'Parking'], 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=60', 'published', 'loft', 470, false, 'a0000000-0000-0000-0000-000000000001'::uuid, now() - interval '92 days', now() - interval '92 days'),
  ('ph-in-cordon-47', 'PH in Cordón', 'Cordón', 'Renovated PH in the heart of Cordón, with good natural light and a functional layout throughout.', 113000, 'USD', 3, 2, 85, array['Elevator', 'Doorman'], 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=60', 'published', 'ph', 570, false, 'a0000000-0000-0000-0000-000000000002'::uuid, now() - interval '94 days', now() - interval '94 days'),
  ('house-in-malvin-48', 'House in Malvín', 'Malvín', 'Quiet house on a tree-lined street in Malvín, ideal for a calm day-to-day with easy access to the rambla.', 421000, 'USD', 3, 2, 236, array['Doorman', 'Elevator'], 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=60', 'published', 'house', 2270, false, 'a0000000-0000-0000-0000-000000000003'::uuid, now() - interval '96 days', now() - interval '96 days'),
  ('apartment-in-buceo-49', 'Apartment in Buceo', 'Buceo', 'Well-located apartment in Buceo, walking distance to cafes, groceries, and public transport.', 114000, 'USD', 2, 1, 53, array['Parking', 'Balcony'], 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=60', 'published', 'apartment', 660, false, 'a0000000-0000-0000-0000-000000000001'::uuid, now() - interval '98 days', now() - interval '98 days'),
  ('loft-in-pocitos-50', 'Loft in Pocitos', 'Pocitos', 'Charming loft in a classic Pocitos building, recently painted with original details preserved.', 121000, 'USD', 1, 1, 55, array['Pet friendly', 'Renovated'], 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=60', 'published', 'loft', 510, false, 'a0000000-0000-0000-0000-000000000002'::uuid, now() - interval '100 days', now() - interval '100 days');


-- -----------------------------------------------------------------------------
-- Property gallery images (in addition to each property's cover image)
-- -----------------------------------------------------------------------------

insert into weeggo_property_images (property_id, url, alt_text, sort_order)
values
  ('00000000-0000-0000-0000-000000000101', '/images/property-5.png', 'Residencia Frente al Mar — vista adicional', 1),
  ('00000000-0000-0000-0000-000000000101', '/images/property-1.png', 'Residencia Frente al Mar — detalle', 2),
  ('00000000-0000-0000-0000-000000000102', '/images/property-5.png', 'Arquitectura Contemporánea — vista adicional', 1),
  ('00000000-0000-0000-0000-000000000103', '/images/property-5.png', 'Penthouse Exclusivo — vista adicional', 1),
  ('00000000-0000-0000-0000-000000000104', '/images/property-5.png', 'Villa Moderna — vista adicional', 1);


-- -----------------------------------------------------------------------------
-- Leads
-- -----------------------------------------------------------------------------

insert into weeggo_leads
  (id, full_name, email, phone, contact_method, message, source, assessment, status, property_id, assigned_agent_id, created_at)
values
  (
    '00000000-0000-0000-0000-000000000201',
    'Martín Fernández', 'martin.fernandez@example.com', '+598 99 111 222',
    'whatsapp', null, 'wizard',
    '{"buyer_objective":"investment","purchase_stage":"ready","current_country":"north_america","investment_range":"1m","timeline":"90_days"}'::jsonb,
    'new', null, null,
    now() - interval '1 day'
  ),
  (
    '00000000-0000-0000-0000-000000000202',
    'Sofía Ramírez', 'sofia.ramirez@example.com', '+598 99 222 333',
    'email', null, 'wizard',
    '{"buyer_objective":"second_home","purchase_stage":"shortlist","current_country":"europe","investment_range":"3m","timeline":"6_months"}'::jsonb,
    'contacted', null, 'a0000000-0000-0000-0000-000000000002',
    now() - interval '2 days'
  ),
  (
    '00000000-0000-0000-0000-000000000203',
    'Diego Acosta', 'diego.acosta@example.com', '+598 99 333 444',
    'llamada', 'Interesado en propiedades frente al mar en José Ignacio.', 'contact',
    '{}'::jsonb,
    'new', '00000000-0000-0000-0000-000000000101', null,
    now() - interval '3 days'
  ),
  (
    '00000000-0000-0000-0000-000000000204',
    'Camila Suárez', 'camila.suarez@example.com', '+598 99 444 555',
    'whatsapp', null, 'wizard',
    '{"buyer_objective":"relocation","purchase_stage":"planning","current_country":"latin_america","investment_range":"600k","timeline":"flexible"}'::jsonb,
    'closed', null, 'a0000000-0000-0000-0000-000000000001',
    now() - interval '6 days'
  ),
  (
    '00000000-0000-0000-0000-000000000205',
    'Lucas Bianchi', 'lucas.bianchi@example.com', '+598 99 555 666',
    'email', 'Busco penthouse en Punta del Este para 2027.', 'contact',
    '{}'::jsonb,
    'contacted', '00000000-0000-0000-0000-000000000103', 'a0000000-0000-0000-0000-000000000002',
    now() - interval '9 days'
  ),
  (
    '00000000-0000-0000-0000-000000000206',
    'Valentina Castro', 'valentina.castro@example.com', '+598 99 666 777',
    'whatsapp', null, 'wizard',
    '{"buyer_objective":"primary_residence","purchase_stage":"research","current_country":"uruguay","investment_range":"300k","timeline":"30_days"}'::jsonb,
    'new', null, null,
    now() - interval '14 days'
  );


-- -----------------------------------------------------------------------------
-- Email templates
-- -----------------------------------------------------------------------------

insert into weeggo_email_templates (id, name, subject, body, updated_at)
values
  (
    '00000000-0000-0000-0000-000000000301',
    'Notificación de Nuevo Lead',
    'Nuevo contacto recibido en WEEGGO',
    E'Hola equipo,\n\nSe recibió un nuevo contacto a través del sitio. Revisar la sección de Leads para más detalles.\n\n— WEEGGO',
    now() - interval '30 days'
  ),
  (
    '00000000-0000-0000-0000-000000000302',
    'Seguimiento de Comprador',
    'Continuemos con su búsqueda en WEEGGO',
    E'Hola {{fullName}},\n\nGracias por su interés en WEEGGO. Quisiéramos coordinar una llamada para conocer mejor sus preferencias y avanzar con su búsqueda personalizada.\n\nSaludos,\nEquipo WEEGGO',
    now() - interval '12 days'
  ),
  (
    '00000000-0000-0000-0000-000000000303',
    'Bienvenida',
    'Bienvenido a WEEGGO',
    E'Hola {{fullName}},\n\nGracias por completar nuestra evaluación de comprador. En breve un asesor se pondrá en contacto con usted.\n\nSaludos,\nEquipo WEEGGO',
    now() - interval '60 days'
  );


-- -----------------------------------------------------------------------------
-- Email log
-- -----------------------------------------------------------------------------

insert into weeggo_email_log (id, template_id, lead_id, recipient, subject, status, sent_at, created_at)
values
  (
    '00000000-0000-0000-0000-000000000401',
    '00000000-0000-0000-0000-000000000303',
    '00000000-0000-0000-0000-000000000201',
    'martin.fernandez@example.com', 'Bienvenido a WEEGGO', 'sent',
    now() - interval '1 day', now() - interval '1 day'
  ),
  (
    '00000000-0000-0000-0000-000000000402',
    '00000000-0000-0000-0000-000000000303',
    '00000000-0000-0000-0000-000000000202',
    'sofia.ramirez@example.com', 'Bienvenido a WEEGGO', 'sent',
    now() - interval '2 days', now() - interval '2 days'
  ),
  (
    '00000000-0000-0000-0000-000000000403',
    '00000000-0000-0000-0000-000000000302',
    '00000000-0000-0000-0000-000000000205',
    'lucas.bianchi@example.com', 'Continuemos con su búsqueda en WEEGGO', 'sent',
    now() - interval '8 days', now() - interval '8 days'
  ),
  (
    '00000000-0000-0000-0000-000000000404',
    '00000000-0000-0000-0000-000000000301',
    null,
    'isabela@weeggo.app', 'Nuevo contacto recibido en WEEGGO', 'failed',
    now() - interval '9 days', now() - interval '9 days'
  ),
  (
    '00000000-0000-0000-0000-000000000405',
    '00000000-0000-0000-0000-000000000302',
    '00000000-0000-0000-0000-000000000204',
    'camila.suarez@example.com', 'Continuemos con su búsqueda en WEEGGO', 'queued',
    null, now()
  );


-- -----------------------------------------------------------------------------
-- Settings
-- The schema migration already inserts the singleton settings row (id = 1)
-- with these same default values, so there is nothing to seed here.
-- -----------------------------------------------------------------------------
