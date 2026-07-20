"use client";

import Image from "next/image";
import {
  Globe,
  User,
  Key,
  BarChart2,
} from "lucide-react";

import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import ServiceCard from "./ServiceCard";
import SectionTitle from "../common/SectionTitle";

const services = [
  {
    id: 1,
    title: "Selección Personalizada",
    description:
      "Cada propiedad es elegida según tu estilo de vida, objetivos y preferencias. Sin catálogos interminables, solo oportunidades relevantes.",
    icon: Globe,
  },
  {
    id: 2,
    title: "Asesor Privado",
    description:
      "Un especialista te acompaña durante todo el proceso con absoluta discreción, transparencia y atención personalizada.",
    icon: User,
  },
  {
    id: 3,
    title: "Acceso Exclusivo",
    description:
      "Descubrí oportunidades que rara vez llegan al mercado abierto gracias a nuestra red de aliados y propiedades seleccionadas.",
    icon: Key,
  },
  {
    id: 4,
    title: "Compra con Confianza",
    description:
      "Combinamos inteligencia, experiencia y análisis para ayudarte a tomar decisiones informadas con total tranquilidad.",
    icon: BarChart2,
  },
];

export default function Services() {
  return (
    <Section
      id="services"
      className="relative overflow-hidden bg-black text-white"
    >
      {/* Background */}

      <Image
        src="/images/luxury-desk.png"
        alt="Luxury Background"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-black/75" />

      {/* Content */}

      <Container className="relative z-10">

        <div className="mb-20 max-w-3xl">

          {/* <span className="text-xs uppercase tracking-[0.35em] text-[#d7c3a0]">
            SERVICIOS
          </span> */}
          <SectionTitle
            centered
            eyebrow="QUE OFRECEMOS"
            title={
              <>
                <span className="text-[#d7c3a0]">Una experiencia diseñada para </span>
                <span className="text-gray-500">ahorrar tiempo</span>
                <span className="text-[#d7c3a0]"> y encontrar </span>
                <span className="text-gray-500">mejores oportunidades</span>.
              </>
            }
            description={
              <>
                <span className="font-semibold text-gray-500">DOMUSAI</span> transforma una
                búsqueda inmobiliaria compleja en una experiencia
                <span className="text-[#d7c3a0]">personalizada que 
                combina inteligencia artificial con </span>asesoramiento humano experto
            para ofrecer una experiencia privada, exclusiva y completamente
            personalizada.
              </>
            }
          />

          <p className="mt-8 text-lg leading-8 text-white/70">
            Domusai combina inteligencia artificial con asesoramiento humano experto
            para ofrecer una experiencia privada, exclusiva y completamente
            personalizada.
          </p>

        </div>

        <div className="flex flex-wrap gap-8 lg:flex-nowrap">
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