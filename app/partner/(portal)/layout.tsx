import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ImpersonationBanner } from "@/components/ImpersonationBanner";
import { ThemeWeeggoScope } from "@/components/ThemeWeeggoScope";
import { PartnerSidebar } from "@/app/partner/_components/partner-sidebar";
import { PartnerHeader } from "@/app/partner/_components/partner-header";
import { getCurrentPartner } from "@/app/partner/_lib/session";
import { getCurrentAdmin } from "@/app/admin/_lib/session";
import { signOutPartnerAction } from "@/app/partner/_lib/actions/auth";

export const metadata: Metadata = {
  title: {
    default: "Portal de Partners",
    template: "%s | WEEGGO Partners",
  },
  robots: { index: false, follow: false },
};

export default async function PartnerPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [result, admin] = await Promise.all([getCurrentPartner(), getCurrentAdmin()]);
  const isImpersonating = admin.status === "ok";

  if (result.status === "unauthenticated") {
    redirect("/partner/login");
  }

  if (result.status === "unregistered" || result.status === "inactive") {
    return (
      <div className="theme-weeggo flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 text-center">
        <p className="max-w-sm text-sm text-muted-foreground">
          {result.status === "unregistered"
            ? "Este email no está registrado como partner. Contactá a tu administrador."
            : "Tu cuenta de partner está desactivada. Contactá a tu administrador."}
        </p>
        <form action={signOutPartnerAction}>
          <Button type="submit" variant="outline">
            Cerrar sesión
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="theme-weeggo">
      <ThemeWeeggoScope />
      <SidebarProvider>
        <PartnerSidebar partnerName={result.partner.name} />
        <SidebarInset>
          {isImpersonating && <ImpersonationBanner />}
          <PartnerHeader />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
