"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function BottomNavigation() {
  const router = useRouter();

  return (
    <motion.div
      initial={{
        y: 120,
      }}
      animate={{
        y: 0,
      }}
      transition={{
        delay: 1.5,
        duration: 0.5,
      }}
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-40
        border-t
        border-white/10
        bg-[#111111]/80
        backdrop-blur-2xl
        px-6
        pt-4
        pb-[calc(env(safe-area-inset-bottom)+18px)]
      "
    >
      <div
        className="
          mx-auto
          flex
          max-w-xl
          items-center
          gap-4
        "
      >
        <button
          onClick={() => router.push("/wizard")}
          className="
            flex
            h-14
            flex-1
            items-center
            justify-center
            gap-3
            rounded-full
            bg-[#C8AD7F]
            text-sm
            font-semibold
            tracking-[0.15em]
            uppercase
            text-[#111111]
            shadow-[0_12px_40px_rgba(200,173,127,.25)]
            transition
            hover:scale-[1.02]
            active:scale-[0.98]
          "
        >
          Comenzar evaluación

          <ArrowRight
            size={18}
            strokeWidth={2}
          />
        </button>
      </div>
    </motion.div>
  );
}