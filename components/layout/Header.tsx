"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  {
    label: "Cómo funciona",
    href: "#proceso",
  },
  {
    label: "Propiedades",
    href: "#propiedades",
  },
  {
    label: "Servicios",
    href: "#servicios",
  },
  {
    label: "Compradores Internacionales",
    href: "#internacional",
  },
  {
    label: "Nosotros",
    href: "#nosotros",
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-black/60 backdrop-blur-xl"
            : "bg-black/70"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          {/* Logo */}

          <Link
            href="/"
            aria-label="Domusai - Inicio"
            className="text-3xl font-light tracking-[0.42em] text-white transition hover:text-[#d7c3a0]"
          >
            DOMUSAI
          </Link>

          {/* Desktop Navigation */}

          <nav
            aria-label="Navegación principal"
            className="hidden items-center gap-10 lg:flex"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs uppercase tracking-[0.18em] text-white/90 transition-colors duration-300 hover:text-[#d7c3a0]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}

          <Button
            size="lg"
            onClick={() => (window.location.href = "/wizard")}
            aria-label="Comenzar consulta privada"
            className="hidden rounded-sm bg-[#d7c3a0] px-8 py-7 text-xs font-semibold uppercase tracking-[0.18em] text-black transition-all duration-300 hover:bg-white lg:flex"
          >
            Consulta Privada
          </Button>

          {/* Mobile Toggle */}

          <button
            type="button"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white transition-colors duration-300 hover:text-[#d7c3a0] lg:hidden"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-black/95 transition-all duration-500 lg:hidden ${
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <nav
          aria-label="Menú móvil"
          className="flex h-full flex-col items-center justify-center gap-10"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="text-lg uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:text-[#d7c3a0]"
            >
              {item.label}
            </Link>
          ))}

          <Button
            size="lg"
            aria-label="Comenzar consulta privada"
            className="mt-6 rounded-sm bg-[#d7c3a0] px-8 py-7 text-xs font-semibold uppercase tracking-[0.18em] text-black transition-all duration-300 hover:bg-white"
            onClick={() => {
              setMobileOpen(false);
              window.location.href = "/wizard";
            }}
          >
            Consulta Privada
          </Button>
        </nav>
      </div>
    </>
  );
}