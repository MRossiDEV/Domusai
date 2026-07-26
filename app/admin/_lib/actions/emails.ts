"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { emailTemplatesStore } from "@/app/admin/_lib/store";

export interface EmailTemplateFormState {
  error?: string;
}

function parseTemplateForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();

  if (!name || !subject || !body) {
    return { error: "Completá nombre, asunto y contenido." } as const;
  }

  return { data: { name, subject, body } } as const;
}

export async function createTemplateAction(
  _prevState: EmailTemplateFormState,
  formData: FormData
): Promise<EmailTemplateFormState> {
  const parsed = parseTemplateForm(formData);
  if ("error" in parsed) return { error: parsed.error };

  await emailTemplatesStore.create(parsed.data);
  revalidatePath("/admin/emails");
  redirect("/admin/emails");
}

export async function updateTemplateAction(
  id: string,
  _prevState: EmailTemplateFormState,
  formData: FormData
): Promise<EmailTemplateFormState> {
  const parsed = parseTemplateForm(formData);
  if ("error" in parsed) return { error: parsed.error };

  const updated = await emailTemplatesStore.update(id, parsed.data);
  if (!updated) return { error: "No se encontró la plantilla." };

  revalidatePath("/admin/emails");
  redirect("/admin/emails");
}

export async function deleteTemplateAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (id) await emailTemplatesStore.remove(id);
  revalidatePath("/admin/emails");
}
