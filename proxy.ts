import { NextResponse, type NextRequest } from "next/server";

import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/app/admin/_lib/admin-session";
import { AGENT_SESSION_COOKIE, verifyAgentSessionToken } from "@/app/agent/_lib/agent-session";
import { PARTNER_SESSION_COOKIE, verifyPartnerSessionToken } from "@/app/partner/_lib/partner-session";

// Gates the three staff-facing sections — app/admin/**, app/agent/**,
// app/partner/** — each against its own signed cookie (see
// */_lib/*-session.ts). All three now use the same email+password-at-login,
// signed-cookie-after pattern instead of Supabase Auth, so this no longer
// needs a Supabase round trip on every request. This only checks "is there
// a valid session" — role/active checks happen in each section's layout via
// getCurrentAdmin()/getCurrentAgent()/getCurrentPartner().
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const session = verifyAdminSessionToken(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  if (
    pathname.startsWith("/agent") &&
    pathname !== "/agent/login" &&
    pathname !== "/agent/set-password"
  ) {
    const session = verifyAgentSessionToken(request.cookies.get(AGENT_SESSION_COOKIE)?.value);
    if (!session) {
      return NextResponse.redirect(new URL("/agent/login", request.url));
    }
  }

  if (
    pathname.startsWith("/partner") &&
    pathname !== "/partner/login" &&
    pathname !== "/partner/set-password"
  ) {
    const session = verifyPartnerSessionToken(request.cookies.get(PARTNER_SESSION_COOKIE)?.value);
    if (!session) {
      return NextResponse.redirect(new URL("/partner/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/agent/:path*", "/admin/:path*", "/partner/:path*"],
};
