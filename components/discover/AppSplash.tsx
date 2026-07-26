"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

import { Logo } from "@/components/Logo";

export function AppSplash({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1300);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="weeggo-bg flex h-dvh flex-col items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center gap-[3px] text-[34px]"
      >
        <Logo dot={false} />
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, duration: 0.3, ease: "backOut" }}
          className="ml-1 inline-block size-2.5 rounded-full"
          style={{ background: "var(--weeggo-green)" }}
        />
      </motion.div>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 64 }}
        transition={{ delay: 0.3, duration: 0.7, ease: "easeInOut" }}
        className="mt-5 h-[3px] overflow-hidden rounded-full"
        style={{ background: "var(--weeggo-blue)" }}
      />
    </motion.div>
  );
}
