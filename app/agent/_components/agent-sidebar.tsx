"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, LayoutDashboard, LogOut, User, Users } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { signOutAgentAction } from "@/app/agent/_lib/actions/auth";

const navItems = [
  { title: "Dashboard", href: "/agent", icon: LayoutDashboard },
  { title: "Mis Leads", href: "/agent/leads", icon: Users },
  { title: "Mis Propiedades", href: "/agent/properties", icon: Building2 },
  { title: "Mi Perfil", href: "/agent/profile", icon: User },
];

export function AgentSidebar({ agentName }: { agentName: string }) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link href="/agent" className="flex items-center gap-2 px-2 py-1.5">
          <span className="font-serif text-lg tracking-wide text-foreground">
            WEEG<span className="text-accent">GO</span>
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{agentName}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive =
                  item.href === "/agent"
                    ? pathname === "/agent"
                    : pathname.startsWith(item.href);

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.title}
                      render={<Link href={item.href} />}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <form action={signOutAgentAction}>
          <SidebarMenuButton type="submit">
            <LogOut />
            <span>Cerrar sesión</span>
          </SidebarMenuButton>
        </form>
      </SidebarFooter>
    </Sidebar>
  );
}
