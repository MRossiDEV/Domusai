import Image from "next/image";
import Container from "@/components/layout/Container";
import HeroBadge from "./HeroBadge";
import HeroActions from "./HeroActions";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Background */}

      <Image
        src="/images/hero.png"
        alt="Residencia contemporánea de lujo en Uruguay"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Overlays */}

      <div className="absolute inset-0 bg-black/45" />

      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />

      <Container className="relative z-10 pt-28">

        <header className="max-w-3xl">

          <HeroBadge />

          <h1
            id="hero-title"
            className="mt-10 font-serif text-5xl font-light leading-[1.05] text-white md:text-6xl xl:text-7xl"
          >
            Más que encontrar{" "}
            <span className="text-[#d7c3a0]">
              propiedades
            </span>

            <br />

            entendemos tu{" "}
            <span className="italic text-[#d7c3a0]">
              estilo de vida
            </span>
            .
          </h1>

          <p className="mt-10 max-w-2xl text-lg leading-9 text-white/80 md:text-xl">
            Domusai es una experiencia privada de búsqueda de{" "}
            <strong className="font-medium text-white">
              propiedades exclusivas en Uruguay
            </strong>
            . Comprendemos tus objetivos, analizamos tus necesidades y
            seleccionamos únicamente oportunidades alineadas con tu estilo
            de vida, inversión y visión de futuro.
          </p>

          <HeroActions />

        </header>

      </Container>
    </section>
  );
}