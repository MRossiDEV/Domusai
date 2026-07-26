"use client"

import { motion } from "framer-motion"

/** The visitor's own "sent" chat bubble — right-aligned, blue, with an initials avatar instead of a fabricated stock photo. */
export default function UserMessage({ text, initials }: { text: string; initials: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start justify-end gap-2.5"
    >
      <div
        className="max-w-[78%] rounded-[18px] rounded-tr-[4px] px-4 py-3 text-[14.5px] leading-relaxed text-white"
        style={{ background: "var(--weeggo-blue)" }}
      >
        {text}
      </div>
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-[11px] font-bold text-foreground">
        {initials || "🙂"}
      </div>
    </motion.div>
  )
}
