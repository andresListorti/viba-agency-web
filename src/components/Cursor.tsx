"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;

    const x = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });

    const move = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      const hit = (e.target as Element)?.closest?.("a, button, [data-cursor]");
      el.classList.toggle("is-hover", !!hit);
    };
    const hide = () => gsap.to(el, { opacity: 0, duration: 0.2 });
    const show = () => gsap.to(el, { opacity: 1, duration: 0.2 });

    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", hide);
    document.documentElement.addEventListener("pointerenter", show);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", hide);
      document.documentElement.removeEventListener("pointerenter", show);
    };
  }, []);

  return <div ref={ref} className="cursor" aria-hidden="true" />;
}
