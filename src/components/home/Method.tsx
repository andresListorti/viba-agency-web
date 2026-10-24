"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PILLARS } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export default function Method() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const q = gsap.utils.selector(el);
    const ctx = gsap.context(() => {
      const steps = q(".step");
      gsap.set(steps, { opacity: 0.25 });
      ScrollTrigger.create({
        trigger: q(".steps")[0],
        start: "top 75%",
        end: "bottom 45%",
        scrub: true,
        onUpdate: (self) => {
          gsap.set(q(".progress"), { scaleX: self.progress, scaleY: self.progress });
          steps.forEach((s, i) => {
            gsap.to(s, { opacity: self.progress >= i / steps.length + 0.05 ? 1 : 0.25, duration: 0.4, overwrite: true });
          });
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="metodo" className="border-t border-line py-28 md:py-40">
      <div className="wrap">
        <div className="mb-16 grid gap-6 md:mb-24 md:grid-cols-12 md:items-end">
          <h2 className="h2 md:col-span-7">Nuestro método.</h2>
          <p className="max-w-[40ch] leading-relaxed text-smoke md:col-span-5">
            Tres pilares que se articulan en cada proyecto, del diagnóstico a la ejecución.
          </p>
        </div>

        <ol className="steps relative grid gap-14 pl-8 md:grid-cols-3 md:gap-10 md:pl-0 md:pt-14">
          {/* track */}
          <span className="absolute left-0 top-0 h-full w-px bg-line md:h-px md:w-full" aria-hidden="true" />
          <span className="progress absolute left-0 top-0 hidden h-px w-full origin-left bg-bone md:block" aria-hidden="true" />
          <span className="progress absolute left-0 top-0 h-full w-px origin-top bg-bone md:hidden" aria-hidden="true" />

          {PILLARS.map((p, i) => (
            <li key={p.id} className="step relative">
              <span className="absolute -left-8 top-1 size-2 -translate-x-1/2 rounded-full bg-bone md:-top-14 md:left-0 md:-translate-y-1/2 md:translate-x-0" aria-hidden="true" />
              <span className="display block text-[clamp(4rem,8vw,7.5rem)] text-smoke/40">0{i + 1}</span>
              <h3 className="display mt-4 text-[clamp(1.8rem,2.6vw,2.5rem)] font-bold tracking-[-0.03em]">{p.name}</h3>
              <p className="mt-4 max-w-[34ch] leading-relaxed text-smoke">{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
