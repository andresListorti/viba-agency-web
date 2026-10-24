"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  { src: "/img/estrategia.webp", alt: "Plan de marketing a mano junto a una notebook con Instagram abierto", rot: -9, x: "-38%", y: "8%", depth: 14 },
  { src: "/img/equipo.webp", alt: "Equipo festejando con un choque de manos en la oficina", rot: 4, x: "0%", y: "-4%", depth: 26 },
  { src: "/img/dev.webp", alt: "Desarrollador programando frente a dos monitores", rot: 11, x: "36%", y: "12%", depth: 40 },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const q = gsap.utils.selector(el);

    if (reduce) {
      gsap.set(q(".intro"), { display: "none" });
      q(".feel").forEach((n) => n.classList.add("is-felt"));
      gsap.set(q(".strike"), { scaleX: 1 });
      return;
    }

    const seen = sessionStorage.getItem("viba-intro") === "1";
    sessionStorage.setItem("viba-intro", "1");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      if (!seen) {
        tl.from(q(".intro-char"), { yPercent: 110, duration: 0.9, stagger: 0.05 })
          .to(q(".intro-char"), { yPercent: -110, duration: 0.6, stagger: 0.03, ease: "expo.in" }, "+=0.25")
          .to(q(".intro"), { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "-=0.2");
      } else {
        gsap.set(q(".intro"), { display: "none" });
      }

      tl.from(q(".hero-line > span"), { yPercent: 115, duration: 1.3, stagger: 0.09 }, seen ? 0 : "-=0.45")
        .from(
          q(".card"),
          {
            y: () => window.innerHeight * 0.7,
            rotate: (i: number) => [-10, 6, 14][i],
            duration: 1.5,
            stagger: 0.1,
            ease: "expo.out",
          },
          "<0.15"
        )
        .to(q(".strike"), { scaleX: 1, duration: 0.9, ease: "power3.inOut" }, "-=0.9")
        .add(() => q(".card .feel").forEach((n, i) => setTimeout(() => n.classList.add("is-felt"), i * 220)), "-=0.6")
        .from(q(".hero-fade"), { opacity: 0, y: 20, duration: 1, stagger: 0.08 }, "-=1");

      // Pointer parallax on the photo stack
      const cards = q(".card-inner");
      const movers = cards.map((c) => ({
        x: gsap.quickTo(c, "x", { duration: 1, ease: "power3" }),
        y: gsap.quickTo(c, "y", { duration: 1, ease: "power3" }),
        d: Number((c as HTMLElement).dataset.depth),
      }));
      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        movers.forEach((m) => {
          m.x(nx * m.d);
          m.y(ny * m.d);
        });
      };
      if (window.matchMedia("(pointer: fine)").matches) window.addEventListener("pointermove", onMove);

      // Scroll: the stack fans out and drifts away
      gsap.to(q(".card-1"), { xPercent: -30, rotate: -18, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(q(".card-3"), { xPercent: 30, rotate: 20, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(q(".stack"), { yPercent: -18, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(q(".hero-title"), { yPercent: 25, opacity: 0.2, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });

      return () => window.removeEventListener("pointermove", onMove);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="home" className="relative flex min-h-svh flex-col overflow-hidden pt-[4.5rem]">
      {/* First-visit intro */}
      <div className="intro fixed inset-0 z-[70] grid place-items-center bg-ink" aria-hidden="true">
        <div className="display flex overflow-hidden text-[clamp(4rem,16vw,12rem)] tracking-[-0.06em]">
          {"viba.".split("").map((c, i) => (
            <span key={i} className={`intro-char inline-block ${c === "." ? "text-smoke" : ""}`}>{c}</span>
          ))}
        </div>
      </div>

      <div className="wrap relative grid flex-1 grid-cols-1 items-center gap-y-10 py-10 lg:grid-cols-12 lg:py-6">
        <h1 className="hero-title display relative z-10 text-[clamp(2.6rem,min(13vw,15svh),11rem)] lg:col-span-8 lg:whitespace-nowrap">
          <span className="hero-line line-mask"><span>No es</span></span>
          <span className="hero-line line-mask">
            <span className="relative w-fit">
              instinto.
              <i className="strike absolute left-[-2%] top-[52%] block h-[0.07em] w-[104%] origin-left scale-x-0 bg-bone" aria-hidden="true" />
            </span>
          </span>
          <span className="hero-line line-mask"><span>Es método.</span></span>
        </h1>

        <div className="stack relative mx-auto aspect-[4/3] w-full max-w-[34rem] lg:col-span-4 lg:aspect-[3/4] lg:max-w-none" aria-hidden="true">
          {CARDS.map((c, i) => (
            <div
              key={c.src}
              className="absolute left-1/2 top-1/2 w-[46%] lg:w-[68%]"
              style={{ transform: `translate(-50%,-50%) translate(${c.x}, ${c.y}) rotate(${c.rot}deg)`, zIndex: i }}
            >
              <div className={`card card-${i + 1}`}>
              <div className="card-inner" data-depth={c.depth}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[6px] shadow-[0_30px_80px_-20px_rgb(0_0_0/0.9)] ring-1 ring-line">
                  <Image src={c.src} alt={c.alt} fill priority={i === 1} sizes="(min-width:1024px) 22vw, 45vw" className="feel object-cover" />
                </div>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="wrap relative z-10 grid grid-cols-1 gap-8 border-t border-line pb-8 pt-7 md:grid-cols-12 md:items-end">
        <p className="hero-fade max-w-[46ch] text-[0.95rem] leading-relaxed text-smoke md:col-span-5">
          Somos partners estratégicos de las marcas con las que trabajamos. Diseñamos marketing a medida que combina
          análisis, creatividad y performance, sin fórmulas estándar.
        </p>
        <div className="hero-fade flex flex-wrap gap-3 md:col-span-5">
          <Link href="#contacto" className="btn btn-light">Hablemos de tu marca</Link>
          <Link href="/diagnostico" className="btn btn-ghost">Hacé el diagnóstico</Link>
        </div>
        <p className="hero-fade hidden text-right text-xs text-smoke md:col-span-2 md:block lg:col-span-2">{SITE.location}</p>
      </div>
    </section>
  );
}
