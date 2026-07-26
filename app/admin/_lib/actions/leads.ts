"use server";

import { revalidatePath } from "next/cache";

import { leadsStore } from "@/app/admin/_lib/store";
import type { LeadStatus } from "@/app/admin/_lib/types";

export async function updateLeadStatusAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as LeadStatus;
  if (!id || !status) return;

  await leadsStore.updateStatus(id, status);
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}

export async function assignLeadAgentAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const agentId = String(formData.get("agentId") ?? "");
  if (!id) return;

  await leadsStore.assignAgent(id, agentId || null);
  revalidatePath("/admin/leads");
  revalidatePath("/admin/agents");
}
