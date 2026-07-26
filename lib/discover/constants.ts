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

export const PROPERTY_TYPES: { value: PropertyType; label: string }[] = [
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "ph", label: "PH" },
  { value: "loft", label: "Loft" },
];

export const AMENITIES = ["Parking", "Balcony", "Pet friendly", "Elevator", "Pool", "Doorman", "Renovated"];

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
