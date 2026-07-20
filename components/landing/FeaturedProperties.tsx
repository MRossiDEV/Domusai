import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import SectionTitle from "@/components/common/SectionTitle";
import PropertyCard from "./PropertyCard";

const properties = [
  {
    image: "/images/property-1.png",
    city: "José Ignacio",
    title: "Residencia Frente al Mar",
    badge: "Off Market",
    description:
      "Una residencia diseñada para quienes buscan privacidad absoluta, vistas abiertas al océano y una arquitectura que se integra naturalmente con el paisaje.",
    specs: "5 Dormitorios • 620 m²",
    tags: [
      "Frente al mar",
      "Arquitectura de autor",
      "Privacidad absoluta",
    ],
  },
  {
    image: "/images/property-2.png",
    city: "Carrasco",
    title: "Arquitectura Contemporánea",
    badge: "Selección Privada",
    description:
      "Diseño contemporáneo, espacios luminosos y una ubicación privilegiada en uno de los barrios más exclusivos de Montevideo.",
    specs: "4 Dormitorios • 540 m²",
    tags: [
      "Barrio exclusivo",
      "Diseño contemporáneo",
      "Jardín privado",
    ],
  },
  {
    image: "/images/property-3.png",
    city: "Punta del Este",
    title: "Penthouse Exclusivo",
    badge: "Vista Panorámica",
    description:
      "Un penthouse con vistas panorámicas al mar, amplias terrazas y una experiencia residencial pensada para disfrutar cada detalle.",
    specs: "4 Dormitorios • 510 m²",
    tags: [
      "Vista al océano",
      "Terraza privada",
      "Alta demanda",
    ],
  },
  {
    image: "/images/property-4.png",
    city: "La Barra",
    title: "Villa Moderna",
    badge: "Nueva Incorporación",
    description:
      "Una villa contemporánea rodeada de naturaleza, ideal para quienes buscan tranquilidad sin renunciar al diseño y la exclusividad.",
    specs: "4 Dormitorios • 480 m²",
    tags: [
      "Piscina",
      "Entorno natural",
      "Alta valorización",
    ],
  },
];

export default function FeaturedProperties() {
  return (
    <Section
      id="propiedades"
      aria-labelledby="featured-properties-title"
      className="bg-black text-white"
    >
      <Container>
        <SectionTitle
          centered
          eyebrow="Selección Privada"
          title={
            <>
              Algunas de las{" "}
              <span className="text-[#d7c3a0]">
                oportunidades
              </span>{" "}
              que nuestros compradores han descubierto.
            </>
          }
          description={
            <>
              Cada propiedad presentada por Domusai ha sido previamente
              seleccionada por su calidad, ubicación y potencial.
              Nuestro objetivo no es mostrar miles de opciones, sino
              encontrar aquellas que realmente encajan con cada comprador.
            </>
          }
        />

        <div className="mt-20 flex flex-col gap-8">
          <div className="w-full">
            <PropertyCard
              featured
              {...properties[0]}
            />
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {properties.slice(1).map((property) => (
              <PropertyCard
                key={property.title}
                {...property}
              />
            ))}
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-4xl text-center">
          <p className="text-lg leading-8 text-white/70">
            Estas propiedades representan únicamente una pequeña muestra
            del tipo de oportunidades que podemos identificar.
            La mayoría de nuestras recomendaciones se generan de forma
            personalizada según el perfil y los objetivos de cada comprador.
          </p>
        </div>
      </Container>
    </Section>
  );
}