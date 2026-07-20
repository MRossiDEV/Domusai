import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import SectionTitle from "@/components/common/SectionTitle";
import ProcessStep from "./ProcessStep";
import {
  MessagesSquare,
  Brain,
  Gem,
  User,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Conocemos tus objetivos",
    icon: <MessagesSquare />,
    description:
      "Una breve entrevista nos permite comprender tu estilo de vida, prioridades, presupuesto y expectativas antes de buscar una sola propiedad.",
  },
  {
    number: "02",
    title: "Analizamos tu perfil",
    icon: <Brain />,
    description:
      "Nuestro sistema identifica las oportunidades que realmente coinciden con tus necesidades, descartando cientos de propiedades irrelevantes.",
  },
  {
    number: "03",
    title: "Seleccionamos oportunidades",
    icon: <Gem />,
    description:
      "Recibís una selección privada de propiedades cuidadosamente curada por nuestros especialistas, optimizando tu tiempo y mejorando la calidad de cada opción.",
  },
  {
    number: "04",
    title: "Te acompañamos",
    icon: <User />,
    description:
      "Un asesor inmobiliario continúa el proceso personalmente, coordinando visitas, respondiendo consultas y acompañándote hasta concretar la compra.",
  },
];

export default function Process() {
  return (
    <Section
      id="proceso"
      aria-labelledby="process-title"
      className="bg-[#faf8f4]"
    >
      <Container>
        <SectionTitle
          centered
          eyebrow="Nuestro proceso"
          title={
            <>
              Una experiencia diseñada para{" "}
              <span className="text-[#d7c3a0]">
                ahorrar tiempo
              </span>{" "}
              y descubrir{" "}
              <span className="text-[#d7c3a0]">
                mejores oportunidades
              </span>
              .
            </>
          }
          description={
            <>
              <span className="font-semibold text-neutral-900">
                Domusai
              </span>{" "}
              transforma una búsqueda inmobiliaria compleja en una experiencia{" "}
              <span className="text-[#d7c3a0]">privada</span>,{" "}
              <span className="text-[#d7c3a0]">inteligente</span> y{" "}
              <span className="text-[#d7c3a0]">personalizada</span>,
              diseñada para compradores que valoran su tiempo y buscan
              propiedades exclusivas en Uruguay.
            </>
          }
        />

        <div className="relative mt-24">
          <div className="absolute left-5 top-0 hidden h-full w-px bg-neutral-300 lg:block" />

          <div className="space-y-24">
            {steps.map((step) => (
              <article key={step.number}>
                <ProcessStep {...step} />
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}