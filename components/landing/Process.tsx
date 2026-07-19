import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import SectionTitle from "@/components/common/SectionTitle";
import ProcessStep from "./ProcessStep";
import { MessagesSquare, Brain, User, Gem } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Conversamos",
    icon: <MessagesSquare />,
    description:
      "Comenzamos entendiendo tu estilo de vida, objetivos, preferencias y expectativas mediante una entrevista guiada.",
  },
  {
    number: "02",
    title: "Analizamos",
    icon: <Brain />,
    description:
      "Nuestra inteligencia analiza tus respuestas y encuentra propiedades que realmente se alinean con tu perfil.",
  },
  {
    number: "03",
    title: "Seleccionamos",
    icon: <Gem />,
    description:
      "Recibís una selección privada y cuidadosamente curada de oportunidades, evitando horas de búsqueda.",
  },
  {
    number: "04",
    title: "Te acompañamos",
    icon: <User />,
    description:
      "Un asesor especializado continúa el proceso personalmente hasta encontrar la propiedad ideal.",
  },
];

export default function Process() {
  return (
    <Section
      id="proceso"
      className="bg-[#faf8f4]"
    >
      <Container>

        <SectionTitle
          centered
          eyebrow="Nuestro proceso"
          title="Una experiencia diseñada para ahorrar tiempo y encontrar mejores oportunidades."
          description="Domusai transforma una búsqueda inmobiliaria compleja en una experiencia privada, inteligente y completamente personalizada."
        />

        <div className="relative mt-24">

          <div className="absolute left-5 top-0 hidden h-full w-px bg-neutral-300 lg:block" />

          <div className="space-y-24">

            {steps.map((step) => (
              <ProcessStep
                key={step.number}
                {...step}
              />
            ))}

          </div>

        </div>

      </Container>
    </Section>
  );
}