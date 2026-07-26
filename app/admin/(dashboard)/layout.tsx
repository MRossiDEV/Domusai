import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/app/admin/_components/app-sidebar";
import { AdminHeader } from "@/app/admin/_components/admin-header";
import { getCurrentAdmin } from "@/app/admin/_lib/session";
import { signOutAdminAction } from "@/app/admin/_lib/actions/auth";

export const metadata: Metadata = {
  title: {
    default: "Admin",
    template: "%s | WEEGGO Admin",
  },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const result = await getCurrentAdmin();

  if (result.status === "unauthenticated") {
    redirect("/admin/login");
  }

  if (result.status !== "ok") {
    const message =
      result.status === "inactive"
        ? "Your admin account is deactivated. Contact another admin."
        : "This email isn't registered as an admin. Contact an existing admin to be added.";

    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 text-center">
        <p className="max-w-sm text-sm text-muted-foreground">{message}</p>
        <form action={signOutAdminAction}>
          <Button type="submit" variant="outline">
            Sign out
          </Button>
        </form>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar adminName={result.admin.name} />
      <SidebarInset>
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
