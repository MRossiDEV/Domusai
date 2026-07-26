"use client"

import { motion } from "framer-motion"

export type AssistantState = "idle" | "thinking" | "happy"

interface AssistantAvatarProps {
  state?: AssistantState
  size?: number
}

/**
 * A small illustrated face standing in for the WEEGGO assistant — hand-built
 * from SVG primitives (no image/illustrator pipeline in this project). Blinks
 * and bobs gently at rest; looks up-and-away while "thinking" between
 * questions, and smiles wider on completion.
 */
export default function AssistantAvatar({ state = "idle", size = 64 }: AssistantAvatarProps) {
  const thinking = state === "thinking"
  const happy = state === "happy"

  return (
    <motion.div
      animate={{ y: thinking ? 0 : [0, -3, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      style={{ width: size, height: size }}
      className="relative shrink-0"
    >
      <svg viewBox="0 0 64 64" width={size} height={size}>
        <defs>
          <linearGradient id="weeggo-assistant-face" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--weeggo-blue)" />
            <stop offset="100%" stopColor="var(--weeggo-blue-dark)" />
          </linearGradient>
        </defs>

        <circle cx="32" cy="32" r="30" fill="url(#weeggo-assistant-face)" />

        {/* Soft highlight, upper-left */}
        <ellipse cx="21" cy="18" rx="10" ry="7" fill="white" opacity="0.14" />

        {/* Eyes */}
        <motion.g
          animate={
            thinking
              ? { x: 3, y: -2 }
              : { x: 0, y: 0, scaleY: [1, 1, 0.1, 1, 1, 1, 1, 0.1, 1] }
          }
          transition={
            thinking
              ? { duration: 0.4 }
              : { duration: 4.2, repeat: Infinity, ease: "easeInOut", times: [0, 0.42, 0.46, 0.5, 0.72, 0.76, 0.8, 0.84, 1] }
          }
          style={{ transformOrigin: "32px 30px" }}
        >
          <circle cx="23" cy="30" r="4" fill="white" />
          <circle cx="41" cy="30" r="4" fill="white" />
          <circle cx="24" cy="30" r="2" fill="#18181B" />
          <circle cx="42" cy="30" r="2" fill="#18181B" />
        </motion.g>

        {/* Mouth */}
        {happy ? (
          <path d="M22 41 Q32 50 42 41" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" />
        ) : thinking ? (
          <circle cx="32" cy="43" r="2.4" fill="white" />
        ) : (
          <path d="M24 42 Q32 47 40 42" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" />
        )}

        {/* A small orange "spark" accent — the only non-blue brand color on the face, reads as a little life/energy cue */}
        <motion.circle
          cx="50"
          cy="14"
          r="4"
          fill="var(--weeggo-orange)"
          animate={{ scale: [1, 1.25, 1], opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </motion.div>
  )
}
