"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { DollarSign, Home, Key, TrendingUp } from "lucide-react";

import { useDiscover } from "@/lib/discover/filters-context";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function LandingPage() {
  const router = useRouter();
  const { completeOnboarding, visitorName } = useDiscover();
  const { t } = useTranslation();

  function skip() {
    completeOnboarding();
    router.push("/");
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="theme-weeggo weeggo-bg relative flex h-dvh flex-col justify-between overflow-hidden px-6 pb-10 pt-14 text-center text-foreground safe-top safe-bottom"
    >

      <div className="weeggo-blob-field">
        <div
          className="weeggo-blob weeggo-blob-a size-[340px] -left-24 -top-20"
          style={{ background: "var(--weeggo-blue)", opacity: 0.22 }}
        />
        <div
          className="weeggo-blob weeggo-blob-b size-[380px] -right-28 -bottom-24"
          style={{ background: "var(--weeggo-orange)", opacity: 0.2 }}
        />
        <div
          className="weeggo-blob weeggo-blob-c size-[260px] left-1/2 top-1/3"
          style={{ background: "var(--weeggo-green)", opacity: 0.16 }}
        />
      </div>

      <div className="relative z-10 flex items-center justify-end">
        <LanguageSwitcher />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
        <h2 className="text-sm font-semibold tracking-[0.3em] text-[var(--weeggo-orange)] ">
          {t("landing.welcomeTo")}
        </h2>

        <Logo height={48} className="mb-6 mt-2" />

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-2xl font-extrabold leading-[1.1] tracking-tight"
        >
          {
            visitorName
              ? t("landing.headlineReturning", { name: visitorName })
              : t("landing.headline")
          }
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mx-auto mt-4 max-w-[280px] text-[14px] leading-relaxed text-muted-foreground"
        >
          {t("landing.tagline")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8 flex gap-3"
        >
          <FeatureBadge icon={Home} label={t("landing.badgeBuy")} color="var(--weeggo-blue)" />
          <FeatureBadge icon={Key} label={t("landing.badgeRent")} color="var(--weeggo-green)" />
          <FeatureBadge icon={DollarSign} label={t("landing.badgeSell")} color="var(--weeggo-red)" />
          <FeatureBadge icon={TrendingUp} label={t("landing.badgeInvest")} color="var(--weeggo-orange)" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="relative z-10 flex flex-col items-center gap-3"
      >
        <button
          type="button"
          onClick={() => router.push("/wizard")}
          className="w-full max-w-[320px] rounded-[var(--weeggo-radius-md)] py-[15px] text-[14px] font-bold text-white shadow-[0_10px_24px_-8px_rgba(79,70,229,0.45)] bg-[var(--weeggo-orange)] hover:bg-[var(--weeggo-orange-2)] active:bg-[var(--weeggo-orange-2)]"

        >
          {t("landing.ctaStart")}
        </button>
        <button type="button" onClick={skip} className="text-xs font-semibold text-muted-foreground mb-4 underline">
          {t("landing.ctaSkip")}
        </button>
      </motion.div>
    </motion.div>
  );
}

function FeatureBadge({
  icon: Icon,
  label,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  color: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="flex size-11 items-center justify-center rounded-full text-white" style={{ background: color }}>
        <Icon className="size-[18px]" />
      </span>
      <span className="text-[11px] font-bold text-muted-foreground">{label}</span>
    </div>
  );
}
