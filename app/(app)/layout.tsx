import type { Viewport } from "next";

import { getPublishedListings } from "@/lib/discover/listings";
import { AppShellClient } from "@/components/discover/AppShellClient";

export const viewport: Viewport = {
  themeColor: "#4F46E5",
};

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const listings = await getPublishedListings();

  return <AppShellClient listings={listings}>{children}</AppShellClient>;
}
