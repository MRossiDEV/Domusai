"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"

import type { QuestionStep } from "../types"

interface AnswerComposerProps {
  question: QuestionStep
  value?: string | string[] | number
  onSubmit: (value: string | string[] | number) => void
}

/**
 * Two distinct, stacked pieces for the currently-active question:
 * - A pills drawer that animates up from behind the bar (single/multiple/select).
 * - A sticky bottom bar that's always present once this mounts — holding
 *   "Continuar" for option-type questions, or the real text input + send
 *   button for text/email/phone/number ones.
 * Mount with `key={question.id}` from the caller so local state resets per
 * question instead of carrying over.
 */
export default function AnswerComposer({ question, value, onSubmit }: AnswerComposerProps) {
  const [draft, setDraft] = useState("")
  const [selected, setSelected] = useState<string[]>(
    Array.isArray(value) ? value : typeof value === "string" ? [value] : []
  )

  const hasOptions =
    (question.questionType === "single" ||
      question.questionType === "multiple" ||
      question.questionType === "select") &&
    !!question.options?.length

  const isMultiple = question.questionType === "multiple"

  const isTextLike =
    question.questionType === "text" ||
    question.questionType === "number" ||
    question.questionType === "email" ||
    question.questionType === "phone"

  function toggleOption(optionValue: string) {
    if (isMultiple) {
      setSelected((prev) =>
        prev.includes(optionValue) ? prev.filter((v) => v !== optionValue) : [...prev, optionValue]
      )
    } else {
      setSelected([optionValue])
    }
  }

  function confirmSelection() {
    if (question.required && selected.length === 0) return
    onSubmit(isMultiple ? selected : selected[0] ?? "")
  }

  function submitText() {
    const trimmed = draft.trim()
    if (!trimmed) return
    onSubmit(question.questionType === "number" ? Number(trimmed) || 0 : trimmed)
    setDraft("")
  }

  if (hasOptions) {
    return (
      <div className="flex flex-col">
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
          className="flex flex-wrap gap-2 border-t border-border bg-card px-4 pt-3.5 pb-2.5"
        >
          {question.options?.map((option) => {
            const active = selected.includes(option.value)
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => toggleOption(option.value)}
                className={`rounded-full border px-4 py-2.5 text-[13.5px] font-bold transition-colors ${
                  active
                    ? "border-[var(--weeggo-orange)] bg-[var(--weeggo-orange-tint)] text-foreground"
                    : "border-border bg-secondary text-foreground"
                }`}
              >
                {option.label}
              </button>
            )
          })}
        </motion.div>

        <div className="border-t border-border bg-card px-4 py-3 safe-bottom">
          <button
            type="button"
            onClick={confirmSelection}
            disabled={question.required && selected.length === 0}
            className="h-12 w-full rounded-full text-[14px] font-bold text-white transition disabled:opacity-40"
            style={{ background: "var(--weeggo-orange)" }}
          >
            Continuar
          </button>
        </div>
      </div>
    )
  }

  if (isTextLike) {
    return (
      <div className="border-t border-border bg-card px-4 py-3 safe-bottom">
        <div className="flex items-center gap-2.5">
          <input
            type={question.questionType === "email" ? "email" : question.questionType === "phone" ? "tel" : "text"}
            inputMode={question.questionType === "number" ? "decimal" : undefined}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submitText()
            }}
            placeholder={question.placeholder ?? "Escribime lo que necesitás..."}
            autoFocus
            className="h-12 flex-1 rounded-full border border-border bg-secondary px-4 text-[14px] text-foreground outline-none transition focus:border-[var(--weeggo-orange)]"
          />
          <button
            type="button"
            onClick={submitText}
            disabled={!draft.trim()}
            aria-label="Enviar"
            className="flex size-11 shrink-0 items-center justify-center rounded-full text-white transition disabled:opacity-40"
            style={{ background: "var(--weeggo-orange)" }}
          >
            <Send className="size-[18px]" />
          </button>
        </div>
      </div>
    )
  }

  return null
}
