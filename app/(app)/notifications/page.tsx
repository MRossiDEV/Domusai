"use client";

import { useEffect } from "react";
import { BellRing } from "lucide-react";

import { useDiscover } from "@/lib/discover/filters-context";
import { useTranslation, type TranslationKey } from "@/lib/i18n/useTranslation";

export default function NotificationsPage() {
  const { notifications, markNotificationsRead } = useDiscover();
  const { t } = useTranslation();

  useEffect(() => {
    markNotificationsRead();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mark-read once on mount only
  }, []);

  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-5 pt-[26px] pb-[18px]" style={{ background: "var(--weeggo-paper-dim)" }}>
      <div className="mb-0.5 text-[23px] font-extrabold">{t("notifications.title")}</div>
      <div className="mb-5 text-[12.5px] text-muted-foreground">{t("notifications.subtitle")}</div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center pt-16 text-center">
          <span
            className="mb-4 flex size-14 items-center justify-center rounded-full"
            style={{ background: "var(--weeggo-blue-tint)", color: "var(--weeggo-blue)" }}
          >
            <BellRing className="size-6" />
          </span>
          <p className="max-w-[240px] text-[13.5px] leading-relaxed text-muted-foreground">
            {t("notifications.emptyBody")}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {notifications.map((n) => (
            <div key={n.id} className="flex items-start gap-3 rounded-2xl bg-card px-4 py-3.5">
              {!n.read && (
                <span className="mt-1.5 size-2 shrink-0 rounded-full" style={{ background: "var(--weeggo-orange)" }} />
              )}
              <div className={n.read ? "ml-5" : ""}>
                <p className="text-[13.5px] font-bold">{n.message}</p>
                <p className="font-weeggo-mono mt-0.5 text-[11px] text-muted-foreground">{timeAgo(n.createdAt, t)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function timeAgo(timestamp: number, t: (key: TranslationKey, vars?: Record<string, string | number>) => string): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return t("notifications.justNow");
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return t("notifications.minutesAgo", { n: minutes });
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return t("notifications.hoursAgo", { n: hours });
  const days = Math.floor(hours / 24);
  return t("notifications.daysAgo", { n: days });
}
