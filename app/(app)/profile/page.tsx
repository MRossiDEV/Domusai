"use client";

import { useDiscover } from "@/lib/discover/filters-context";
import { fmtUSD, propertyTypeLabel } from "@/lib/discover/scoring";
import { LIFESTYLES } from "@/lib/discover/constants";

const MODE_LABEL: Record<string, string> = {
  buy: "Buying",
  rent: "Renting",
  invest: "Investing",
};

export default function ProfilePage() {
  const { mode, filters, liked, passed, reset, openWizard, visitorName } = useDiscover();
  const initials = visitorName ? visitorName.slice(0, 2).toUpperCase() : "GE";

  const prioritiesLabel = filters.lifestyles.length
    ? filters.lifestyles.map((v) => LIFESTYLES.find((l) => l.value === v)?.label ?? v).join(", ")
    : "No preference";
  const hoodsLabel = filters.hoods.length ? filters.hoods.join(", ") : "Anywhere";
  const budgetLabel = filters.budgetMax
    ? mode === "rent"
      ? `$${filters.budgetMax}/mo`
      : fmtUSD(filters.budgetMax)
    : "No limit";
  const typeLabel =
    (filters.propertyTypes.length ? filters.propertyTypes.map(propertyTypeLabel).join("/") : "Any") +
    " · " +
    (filters.minBeds ? `${filters.minBeds}+ bed` : "Any beds") +
    " · " +
    (filters.minBaths ? `${filters.minBaths}+ bath` : "Any bath");
  const amenitiesLabel = filters.amenities.length
    ? filters.amenities.join(", ") + (filters.amenitiesRequired ? " (required)" : "")
    : "None selected";

  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-5 pt-[26px] pb-[18px]" style={{ background: "var(--weeggo-paper-dim)" }}>
      <div
        className="flex size-16 items-center justify-center rounded-full text-[22px] font-extrabold text-white"
        style={{ background: "var(--weeggo-blue)" }}
      >
        {initials}
      </div>
      <div className="mt-3 mb-0.5 text-[19px] font-extrabold">{visitorName || "Guest explorer"}</div>
      <div className="mb-5 text-[12.5px] text-muted-foreground">{MODE_LABEL[mode]} · Montevideo</div>

      <SectionTitle>Your filters</SectionTitle>
      <ProfileRow label="Priorities" value={prioritiesLabel} />
      <ProfileRow label="Neighborhoods" value={hoodsLabel} />
      <ProfileRow label="Budget" value={budgetLabel} />
      <ProfileRow label="Type & size" value={typeLabel} />
      <ProfileRow label="Amenities" value={amenitiesLabel} />
      <button
        type="button"
        onClick={openWizard}
        className="mt-3.5 w-full rounded-[var(--weeggo-radius-md)] py-[13px] text-[13.5px] font-bold text-white"
        style={{ background: "var(--weeggo-blue)" }}
      >
        Edit filters
      </button>

      <SectionTitle>Activity</SectionTitle>
      <ProfileRow label="Shortlisted" value={String(liked.length)} />
      <ProfileRow label="Passed" value={String(passed.length)} />

      <button
        type="button"
        onClick={() => {
          reset();
          openWizard();
        }}
        className="mx-auto mt-3.5 block text-xs text-muted-foreground underline"
      >
        Start over from the beginning
      </button>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-[22px] mb-2.5 text-[11.5px] font-extrabold uppercase tracking-wide text-muted-foreground">
      {children}
    </div>
  );
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-2.5 flex items-center justify-between rounded-2xl bg-card px-4 py-3.5 text-[13.5px] font-bold">
      <span>{label}</span>
      <span className="font-weeggo-mono text-xs font-semibold text-muted-foreground">{value}</span>
    </div>
  );
}
