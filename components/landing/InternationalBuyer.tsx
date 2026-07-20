import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Globe,
  ShieldCheck,
  Landmark,
  Award,
} from "lucide-react";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import SectionTitle from "@/components/common/SectionTitle";
import InternationalFeatureCard from "@/components/landing/InternationalFeatureCard";

export default function InternationalBuyers() {
  return (
    <Section
      id="internacional"
      className="relative overflow-hidden text-white"
    >
      {/* Background */}

      <Image
        src="/images/uruguay.png"
        alt="Paisajes y propiedades exclusivas en Uruguay"
        fill
        sizes="100vw"
        className="object-cover"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-black/75" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

      <Container className="relative z-10">

        <div className="max-w-4xl">

          <SectionTitle
            eyebrow="COMPRADORES INTERNACIONALES"
            title={
              <>
                Uruguay es mucho más que una{" "}
                <span className="text-[#d7c3a0]">
                  inversión inmobiliaria
                </span>
                .
              </>
            }
            description={
              <>
                Acompañamos compradores internacionales que buscan establecerse,
                invertir o adquirir una segunda residencia en Uruguay, ofreciendo
                asesoramiento local, representación profesional y una experiencia
                completamente personalizada.
              </>
            }
          />

          <div className="mt-12 flex flex-wrap gap-5">

            <Link
              href="/wizard"
              className="rounded-md bg-[#d7c3a0] px-8 py-5 text-sm font-semibold uppercase tracking-[0.25em] text-black transition hover:bg-white"
            >
              Comenzar Evaluación
            </Link>

            <Link
              href="#proceso"
              className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-white transition hover:text-[#d7c3a0]"
            >
              Cómo funciona

              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

          </div>

          <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            <InternationalFeatureCard
              icon={<Globe className="h-6 w-6" />}
              title="Proceso Internacional"
              description="Asistencia remota para compradores que desean invertir o mudarse a Uruguay desde cualquier parte del mundo."
            />

            <InternationalFeatureCard
              icon={<ShieldCheck className="h-6 w-6" />}
              title="Privacidad"
              description="Tratamos cada consulta con absoluta confidencialidad y un acompañamiento profesional durante todo el proceso."
            />

            <InternationalFeatureCard
              icon={<Landmark className="h-6 w-6" />}
              title="Asistencia Local"
              description="Coordinamos cada etapa junto a profesionales inmobiliarios y especialistas locales de confianza."
            />

            <InternationalFeatureCard
              icon={<Award className="h-6 w-6" />}
              title="Compra Segura"
              description="Te ayudamos a tomar decisiones informadas mediante análisis, experiencia y acompañamiento personalizado."
            />

          </div>

        </div>

      </Container>
    </Section>
  );
}