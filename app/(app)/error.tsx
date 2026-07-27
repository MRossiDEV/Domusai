"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";

import { useTranslation } from "@/lib/i18n/useTranslation";

export default function DiscoverError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  const { t } = useTranslation();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="theme-weeggo flex min-h-0 flex-1 flex-col items-center justify-center px-8 text-center"
      style={{ background: "var(--weeggo-paper-dim)" }}
    >
      <h2 className="mb-1.5 text-[19px] font-extrabold text-foreground">{t("error.title")}</h2>
      <p className="mb-5 max-w-[280px] text-[13.5px] leading-relaxed text-muted-foreground">{t("error.body")}</p>
      <button
        type="button"
        onClick={() => unstable_retry()}
        className="flex items-center gap-2 rounded-[var(--weeggo-radius-md)] px-[22px] py-[13px] text-[13.5px] font-bold text-white"
        style={{ background: "var(--weeggo-blue)" }}
      >
        <RotateCcw className="size-4" />
        {t("error.retry")}
      </button>
    </div>
  );
}
