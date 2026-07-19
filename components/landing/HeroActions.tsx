import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroActions() {
  return (
    <div className="mt-14 flex flex-wrap gap-6">

      <Link
        href="/wizard"
        className="
        inline-flex
        items-center
        justify-center
        bg-[#d7c3a0]
        px-9
        py-5
        text-sm
        font-semibold
        uppercase
        tracking-[0.25em]
        text-black
        transition-all
        duration-300
        hover:scale-[1.02]
        hover:bg-white
        "
      >
        Iniciar Búsqueda Privada
      </Link>

      <Link
        href="#proceso"
        className="
        inline-flex
        items-center
        gap-3
        text-sm
        uppercase
        tracking-[0.25em]
        text-white
        transition-all
        hover:text-[#d7c3a0]
        "
      >
        Cómo funciona

        <ArrowRight size={16} />

      </Link>

    </div>
  );
}