"use client";

import Link from "next/link";
import { CircleUserRound } from "lucide-react";

import { useDiscover } from "@/lib/discover/filters-context";
import type { Mode } from "@/lib/discover/types";
import { Logo } from "@/components/Logo";

const MODES: { value: Mode; label: string }[] = [
  { value: "buy", label: "Buy" },
  { value: "rent", label: "Rent" },
  { value: "invest", label: "Invest" },
];

export function AppHeader() {
  const { mode, setMode } = useDiscover();

  return (
    <header className="shrink-0 border-b border-border bg-card px-5 pt-5 pb-3 safe-top">
      <div className="mb-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Logo className="text-[21px]" />
        </Link>

        <Link
          href="/profile"
          aria-label="Profile"
          className="flex size-[38px] items-center justify-center rounded-full bg-secondary text-foreground"
        >
          <CircleUserRound className="size-[18px]" />
        </Link>
      </div>

      <div className="flex gap-0.5 rounded-full bg-secondary p-1">
        {MODES.map((m) => (
          <button
            key={m.value}
            type="button"
            onClick={() => setMode(m.value)}
            className={`flex-1 rounded-full px-1 py-2.5 text-[12.5px] font-bold tracking-wide transition-colors ${
              mode === m.value
                ? "bg-card text-primary shadow-[0_3px_10px_-3px_rgba(79,70,229,0.35)]"
                : "text-muted-foreground"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
    </header>
  );
}
