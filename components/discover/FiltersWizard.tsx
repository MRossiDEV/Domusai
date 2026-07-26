"use client";

import { Home, Key, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";

import { useWizard } from "@/app/wizard/hooks/useWizard";
import { buildFiltersWizardConfig } from "@/lib/discover/filters-wizard-config";
import { getAvailableFacets } from "@/lib/discover/facets";
import { useDiscover } from "@/lib/discover/filters-context";
import { buildDeck } from "@/lib/discover/deck";
import { BUDGET_MAX_BUY, BUDGET_MAX_RENT } from "@/lib/discover/constants";
import { fmtUSD } from "@/lib/discover/scoring";
import type { Filters, Listing, Mode } from "@/lib/discover/types";
import type { PropertyType } from "@/app/admin/_lib/types";

/** Steps where the visitor is picking real, hard-filtering search criteria (as opposed to intent/lifestyle, which aren't). */
const CRITERIA_STEP_IDS = new Set(["hoods", "budget", "yield", "propertyType", "amenities"]);

const INTENT_META: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string }> = {
  buy: { icon: Home, color: "var(--weeggo-blue)" },
  rent: { icon: Key, color: "var(--weeggo-green)" },
  invest: { icon: TrendingUp, color: "var(--weeggo-orange)" },
};

