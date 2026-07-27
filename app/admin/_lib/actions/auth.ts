"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { ADMIN_SESSION_COOKIE, signAdminSessionToken } from "@/app/admin/_lib/admin-session";

export interface AdminAuthFormState {
  error?: string;
}

// Deliberately the same message whether the email doesn't exist, the
// account is inactive, or the password is wrong — distinguishing them lets
// an attacker enumerate valid admin emails.
const GENERIC_ERROR = "Email o contraseña incorrectos.";

export async function signInAdminAction(
  _prevState: AdminAuthFormState,
  formData: FormData
): Promise<AdminAuthFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: GENERIC_ERROR };
  }

  const { data, error } = await supabaseAdmin
    .from("weeggo_admins")
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
  cookieStore.set(ADMIN_SESSION_COOKIE, signAdminSessionToken(data.id), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days — matches admin-session.ts's token TTL
  });

  redirect("/admin");
}

export async function signOutAdminAction() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  redirect("/admin/login");
}
