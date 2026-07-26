import type { ContactInformation, WizardAnswer } from "../types";

/** Property details gathered by sellerOnboarding.ts — stored in weeggo_leads.assessment for a staff agent to review, not fed into any Discover filter. */
export interface SellerPropertyDetails {
  propertyType?: string;
  location?: string;
  bedrooms?: string;
  bathrooms?: string;
  areaM2?: number;
  askingPriceUsd?: number;
  amenities: string[];
  notes?: string;
}

function stringValue(answers: Record<string, WizardAnswer>, id: string): string | undefined {
  const value = answers[id]?.value;
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function numberValue(answers: Record<string, WizardAnswer>, id: string): number | undefined {
  const value = answers[id]?.value;
  return typeof value === "number" ? value : undefined;
}

function multiValue(answers: Record<string, WizardAnswer>, id: string): string[] {
  const value = answers[id]?.value;
  return Array.isArray(value) ? value : [];
}

/** Translates sellerOnboarding.ts answers into a contact + property-details pair ready for submitSellerLead. */
export function mapSellerAnswersToLead(
  answers: Record<string, WizardAnswer>
): { contact: ContactInformation; property: SellerPropertyDetails } {
  return {
    contact: {
      fullName: stringValue(answers, "full_name") ?? "",
      email: stringValue(answers, "email") ?? "",
      phone: stringValue(answers, "phone") ?? "",
      contactMethod:
        (stringValue(answers, "contact_method") as ContactInformation["contactMethod"] | undefined) ?? "WhatsApp",
    },
    property: {
      propertyType: stringValue(answers, "property_type"),
      location: stringValue(answers, "property_location"),
      bedrooms: stringValue(answers, "bedrooms"),
      bathrooms: stringValue(answers, "bathrooms"),
      areaM2: numberValue(answers, "area_m2"),
      askingPriceUsd: numberValue(answers, "asking_price"),
      amenities: multiValue(answers, "amenities"),
      notes: stringValue(answers, "property_notes"),
    },
  };
}