export function FiltersWizard({ listings }: { listings: Listing[] }) {
  const { wizardOpen, closeWizard, setMode, setFilters, completeOnboarding } = useDiscover();
  const config = useMemo(() => buildFiltersWizardConfig(getAvailableFacets(listings)), [listings]);
  const wizard = useWizard(config);
  const [minBeds, setMinBeds] = useState(0);
  const [minBaths, setMinBaths] = useState(0);
  const [amenitiesRequired, setAmenitiesRequired] = useState(false);

  const { getAnswer } = wizard;

  function multiValues(id: string): string[] {
    const value = getAnswer(id)?.value;
    return Array.isArray(value) ? value : [];
  }

  // Live preview of how many listings the visitor's picks so far would
  // actually surface — recomputed on every answer so the wizard behaves like
  // a real search instead of a blind multi-step form. Uses buildDeck (same
  // relaxation logic as the deck itself) so this count never contradicts
  // what Discover would actually show.
  const previewMode: Mode = (getAnswer("intent")?.value as Mode | undefined) ?? "buy";
  const previewFilters: Filters = useMemo(
    () => ({
      lifestyles: multiValues("priorities"),
      hoods: multiValues("hoods"),
      propertyTypes: multiValues("propertyType") as PropertyType[],
      minBeds,
      minBaths,
      budgetMax: (getAnswer("budget")?.value as number | undefined) ?? null,
      targetYield: (getAnswer("yield")?.value as number | undefined) ?? 0,
      amenities: multiValues("amenities"),
      amenitiesRequired,
      // Parking is offered here as a regular amenity chip (real facet data),
      // not a dedicated hard/soft step like the standalone /wizard has.
      parkingRequired: false,
      parkingPreferred: false,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- wizard.answers (not individual getAnswer calls) is what should trigger a recompute
    [wizard.answers, minBeds, minBaths, amenitiesRequired]
  );
  const matchCount = useMemo(
    () => buildDeck(listings, previewFilters, previewMode, []).deck.length,
    [listings, previewFilters, previewMode]
  );

  if (!wizardOpen) return null;

  const { currentQuestion, currentStep, isFirstStep, isLastStep, setAnswer, next, back } = wizard;

  function toggleMulti(id: string, option: string) {
    const current = multiValues(id);
    setAnswer(id, current.includes(option) ? current.filter((v) => v !== option) : [...current, option]);
  }

  function handleContinue() {
    next();
  }

  function finish() {
    const intent = (getAnswer("intent")?.value as Mode | undefined) ?? "buy";
    setMode(intent);
    setFilters({
      lifestyles: multiValues("priorities"),
      hoods: multiValues("hoods"),
      propertyTypes: multiValues("propertyType") as PropertyType[],
      minBeds,
      minBaths,
      budgetMax: (getAnswer("budget")?.value as number | undefined) ?? null,
      targetYield: (getAnswer("yield")?.value as number | undefined) ?? 0,
      amenities: multiValues("amenities"),
      amenitiesRequired,
      parkingRequired: false,
      parkingPreferred: false,
    });
    completeOnboarding();
    closeWizard();
  }

  const intentAnswer = getAnswer("intent")?.value as string | undefined;

  return (
    <div className="theme-weeggo absolute inset-0 z-[100] flex flex-col bg-background text-foreground">
      <div className="px-5 pt-5">
        <div className="mb-5 flex gap-[5px]">
          {config.steps
            .filter((s) => s.type === "question" || s.type === "completion")
            .map((s, i) => (
              <span
                key={s.id}
                className={`h-1 flex-1 rounded-full ${i <= currentStep ? "bg-primary" : "bg-border"}`}
              />
            ))}
        </div>
        <div className="flex items-center justify-between pb-3.5">
          {!isFirstStep ? (
            <button type="button" onClick={back} className="text-[13px] font-bold text-muted-foreground">
              ‹ Back
            </button>
          ) : (
            <span />
          )}
          {currentQuestion && CRITERIA_STEP_IDS.has(currentQuestion.id) && (
            <span className="font-weeggo-mono rounded-full bg-[var(--weeggo-blue-tint)] px-3 py-1 text-[11px] font-bold text-primary">
              {matchCount} {matchCount === 1 ? "match" : "matches"}
            </span>
          )}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-[22px] pb-5 pt-1">
        {currentQuestion?.id === "intent" && (
          <>
            <Eyebrow>Step {currentStep + 1}</Eyebrow>
            <Title>
              What brings you
              <br />
              to WEEGGO?
            </Title>
            <div className="flex flex-col gap-3">
              {currentQuestion.options?.map((option) => {
                const meta = INTENT_META[option.value];
                const Icon = meta.icon;
                const active = intentAnswer === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setAnswer("intent", option.value)}
                    className={`flex items-center gap-4 rounded-[var(--weeggo-radius-md)] border p-4 text-left transition-colors ${
                      active ? "border-primary bg-[var(--weeggo-blue-tint)]" : "border-border bg-card"
                    }`}
                  >
                    <span
                      className="flex size-[42px] shrink-0 items-center justify-center rounded-xl text-white"
                      style={{ background: meta.color }}
                    >
                      <Icon className="size-[19px]" />
                    </span>
                    <span>
                      <b className="block text-[14.5px]">{option.label}</b>
                      <small className="text-[11.5px] text-muted-foreground">{option.description}</small>
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {currentQuestion?.id === "priorities" && (
          <>
            <Eyebrow>Step {currentStep + 1}</Eyebrow>
            <Title>
              What matters
              <br />
              most to you?
            </Title>
            <p className="mb-4 -mt-3 text-[13px] text-muted-foreground">
              Not sure which neighborhood you want? Pick a vibe and we&apos;ll point you the right way.
            </p>
            <ChipGrid
              options={currentQuestion.options ?? []}
              selected={multiValues("priorities")}
              onToggle={(v) => toggleMulti("priorities", v)}
            />
          </>
        )}

        {currentQuestion?.id === "hoods" && (
          <>
            <Eyebrow>Step {currentStep + 1}</Eyebrow>
            <Title>
              Any particular
              <br />
              neighborhoods?
            </Title>
            <p className="mb-4 -mt-3 text-[13px] text-muted-foreground">Optional — leave blank to see all of them.</p>
            <ChipGrid
              options={currentQuestion.options ?? []}
              selected={multiValues("hoods")}
              onToggle={(v) => toggleMulti("hoods", v)}
            />
          </>
        )}

        {currentQuestion?.id === "budget" && (
          <BudgetStep
            step={currentStep + 1}
            title={intentAnswer === "rent" ? "Monthly budget?" : "Purchase budget?"}
            max={intentAnswer === "rent" ? BUDGET_MAX_RENT : BUDGET_MAX_BUY}
            sliderStep={intentAnswer === "rent" ? 50 : 5000}
            formatValue={(v) => (intentAnswer === "rent" ? `$${v}/mo` : fmtUSD(v))}
            value={(getAnswer("budget")?.value as number | undefined) ?? (intentAnswer === "rent" ? BUDGET_MAX_RENT : BUDGET_MAX_BUY)}
            onChange={(v) => setAnswer("budget", v)}
          />
        )}

        {currentQuestion?.id === "yield" && (
          <BudgetStep
            step={currentStep + 1}
            title="Minimum gross yield"
            max={10}
            sliderStep={0.5}
            formatValue={(v) => `${v}%`}
            value={(getAnswer("yield")?.value as number | undefined) ?? 0}
            onChange={(v) => setAnswer("yield", v)}
          />
        )}

        {currentQuestion?.id === "propertyType" && (
          <>
            <Eyebrow>Step {currentStep + 1}</Eyebrow>
            <Title>
              Property type
              <br />& size
            </Title>
            <ChipGrid
              options={currentQuestion.options ?? []}
              selected={multiValues("propertyType")}
              onToggle={(v) => toggleMulti("propertyType", v)}
            />
            <div className="mt-[22px] flex flex-col gap-3">
              <Stepper label="Minimum bedrooms" value={minBeds} onChange={setMinBeds} max={6} />
              <Stepper label="Minimum bathrooms" value={minBaths} onChange={setMinBaths} max={4} />
            </div>
          </>
        )}

        {currentQuestion?.id === "amenities" && (
          <>
            <Eyebrow>Step {currentStep + 1}</Eyebrow>
            <Title>
              Amenities
              <br />
              you&apos;d like
            </Title>
            <ChipGrid
              options={currentQuestion.options ?? []}
              selected={multiValues("amenities")}
              onToggle={(v) => toggleMulti("amenities", v)}
            />
            <button
              type="button"
              onClick={() => setAmenitiesRequired((v) => !v)}
              disabled={multiValues("amenities").length === 0}
              className="mt-[18px] flex w-full items-center justify-between rounded-2xl border border-border bg-secondary px-[18px] py-4 text-left disabled:opacity-40"
            >
              <span>
                <span className="block text-[13.5px] font-bold">Must have all of these</span>
                <span className="block text-[11.5px] text-muted-foreground">
                  Otherwise they&apos;re just a nice-to-have that boosts match %
                </span>
              </span>
              <span
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  amenitiesRequired ? "bg-primary" : "bg-border"
                }`}
              >
                <span
                  className={`absolute top-0.5 size-5 rounded-full bg-white shadow-sm transition-transform ${
                    amenitiesRequired ? "translate-x-[22px]" : "translate-x-0.5"
                  }`}
                />
              </span>
            </button>
          </>
        )}

        {isLastStep && (
          <div className="flex flex-col items-center pt-10 text-center">
            <div
              className="mb-4 flex size-[62px] items-center justify-center rounded-full text-[28px] text-white"
              style={{ background: "var(--weeggo-green)" }}
            >
              ✓
            </div>
            <h2 className="mb-1.5 text-[22px] font-extrabold">You&apos;re all set</h2>
            <p className="text-[13.5px] text-muted-foreground">
              {matchCount} {matchCount === 1 ? "place matches" : "places match"} what you&apos;re after.
            </p>
          </div>
        )}
      </div>

      <div className="px-[22px] pb-[26px] pt-3.5">
        {isLastStep ? (
          <button
            type="button"
            onClick={finish}
            className="w-full rounded-[var(--weeggo-radius-md)] py-[13px] text-[13.5px] font-bold text-white"
            style={{ background: "var(--weeggo-blue)" }}
          >
            See my {matchCount} {matchCount === 1 ? "match" : "matches"}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleContinue}
            disabled={currentQuestion?.id === "intent" && !intentAnswer}
            className="w-full rounded-[var(--weeggo-radius-md)] py-[13px] text-[13.5px] font-bold text-white disabled:opacity-40"
            style={{ background: "var(--weeggo-blue)" }}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-weeggo-mono mb-2 text-[11px] font-semibold uppercase tracking-[1.2px] text-primary">
      {children}
    </div>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  return <div className="mb-[22px] text-[26px] font-extrabold leading-[1.18] tracking-tight">{children}</div>;
}

function ChipGrid({
  options,
  selected,
  onToggle,
}: {
  options: { value: string; label: string }[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((option) => {
        const active = selected.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onToggle(option.value)}
            className={`rounded-full border px-4 py-[11px] text-[13px] font-bold transition-colors ${
              active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-secondary text-foreground"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function Stepper({
  label,
  value,
  onChange,
  max,
}: {
  label: string;
  value: number;
  onChange: (updater: (v: number) => number) => void;
  max: number;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-border bg-secondary px-[18px] py-4">
      <span className="text-[13.5px] font-bold">{label}</span>
      <div className="flex items-center gap-3.5">
        <button
          type="button"
          onClick={() => onChange((v) => Math.max(0, v - 1))}
          className="flex size-[34px] items-center justify-center rounded-full border border-primary text-base font-extrabold text-primary"
        >
          –
        </button>
        <span className="font-weeggo-mono w-4 text-center text-base font-bold">{value}</span>
        <button
          type="button"
          onClick={() => onChange((v) => Math.min(max, v + 1))}
          className="flex size-[34px] items-center justify-center rounded-full border border-primary text-base font-extrabold text-primary"
        >
          +
        </button>
      </div>
    </div>
  );
}

function BudgetStep({
  step,
  title,
  max,
  sliderStep,
  value,
  formatValue,
  onChange,
}: {
  step: number;
  title: string;
  max: number;
  sliderStep: number;
  value: number;
  formatValue: (v: number) => string;
  onChange: (v: number) => void;
}) {
  return (
    <>
      <Eyebrow>Step {step}</Eyebrow>
      <Title>{title}</Title>
      <div className="font-weeggo-mono mb-2.5 flex justify-between text-[13px] font-semibold text-primary">
        <span>$0</span>
        <span>{formatValue(value)}</span>
      </div>
      <input
        type="range"
        min={0}
        max={max}
        step={sliderStep}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[var(--weeggo-blue)]"
      />
    </>
  );
}
