import type { Metadata } from "next";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ImpersonationBanner } from "@/components/ImpersonationBanner";
import { AgentSidebar } from "@/app/agent/_components/agent-sidebar";
import { AgentHeader } from "@/app/agent/_components/agent-header";
import { getCurrentAgent } from "@/app/agent/_lib/session";
import { getCurrentAdmin } from "@/app/admin/_lib/session";
import { signOutAgentAction } from "@/app/agent/_lib/actions/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: {
    default: "Portal de Agentes",
    template: "%s | WEEGGO Agentes",
  },
  robots: { index: false, follow: false },
};

export default async function AgentPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [result, admin] = await Promise.all([getCurrentAgent(), getCurrentAdmin()]);
  const isImpersonating = admin.status === "ok";

  if (result.status === "unauthenticated") {
    redirect("/agent/login");
  }

  if (result.status === "unregistered" || result.status === "inactive") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 text-center">
        <p className="max-w-sm text-sm text-muted-foreground">
          {result.status === "unregistered"
            ? "Este email no está registrado como agente. Contactá a tu administrador."
            : "Tu cuenta de agente está desactivada. Contactá a tu administrador."}
        </p>
        <form action={signOutAgentAction}>
          <Button type="submit" variant="outline">
            Cerrar sesión
          </Button>
        </form>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AgentSidebar agentName={result.agent.name} />
      <SidebarInset>
        {isImpersonating && <ImpersonationBanner />}
        <AgentHeader />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
