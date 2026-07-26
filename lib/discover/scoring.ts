import type { Filters, Listing, Mode } from "./types";
import { LIFESTYLES } from "./constants";
import type { TranslationKey } from "@/lib/i18n/useTranslation";

type T = (key: TranslationKey, vars?: Record<string, string | number>) => string;

/** A listing up to 8% over budget still shows, scored lower — instead of a hard cliff at the cap. */
const BUDGET_GRACE = 0.08;

/** Gross annual rent / sale price, as a percentage. Null if there's no rent figure. */
export function yieldPct(listing: Listing): number | null {
  if (listing.rentPrice === null || listing.price <= 0) return null;
  return Math.round(((listing.rentPrice * 12) / listing.price) * 1000) / 10;
}

export function fmtUSD(n: number): string {
  return "$" + n.toLocaleString("en-US");
}

export function priceFor(listing: Listing, mode: Mode, t: T): string {
  if (mode === "rent") {
    return listing.rentPrice !== null ? `${fmtUSD(listing.rentPrice)}${t("discover.perMonth")}` : t("discover.rentOnRequest");
  }
  return fmtUSD(listing.price);
}

/** The price figure that matters for the active mode — rent for Rent, sale price otherwise. */
function relevantPrice(listing: Listing, mode: Mode): number | null {
  return mode === "rent" ? listing.rentPrice : listing.price;
}

/**
 * A 45-99 heuristic "match" score against the visitor's active filters.
 *
 * This isn't a hard pass/fail gate (that's passesFilters) — it's meant to
 * rank a deck that's already been filtered, so near-misses (a touch over
 * budget, a neighborhood adjacent to what they picked) still show up lower
 * rather than vanishing, and an empty filter set still produces a sensible
 * baseline ranking instead of a flat 66 for everything.
 */
export function matchScore(listing: Listing, filters: Filters, mode: Mode): number {
  let score = 58;

  // Location — explicit neighborhood picks are the strongest signal. With
  // none set, fall back to lifestyle priorities (soft) so a visitor who
  // doesn't know Montevideo's geography still gets steered somewhere
  // sensible instead of getting no location signal at all. The final
  // fallback still leans on the listing's own featured flag rather than a
  // flat constant, so an unfiltered deck doesn't score every listing
  // identically regardless of which one it actually is.
  if (filters.hoods.length > 0) {
    score += filters.hoods.includes(listing.city) ? 16 : -14;
  } else if (filters.lifestyles.length > 0) {
    const impliedHoods = new Set(
      LIFESTYLES.filter((l) => filters.lifestyles.includes(l.value)).flatMap((l) => l.hoods)
    );
    score += impliedHoods.has(listing.city) ? 10 : -3;
  } else {
    score += listing.featured ? 8 : 5;
  }

  // Budget — reward headroom under the cap on a curve, penalize
  // proportionally the further into the over-budget grace window a listing
  // sits (passesFilters already drops anything beyond that window).
  if (filters.budgetMax) {
    const price = relevantPrice(listing, mode);
    if (price !== null) {
      const ratio = price / filters.budgetMax;
      if (ratio <= 1) {
        score += Math.round(10 * (1 - ratio) + 4);
      } else {
        const overshoot = Math.min(ratio - 1, BUDGET_GRACE) / BUDGET_GRACE;
        score -= Math.round(overshoot * 22);
      }
    }
  } else {
    score += 4;
  }

  // Amenities — a soft bonus here regardless of amenitiesRequired; when that
  // flag is on, passesFilters has already hard-excluded non-matches before
  // a listing ever reaches this function. With no amenities picked, fall
  // back to the listing's own feature count (real, listing-specific) instead
  // of a flat constant, for the same reason as the location fallback above.
  if (filters.amenities.length > 0) {
    const overlap = listing.tags.filter((tag) => filters.amenities.includes(tag)).length;
    score += Math.round((overlap / filters.amenities.length) * 14);
  } else {
    score += Math.min(6, Math.round(listing.tags.length * 1.5));
  }

  // Parking as a soft "preferred, not a dealbreaker" signal — the hard
  // "imprescindible" case is enforced separately in passesFilters via
  // filters.parkingRequired, never reaching this bonus at all (every listing
  // that gets here already has parking in that case).
  if (!filters.parkingRequired && filters.parkingPreferred) {
    score += listing.tags.includes("Parking") ? 6 : -2;
  }

  if (filters.propertyTypes.length > 0) {
    score += filters.propertyTypes.includes(listing.propertyType) ? 6 : -4;
  }

  if (listing.bedrooms >= (filters.minBeds || 0)) score += 3;
  if (listing.bathrooms >= (filters.minBaths || 0)) score += 2;

  if (mode === "invest" && filters.targetYield) {
    const y = yieldPct(listing);
    if (y !== null) {
      score += Math.max(-8, Math.min(8, Math.round((y - filters.targetYield) * 2)));
    }
  }

  return Math.max(45, Math.min(99, Math.round(score)));
}

export function passesFilters(
  listing: Listing,
  filters: Filters,
  mode: Mode,
  excludeIds: string[]
): boolean {
  if (excludeIds.includes(listing.id)) return false;

  // Rent mode can't show a listing with no rent estimate.
  if (mode === "rent" && listing.rentPrice === null) return false;

  if (filters.hoods.length > 0 && !filters.hoods.includes(listing.city)) return false;
  if (filters.propertyTypes.length > 0 && !filters.propertyTypes.includes(listing.propertyType)) return false;
  if (filters.minBeds && listing.bedrooms < filters.minBeds) return false;
  if (filters.minBaths && listing.bathrooms < filters.minBaths) return false;

  if (filters.amenitiesRequired && filters.amenities.length > 0) {
    const hasAll = filters.amenities.every((amenity) => listing.tags.includes(amenity));
    if (!hasAll) return false;
  }

  if (filters.parkingRequired && !listing.tags.includes("Parking")) return false;

  if (filters.budgetMax) {
    const price = relevantPrice(listing, mode);
    if (price !== null && price > filters.budgetMax * (1 + BUDGET_GRACE)) return false;
  }

  if (mode === "invest" && filters.targetYield) {
    const y = yieldPct(listing);
    if (y === null || y < filters.targetYield) return false;
  }

  return true;
}

export function sortByMatch(listings: Listing[], filters: Filters, mode: Mode): Listing[] {
  return [...listings].sort((a, b) => matchScore(b, filters, mode) - matchScore(a, filters, mode));
}

export function propertyTypeLabel(type: Listing["propertyType"], t: T): string {
  switch (type) {
    case "apartment":
      return t("discover.typeApartment");
    case "house":
      return t("discover.typeHouse");
    case "ph":
      return t("discover.typePh");
    case "loft":
      return t("discover.typeLoft");
    default:
      return type;
  }
}
