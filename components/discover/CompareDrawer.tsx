"use client";

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useDiscover } from "@/lib/discover/filters-context";
import { matchScore, priceFor, propertyTypeLabel } from "@/lib/discover/scoring";
import type { Listing } from "@/lib/discover/types";
import { useTranslation } from "@/lib/i18n/useTranslation";

export function CompareDrawer({ listings }: { listings: Listing[] }) {
  const { mode, filters, compareSelection, compareOpen, closeCompare } = useDiscover();
  const { t } = useTranslation();

  const items = compareSelection
    .map((id) => listings.find((listing) => listing.id === id))
    .filter((listing): listing is Listing => !!listing);

  return (
    <Drawer open={compareOpen && items.length > 0} onOpenChange={(open) => !open && closeCompare()} showSwipeHandle>
      <DrawerContent className="max-h-[86dvh]">
        <div className="theme-weeggo min-h-0 flex-1 overflow-y-auto bg-card px-[22px] pb-[26px] text-foreground">
          <h2 className="mt-4 mb-0.5 text-[22px] font-extrabold">{t("discover.compareTitle")}</h2>
          <div className="mb-4 text-[13px] text-muted-foreground">
            {t("discover.placesSideBySide", { n: items.length })}
          </div>

          <div className="-mx-[22px] overflow-x-auto px-[22px]">
            <table className="font-weeggo-mono w-full min-w-[420px] border-collapse text-xs">
              <tbody>
                <tr>
                  {items.map((l) => (
                    <td key={l.id} className="border-b-2 border-border p-2 font-bold">
                      {l.city}
                    </td>
                  ))}
                </tr>
                <tr>
                  {items.map((l) => (
                    <td key={l.id} className="border-b border-border p-2">
                      {priceFor(l, mode, t)}
                    </td>
                  ))}
                </tr>
                <tr>
                  {items.map((l) => (
                    <td key={l.id} className="border-b border-border p-2">
                      {t("discover.bedsLabel", { n: l.bedrooms })} · {l.areaM2} m²
                    </td>
                  ))}
                </tr>
                <tr>
                  {items.map((l) => (
                    <td key={l.id} className="border-b border-border p-2">
                      {propertyTypeLabel(l.propertyType, t)}
                    </td>
                  ))}
                </tr>
                <tr>
                  {items.map((l) => (
                    <td key={l.id} className="p-2">
                      {t("discover.matchLabel", { pct: matchScore(l, filters, mode) })}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <button
            type="button"
            onClick={closeCompare}
            className="mt-[18px] w-full rounded-[var(--weeggo-radius-md)] bg-secondary py-[13px] text-[13.5px] font-bold text-foreground"
          >
            {t("common.close")}
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
