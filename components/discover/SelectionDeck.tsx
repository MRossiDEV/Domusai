"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, Star, X } from "lucide-react";

import { useDiscover } from "@/lib/discover/filters-context";
import { buildDeck } from "@/lib/discover/deck";
import { matchScore, yieldPct } from "@/lib/discover/scoring";
import type { Listing } from "@/lib/discover/types";
import { SwipeCard, type SwipeAction } from "./SwipeCard";
import { PropertyDrawer } from "./PropertyDrawer";

const CURATED_SIZE = 8;

/**
 * The curated preview shown right after the wizard, before Explore. Distinct
 * from Discover: it's a fixed, finite snapshot (computed once from the
 * wizard's answers) rather than a live view of the whole catalog, so working
 * through it feels like reviewing "your matches" instead of an
 * ever-shrinking version of Explore. Redirects to Explore once it runs out.
 */
export function SelectionDeck({ listings }: { listings: Listing[] }) {
  const router = useRouter();
  const { mode, filters, liked, passed, like, superlike, pass, openListing, visitorName } = useDiscover();
  const [pendingAction, setPendingAction] = useState<SwipeAction | null>(null);

  const [curatedIds] = useState<string[]>(() => {
    const excludeIds = [...liked, ...passed];
    const { deck } = buildDeck(listings, filters, mode, excludeIds);
    return deck.slice(0, CURATED_SIZE).map((l) => l.id);
  });

  const deck = useMemo(
    () =>
      curatedIds
        .map((id) => listings.find((l) => l.id === id))
        .filter((l): l is Listing => !!l && !liked.includes(l.id) && !passed.includes(l.id)),
    [curatedIds, listings, liked, passed]
  );

  const visible = deck.slice(0, 3);

  useEffect(() => {
    if (visible.length === 0) {
      router.replace("/");
    }
  }, [visible.length, router]);

  function commit(listing: Listing, action: SwipeAction) {
    if (action === "like") like(listing.id);
    else if (action === "super") superlike(listing.id);
    else pass(listing.id);
  }

  function triggerTopAction(action: SwipeAction) {
    if (!visible[0]) return;
    setPendingAction(action);
  }

  if (visible.length === 0) {
    // About to redirect to Explore — render nothing rather than flash a stale deck.
    return null;
  }

  return (
    <div className="theme-weeggo weeggo-bg relative flex h-dvh flex-col overflow-hidden text-foreground">
      <div className="px-5 pt-5 pb-2 text-center safe-top">
        <div className="mb-1 text-[13px] font-bold">
          {visitorName ? `La selección de ${visitorName}` : "Tu selección curada"}
        </div>
        <div className="font-weeggo-mono text-[11px] text-primary">
          {deck.length} de {curatedIds.length}
        </div>
      </div>

      <div className="relative min-h-0 flex-1 p-4">
        <div className="relative size-full">
          {visible
            .slice()
            .reverse()
            .map((listing, i) => {
              const depth = visible.length - 1 - i;
              return (
                <SwipeCard
                  key={listing.id}
                  listing={listing}
                  mode={mode}
                  score={matchScore(listing, filters, mode)}
                  yieldPct={yieldPct(listing)}
                  depth={depth}
                  onCommit={(action) => commit(listing, action)}
                  onOpenDetail={() => openListing(listing.id)}
                  onQuickLike={() => commit(listing, "like")}
                  externalTrigger={depth === 0 ? pendingAction : null}
                  onExternalTriggerHandled={() => setPendingAction(null)}
                />
              );
            })}
        </div>
      </div>

      <div className="flex items-center justify-center gap-[18px] pt-1.5 pb-2">
        <button
          type="button"
          aria-label="Pass"
          onClick={() => triggerTopAction("pass")}
          className="flex size-14 items-center justify-center rounded-full border border-border bg-card text-primary shadow-[0_10px_20px_-8px_rgba(24,24,27,0.18)]"
        >
          <X className="size-[22px]" />
        </button>
        <button
          type="button"
          aria-label="Top pick"
          onClick={() => triggerTopAction("super")}
          className="flex size-[46px] items-center justify-center rounded-full border border-border bg-card shadow-[0_10px_20px_-8px_rgba(24,24,27,0.18)]"
          style={{ color: "var(--weeggo-green)" }}
        >
          <Star className="size-[18px]" />
        </button>
        <button
          type="button"
          aria-label="Shortlist"
          onClick={() => triggerTopAction("like")}
          className="flex size-14 items-center justify-center rounded-full text-white shadow-[0_10px_20px_-8px_rgba(24,24,27,0.18)]"
          style={{ background: "var(--weeggo-orange)" }}
        >
          <Heart className="size-[22px]" />
        </button>
      </div>

      <button
        type="button"
        onClick={() => router.push("/")}
        className="pb-6 text-xs font-semibold text-muted-foreground underline safe-bottom"
      >
        Saltar a explorar todo
      </button>

      <PropertyDrawer listings={listings} />
    </div>
  );
}
