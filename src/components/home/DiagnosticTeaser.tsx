import Link from "next/link";
import { QUESTIONS } from "@/lib/diagnostic";

export default function DiagnosticTeaser() {
  return (
    <section className="border-t border-line py-24 md:py-32">
      <div className="wrap">
        <Link
          href="/diagnostico"
          className="group relative block overflow-hidden rounded-3xl border border-line p-8 transition-colors duration-700 hover:border-bone md:p-14"
        >
          <span className="absolute inset-0 origin-bottom scale-y-0 bg-bone transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-y-100" aria-hidden="true" />
          <div className="relative grid gap-10 transition-colors duration-700 group-hover:text-ink md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p className="text-sm opacity-60">{QUESTIONS.length} preguntas, menos de un minuto</p>
              <h2 className="display mt-4 text-[clamp(1.9rem,6vw,5.5rem)]">¿Qué necesita tu marca hoy?</h2>
            </div>
            <div className="flex items-center gap-4 md:col-span-4 md:justify-end">
              <span className="text-lg font-semibold">Hacé el diagnóstico</span>
              <span className="grid size-14 place-items-center rounded-full border border-current transition-transform duration-700 group-hover:-rotate-45" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="size-5"><path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
