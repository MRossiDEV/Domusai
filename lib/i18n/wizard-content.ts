import type { Locale } from "@/lib/discover/filters-context";
import type { FlowStep, QuestionStep, WizardConfig } from "@/app/wizard/types";

export interface WizardQuestionTranslation {
  title?: string;
  subtitle?: string;
  description?: string;
  cta?: string;
  placeholder?: string;
  /** option value -> English label. Proper nouns (neighborhood names) are omitted — same in both languages. */
  options?: Record<string, string>;
}

type WizardTranslations = Record<string, WizardQuestionTranslation>;

// buyerAssessment.ts (/wizard) — es is the source config; this only needs entries for steps/options that actually differ in English.
const buyerAssessmentEn: WizardTranslations = {
  welcome: {
    title: "Search assistant",
    subtitle: "Find your next place in Uruguay",
    description:
      "Please answer a few quick questions so we understand what you're looking for and put together a selection tailored to you.",
    cta: "Start",
  },
  intent: {
    title: "What are you looking for?",
    options: {
      buy: "I want to buy",
      rent: "I'm looking to rent",
      invest: "I'm thinking of investing",
      sell: "I want to sell",
    },
  },
  lifestyle: {
    title: "What kind of lifestyle do you want?",
    options: {
      beach: "Near the beach",
      walkable: "Walkable neighborhood, everything close by",
      quiet: "Quiet and residential",
      family: "Family-friendly",
      central: "Central and well-connected",
    },
  },
  preferred_locations: {
    title: "Which areas are you interested in?",
  },
  property_type: {
    title: "What type of property are you interested in?",
    options: { apartment: "Apartment", house: "House", ph: "PH", loft: "Loft" },
  },
  bedrooms: {
    title: "How many bedrooms do you need?",
    options: {
      "0": "No preference",
      "1": "1 or more",
      "2": "2 or more",
      "3": "3 or more",
      "4": "4 or more",
    },
  },
  budget_purchase: {
    title: "What's your budget?",
    options: {
      "300k": "Up to USD 300,000",
      "600k": "USD 300,000 - 600,000",
      "1m": "USD 600,000 - 1,000,000",
      "3m": "USD 1,000,000 - 3,000,000",
      "3m_plus": "More than USD 3,000,000",
    },
  },
  budget_rent: {
    title: "What's your monthly budget?",
    options: {
      "800": "Up to USD 800",
      "1500": "USD 800 - 1,500",
      "2500": "USD 1,500 - 2,500",
      "4000": "USD 2,500 - 4,000",
      "8000": "More than USD 4,000",
    },
  },
  target_yield: {
    title: "What's the minimum yield you're after?",
    options: {
      "0": "No minimum in mind",
      "3": "3% or more",
      "5": "5% or more",
      "7": "7% or more",
    },
  },
  amenities: {
    title: "What amenities would you like?",
    options: {
      Parking: "Parking",
      Balcony: "Balcony",
      "Pet friendly": "Pet friendly",
      Elevator: "Elevator",
      Pool: "Pool",
      Doorman: "Doorman",
      Renovated: "Renovated",
    },
  },
  parking: {
    title: "Do you need parking?",
    options: {
      yes: "Yes, it's essential",
      preferred: "I'd prefer it, but it's not a dealbreaker",
      no: "I don't need it",
    },
  },
  summary: { title: "Search summary" },
  processing: { title: "Preparing your selection" },
  completion: { title: "All set" },
};

// sellerOnboarding.ts (/wizard/sell)
const sellerOnboardingEn: WizardTranslations = {
  welcome: {
    title: "Let's sell your property",
    subtitle: "Tell us the details and an agent will reach out",
    description:
      "Great {{NAME}}! To sell, I'll need to ask a few quick questions about the property and your contact details.",
    cta: "Start",
  },
  property_type: {
    title: "What type of property is it?",
    options: { apartment: "Apartment", house: "House", ph: "PH", loft: "Loft" },
  },
  property_location: {
    title: "Which area is it in?",
    options: { Otra: "Other area" },
  },
  bedrooms: {
    title: "How many bedrooms does it have?",
    options: { "0": "Studio", "1": "1", "2": "2", "3": "3", "4": "4 or more" },
  },
  bathrooms: {
    title: "How many bathrooms does it have?",
    options: { "1": "1", "2": "2", "3": "3 or more" },
  },
  area_m2: {
    title: "How many m² is the property?",
    placeholder: "Area in m²",
  },
  asking_price: {
    title: "How much are you hoping to get for the property?",
    subtitle: "In US dollars (USD). If you're not sure, give us an estimate.",
    placeholder: "Estimated price in USD",
  },
  amenities: {
    title: "What features does it have?",
    options: {
      Parking: "Parking",
      Balcony: "Balcony",
      "Pet friendly": "Pet friendly",
      Elevator: "Elevator",
      Pool: "Pool",
      Doorman: "Doorman",
      Renovated: "Renovated",
    },
  },
  property_notes: {
    title: "Tell us more about the property",
    placeholder: "Condition, age, anything that makes it special...",
  },
  full_name: {
    title: "What's your full name?",
    placeholder: "First and last name",
  },
  email: {
    title: "What's your email?",
    placeholder: "you@email.com",
  },
  phone: {
    title: "What's your phone number?",
    placeholder: "+598 99 123 456",
  },
  contact_method: {
    title: "How would you prefer we contact you?",
    options: { WhatsApp: "WhatsApp", Email: "Email", Llamada: "Phone call" },
  },
  summary: { title: "Summary" },
  processing: { title: "Sending your details" },
  completion: { title: "All set" },
};

const wizardTranslations: Record<string, WizardTranslations> = {
  "buyer-assessment": buyerAssessmentEn,
  "seller-onboarding": sellerOnboardingEn,
};

/** Returns a shallow-localized copy of a step — same object back for "es" or when no English override exists for a given field. */
export function localizeStep<T extends FlowStep>(step: T, configId: string, locale: Locale): T {
  if (locale === "es") return step;

  const entry = wizardTranslations[configId]?.[step.id];
  if (!entry) return step;

  const localized: FlowStep = {
    ...step,
    title: entry.title ?? step.title,
    subtitle: entry.subtitle ?? step.subtitle,
    description: entry.description ?? step.description,
  };

  if (step.type === "intro" && entry.cta) {
    (localized as typeof step & { cta?: string }).cta = entry.cta;
  }

  if (step.type === "question") {
    const question = step as QuestionStep;
    (localized as QuestionStep).placeholder = entry.placeholder ?? question.placeholder;
    if (entry.options && question.options) {
      (localized as QuestionStep).options = question.options.map((option) => ({
        ...option,
        label: entry.options?.[option.value] ?? option.label,
      }));
    }
  }

  return localized as T;
}

/** Localizes every step in a config at once — used to build a full translated question list for history/summary rendering. */
export function localizeConfig(config: WizardConfig, locale: Locale): WizardConfig {
  if (locale === "es") return config;
  return { ...config, steps: config.steps.map((step) => localizeStep(step, config.id, locale)) };
}
