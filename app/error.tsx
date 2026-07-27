"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RotateCcw } from "lucide-react";

import { useTranslation } from "@/lib/i18n/useTranslation";

/**
 * Root-level fallback — catches errors thrown by a segment's own layout.tsx
 * (which nested error.tsx files can't; a layout is only wrapped by its
 * PARENT segment's boundary), most notably app/(app)/layout.tsx's Supabase
 * fetch failing (e.g. missing env vars in a fresh deploy). Self-scopes the
 * WEEGGO light theme via the theme-weeggo class directly, since the crashed
 * subtree never got a chance to apply it itself.
 */
export default function RootError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="theme-weeggo flex min-h-dvh flex-col items-center justify-center bg-background px-8 text-center text-foreground"
    >
      <h2 className="mb-1.5 text-[19px] font-extrabold">{t("error.title")}</h2>
      <p className="mb-5 max-w-[280px] text-[13.5px] leading-relaxed text-muted-foreground">{t("error.body")}</p>
      <div className="flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={() => unstable_retry()}
          className="flex items-center gap-2 rounded-[var(--weeggo-radius-md)] px-[22px] py-[13px] text-[13.5px] font-bold text-white"
          style={{ background: "var(--weeggo-blue)" }}
        >
          <RotateCcw className="size-4" />
          {t("error.retry")}
        </button>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="text-[13px] font-semibold text-muted-foreground underline"
        >
          {t("sell.backToHome")}
        </button>
      </div>
    </div>
  );
}
