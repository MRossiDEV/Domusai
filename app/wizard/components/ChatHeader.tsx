"use client"

import { ChevronLeft, X } from "lucide-react"

import AssistantAvatar from "./AssistantAvatar"
import { useTranslation } from "@/lib/i18n/useTranslation"

interface ChatHeaderProps {
  showBack: boolean
  onBack: () => void
  onClose: () => void
}

export default function ChatHeader({ showBack, onBack, onClose }: ChatHeaderProps) {
  const { t } = useTranslation()

  return (
    <div className="flex h-12 shrink-0 items-center gap-3 border-b border-border bg-card safe-top">
      {showBack ? (
        <button
          type="button"
          onClick={onBack}
          aria-label={t("common.back")}
          className="flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground"
        >
          <ChevronLeft className="size-5" />
        </button>
      ) : (
        <div className="w-8 shrink-0" />
      )}

      <AssistantAvatar size={36} />

      <div className="min-w-0 flex-1">
        <div className="truncate text-[14.5px] font-bold text-foreground">{t("wizard.assistantName")}</div>
        <div className="flex items-center gap-1.5 text-[11.5px] font-semibold text-muted-foreground">
          <span className="size-[7px] rounded-full" style={{ background: "var(--weeggo-green)" }} />
          {t("wizard.online")}
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label={t("common.close")}
        className="flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground"
      >
        <X className="size-5" />
      </button>
    </div>
  )
}
