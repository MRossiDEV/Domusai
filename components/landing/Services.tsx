"use client";

import Image from "next/image";
import {
  Globe,
  User,
  Key,
  ShieldCheck,
} from "lucide-react";

import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import SectionTitle from "../common/SectionTitle";
import ServiceCard from "./ServiceCard";

const services = [
  {
    id: 1,
    title: "Selección Inteligente",
    description:
      "Analizamos tus objetivos y preferencias para presentarte únicamente propiedades realmente alineadas con tu perfil.",
    icon: Globe,
  },
  {
    id: 2,
    title: "Representación del Comprador",
    description:
      "Trabajamos del lado del comprador, acompañándote con asesoramiento profesional durante todo el proceso de adquisición.",
    icon: User,
  },
  {
    id: 3,
    title: "Oportunidades Seleccionadas",
    description:
      "Accedé a una selección cuidadosamente curada de propiedades de alto valor, incluyendo oportunidades que muchas veces no llegan al mercado masivo.",
    icon: Key,
  },
  {
    id: 4,
    title: "Decisiones con Confianza",
    description:
      "Combinamos análisis de mercado, experiencia inmobiliaria y tecnología para ayudarte a invertir con mayor seguridad.",
    icon: ShieldCheck,
  },
];

export default function Services() {
  return (
    <Section
      id="servicios"
      className="relative overflow-hidden bg-black text-white"
    >
      {/* Background */}

      <Image
        src="/images/luxury-desk.png"
        alt="Asesor inmobiliario de lujo"
        fill
        sizes="100vw"
        className="object-cover"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-black/80" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />

      <Container className="relative z-10">

        <SectionTitle
          centered
          eyebrow="NUESTRA DIFERENCIA"
          title={
            <>
              Mucho más que una{" "}
              <span className="text-[#d7c3a0]">
                búsqueda inmobiliaria
              </span>
              .
            </>
          }
          description={
            <>
              Domusai combina tecnología, análisis y experiencia humana para
              transformar una búsqueda compleja en un proceso claro,
              personalizado y orientado a encontrar la propiedad adecuada para
              cada comprador.
            </>
          }
        />

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                description={service.description}
                icon={<Icon className="h-6 w-6 text-black" />}
              />
            );
          })}
        </div>

      </Container>
    </Section>
  );
}