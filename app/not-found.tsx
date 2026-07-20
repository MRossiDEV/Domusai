import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="max-w-xl text-center">

        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#d7c3a0]">
          Error 404
        </p>

        <h1 className="font-serif text-6xl leading-tight">
          Esta página no existe.
        </h1>

        <p className="mt-8 text-lg leading-8 text-white/70">
          Es posible que el contenido haya cambiado o la dirección sea incorrecta.
        </p>

        <Link
          href="/"
          className="mt-12 inline-flex bg-[#d7c3a0] px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-black transition hover:bg-white"
        >
          Volver al inicio
        </Link>

      </div>
    </main>
  );
}