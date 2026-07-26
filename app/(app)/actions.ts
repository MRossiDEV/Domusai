"use server";

import { supabasePublic } from "@/lib/supabase/public";
import type { ContactInformation } from "@/app/wizard/types";
import type { Filters } from "@/lib/discover/types";

export async function requestViewing(
  propertyId: string,
  contact: ContactInformation,
  filters: Filters
): Promise<{ ok: true } | { ok: false; error: string }> {
  const { error } = await supabasePublic.from("weeggo_leads").insert({
    full_name: contact.fullName,
    email: contact.email,
    phone: contact.phone,
    contact_method: contact.contactMethod.toLowerCase(),
    message: contact.message || null,
    source: "contact",
    property_id: propertyId,
    assessment: { filters },
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true };
}
