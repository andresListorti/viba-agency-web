"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CLIENTS, STATS } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export default function Clients() {
  const root = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const q = gsap.utils.selector(el);
    const ctx = gsap.context(() => {
      q("[data-count]").forEach((n) => {
        const target = Number((n as HTMLElement).dataset.count);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2,
          ease: "expo.out",
          scrollTrigger: { trigger: n, start: "top 90%" },
          onUpdate: () => (n.textContent = String(Math.round(obj.v))),
        });
      });
      gsap.fromTo(
        q(".logo-in"),
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "expo.out",
          stagger: { each: 0.04, from: "random" },
          scrollTrigger: { trigger: gridRef.current, start: "top 85%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  const onMove = (e: React.PointerEvent<HTMLUListElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <section ref={root} id="clientes" className="border-t border-line py-28 md:py-40">
      <div className="wrap">
        <div className="mb-16 grid gap-6 md:grid-cols-12 md:items-end">
          <h2 className="h2 md:col-span-7">Confían en nosotros.</h2>
          <p className="max-w-[42ch] leading-relaxed text-smoke md:col-span-5">
            Marcas que eligieron un modelo distinto. Los resultados hablan por sí solos.
          </p>
        </div>

        <dl className="mb-16 grid grid-cols-2 gap-y-10 md:mb-20 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col-reverse gap-2 border-l border-line pl-5">
              <dt className="text-sm text-smoke">{s.label}</dt>
              <dd className="display text-[clamp(2.4rem,7vw,6.5rem)] tabular-nums">
                <span data-count={s.value}>{s.value}</span>
                {s.suffix && <span className="text-smoke">{s.suffix}</span>}
              </dd>
            </div>
          ))}
        </dl>

        <ul
          ref={gridRef}
          onPointerMove={onMove}
          aria-label="Clientes"
          className="spot grid grid-cols-3 border-l border-t border-line sm:grid-cols-4 lg:grid-cols-7"
        >
          {CLIENTS.map((c) => (
            <li key={c.name} className="logo-cell group relative grid aspect-square place-items-center border-b border-r border-line">
              <span className="logo-in grid w-full place-items-center">
              <Image
                src={c.logo}
                alt={c.name}
                width={300}
                height={300}
                sizes="(min-width:1024px) 12vw, 30vw"
                className="h-auto w-[78%] opacity-55 transition-[opacity,transform] duration-500 group-hover:scale-105 group-hover:opacity-100"
              />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
