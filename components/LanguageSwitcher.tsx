"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";

const LOCALES = ["es", "en"] as const;

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useTranslation();

  return (
    <div className={`inline-flex items-center gap-0.5 rounded-full bg-secondary p-1 ${className}`}>
      {LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-label={l === "es" ? "Español" : "English"}
          aria-pressed={locale === l}
          className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase transition-colors ${
            locale === l ? "bg-card text-primary shadow-sm" : "text-muted-foreground"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
