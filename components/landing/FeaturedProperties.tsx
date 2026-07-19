import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import SectionTitle from "@/components/common/SectionTitle";
import PropertyCard from "./PropertyCard";

const properties = [
  {
    image: "/images/property-1.png",
    city: "José Ignacio",
    title: "Residencia Frente al Mar",
    price: "USD 2.850.000",
    specs: "5 Dormitorios • 6 Baños • 620 m²",
  },
  {
    image: "/images/property-2.png",
    city: "Carrasco",
    title: "Arquitectura Contemporánea",
    price: "USD 1.980.000",
    specs: "4 Dormitorios • 5 Baños • 540 m²",
  },
  {
    image: "/images/property-3.png",
    city: "Punta del Este",
    title: "Penthouse Exclusivo",
    price: "USD 3.250.000",
    specs: "4 Dormitorios • Vista al Mar • 510 m²",
  },
  {
    image: "/images/property-4.png",
    city: "La Barra",
    title: "Villa Moderna con Piscina",
    price: "USD 2.450.000",
    specs: "4 Dormitorios • 4 Baños • 480 m²",
  }
];

export default function FeaturedProperties() {
  return (
    <Section
      id="propiedades"
      className="bg-black text-white"
    >
      <Container>

        <SectionTitle
          eyebrow="Selección Privada"
          title="Oportunidades cuidadosamente elegidas."
          description="Cada propiedad ha sido seleccionada por su calidad arquitectónica, ubicación y potencial. Esto no es un catálogo; es una muestra del nivel de oportunidades que Domusai representa."
        />

        <div className="mt-20 flex flex-col">

          <div className="w-full ">
            <PropertyCard featured {...properties[0]} />
          </div>

          <div className="flex flex-row flex-wrap justify-between gap-6 mt-6 lg:flex-nowrap">
            <PropertyCard {...properties[1]} />
            <PropertyCard  {...properties[2]} />
            <PropertyCard  {...properties[3]} />

          </div>

        </div>

      </Container>
    </Section>
  );
}