import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Refreshes the Supabase session cookie and gates both the agent portal
// (app/agent/**) and the admin CRM (app/admin/**). This only checks "is
// there a signed-in Supabase user" — role checks (agent vs admin, active vs
// inactive) happen in each section's layout via getCurrentAgent()/
// getCurrentAdmin(), same split as before admin auth existed.
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  if (!user) {
    if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    if (pathname.startsWith("/agent") && pathname !== "/agent/login") {
      return NextResponse.redirect(new URL("/agent/login", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/agent/:path*", "/admin/:path*"],
};
