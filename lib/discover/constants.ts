import type { PropertyType } from "@/app/admin/_lib/types";

export const NEIGHBORHOODS = [
  "Pocitos",
  "Punta Carretas",
  "Carrasco",
  "Ciudad Vieja",
  "Cordón",
  "Malvín",
  "Buceo",
] as const;

/** Uruguay's 19 departments — used for the admin property form's "Departamento" field. */
export const DEPARTMENTS = [
  "Artigas",
  "Canelones",
  "Cerro Largo",
  "Colonia",
  "Durazno",
  "Flores",
  "Florida",
  "Lavalleja",
  "Maldonado",
  "Montevideo",
  "Paysandú",
  "Río Negro",
  "Rivera",
  "Rocha",
  "Salto",
  "San José",
  "Soriano",
  "Tacuarembó",
  "Treinta y Tres",
] as const;

/**
 * Cities/localities — one tier above department, distinct from NEIGHBORHOODS
 * (which are all within Montevideo the city). Used for the admin property
 * form's "Ciudad" field. Not exhaustive — trimmed to the localities actually
 * relevant to WEEGGO's target market; add more as listings expand elsewhere.
 */
export const CITIES = [
  "Montevideo",
  "Ciudad de la Costa",
  "Atlántida",
  "Punta del Este",
  "Maldonado",
  "La Barra",
  "Manantiales",
  "José Ignacio",
  "Piriápolis",
  "Colonia del Sacramento",
  "Carmelo",
  "Canelones",
  "Salto",
  "Paysandú",
  "Rivera",
  "Tacuarembó",
  "Melo",
  "Rocha",
  "La Paloma",
  "Mercedes",
  "Fray Bentos",
  "Trinidad",
  "Durazno",
  "Florida",
  "Minas",
  "San José de Mayo",
  "Artigas",
  "Treinta y Tres",
  "Chuy",
] as const;

export const PROPERTY_TYPES: { value: PropertyType; label: string }[] = [
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "ph", label: "PH" },
  { value: "loft", label: "Loft" },
];

export const AMENITIES = ["Parking", "Balcony", "Pet friendly", "Elevator", "Pool", "Doorman", "Renovated"];

/** Marketing labels for the admin property form's "Badges" field — display only, not a filter dimension. */
export const BADGES = [
  "Nuevo",
  "Exclusiva",
  "Oportunidad",
  "Precio rebajado",
  "A estrenar",
  "Con vista",
  "Reservado",
  "Últimas unidades",
] as const;

export const BUDGET_MAX_BUY = 650_000;
export const BUDGET_MAX_RENT = 3_000;

/**
 * Lifestyle priorities → which neighborhoods fit them. Lets a visitor who
 * doesn't know Montevideo's geography still get a curated deck ("near the
 * beach", not "Pocitos or Carrasco or Malvín or Buceo") — matchScore uses
 * this as a soft signal when no explicit neighborhood filter is set.
 */
export const LIFESTYLES: { value: string; label: string; hoods: string[] }[] = [
  { value: "beach", label: "Near the beach", hoods: ["Pocitos", "Carrasco", "Malvín", "Buceo"] },
  { value: "walkable", label: "Walkable & lively", hoods: ["Pocitos", "Punta Carretas", "Ciudad Vieja", "Cordón"] },
  { value: "quiet", label: "Quiet & residential", hoods: ["Carrasco", "Malvín", "Buceo"] },
  { value: "family", label: "Family-friendly", hoods: ["Carrasco", "Punta Carretas", "Malvín"] },
  { value: "central", label: "Central & well-connected", hoods: ["Pocitos", "Ciudad Vieja", "Cordón", "Buceo"] },
];
