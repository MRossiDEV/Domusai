import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { ArrowRight } from "lucide-react";

export default function InternationalBuyers() {
  return (
    <Section
      id="internacional"
      className="relative overflow-hidden py-40 text-white"
    >
      <Image
        src="/images/uruguay.png"
        alt="Uruguay"
        fill
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/70" />

      <Container className="relative z-10">

        <div className="max-w-3xl">

          <span className="text-xs uppercase tracking-[0.35em] text-[#d7c3a0]">
            COMPRADORES INTERNACIONALES
          </span>

          <h2 className="mt-8 font-serif text-6xl leading-tight">
            Uruguay puede ser
            <br />
            tu próximo hogar.
          </h2>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/80">
            Domusai acompaña compradores internacionales
            durante todo el proceso de búsqueda,
            inversión y relocalización,
            trabajando junto a profesionales locales
            de confianza.
          </p>

          <div className="mt-12 flex flex-wrap gap-5">

            <Link
              href="/wizard"
              className="bg-[#d7c3a0] px-8 py-5 text-sm font-semibold uppercase tracking-[0.25em] text-black transition hover:bg-white"
            >
              Comenzar Consulta
            </Link>

            <Link
              href="#"
              className="inline-flex items-center gap-3 uppercase tracking-[0.2em] text-white hover:text-[#d7c3a0]"
            >
              Saber más

              <ArrowRight size={16} />

            </Link>

          </div>

        </div>

      </Container>

    </Section>
  );
}