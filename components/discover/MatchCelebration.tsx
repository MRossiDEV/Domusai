"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { priceFor } from "@/lib/discover/scoring";
import type { Listing, Mode } from "@/lib/discover/types";
import { ViewingForm } from "./ViewingForm";

const SPARK_COLORS = ["var(--weeggo-orange)", "var(--weeggo-blue)", "var(--weeggo-green)"];

/** Angle/distance for each spark burst around the badge — fixed, not random, so SSR/CSR match. */
const SPARKS = Array.from({ length: 10 }, (_, i) => {
  const angle = (i / 10) * Math.PI * 2;
  return { x: Math.cos(angle) * 90, y: Math.sin(angle) * 90, color: SPARK_COLORS[i % SPARK_COLORS.length] };
});

/**
 * A rare, full-screen interrupt shown only when a swipe-right lands on a
 * genuinely high-scoring listing — the "it's a match" beat from dating apps,
 * repurposed to catch a visitor at peak interest and offer the one action
 * that matters (booking a viewing) before that interest fades into a
 * shortlist they forget about.
 */
export function MatchCelebration({
  listing,
  mode,
  score,
  onDismiss,
}: {
  listing: Listing | null;
  mode: Mode;
  score: number;
  onDismiss: () => void;
}) {
  const [showForm, setShowForm] = useState(false);

  function close() {
    setShowForm(false);
    onDismiss();
  }

  return (
    <AnimatePresence onExitComplete={() => setShowForm(false)}>
      {listing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="theme-weeggo fixed inset-0 z-[80] flex flex-col items-center justify-center bg-black/70 px-6 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="relative w-full max-w-sm overflow-hidden rounded-[var(--weeggo-radius-lg)] bg-card text-foreground shadow-[0_30px_70px_-20px_rgba(0,0,0,0.5)]"
          >
            <button
              type="button"
              aria-label="Dismiss"
              onClick={close}
              className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full bg-black/30 text-white"
            >
              <X className="size-4" />
            </button>

            <div className="relative flex flex-col items-center pt-9 pb-5 text-center" style={{ background: "var(--weeggo-blue-tint)" }}>
              <div className="relative flex size-20 items-center justify-center">
                {SPARKS.map((s, i) => (
                  <motion.span
                    key={i}
                    className="absolute size-1.5 rounded-full"
                    style={{ background: s.color }}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{ x: s.x, y: s.y, opacity: 0, scale: 0 }}
                    transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                  />
                ))}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 400, damping: 14 }}
                  className="flex size-20 items-center justify-center rounded-full text-3xl font-extrabold text-white shadow-[0_10px_30px_-8px_rgba(79,70,229,0.5)]"
                  style={{ background: "linear-gradient(135deg, var(--weeggo-blue), var(--weeggo-blue-dark))" }}
                >
                  {score}%
                </motion.div>
              </div>

              <h2 className="mt-4 text-[22px] font-extrabold tracking-tight">It&apos;s a match!</h2>
              <p className="mt-1 max-w-[240px] text-[13px] leading-snug text-muted-foreground">
                This one lines up with what you&apos;re after better than almost anything else in your deck.
              </p>
            </div>

            <div className="p-5">
              <div className="mb-4 flex gap-3 rounded-2xl border border-border p-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary Supabase-stored URL */}
                <img src={listing.image} alt={listing.title} className="size-16 shrink-0 rounded-xl object-cover" />
                <div className="min-w-0 py-0.5">
                  <div className="truncate text-[15px] font-extrabold">{priceFor(listing, mode)}</div>
                  <div className="truncate text-[12.5px] font-semibold text-muted-foreground">
                    {listing.title} · {listing.city}
                  </div>
                </div>
              </div>

              {showForm ? (
                <ViewingForm listing={listing} onDone={close} />
              ) : (
                <div className="flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowForm(true)}
                    className="w-full rounded-[var(--weeggo-radius-md)] py-[13px] text-[13.5px] font-bold text-white"
                    style={{ background: "var(--weeggo-blue)" }}
                  >
                    Book a viewing
                  </button>
                  <button
                    type="button"
                    onClick={close}
                    className="w-full py-1 text-[13px] font-bold text-muted-foreground"
                  >
                    Keep swiping
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
