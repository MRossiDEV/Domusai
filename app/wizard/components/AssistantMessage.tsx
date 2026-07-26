"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

import AssistantAvatar from "./AssistantAvatar"

interface AssistantMessageProps {
  text: string
  /** Types the text out character by character and calls onTypingDone once — false renders it instantly (used for transcript history). */
  typewriter?: boolean
  onTypingDone?: () => void
}

const TYPE_SPEED_MS = 22
const MAX_TYPE_DURATION_MS = 1400

/** One "Wee" chat bubble — the assistant's avatar + name label + message. */
export default function AssistantMessage({ text, typewriter = false, onTypingDone }: AssistantMessageProps) {
  const [typedLength, setTypedLength] = useState(() => (typewriter ? 0 : text.length))
  const firedDoneRef = useRef(false)

  const isTyping = typedLength < text.length

  useEffect(() => {
    if (!typewriter) return

    if (typedLength >= text.length) {
      if (!firedDoneRef.current) {
        firedDoneRef.current = true
        onTypingDone?.()
      }
      return
    }

    const perCharMs = Math.min(TYPE_SPEED_MS, Math.max(8, MAX_TYPE_DURATION_MS / Math.max(text.length, 1)))
    const timer = setTimeout(() => setTypedLength((n) => n + 1), perCharMs)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- onTypingDone intentionally excluded (guarded by firedDoneRef), only re-run as typedLength advances
  }, [typewriter, typedLength, text])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-2.5"
    >
      <AssistantAvatar size={36} state={isTyping ? "thinking" : "idle"} />
      <div className="max-w-[78%]">
        <span className="mb-1 block pl-1 text-[10.5px] font-bold text-muted-foreground">Wee</span>
        <div className="rounded-[18px] rounded-tl-[4px] border border-border bg-card px-4 py-3 text-[14.5px] leading-relaxed text-foreground">
          {text.slice(0, typedLength)}
          {isTyping && (
            <motion.span
              aria-hidden
              className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-foreground align-middle"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            />
          )}
        </div>
      </div>
    </motion.div>
  )
}
