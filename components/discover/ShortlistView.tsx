"use client";

import { useDiscover } from "@/lib/discover/filters-context";
import { priceFor } from "@/lib/discover/scoring";
import type { Listing } from "@/lib/discover/types";
import { useTranslation } from "@/lib/i18n/useTranslation";

export function ShortlistView({ listings }: { listings: Listing[] }) {
  const { mode, liked, superliked, compareSelection, toggleCompare, openCompare, openListing } = useDiscover();
  const { t } = useTranslation();

  const items = liked
    .map((id) => listings.find((listing) => listing.id === id))
    .filter((listing): listing is Listing => !!listing);

  return (
    <div className="relative flex min-h-0 flex-1 flex-col" style={{ background: "var(--weeggo-paper-dim)" }}>
      <div className="min-h-0 flex-1 overflow-y-auto px-[18px] pt-[18px] pb-[18px]">
        <div className="mb-0.5 text-[23px] font-extrabold">{t("discover.yourShortlist")}</div>

        {items.length === 0 ? (
          <div className="text-[12.5px] text-muted-foreground">{t("discover.shortlistEmpty")}</div>
        ) : (
          <>
            <div className="mb-4 text-[12.5px] text-muted-foreground">{t("discover.shortlistHint")}</div>

            <div className="grid grid-cols-2 gap-3">
              {items.map((listing) => {
                const selected = compareSelection.includes(listing.id);
                const isSuperliked = superliked.includes(listing.id);

                return (
                  <div
                    key={listing.id}
                    className={`relative overflow-hidden rounded-2xl border bg-card shadow-[0_8px_20px_-12px_rgba(24,24,27,0.2)] ${
                      selected ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleCompare(listing.id)}
                      aria-label={selected ? t("discover.removeFromCompare") : t("discover.addToCompare")}
                      className={`absolute right-2 top-2 z-10 flex size-[22px] items-center justify-center rounded-full border text-[11px] font-bold ${
                        selected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-white/90 text-transparent"
                      }`}
                    >
                      ✓
                    </button>

                    <button type="button" onClick={() => openListing(listing.id)} className="block w-full text-left">
                      {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary Supabase-stored URL */}
                      <img src={listing.image} alt={listing.title} className="h-24 w-full object-cover" />
                      <div className="px-2.5 pt-2.5 pb-2.5">
                        <div className="text-[15px] font-extrabold">
                          {isSuperliked ? "★ " : ""}
                          {priceFor(listing, mode, t)}
                        </div>
                        <div className="mt-0.5 text-[11px] text-muted-foreground">
                          {listing.city} · {t("discover.bedsLabel", { n: listing.bedrooms })}
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {compareSelection.length >= 2 && (
        <button
          type="button"
          onClick={openCompare}
          className="absolute inset-x-[18px] bottom-[14px] flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold text-white"
          style={{ background: "var(--weeggo-blue)", boxShadow: "0 12px 30px -10px rgba(79,70,229,0.5)" }}
        >
          <span>{t("discover.nSelected", { n: compareSelection.length })}</span>
          <span className="underline">{t("discover.compareCta")}</span>
        </button>
      )}
    </div>
  );
}
