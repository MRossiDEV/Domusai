"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { getCurrentAdmin } from "@/app/admin/_lib/session";
import { agentsStore, partnersStore } from "@/app/admin/_lib/store";
import { AGENT_SESSION_COOKIE, signAgentSessionToken } from "@/app/agent/_lib/agent-session";
import { PARTNER_SESSION_COOKIE, signPartnerSessionToken } from "@/app/partner/_lib/partner-session";

const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days — matches the agent/partner session token TTL

/**
 * Lets a signed-in admin open the agent/partner portal as a specific
 * account, without needing that account's password — for support/debugging,
 * not a general auth bypass. Sets the agent/partner session cookie
 * alongside the admin's own (each portal uses its own cookie name, so both
 * stay valid at once); the admin never stops being signed in to /admin.
 */
export async function impersonateAgentAction(agentId: string) {
  const admin = await getCurrentAdmin();
  if (admin.status !== "ok") {
    redirect("/admin/login");
  }

  const agent = await agentsStore.get(agentId);
  if (!agent) {
    redirect("/admin/agents");
  }

  const cookieStore = await cookies();
  cookieStore.set(AGENT_SESSION_COOKIE, signAgentSessionToken(agent.id), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  redirect("/agent");
}

export async function impersonatePartnerAction(partnerId: string) {
  const admin = await getCurrentAdmin();
  if (admin.status !== "ok") {
    redirect("/admin/login");
  }

  const partner = await partnersStore.get(partnerId);
  if (!partner) {
    redirect("/admin/partners");
  }

  const cookieStore = await cookies();
  cookieStore.set(PARTNER_SESSION_COOKIE, signPartnerSessionToken(partner.id), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  redirect("/partner");
}
