"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { DollarSign, Home, Key, TrendingUp } from "lucide-react";

import { useDiscover } from "@/lib/discover/filters-context";
import { Logo } from "@/components/Logo";

export default function LandingPage() {
  const router = useRouter();
  const { completeOnboarding, visitorName } = useDiscover();

  function skip() {
    completeOnboarding();
    router.push("/");
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="theme-weeggo weeggo-bg relative flex h-dvh flex-col justify-between overflow-hidden px-6 pb-10 pt-14 text-center text-foreground safe-top safe-bottom"
    >

      <div className="weeggo-blob-field">
        <div
          className="weeggo-blob weeggo-blob-a size-[340px] -left-24 -top-20"
          style={{ background: "var(--weeggo-blue)", opacity: 0.22 }}
        />
        <div
          className="weeggo-blob weeggo-blob-b size-[380px] -right-28 -bottom-24"
          style={{ background: "var(--weeggo-orange)", opacity: 0.2 }}
        />
        <div
          className="weeggo-blob weeggo-blob-c size-[260px] left-1/2 top-1/3"
          style={{ background: "var(--weeggo-green)", opacity: 0.16 }}
        />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
        {/* <div className="absolute inset-0 bg-black/10" /> */}
        <h2 className="text-sm font-semibold tracking-[0.3em] text-[var(--weeggo-orange)] ">
          BIENVENIDOS A
        </h2>

        <Logo className="justify-center text-6xl mb-6" />
        <h2 className="text-xl font-semibold tracking-[0.3em] text-[var(--weeggo-orange)] mb-4">
          HOME 
        </h2>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-2xl font-extrabold leading-[1.1] tracking-tight"
        >
          {
            visitorName
              ? `Hola de nuevo, ${visitorName}`
              : "Una nueva forma de encontrar lo que buscas"
          }
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mx-auto mt-4 max-w-[280px] text-[14px] leading-relaxed text-muted-foreground"
        >
          Cuentale a nuestro asistente lo que estas buscando y te armaremos una selección de propiedades a tu medida.
         
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8 flex gap-3"
        >
          <FeatureBadge icon={Home} label="Comprar" color="var(--weeggo-blue)" />
          <FeatureBadge icon={Key} label="Alquilar" color="var(--weeggo-green)" />
          <FeatureBadge icon={DollarSign} label="Vender" color="var(--weeggo-red)" />
          <FeatureBadge icon={TrendingUp} label="Invertir" color="var(--weeggo-orange)" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="relative z-10 flex flex-col items-center gap-3"
      >
        <button
          type="button"
          onClick={() => router.push("/wizard")}
          className="w-full max-w-[320px] rounded-[var(--weeggo-radius-md)] py-[15px] text-[14px] font-bold text-white shadow-[0_10px_24px_-8px_rgba(79,70,229,0.45)] bg-[var(--weeggo-orange)] hover:bg-[var(--weeggo-orange-2)] active:bg-[var(--weeggo-orange-2)]"
          
        >
          Comenzar
        </button>
        <button type="button" onClick={skip} className="text-xs font-semibold text-muted-foreground mb-4 underline">
          salteate el asistente 
        </button>
      </motion.div>
    </motion.div>
  );
}

function FeatureBadge({
  icon: Icon,
  label,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  color: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="flex size-11 items-center justify-center rounded-full text-white" style={{ background: color }}>
        <Icon className="size-[18px]" />
      </span>
      <span className="text-[11px] font-bold text-muted-foreground">{label}</span>
    </div>
  );
}
