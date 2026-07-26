"use client";

import { usePathname } from "next/navigation";

import { Toaster } from "@/components/ui/sonner";

// sonner portals its toast list straight to document.body, so wrapping
// <Toaster/> in a .theme-weeggo <div> in JSX does nothing — CSS custom
// property inheritance follows actual DOM ancestry, and the portaled node
// ends up outside that div. The class has to land on sonner's own root
// instead, via className (see components/ui/sonner.tsx, which forwards it).
const WEEGGO_APP_PATHS = new Set(["/", "/shortlist", "/notifications", "/profile"]);

export function ThemedToaster() {
  const pathname = usePathname();
  const isWeeggoApp = WEEGGO_APP_PATHS.has(pathname);

  return <Toaster className={isWeeggoApp ? "toaster group theme-weeggo" : "toaster group"} />;
}
