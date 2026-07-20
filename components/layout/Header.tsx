"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

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
    label: "Internacional",
    href: "#internacional",
  },
  {
    label: "Nosotros",
    href: "#nosotros",
  },
];

export default function Header() {
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);

  const [visible, setVisible] = useState(true);

  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const current = window.scrollY;

      if (current < 80) {
        setVisible(true);
      } else {
        setVisible(current < lastScroll);
      }

      setLastScroll(current);
    }

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, [lastScroll]);

  return (
    <>
      <motion.header
        initial={{
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -120,
        }}
        transition={{
          duration: 0.35,
        }}
        className="
          fixed
          top-5
          left-1/2
          z-50
          w-[calc(100%-24px)]
          max-w-7xl
          -translate-x-1/2
        "
      >
        <div
          className="
            flex
            h-16
            items-center
            justify-between
            rounded-full
            border
            border-white/10
            bg-black/55
            px-6
            backdrop-blur-2xl
            shadow-[0_20px_60px_rgba(0,0,0,0.35)]
          "
        >
          <Link
            href="/"
            className="
              text-xl
              font-light
              tracking-[0.35em]
              text-white
            "
          >
            DOMUSAI
          </Link>

          <nav
            className="
              hidden
              items-center
              gap-8
              lg:flex
            "
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="
                  text-xs
                  uppercase
                  tracking-[0.2em]
                  text-white/70
                  transition
                  hover:text-[#C8AD7F]
                "
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() =>
              router.push("/wizard")
            }
            className="
              hidden
              h-11
              items-center
              gap-2
              rounded-full
              bg-[#C8AD7F]
              px-6
              text-xs
              font-semibold
              uppercase
              tracking-[0.18em]
              text-black
              transition
              hover:scale-[1.03]
              active:scale-95
              lg:flex
            "
          >
            Consulta

            <ArrowRight size={16} />
          </button>

          <button
            onClick={() =>
              setMobileOpen(
                !mobileOpen
              )
            }
            className="
              lg:hidden
            "
          >
            {mobileOpen ? (
              <X
                size={26}
                color="white"
              />
            ) : (
              <Menu
                size={26}
                color="white"
              />
            )}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() =>
                setMobileOpen(false)
              }
              className="
                fixed
                inset-0
                z-40
                bg-black/50
                backdrop-blur-sm
              "
            />

            <motion.div
              initial={{
                y: "100%",
              }}
              animate={{
                y: 0,
              }}
              exit={{
                y: "100%",
              }}
              transition={{
                type: "spring",
                damping: 30,
              }}
              className="
                fixed
                bottom-0
                left-0
                right-0
                z-50
                rounded-t-[34px]
                border-t
                border-white/10
                bg-[#151515]
                px-8
                pb-10
                pt-8
              "
            >
              <div
                className="
                  mx-auto
                  mb-8
                  h-1.5
                  w-16
                  rounded-full
                  bg-white/10
                "
              />

              <div
                className="
                  flex
                  flex-col
                  gap-6
                "
              >
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() =>
                      setMobileOpen(
                        false
                      )
                    }
                    className="
                      text-lg
                      font-light
                      text-white
                    "
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <button
                onClick={() => {
                  setMobileOpen(false);
                  router.push("/wizard");
                }}
                className="
                  mt-10
                  flex
                  h-14
                  w-full
                  items-center
                  justify-center
                  rounded-full
                  bg-[#C8AD7F]
                  text-sm
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-black
                "
              >
                Consulta Privada
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}