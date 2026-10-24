"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATEMENT =
  "A diferencia de los modelos tradicionales, conformamos equipos interdisciplinarios diseñados para cada proyecto. Estrategia, creatividad, medios y producción bajo una misma visión: entender el negocio, detectar oportunidades y transformarlas en resultados.";

export default function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(q(".word"), { opacity: 1 });
      q(".feel").forEach((n) => n.classList.add("is-felt"));
      return;
    }

    const ctx = gsap.context(() => {
      // Words light up as you read
      gsap.fromTo(
        q(".word"),
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: q(".statement")[0], start: "top 80%", end: "bottom 45%", scrub: true },
        }
      );

      // Image opens up and gains color
      const media = q(".about-media")[0];
      gsap.fromTo(
        media,
        { clipPath: "inset(18% 22% 18% 22% round 8px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 8px)",
          ease: "none",
          scrollTrigger: {
            trigger: media,
            start: "top 90%",
            end: "center 55%",
            scrub: true,
            onLeave: () => media.querySelector(".feel")?.classList.add("is-felt"),
            onEnterBack: () => media.querySelector(".feel")?.classList.remove("is-felt"),
          },
        }
      );
      gsap.fromTo(q(".about-media img"), { scale: 1.25 }, { scale: 1, ease: "none", scrollTrigger: { trigger: media, start: "top bottom", end: "bottom top", scrub: true } });

      // think outside the box: the frame draws, then "box." escapes it
      const tl = gsap.timeline({ scrollTrigger: { trigger: q(".box-type")[0], start: "top 75%" } });
      tl.fromTo(q(".box-frame rect"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" })
        .from(q(".box-word"), { x: "-120%", opacity: 0, duration: 1.1, ease: "expo.out" }, "-=0.35");
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="nosotros" className="relative py-28 md:py-44">
      <div className="wrap">
        <p className="mb-10 text-sm text-smoke">Nosotros, con +10 años de trayectoria</p>
        <p className="statement display max-w-[22ch] text-[clamp(1.55rem,4.8vw,4.6rem)] !leading-[1.02] tracking-[-0.035em]">
          {STATEMENT.split(" ").map((w, i) => (
            <span key={i} className="word inline-block">
              {w}&nbsp;
            </span>
          ))}
        </p>

        <div className="mt-20 grid grid-cols-1 gap-12 md:mt-32 lg:grid-cols-12 lg:items-end">
          <figure className="about-media relative aspect-[4/3] overflow-hidden rounded-lg lg:col-span-7">
            <Image
              src="/img/performance-wide.webp"
              alt="Escritorio con dashboards de métricas en el monitor y en el celular"
              fill
              sizes="(min-width:1024px) 58vw, 100vw"
              className="feel object-cover"
            />
          </figure>

          <div className="flex flex-col gap-10 lg:col-span-5 lg:pl-6">
            <div className="box-type relative w-fit" aria-label="think outside the box.">
              <p className="display text-[clamp(1.9rem,5vw,4.2rem)] leading-[0.95]" aria-hidden="true">
                think outside
                <br />
                the
              </p>
              <div className="mt-2 flex items-center gap-3" aria-hidden="true">
                <svg className="box-frame h-[clamp(2.4rem,6vw,4.8rem)] w-[clamp(2.4rem,6vw,4.8rem)] shrink-0" viewBox="0 0 100 100" fill="none">
                  <rect x="2" y="2" width="96" height="96" stroke="currentColor" strokeWidth="3" pathLength={1} strokeDasharray="1" />
                </svg>
                <span className="box-word display inline-block text-[clamp(1.9rem,5vw,4.2rem)] leading-none">box.</span>
              </div>
            </div>
            <p className="max-w-[44ch] leading-relaxed text-smoke">
              Evitamos las fórmulas estandarizadas: cada solución se construye a medida y bajo una mirada{" "}
              <span className="text-bone">data driven</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
