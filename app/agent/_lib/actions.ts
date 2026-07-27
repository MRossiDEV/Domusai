"use server";

import { revalidatePath } from "next/cache";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { agentsStore } from "@/app/admin/_lib/store";
import type { LeadStatus } from "@/app/admin/_lib/types";
import { getCurrentAgent } from "@/app/agent/_lib/session";

export async function updateMyLeadStatusAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as LeadStatus;
  if (!id || !status) return;

  const result = await getCurrentAgent();
  if (result.status !== "ok") return;

  // Explicit agent-id scoping in place of the RLS policy this used to lean
  // on (weeggo_leads_agent_update, which depended on Supabase Auth's
  // auth.uid() — no longer signed in that way) — supabaseAdmin bypasses RLS
  // entirely, so this check IS the authorization now.
  const { error } = await supabaseAdmin
    .from("weeggo_leads")
    .update({ status })
    .eq("id", id)
    .eq("assigned_agent_id", result.agent.id);
  if (error) throw new Error(error.message);

  revalidatePath("/agent/leads");
  revalidatePath("/agent");
}

export interface ProfileFormState {
  error?: string;
  success?: boolean;
}

export async function updateMyProfileAction(
  _prevState: ProfileFormState,
  formData: FormData
): Promise<ProfileFormState> {
  const result = await getCurrentAgent();
  if (result.status !== "ok") {
    return { error: "No autorizado." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const avatarUrl = String(formData.get("avatarUrl") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();

  if (!name) {
    return { error: "El nombre es obligatorio." };
  }

  await agentsStore.updateProfile(result.agent.id, { name, phone, avatarUrl, bio });

  revalidatePath("/agent/profile");
  revalidatePath("/agent");
  return { success: true };
}
