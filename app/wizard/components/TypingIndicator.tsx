"use client"

import { motion } from "framer-motion"

/** Three bouncing dots in a chat-bubble shell — the "assistant is typing" beat shown briefly between questions. */
export default function TypingIndicator() {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-[20px] rounded-tl-[4px] border border-border bg-card px-5 py-4">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="size-2 rounded-full"
          style={{ background: "var(--weeggo-orange)" }}
          animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
        />
      ))}
    </div>
  )
}
