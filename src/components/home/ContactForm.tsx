"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { z } from "zod";
import { INTERESTS, contactSchema } from "@/lib/contact-schema";

type Status = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<"nombre" | "email" | "mensaje", string>>;

export default function ContactForm({ defaultMessage = "" }: { defaultMessage?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = {
      nombre: String(fd.get("nombre") ?? ""),
      email: String(fd.get("email") ?? ""),
      empresa: String(fd.get("empresa") ?? ""),
      intereses: fd.getAll("intereses").map(String),
      mensaje: String(fd.get("mensaje") ?? ""),
      _gotcha: String(fd.get("_gotcha") ?? ""),
    };

    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const f = z.flattenError(parsed.error).fieldErrors;
      setErrors({ nombre: f.nombre?.[0], email: f.email?.[0], mensaje: f.mensaje?.[0] });
      return;
    }
    setErrors({});
    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error);
      form.reset();
      setStatus("sent");
    } catch (err) {
      setServerError(err instanceof Error && err.message ? err.message : "No pudimos enviar el mensaje.");
      setStatus("error");
    }
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[28rem] flex-col justify-center gap-6"
            role="status"
          >
            <svg viewBox="0 0 52 52" className="size-16" aria-hidden="true">
              <motion.circle cx="26" cy="26" r="24" fill="none" stroke="currentColor" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
              <motion.path d="M16 27l7 7 14-15" fill="none" stroke="currentColor" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.6 }} />
            </svg>
            <p className="display text-4xl">Mensaje enviado.</p>
            <p className="max-w-[40ch] text-smoke">Gracias. Te respondemos en menos de 24 horas hábiles.</p>
            <button onClick={() => setStatus("idle")} className="ulink w-fit text-sm text-smoke hover:text-bone">
              Enviar otro mensaje
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-6">
            <p className="text-sm text-smoke">O dejanos tus datos y te contactamos.</p>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field id="nombre" label="Nombre" autoComplete="name" error={errors.nombre} />
              <Field id="email" label="Email" type="email" autoComplete="email" error={errors.email} />
            </div>
            <Field id="empresa" label="Empresa o marca" autoComplete="organization" />

            <fieldset>
              <legend className="mb-3 text-sm text-smoke">¿Qué necesitás?</legend>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((i) => (
                  <label key={i} className="cursor-pointer">
                    <input type="checkbox" name="intereses" value={i} className="peer sr-only" />
                    <span className="block rounded-full border border-line px-4 py-2 text-sm text-smoke transition-colors duration-300 peer-checked:border-bone peer-checked:bg-bone peer-checked:text-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-bone hover:text-bone">
                      {i}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <Field id="mensaje" label="Mensaje" textarea defaultValue={defaultMessage} error={errors.mensaje} />
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            <button type="submit" className="btn btn-light mt-2 w-full sm:w-fit" disabled={status === "sending"}>
              {status === "sending" ? "Enviando…" : "Enviar mensaje"}
            </button>
            {status === "error" && (
              <p role="alert" className="text-sm text-[#ff8a80]">
                {serverError}
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  id,
  label,
  type = "text",
  textarea,
  autoComplete,
  defaultValue,
  error,
}: {
  id: string;
  label: string;
  type?: string;
  textarea?: boolean;
  autoComplete?: string;
  defaultValue?: string;
  error?: string;
}) {
  const props = {
    id: `f-${id}`,
    name: id,
    placeholder: " ",
    autoComplete,
    defaultValue,
    "aria-invalid": !!error,
    "aria-describedby": error ? `f-${id}-err` : undefined,
  };
  return (
    <div className="field" data-invalid={!!error}>
      {textarea ? <textarea rows={4} {...props} /> : <input type={type} {...props} />}
      <label htmlFor={`f-${id}`}>{label}</label>
      {error && (
        <p id={`f-${id}-err`} className="mt-2 text-xs text-[#ff8a80]">
          {error}
        </p>
      )}
    </div>
  );
}
