"use client"

import Image from "next/image"

export type AssistantState = "idle" | "thinking" | "happy"

interface AssistantAvatarProps {
  state?: AssistantState
  size?: number
}

/** WEEGGO's mascot avatar — public/images/brand/chat-avatar.png, circular with a thin orange border. */
export default function AssistantAvatar({ size = 64 }: AssistantAvatarProps) {
  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-full border-2"
      style={{ width: size, height: size, borderColor: "var(--weeggo-orange)" }}
    >
      <Image src="/images/brand/chat-avatar.png" alt="Wee" fill sizes={`${size}px`} className="object-cover" priority />
    </div>
  )
}
