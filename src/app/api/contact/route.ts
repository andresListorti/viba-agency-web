import { NextResponse } from "next/server";
import { z } from "zod";
import { contactSchema } from "@/lib/contact-schema";

// The original site already collects leads with Formspree; we keep that inbox
// and add validation + spam filtering server-side.
const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT ?? "https://formspree.io/f/xwvrqbek";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Solicitud inválida." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Revisá los campos marcados.", fields: z.flattenError(parsed.error).fieldErrors },
      { status: 422 }
    );
  }

  // Honeypot filled: pretend success, drop the message
  if (parsed.data._gotcha) return NextResponse.json({ ok: true });

  const { nombre, email, empresa, intereses, mensaje } = parsed.data;
  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        nombre,
        email,
        empresa,
        intereses: intereses.join(", "),
        mensaje,
        _replyto: email,
        _subject: `Nuevo contacto web: ${nombre}${empresa ? ` (${empresa})` : ""}`,
      }),
    });
    if (!res.ok) throw new Error(`Formspree ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json(
      { ok: false, error: "No pudimos enviar el mensaje. Probá de nuevo o escribinos por WhatsApp." },
      { status: 502 }
    );
  }
}
