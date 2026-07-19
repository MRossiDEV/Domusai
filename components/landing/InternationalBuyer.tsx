import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { ArrowRight, Globe, ShieldCheck, Landmark, Award } from "lucide-react";

import InternationalFeatureCard from "@/components/landing/InternationalFeatureCard";

export default function InternationalBuyers() {
  return (
    <Section
      id="internacional"
      className="relative overflow-hidden text-white"
    >
      <Image
        src="/images/uruguay.png"
        alt="Uruguay"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="flex flex-col" >

        <Container className="z-10">


          <div className="max-w-3xl">

            <span className="text-xs uppercase tracking-[0.35em] text-[#d7c3a0]">
              COMPRADORES INTERNACIONALES
            </span>

            <h2 className="mt-8 font-serif text-6xl leading-tight">
              Más que una propiedad.
              <br />
              Un nuevo estilo de vida.
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
                className="bg-[#d7c3a0] rounded-md px-8 py-5 text-sm font-semibold uppercase tracking-[0.25em] text-black transition hover:bg-white"
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

            <div className="mt-24 flex flex-wrap gap-8 lg:flex-nowrap">

              <InternationalFeatureCard
                icon={<Globe className="h-6 w-6" />}
                title="Compradores Internacionales"
                description="Experiencia en procesos remotos y acompañamiento integral desde cualquier parte del mundo"
              />

              <InternationalFeatureCard
                icon={<ShieldCheck className="h-6 w-6" />}
                title="Discrecion Total"
                description="Privacidad y confidencialidad en cada interacción. Tu informació esta protegida"
              />

              <InternationalFeatureCard
                icon={<Landmark className="h-6 w-6" />}
                title="Accesso Exclusivo"
                description="Accedemos a propiedades que rara vez llegan al mercado abierto gracias a nuestra red de aliados y propiedades seleccionadas."
              />

              <InternationalFeatureCard
                icon={<Award className="h-6 w-6" />}
                title="Asesoramiento Experto"
                description="Un equipo de profesionales locales, expertos en propiedades de alto valor"
              />
            </div>

          </div>

        </Container>
        
        </div>


    </Section>
  );
}