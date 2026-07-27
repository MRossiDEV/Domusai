"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { verifyInviteToken } from "@/lib/invite-token";
import { PARTNER_SESSION_COOKIE, signPartnerSessionToken } from "@/app/partner/_lib/partner-session";

export interface PartnerAuthFormState {
  error?: string;
}

// Deliberately the same message whether the email doesn't exist, the
// account is inactive, or the password is wrong — distinguishing them lets
// an attacker enumerate valid partner emails.
const GENERIC_ERROR = "Email o contraseña incorrectos.";

const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days — matches partner-session.ts's token TTL

export async function signInPartnerAction(
  _prevState: PartnerAuthFormState,
  formData: FormData
): Promise<PartnerAuthFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: GENERIC_ERROR };
  }

  const { data, error } = await supabaseAdmin
    .from("weeggo_partners")
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
  cookieStore.set(PARTNER_SESSION_COOKIE, signPartnerSessionToken(data.id), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  redirect("/partner");
}

export async function signOutPartnerAction() {
  const cookieStore = await cookies();
  cookieStore.delete(PARTNER_SESSION_COOKIE);
  redirect("/partner/login");
}

export interface SetPasswordFormState {
  error?: string;
}

export async function setPartnerPasswordAction(
  token: string,
  _prevState: SetPasswordFormState,
  formData: FormData
): Promise<SetPasswordFormState> {
  const invite = verifyInviteToken(token, "partner");
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
    .from("weeggo_partners")
    .update({ password_hash: passwordHash })
    .eq("id", invite.id)
    .select("id, active")
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data || !data.active) {
    return { error: "Esta cuenta ya no está disponible. Contactá a un administrador." };
  }

  const cookieStore = await cookies();
  cookieStore.set(PARTNER_SESSION_COOKIE, signPartnerSessionToken(data.id), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  redirect("/partner");
}
