import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import HeroBadge from "./HeroBadge";
import HeroActions from "./HeroActions";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pb-10">
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

          <h1 className="mt-10 font-serif text-5xl font-light leading-[1.05] text-white md:text-6xl xl:text-7xl">
              Mas que de <span className="text-[#909090]">propiedades</span>
            <br />
            Entendemos <span className="text-[#909090] italic">tu</span>
            <br />
            forma de <span className="text-[#909090]">vida</span>.
          </h1>

          {/* <div className="mt-10 h-px w-24 bg-[#d7c3a0]" /> */}

          <p className="mt-10 max-w-xl text-lg leading-8 text-white/80">
            Domusai entiende tus necesidades y encuentra
            propiedades excepcionales alineadas con tu
            estilo de vida mediante una experiencia
            privada y personalizada.
          </p>

          <HeroActions />

        </div>

      </Container>



    </section>
  );
}