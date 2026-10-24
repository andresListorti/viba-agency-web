import { SERVICES, type Service } from "./content";

export type Option = { id: string; label: string; hint?: string; weights: Partial<Record<string, number>> };
export type Question = { id: string; title: string; help: string; multi?: boolean; options: Option[] };

export const QUESTIONS: Question[] = [
  {
    id: "objetivo",
    title: "¿Qué querés lograr en los próximos meses?",
    help: "Elegí el objetivo principal.",
    options: [
      { id: "ventas", label: "Vender más online", hint: "E-commerce, leads, consultas", weights: { "performance-paid-media": 3, "email-marketing": 2, "web-development": 2, "seo-growth": 1 } },
      { id: "marca", label: "Construir una marca fuerte", hint: "Que te reconozcan y te elijan", weights: { "brand-marketing-strategy": 3, "diseno-grafico-branding": 3, "creacion-de-contenido": 1 } },
      { id: "lanzamiento", label: "Lanzar algo nuevo", hint: "Producto, local o marca", weights: { "estrategia-digital": 3, "influencer-marketing": 2, "prensa-pr": 2, "diseno-grafico-branding": 1 } },
      { id: "comunidad", label: "Crecer en redes", hint: "Comunidad, alcance, conversación", weights: { "social-media": 3, "creacion-de-contenido": 3, "influencer-marketing": 1 } },
    ],
  },
  {
    id: "etapa",
    title: "¿En qué etapa está tu marca?",
    help: "Así sabemos por dónde empezar.",
    options: [
      { id: "inicio", label: "Recién arrancando", hint: "Menos de 1 año", weights: { "estrategia-digital": 2, "diseno-grafico-branding": 2, "social-media": 1 } },
      { id: "crecimiento", label: "Creciendo", hint: "Hay ventas, queremos escalar", weights: { "performance-paid-media": 2, "seo-growth": 2, "email-marketing": 1 } },
      { id: "consolidada", label: "Consolidada", hint: "Queremos ordenar y potenciar", weights: { "brand-marketing-strategy": 2, "prensa-pr": 1, "estrategia-digital": 1 } },
    ],
  },
  {
    id: "presencia",
    title: "¿Con qué contás hoy?",
    help: "Podés elegir varias.",
    multi: true,
    options: [
      { id: "redes", label: "Redes sociales activas", weights: { "performance-paid-media": 1, "influencer-marketing": 1 } },
      { id: "web", label: "Sitio web o tienda online", weights: { "seo-growth": 2, "email-marketing": 1 } },
      { id: "local", label: "Local físico", weights: { "social-media": 1, "prensa-pr": 1 } },
      { id: "identidad", label: "Identidad visual definida", weights: { "creacion-de-contenido": 1 } },
      { id: "nada", label: "Todavía nada de esto", weights: { "diseno-grafico-branding": 2, "web-development": 2, "estrategia-digital": 1 } },
    ],
  },
];

export type Answers = Record<string, string[]>;

export function recommend(answers: Answers): Service[] {
  const scores = new Map<string, number>();
  for (const q of QUESTIONS) {
    for (const optId of answers[q.id] ?? []) {
      const opt = q.options.find((o) => o.id === optId);
      for (const [slug, w] of Object.entries(opt?.weights ?? {})) scores.set(slug, (scores.get(slug) ?? 0) + (w ?? 0));
    }
  }
  // "Nada" means the gaps are the work: don't recommend what they say they already have
  const has = new Set(answers.presencia ?? []);
  if (has.has("web")) scores.delete("web-development");
  if (has.has("identidad")) scores.set("diseno-grafico-branding", (scores.get("diseno-grafico-branding") ?? 0) - 2);

  return [...scores.entries()]
    .filter(([, s]) => s > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([slug]) => SERVICES.find((s) => s.slug === slug)!)
    .filter(Boolean);
}

export function summary(answers: Answers, recs: Service[]) {
  const label = (qid: string) =>
    (answers[qid] ?? []).map((id) => QUESTIONS.find((q) => q.id === qid)!.options.find((o) => o.id === id)!.label).join(", ");
  return [
    "Hola VIBA! Hice el diagnóstico en la web:",
    `• Objetivo: ${label("objetivo")}`,
    `• Etapa: ${label("etapa")}`,
    `• Hoy tengo: ${label("presencia") || "-"}`,
    `• Me recomendaron: ${recs.map((r) => r.name).join(", ")}`,
    "¿Podemos hablar?",
  ].join("\n");
}
