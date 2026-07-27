"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { verifyInviteToken } from "@/lib/invite-token";
import { AGENT_SESSION_COOKIE, signAgentSessionToken } from "@/app/agent/_lib/agent-session";

export interface AgentAuthFormState {
  error?: string;
}

// Deliberately the same message whether the email doesn't exist, the
// account is inactive, or the password is wrong — distinguishing them lets
// an attacker enumerate valid agent emails.
const GENERIC_ERROR = "Email o contraseña incorrectos.";

const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days — matches agent-session.ts's token TTL

export async function signInAgentAction(
  _prevState: AgentAuthFormState,
  formData: FormData
): Promise<AgentAuthFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: GENERIC_ERROR };
  }

  const { data, error } = await supabaseAdmin
    .from("weeggo_agents")
    .select("id, active, password_hash")
    .eq("email", email)
    .maybeSingle();

  if (error) throw new Error(error.message);

  if (!data || !data.active || !data.password_hash) {
    return { error: GENERIC_ERROR };
  }

  const valid = await bcrypt.compare(password, data.password_hash);
  if (!valid) {
    return { error: GENERIC_ERROR };
  }

  const cookieStore = await cookies();
  cookieStore.set(AGENT_SESSION_COOKIE, signAgentSessionToken(data.id), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  redirect("/agent");
}

export async function signOutAgentAction() {
  const cookieStore = await cookies();
  cookieStore.delete(AGENT_SESSION_COOKIE);
  redirect("/agent/login");
}

export interface SetPasswordFormState {
  error?: string;
}

export async function setAgentPasswordAction(
  token: string,
  _prevState: SetPasswordFormState,
  formData: FormData
): Promise<SetPasswordFormState> {
  const invite = verifyInviteToken(token, "agent");
  if (!invite) {
    return { error: "Este link no es válido o venció. Pedile a un administrador que te reenvíe la invitación." };
  }

  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (password.length < 8) {
    return { error: "La contraseña debe tener al menos 8 caracteres." };
  }
  if (password !== confirmPassword) {
    return { error: "Las contraseñas no coinciden." };
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const { data, error } = await supabaseAdmin
    .from("weeggo_agents")
    .update({ password_hash: passwordHash })
    .eq("id", invite.id)
    .select("id, active")
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data || !data.active) {
    return { error: "Esta cuenta ya no está disponible. Contactá a un administrador." };
  }

  const cookieStore = await cookies();
  cookieStore.set(AGENT_SESSION_COOKIE, signAgentSessionToken(data.id), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  redirect("/agent");
}
