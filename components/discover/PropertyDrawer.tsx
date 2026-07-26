"use client";

import { useState } from "react";

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useDiscover } from "@/lib/discover/filters-context";
import { matchScore, priceFor, propertyTypeLabel, yieldPct } from "@/lib/discover/scoring";
import type { Listing } from "@/lib/discover/types";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { ViewingForm } from "./ViewingForm";

export function PropertyDrawer({ listings }: { listings: Listing[] }) {
  const { mode, filters, activeListingId, closeListing } = useDiscover();
  const listing = listings.find((l) => l.id === activeListingId) ?? null;

  return (
    <Drawer open={!!listing} onOpenChange={(open) => !open && closeListing()} showSwipeHandle>
      <DrawerContent className="max-h-[86dvh]">
        <div className="theme-weeggo min-h-0 flex-1 overflow-y-auto bg-card px-[22px] pb-[26px] text-foreground">
          {listing && <PropertyDetail listing={listing} mode={mode} filters={filters} onClose={closeListing} />}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function PropertyDetail({
  listing,
  mode,
  filters,
  onClose,
}: {
  listing: Listing;
  mode: ReturnType<typeof useDiscover>["mode"];
  filters: ReturnType<typeof useDiscover>["filters"];
  onClose: () => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const { t } = useTranslation();
  const score = matchScore(listing, filters, mode);
  const y = yieldPct(listing);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary Supabase-stored URL */}
      <img
        src={listing.image}
        alt={listing.title}
        className="-mx-[22px] h-[200px] w-[calc(100%+44px)] object-cover"
      />

      <h2 className="mt-4 mb-0.5 text-[25px] font-extrabold">{priceFor(listing, mode, t)}</h2>
      <div className="mb-3.5 text-[13px] font-semibold text-muted-foreground">
        {listing.title} · {listing.city}
      </div>

      <div className="mb-4 flex flex-wrap gap-2.5">
        <Stat label={t("discover.bedsLabel", { n: listing.bedrooms })} />
        <Stat label={`${listing.areaM2} m²`} />
        <Stat label={propertyTypeLabel(listing.propertyType, t)} />
        {mode === "invest" ? (
          <Stat label={y !== null ? t("discover.grossYieldLabel", { pct: y }) : t("discover.yieldNa")} />
        ) : (
          <Stat label={t("discover.matchLabel", { pct: score })} />
        )}
      </div>

      <p className="mb-4 text-[13.5px] leading-relaxed text-muted-foreground">{listing.description}</p>

      {listing.tags.length > 0 && (
        <div className="mb-5 flex flex-wrap gap-2">
          {listing.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-3 py-1.5 text-[11.5px] font-bold"
              style={{ background: "var(--weeggo-green-tint)", color: "#065F46" }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {showForm ? (
        <ViewingForm listing={listing} onDone={onClose} />
      ) : (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="w-full rounded-[var(--weeggo-radius-md)] py-[13px] text-[13.5px] font-bold text-white"
          style={{ background: "var(--weeggo-blue)" }}
        >
          {t("discover.requestViewing")}
        </button>
      )}
    </>
  );
}

function Stat({ label }: { label: string }) {
  return (
    <div className="font-weeggo-mono rounded-xl bg-secondary px-3.5 py-2.5 text-xs font-semibold">{label}</div>
  );
}
