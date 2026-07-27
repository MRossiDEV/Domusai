"use client";

import Link from "next/link";
import { LayoutDashboard, LogOut } from "lucide-react";

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
import { signOutPartnerAction } from "@/app/partner/_lib/actions/auth";

export function PartnerSidebar({ partnerName }: { partnerName: string }) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link href="/partner" className="flex items-center gap-2 px-2 py-1.5">
          <span className="font-serif text-lg tracking-wide text-foreground">
            WEEG<span className="text-accent">GO</span>
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{partnerName}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive tooltip="Dashboard" render={<Link href="/partner" />}>
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <form action={signOutPartnerAction}>
          <SidebarMenuButton type="submit">
            <LogOut />
            <span>Cerrar sesión</span>
          </SidebarMenuButton>
        </form>
      </SidebarFooter>
    </Sidebar>
  );
}
