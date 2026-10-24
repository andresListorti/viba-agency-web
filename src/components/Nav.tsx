"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SITE, waLink } from "@/lib/content";
import { getLenis } from "./SmoothScroll";

const LINKS = [
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/#metodo", label: "Método" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#clientes", label: "Clientes" },
  { href: "/diagnostico", label: "Diagnóstico" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Hide on scroll down, reveal on scroll up
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 240 && y > last);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll + Escape while the menu is open
  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);


  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,backdrop-filter] duration-500 ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${scrolled && !open ? "bg-ink/70 backdrop-blur-xl" : "bg-transparent"}`}
      >
        <div className="wrap flex h-[4.5rem] items-center justify-between gap-6">
          <Link href="/" aria-label="VIBA Agency, inicio" className="display relative z-10 text-[1.9rem] tracking-[-0.05em]">
            viba<span className="text-smoke">.</span>
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-8 text-sm text-smoke lg:flex">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="ulink py-1 transition-colors hover:text-bone">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/#contacto" className="btn btn-light hidden !h-11 sm:inline-flex">
              Hablemos
            </Link>
            <button
              ref={toggleRef}
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className="relative z-10 grid size-11 place-items-center rounded-full border border-line lg:hidden"
            >
              <span className={`absolute h-px w-5 bg-bone transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
              <span className={`absolute h-px w-5 bg-bone transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            className="fixed inset-0 z-[45] flex flex-col bg-ink pt-[4.5rem] lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease }}
          >
            <nav aria-label="Menú móvil" className="wrap flex flex-1 flex-col justify-center gap-1">
              {[...LINKS, { href: "/#contacto", label: "Contacto" }].map((l, i) => (
                <div key={l.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.7, ease, delay: 0.15 + i * 0.05 }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="display flex items-baseline gap-4 py-1 text-[clamp(2.8rem,13vw,5rem)]"
                    >
                      <span className="font-sans text-xs font-medium tracking-normal text-smoke">0{i + 1}</span>
                      {l.label}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>
            <motion.div
              className="wrap flex flex-col gap-5 border-t border-line py-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0 }}
            >
              <a href={waLink()} target="_blank" rel="noopener" className="btn btn-light w-full">
                Escribinos por WhatsApp
              </a>
              <div className="flex justify-between text-sm text-smoke">
                <a href={SITE.instagram} target="_blank" rel="noopener">Instagram</a>
                <a href={SITE.linkedin} target="_blank" rel="noopener">LinkedIn</a>
                <a href={`mailto:${SITE.email}`}>Email</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
