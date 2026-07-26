"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Heart, Bell, CircleUserRound, type LucideIcon } from "lucide-react";

import { useDiscover } from "@/lib/discover/filters-context";

interface TabDef {
  href: string;
  label: string;
  icon: LucideIcon;
}

const TABS: TabDef[] = [
  { href: "/", label: "Discover", icon: Compass },
  { href: "/shortlist", label: "Shortlist", icon: Heart },
  { href: "/notifications", label: "Alerts", icon: Bell },
  { href: "/profile", label: "Profile", icon: CircleUserRound },
];

export function TabBar() {
  const pathname = usePathname();
  const { unreadNotificationCount } = useDiscover();

  return (
    <nav className="flex shrink-0 border-t border-border bg-card px-1.5 pt-2.5 pb-[calc(env(safe-area-inset-bottom)+14px)] safe-bottom">
      {TABS.map((tab) => {
        const isActive = pathname === tab.href;
        const Icon = tab.icon;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`relative flex flex-1 flex-col items-center gap-1 text-[10.5px] font-bold ${
              isActive ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <span className="relative">
              <Icon className="size-[19px]" />
              {tab.href === "/notifications" && unreadNotificationCount > 0 && (
                <span
                  className="absolute -right-1.5 -top-1 flex h-[15px] min-w-[15px] items-center justify-center rounded-full px-[3px] text-[9px] font-extrabold text-white"
                  style={{ background: "var(--weeggo-orange)" }}
                >
                  {unreadNotificationCount > 9 ? "9+" : unreadNotificationCount}
                </span>
              )}
            </span>
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
