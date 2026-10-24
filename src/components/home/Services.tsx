"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { gsap } from "gsap";
import { PILLARS, SERVICES, pillarName, type PillarId } from "@/lib/content";

type Filter = "all" | PillarId;
const ease = [0.16, 1, 0.3, 1] as const;
const IMAGES = Array.from(new Set(SERVICES.map((s) => s.img)));

export default function Services() {
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const list = SERVICES.filter((s) => filter === "all" || s.pillar === filter);
  const activeImg = SERVICES.find((s) => s.slug === hovered)?.img;

  // Floating preview follows the pointer (desktop only)
  useEffect(() => {
    const el = previewRef.current;
    const listEl = listRef.current;
    if (!el || !listEl || !window.matchMedia("(pointer: fine)").matches) return;
    const x = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
    const r = gsap.quickTo(el, "rotate", { duration: 0.8, ease: "power3" });
    let lastX = 0;
    let lastY = 0;
    const move = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      r(gsap.utils.clamp(-12, 12, (e.clientX - lastX) * 0.6));
      lastX = e.clientX;
      lastY = e.clientY;
    };
    // Scrolling moves the list under a still pointer: re-check what's below it
    const onScroll = () => {
      const under = document.elementFromPoint(lastX, lastY);
      const li = under?.closest<HTMLElement>("[data-slug]");
      setHovered(li && listEl.contains(li) ? li.dataset.slug! : null);
    };
    listEl.addEventListener("pointermove", move);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      listEl.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section id="servicios" className="border-t border-line py-28 md:py-40">
      <div className="wrap">
        <div className="mb-14 grid gap-6 md:grid-cols-12 md:items-end">
          <h2 className="h2 md:col-span-7">Lo que hacemos.</h2>
          <p className="max-w-[42ch] leading-relaxed text-smoke md:col-span-5">
            Cada servicio es parte de un ecosistema integrado. Evaluamos cada objetivo para definir qué canales y
            herramientas activar.
          </p>
        </div>

        <div role="tablist" aria-label="Filtrar servicios por pilar" className="mb-6 flex flex-wrap gap-2">
          {([{ id: "all", name: "Todos" }, ...PILLARS] as { id: Filter; name: string }[]).map((p) => {
            const count = p.id === "all" ? SERVICES.length : SERVICES.filter((s) => s.pillar === p.id).length;
            const active = filter === p.id;
            return (
              <button
                key={p.id}
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setFilter(p.id);
                  setOpen(null);
                }}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                  active ? "text-ink" : "text-smoke hover:text-bone"
                }`}
              >
                {active && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-bone" transition={{ duration: 0.5, ease }} />}
                <span className="relative">
                  {p.name} <sup className="text-[0.65em] opacity-60">{count}</sup>
                </span>
              </button>
            );
          })}
        </div>

        <ul ref={listRef} className="border-t border-line" onPointerLeave={() => setHovered(null)}>
          <AnimatePresence initial={false} mode="popLayout">
            {list.map((s) => {
              const isOpen = open === s.slug;
              const dim = hovered && hovered !== s.slug;
              return (
                <motion.li
                  key={s.slug}
                  data-slug={s.slug}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.6, ease }}
                  className="border-b border-line"
                  onPointerEnter={() => setHovered(s.slug)}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : s.slug)}
                    aria-expanded={isOpen}
                    aria-controls={`svc-${s.slug}`}
                    className={`group flex w-full items-center gap-4 py-5 text-left transition-opacity duration-500 md:py-7 ${dim ? "md:opacity-30" : ""}`}
                  >
                    <span className="display flex-1 text-[clamp(1.3rem,4.2vw,3.6rem)] font-bold tracking-[-0.035em] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] md:group-hover:translate-x-4">
                      {s.name}
                    </span>
                    <span className="hidden text-sm text-smoke sm:block">{pillarName(s.pillar)}</span>
                    <span
                      className={`relative grid size-10 shrink-0 place-items-center rounded-full border border-line transition-transform duration-500 ${
                        isOpen ? "rotate-45 bg-bone text-ink" : ""
                      }`}
                      aria-hidden="true"
                    >
                      <span className="absolute h-px w-3.5 bg-current" />
                      <span className="absolute h-3.5 w-px bg-current" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`svc-${s.slug}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-6 pb-8 md:grid-cols-12">
                          <div className="relative aspect-[16/10] overflow-hidden rounded-md md:hidden">
                            <Image src={`/img/${s.img}.webp`} alt="" fill sizes="100vw" className="object-cover" />
                          </div>
                          <p className="max-w-[52ch] text-base leading-relaxed text-smoke md:col-span-6 md:col-start-1 md:text-lg">{s.long}</p>
                          <div className="md:col-span-6 md:flex md:justify-end">
                            <Link href={`/servicios/${s.slug}`} className="btn btn-ghost">
                              Ver el servicio
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </div>

      {/* Cursor-following preview */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block"
      >
        <div
          className={`relative -ml-[9rem] -mt-[11rem] h-[22rem] w-[18rem] overflow-hidden rounded-md transition-[opacity,transform] duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
            activeImg ? "scale-100 opacity-100" : "scale-75 opacity-0"
          }`}
        >
          {IMAGES.map((img) => (
            <Image
              key={img}
              src={`/img/${img}.webp`}
              alt=""
              fill
              sizes="18rem"
              className={`object-cover transition-[opacity,transform] duration-700 ${activeImg === img ? "scale-100 opacity-100" : "scale-110 opacity-0"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
