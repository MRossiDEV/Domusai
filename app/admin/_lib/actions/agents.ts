"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { agentsStore } from "@/app/admin/_lib/store";
import type { AgentRole } from "@/app/admin/_lib/types";
import { sendAccountInviteEmail } from "@/lib/email/invite-email";

export interface AgentFormState {
  error?: string;
}

function parseAgentForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const role = String(formData.get("role") ?? "agent") as AgentRole;
  const active = formData.get("active") === "on";

  if (!name || !email) {
    return { error: "Completá nombre y email." } as const;
  }

  return { data: { name, email, phone, role, active } } as const;
}

export async function createAgentAction(
  _prevState: AgentFormState,
  formData: FormData
): Promise<AgentFormState> {
  const parsed = parseAgentForm(formData);
  if ("error" in parsed) return { error: parsed.error };

  const agent = await agentsStore.create(parsed.data);
  await sendAccountInviteEmail("agent", agent.id, agent.name, agent.email);
  revalidatePath("/admin/agents");
  revalidatePath("/admin");
  redirect("/admin/agents");
}

export async function updateAgentAction(
  id: string,
  _prevState: AgentFormState,
  formData: FormData
): Promise<AgentFormState> {
  const parsed = parseAgentForm(formData);
  if ("error" in parsed) return { error: parsed.error };

  const updated = await agentsStore.update(id, parsed.data);
  if (!updated) return { error: "No se encontró el agente." };

  revalidatePath("/admin/agents");
  redirect("/admin/agents");
}

export async function deleteAgentAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (id) await agentsStore.remove(id);
  revalidatePath("/admin/agents");
  revalidatePath("/admin");
}
