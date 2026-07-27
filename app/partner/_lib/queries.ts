import { propertiesStore } from "@/app/admin/_lib/store";
import type { Property } from "@/app/admin/_lib/types";
import { getCurrentPartner } from "./session";

export async function getMyPartnerProperties(): Promise<Property[]> {
  const result = await getCurrentPartner();
  if (result.status !== "ok") return [];

  return propertiesStore.listByPartner(result.partner.id);
}
