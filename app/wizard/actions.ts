"use server";

import { supabasePublic } from "@/lib/supabase/public";
import type { ContactInformation } from "./types";
import type { SellerPropertyDetails } from "./lib/seller-answers-to-lead";

export async function submitSellerLead(
  contact: ContactInformation,
  property: SellerPropertyDetails
): Promise<{ ok: true } | { ok: false; error: string }> {
  const { error } = await supabasePublic.from("weeggo_leads").insert({
    full_name: contact.fullName,
    email: contact.email,
    phone: contact.phone,
    contact_method: contact.contactMethod.toLowerCase(),
    message: contact.message || null,
    source: "sell",
    assessment: { property },
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true };
}
