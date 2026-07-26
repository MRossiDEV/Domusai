import type { PropertyType } from "@/app/admin/_lib/types";
import type { Listing } from "./types";
import { AMENITIES, NEIGHBORHOODS, PROPERTY_TYPES } from "./constants";

export interface AvailableFacets {
  neighborhoods: string[];
  propertyTypes: PropertyType[];
  amenities: string[];
}

/**
 * What's actually filterable right now — the intersection of the platform's
 * canonical vocabulary (this module's NEIGHBORHOODS/PROPERTY_TYPES/AMENITIES)
 * and what at least one published listing actually has.
 *
 * Two failure modes this avoids:
 * - Offering a filter chip nothing matches (a hardcoded "Loft" chip when
 *   zero lofts are published dead-ends the deck the moment it's tapped).
 * - Flooding the filter UI with one-off marketing tags scraped straight from
 *   the `tags` column (e.g. legacy listings tagged "Frente al mar" or
 *   "Arquitectura de autor") that were never meant to be structured filters.
 *
 * Neighborhoods not in the canonical list (e.g. a one-off luxury listing in
 * "José Ignacio") still show up in the unfiltered deck — they just don't get
 * their own filter chip, same as non-canonical tags.
 */
export function getAvailableFacets(listings: Listing[]): AvailableFacets {
  const cities = new Set(listings.map((l) => l.city));
  const types = new Set(listings.map((l) => l.propertyType));
  const tags = new Set(listings.flatMap((l) => l.tags));

  return {
    neighborhoods: NEIGHBORHOODS.filter((hood) => cities.has(hood)),
    propertyTypes: PROPERTY_TYPES.map((t) => t.value).filter((type) => types.has(type)),
    amenities: AMENITIES.filter((amenity) => tags.has(amenity)),
  };
}
