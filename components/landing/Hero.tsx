import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import HeroBadge from "./HeroBadge";
import HeroActions from "./HeroActions";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background */}

      <Image
        src="/images/hero.png"
        alt="Luxury Property"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-black/45" />

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />

      <Container className="relative z-10 pt-28">

        <div className="max-w-3xl">

          <HeroBadge />

          <h1 className="mt-10 font-serif text-6xl font-light leading-[1.05] text-white md:text-7xl xl:text-8xl">
              Mas que de <span className="text-[#909090]">propiedades</span>
            <br />
             Entendemos tu forma de <span className="text-[#909090]">vida</span>.
          </h1>

          <div className="mt-10 h-px w-24 bg-[#d7c3a0]" />

          <p className="mt-10 max-w-xl text-lg leading-8 text-white/80">
            Domusai entiende tus necesidades y encuentra
            propiedades excepcionales alineadas con tu
            estilo de vida mediante una experiencia
            privada y personalizada.
          </p>

          <HeroActions />

        </div>

      </Container>

      {/* Scroll Indicator */}

      <Link
        href="#proceso"
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3">

          <span className="text-[11px] uppercase tracking-[0.35em] text-white/70">
            Descubrir
          </span>

          <div className="flex h-12 w-7 justify-center rounded-full border border-white/40">

            <div className="mt-2 h-2 w-2 rounded-full bg-white animate-bounce" />

          </div>

        </div>
      </Link>

    </section>
  );
}