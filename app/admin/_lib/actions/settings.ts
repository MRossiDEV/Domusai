"use server";

import { revalidatePath } from "next/cache";

import { settingsStore } from "@/app/admin/_lib/store";

export interface SettingsFormState {
  error?: string;
  success?: boolean;
}

export async function updateSettingsAction(
  _prevState: SettingsFormState,
  formData: FormData
): Promise<SettingsFormState> {
  const contactEmail = String(formData.get("contactEmail") ?? "").trim();
  const whatsappNumber = String(formData.get("whatsappNumber") ?? "").trim();
  const instagramUrl = String(formData.get("instagramUrl") ?? "").trim();
  const facebookUrl = String(formData.get("facebookUrl") ?? "").trim();
  const defaultSeoDescription = String(formData.get("defaultSeoDescription") ?? "").trim();

  if (!contactEmail || !whatsappNumber) {
    return { error: "Completá email de contacto y WhatsApp." };
  }

  await settingsStore.update({
    contactEmail,
    whatsappNumber,
    instagramUrl,
    facebookUrl,
    defaultSeoDescription,
  });

  revalidatePath("/admin/settings");
  return { success: true };
}
