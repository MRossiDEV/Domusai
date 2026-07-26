import type { FlowStep, WizardConfig } from "@/app/wizard/types";
import { LIFESTYLES, PROPERTY_TYPES } from "./constants";
import type { AvailableFacets } from "./facets";

/**
 * Drives the in-app "Filters" overlay (Discover's ⚙ pill, Profile's "Edit
 * filters", the empty-deck CTA). Built on the same useWizard engine as the
 * standalone /wizard buyer-assessment flow, but this one only ever writes to
 * client-side filter state — nothing here is submitted to the server.
 *
 * Takes the currently-available facets (see lib/discover/facets.ts) instead
 * of a fixed list, so a step is only offered — and a chip within it only
 * shown — when at least one published listing can actually satisfy it. A
 * facet with zero options (e.g. no lofts published right now) drops its
 * whole step rather than showing an empty, dead-end screen.
 */
export function buildFiltersWizardConfig(facets: AvailableFacets): WizardConfig {
  const steps: FlowStep[] = [
    {
      id: "intent",
      type: "question",
      category: "profile",
      questionType: "single",
      title: "What brings you to WEEGGO?",
      required: true,
      options: [
        { value: "buy", label: "Buy", description: "Find a place to purchase" },
        { value: "rent", label: "Rent", description: "Find a place to move into" },
        { value: "invest", label: "Invest", description: "Find rental yield" },
      ],
    },
    {
      id: "priorities",
      type: "question",
      category: "lifestyle",
      questionType: "multiple",
      title: "What matters most to you?",
      required: false,
      options: LIFESTYLES.map((l) => ({ value: l.value, label: l.label })),
    },
  ];

  if (facets.neighborhoods.length > 0) {
    steps.push({
      id: "hoods",
      type: "question",
      category: "location",
      questionType: "multiple",
      title: "Any particular neighborhoods?",
      required: false,
      options: facets.neighborhoods.map((hood) => ({ value: hood, label: hood })),
    });
  }

  steps.push({
    id: "budget",
    type: "question",
    category: "financial",
    questionType: "range",
    title: "What's your budget?",
    required: false,
  });

  steps.push({
    id: "yield",
    type: "question",
    category: "financial",
    questionType: "range",
    title: "Minimum gross yield",
    required: false,
    condition: { questionId: "intent", operator: "equals", value: "invest" },
  });

  if (facets.propertyTypes.length > 0) {
    steps.push({
      id: "propertyType",
      type: "question",
      category: "property",
      questionType: "multiple",
      title: "Property type & size",
      required: false,
      options: PROPERTY_TYPES.filter((t) => facets.propertyTypes.includes(t.value)),
    });
  }

  if (facets.amenities.length > 0) {
    steps.push({
      id: "amenities",
      type: "question",
      category: "lifestyle",
      questionType: "multiple",
      title: "Amenities you'd like",
      required: false,
      options: facets.amenities.map((amenity) => ({ value: amenity, label: amenity })),
    });
  }

  steps.push({
    id: "done",
    type: "completion",
    title: "You're all set",
    subtitle: "Your deck is ready.",
  });

  return {
    id: "discover-filters",
    title: "Filters",
    settings: {
      showProgress: true,
      allowBack: true,
      saveProgress: false,
      autoSave: false,
      showStepCounter: false,
    },
    steps,
  };
}
