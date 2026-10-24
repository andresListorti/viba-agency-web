"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const markRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mark = markRef.current;
    if (!mark || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(mark.querySelectorAll("span"), {
        yPercent: 100,
        ease: "expo.out",
        duration: 1.4,
        stagger: 0.06,
        scrollTrigger: { trigger: mark, start: "top 95%" },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer className="relative overflow-hidden border-t border-line pt-16">
      <div className="wrap flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div className="max-w-sm">
          <p className="display text-2xl md:text-4xl">{SITE.motto}</p>
          <p className="mt-3 text-sm text-smoke">{SITE.location}</p>
        </div>
        <div className="grid grid-cols-2 gap-x-14 gap-y-2 text-sm">
          <Link className="ulink w-fit text-smoke hover:text-bone" href="/#nosotros">Nosotros</Link>
          <a className="ulink w-fit text-smoke hover:text-bone" href={SITE.instagram} target="_blank" rel="noopener">Instagram</a>
          <Link className="ulink w-fit text-smoke hover:text-bone" href="/#servicios">Servicios</Link>
          <a className="ulink w-fit text-smoke hover:text-bone" href={SITE.linkedin} target="_blank" rel="noopener">LinkedIn</a>
          <Link className="ulink w-fit text-smoke hover:text-bone" href="/diagnostico">Diagnóstico</Link>
          <a className="ulink w-fit text-smoke hover:text-bone" href={`mailto:${SITE.email}`}>Email</a>
        </div>
      </div>

      <div
        ref={markRef}
        aria-hidden="true"
        className="display mt-10 flex select-none justify-center overflow-hidden text-[29vw] leading-[0.78] tracking-[-0.07em]"
      >
        {"viba.".split("").map((c, i) => (
          <span key={i} className={`inline-block ${c === "." ? "text-smoke" : ""}`}>{c}</span>
        ))}
      </div>

      <div className="wrap flex flex-col justify-between gap-2 border-t border-line py-6 text-xs text-smoke sm:flex-row">
        <span>© 2026 VIBA Agency. Todos los derechos reservados.</span>
        <Link href="/" className="ulink w-fit hover:text-bone">Volver al inicio</Link>
      </div>
    </footer>
  );
}
