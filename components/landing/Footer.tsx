import Link from "next/link";
import Container from "../layout/Container";

export default function Footer() {
  return (
    <footer className="bg-black py-20 text-white">

      <Container>

        <div className="grid gap-16 lg:grid-cols-4">

          <div>

            <h2 className="text-3xl font-light tracking-[0.4em]">
              DOMUSAI
            </h2>

            <p className="mt-8 max-w-sm leading-8 text-white/60">
              Inteligencia inmobiliaria
              para compradores que buscan
              una experiencia privada,
              personalizada y excepcional.
            </p>

          </div>

          <div>

            <h3 className="mb-6 uppercase tracking-[0.25em] text-[#d7c3a0]">
              Navegación
            </h3>

            <div className="space-y-4">

              <Link href="#proceso" className="block hover:text-[#d7c3a0]">
                Cómo funciona
              </Link>

              <Link href="#propiedades" className="block hover:text-[#d7c3a0]">
                Oportunidades
              </Link>

              <Link href="#internacional" className="block hover:text-[#d7c3a0]">
                Internacional
              </Link>

            </div>

          </div>

          <div>

            <h3 className="mb-6 uppercase tracking-[0.25em] text-[#d7c3a0]">
              Contacto
            </h3>

            <div className="space-y-3 text-white/70">

              <p>hola@domusai.com</p>

              <p>+598 99 999 999</p>

              <p>Montevideo, Uruguay</p>

            </div>

          </div>

          <div>

            <h3 className="mb-6 uppercase tracking-[0.25em] text-[#d7c3a0]">
              Seguinos
            </h3>

            <div className="space-y-4">

              <Link href="#">
                Instagram
              </Link>

              <Link href="#">
                LinkedIn
              </Link>

            </div>

          </div>

        </div>

        <div className="mt-20 border-t border-white/10 pt-8 text-sm text-white/40">

          © {new Date().getFullYear()} Domusai.
          Todos los derechos reservados.

        </div>

      </Container>

    </footer>
  );
}