import type { Filters, Listing, Mode } from "./types";
import { passesFilters, sortByMatch } from "./scoring";

export interface DeckResult {
  deck: Listing[];
  /** How many constraints had to be relaxed to get a non-empty result. 0 = exact match on everything picked. */
  relaxedLevel: number;
}

/**
 * Least-important-first order for dropping constraints when the exact
 * combination a visitor picked matches nothing. Each step is cumulative
 * (built on top of the previous one's relaxations).
 */
const RELAXATION_STEPS: ((f: Filters) => Filters)[] = [
  (f) => f,
  (f) => ({ ...f, amenitiesRequired: false }),
  (f) => ({ ...f, amenitiesRequired: false, amenities: [] }),
  (f) => ({ ...f, amenitiesRequired: false, amenities: [], parkingRequired: false }),
  (f) => ({ ...f, amenitiesRequired: false, amenities: [], parkingRequired: false, minBaths: 0 }),
  (f) => ({ ...f, amenitiesRequired: false, amenities: [], parkingRequired: false, minBaths: 0, minBeds: 0 }),
  (f) => ({
    ...f,
    amenitiesRequired: false,
    amenities: [],
    parkingRequired: false,
    minBaths: 0,
    minBeds: 0,
    propertyTypes: [],
  }),
  (f) => ({
    ...f,
    amenitiesRequired: false,
    amenities: [],
    parkingRequired: false,
    minBaths: 0,
    minBeds: 0,
    propertyTypes: [],
    targetYield: 0,
  }),
  (f) => ({
    ...f,
    amenitiesRequired: false,
    amenities: [],
    parkingRequired: false,
    minBaths: 0,
    minBeds: 0,
    propertyTypes: [],
    targetYield: 0,
    budgetMax: null,
  }),
  (f) => ({
    ...f,
    amenitiesRequired: false,
    amenities: [],
    parkingRequired: false,
    minBaths: 0,
    minBeds: 0,
    propertyTypes: [],
    targetYield: 0,
    budgetMax: null,
    hoods: [],
  }),
];

/**
 * Filters the catalog into a deck, progressively relaxing constraints
 * (amenities → baths → beds → property type → yield → budget → neighborhood,
 * in that order) if the visitor's exact combination matches nothing —
 * instead of a hard dead-end. A ~60-listing catalog split across 7
 * neighborhoods × 4 types means plenty of *specific* combinations (e.g.
 * "House in Ciudad Vieja") legitimately have zero matches even though each
 * criterion individually does; this is the fix for that, not the facets
 * (which only guarantee each individual filter chip has *some* match).
 *
 * Ranking still uses the visitor's original (unrelaxed) filters, so within
 * a relaxed result the closest fits — fewest violated preferences — sort
 * first rather than every relaxed listing looking equally arbitrary.
 */
export function buildDeck(
  listings: Listing[],
  filters: Filters,
  mode: Mode,
  excludeIds: string[]
): DeckResult {
  for (let level = 0; level < RELAXATION_STEPS.length; level++) {
    const relaxed = RELAXATION_STEPS[level](filters);
    const filtered = listings.filter((listing) => passesFilters(listing, relaxed, mode, excludeIds));
    if (filtered.length > 0 || level === RELAXATION_STEPS.length - 1) {
      return { deck: sortByMatch(filtered, filters, mode), relaxedLevel: level };
    }
  }

  return { deck: [], relaxedLevel: RELAXATION_STEPS.length - 1 };
}
