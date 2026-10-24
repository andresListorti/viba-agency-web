import { NextResponse } from "next/server";
import { z } from "zod";
import { contactSchema } from "@/lib/contact-schema";

// El sitio original ya recibe los contactos con Formspree; mantenemos esa casilla
// y sumamos validación, filtro de spam y protección contra abuso del lado del servidor.
const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT ?? "https://formspree.io/f/xwvrqbek";

const MAX_BODY_BYTES = 10_000;
const RATE_LIMIT = 5; // envíos
const RATE_WINDOW_MS = 10 * 60 * 1000; // por 10 minutos

// Límite en memoria por instancia: frena ráfagas de un mismo origen sin necesitar base de datos.
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5_000) hits.clear(); // evita crecer sin límite
  return recent.length > RATE_LIMIT;
}

function fail(error: string, status: number, extra?: object) {
  return NextResponse.json({ ok: false, error, ...extra }, { status });
}

// Quita saltos de línea para que nadie pueda inyectar encabezados en el asunto del mail
const oneLine = (s: string) => s.replace(/[\r\n\t]+/g, " ").trim();

export async function POST(req: Request) {
  // Solo aceptamos envíos hechos desde el propio sitio
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return fail("Origen no permitido.", 403);
  }

  if (!req.headers.get("content-type")?.includes("application/json")) {
    return fail("Solicitud inválida.", 415);
  }
  if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return fail("El mensaje es demasiado largo.", 413);
  }

  const ip = (req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "local").split(",")[0].trim();
  if (rateLimited(ip)) {
    return fail("Recibimos varios mensajes seguidos. Probá de nuevo en unos minutos o escribinos por WhatsApp.", 429);
  }

  let body: unknown;
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) return fail("El mensaje es demasiado largo.", 413);
    body = JSON.parse(raw);
  } catch {
    return fail("Solicitud inválida.", 400);
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return fail("Revisá los campos marcados.", 422, { fields: z.flattenError(parsed.error).fieldErrors });
  }

  // Honeypot completado: respondemos OK pero descartamos el mensaje
  if (parsed.data._gotcha) return NextResponse.json({ ok: true });

  const { nombre, email, empresa, intereses, mensaje } = parsed.data;
  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        nombre: oneLine(nombre),
        email,
        empresa: oneLine(empresa),
        intereses: intereses.join(", "),
        mensaje,
        _replyto: email,
        _subject: `Nuevo contacto web: ${oneLine(nombre)}${empresa ? ` (${oneLine(empresa)})` : ""}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Formspree ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact]", err);
    return fail("No pudimos enviar el mensaje. Probá de nuevo o escribinos por WhatsApp.", 502);
  }
}
