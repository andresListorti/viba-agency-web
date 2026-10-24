"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { QUESTIONS, recommend, summary, type Answers } from "@/lib/diagnostic";
import { pillarName, waLink } from "@/lib/content";
import { WhatsAppIcon } from "@/components/WhatsAppFloat";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Diagnostic() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [dir, setDir] = useState(1);

  const done = step >= QUESTIONS.length;
  const q = QUESTIONS[step];
  const recs = useMemo(() => (done ? recommend(answers) : []), [done, answers]);
  const selected = q ? answers[q.id] ?? [] : [];

  const go = (n: number) => {
    setDir(n > step ? 1 : -1);
    setStep(n);
    window.scrollTo({ top: 0 });
  };

  const pick = (id: string) => {
    if (!q) return;
    if (q.multi) {
      const next = selected.includes(id) ? selected.filter((x) => x !== id) : [...selected.filter((x) => (id === "nada" ? false : x !== "nada")), id];
      setAnswers({ ...answers, [q.id]: next });
    } else {
      setAnswers({ ...answers, [q.id]: [id] });
      setTimeout(() => go(step + 1), 280);
    }
  };

  return (
    <section className="relative min-h-svh pb-24 pt-32 md:pt-40">
      <div className="wrap">
        {/* Progress */}
        <div className="mb-14 flex items-center gap-4 text-sm text-smoke">
          <span className="tabular-nums">{done ? "Resultado" : `Paso ${step + 1} de ${QUESTIONS.length}`}</span>
          <div className="h-px flex-1 bg-line">
            <motion.div className="h-px origin-left bg-bone" animate={{ scaleX: (Math.min(step, QUESTIONS.length) + (done ? 0 : 0.5)) / QUESTIONS.length }} transition={{ duration: 0.8, ease }} />
          </div>
        </div>

        <AnimatePresence mode="wait" custom={dir}>
          {!done && q ? (
            <motion.div
              key={q.id}
              custom={dir}
              initial={{ opacity: 0, x: dir * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -60 }}
              transition={{ duration: 0.55, ease }}
            >
              <h1 className="display max-w-[16ch] text-[clamp(2.6rem,6.5vw,6rem)]">{q.title}</h1>
              <p className="mt-5 text-smoke">{q.help}</p>

              <div className="mt-12 grid gap-3 sm:grid-cols-2">
                {q.options.map((o, i) => {
                  const on = selected.includes(o.id);
                  return (
                    <motion.button
                      key={o.id}
                      onClick={() => pick(o.id)}
                      aria-pressed={on}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.1 + i * 0.05 }}
                      className={`group flex items-center justify-between gap-6 rounded-2xl border p-6 text-left transition-colors duration-300 md:p-7 ${
                        on ? "border-bone bg-bone text-ink" : "border-line hover:border-smoke"
                      }`}
                    >
                      <span>
                        <span className="display block text-2xl font-bold tracking-[-0.03em] md:text-3xl">{o.label}</span>
                        {o.hint && <span className={`mt-1 block text-sm ${on ? "text-ink/60" : "text-smoke"}`}>{o.hint}</span>}
                      </span>
                      <span className={`grid size-7 shrink-0 place-items-center rounded-full border ${on ? "border-ink bg-ink text-bone" : "border-line"}`} aria-hidden="true">
                        {on && (
                          <svg viewBox="0 0 16 16" className="size-3.5"><path d="M3 8.5l3.2 3L13 5" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
                        )}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-10 flex items-center gap-3">
                {step > 0 && (
                  <button onClick={() => go(step - 1)} className="btn btn-ghost">Atrás</button>
                )}
                {q.multi && (
                  <button onClick={() => go(step + 1)} className="btn btn-light" disabled={selected.length === 0}>
                    Ver mi diagnóstico
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
              <h1 className="display max-w-[14ch] text-[clamp(2.8rem,7vw,6.5rem)]">Esto es lo que activaríamos primero.</h1>
              <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-smoke">
                Una primera lectura según tus respuestas. En una charla de 30 minutos lo bajamos a un plan concreto para tu
                negocio, sin compromiso.
              </p>

              <ol className="mt-14 grid gap-4 md:grid-cols-2">
                {recs.map((s, i) => (
                  <motion.li
                    key={s.slug}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease, delay: 0.3 + i * 0.1 }}
                  >
                    <Link href={`/servicios/${s.slug}`} className="group flex h-full gap-5 rounded-2xl border border-line p-4 transition-colors duration-500 hover:border-smoke">
                      <div className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-xl md:w-36">
                        <Image src={`/img/${s.img}.webp`} alt="" fill sizes="9rem" className="feel object-cover" />
                      </div>
                      <div className="flex flex-col justify-between py-1">
                        <div>
                          <p className="text-xs text-smoke">{i === 0 ? "Prioridad" : pillarName(s.pillar)}</p>
                          <h2 className="display mt-1 text-2xl font-bold tracking-[-0.03em]">{s.name}</h2>
                          <p className="mt-2 line-clamp-2 text-sm text-smoke">{s.short}</p>
                        </div>
                        <span className="ulink mt-3 w-fit text-sm">Ver el servicio</span>
                      </div>
                    </Link>
                  </motion.li>
                ))}
              </ol>

              <div className="mt-12 flex flex-wrap items-center gap-3">
                <a href={waLink(summary(answers, recs))} target="_blank" rel="noopener" className="btn btn-light">
                  <WhatsAppIcon className="size-5" /> Enviar diagnóstico por WhatsApp
                </a>
                <button
                  onClick={() => {
                    setAnswers({});
                    go(0);
                  }}
                  className="btn btn-ghost"
                >
                  Empezar de nuevo
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
