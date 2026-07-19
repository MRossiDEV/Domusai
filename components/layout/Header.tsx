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
    label: "Para compradores internacionales",
    href: "#internacional",
  },
  {
    label: "Sobre nosotros",
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
            ? "border-b border-white/10 bg-black/55 backdrop-blur-xl"
            : "bg-black/70"
        }`}
      >
        <div className="mx-auto flex h-15 max-w-7xl items-center justify-between px-6 lg:px-10">
          {/* Logo */}

          <Link
            href="/"
            className="text-3xl font-light tracking-[0.45em] text-white mr-8"
          >
            DOMUSAI
          </Link>

          {/* Desktop */}

          <nav className="hidden items-center gap-10 lg:flex mr-8">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-xs font-medium uppercase tracking-[0.18em] text-white/90 transition hover:text-[#d6b98c]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}

          <div className="hidden lg:block">
            <Button
              size="lg"
              className="rounded-md bg-[#d9c2a0] px-8 py-7 text-xs font-semibold uppercase tracking-[0.15em] text-black transition hover:bg-[#e6d2b5]"
            >
              Consulta Privada
            </Button>
          </div>

          {/* Mobile */}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white lg:hidden"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}

      <div
        className={`fixed inset-0 z-40 bg-black/95 transition-all duration-500 lg:hidden ${
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-10">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="text-lg uppercase tracking-[0.18em] text-white"
            >
              {item.label}
            </Link>
          ))}

          <Button
            className="mt-8 rounded-none bg-[#d9c2a0] px-8 py-7 uppercase tracking-[0.18em] text-black"
          >
            Consulta Privada
          </Button>
        </div>
      </div>
    </>
  );
}