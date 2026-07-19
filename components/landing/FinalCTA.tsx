import Link from "next/link";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

export default function FinalCTA() {
  return (
    <Section className="bg-[#f8f6f2]">

      <Container>

        <div className="mx-auto max-w-4xl text-center">

          <span className="text-xs uppercase tracking-[0.35em] text-neutral-500">
            EXPERIENCIA PRIVADA
          </span>

          <h2 className="mt-8 font-serif text-6xl leading-tight text-neutral-900">
            La propiedad ideal
            comienza con una conversación.
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-neutral-600">
            Permitinos conocer tus objetivos.
            Domusai preparará una selección privada
            de oportunidades adaptadas exclusivamente
            a tus necesidades.
          </p>

          <Link
            href="/wizard"
            className="
              mt-14
              inline-flex
              bg-black
              px-10
              py-6
              text-sm
              font-semibold
              uppercase
              tracking-[0.3em]
              text-white
              transition
              hover:bg-[#d7c3a0]
              hover:text-black
            "
          >
            Iniciar Búsqueda Privada
          </Link>

        </div>

      </Container>

    </Section>
  );
}