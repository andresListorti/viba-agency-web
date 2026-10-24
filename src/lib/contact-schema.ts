import { z } from "zod";

export const INTERESTS = ["Estrategia", "Redes", "Paid media", "Contenido", "Branding", "Web"] as const;

export const contactSchema = z.object({
  nombre: z.string().trim().min(2, "Escribí tu nombre.").max(80),
  email: z.email("Revisá el email, parece incompleto."),
  empresa: z.string().trim().max(120).optional().default(""),
  intereses: z.array(z.enum(INTERESTS)).max(INTERESTS.length).default([]),
  mensaje: z.string().trim().min(10, "Contanos un poco más (mínimo 10 caracteres).").max(3000),
  _gotcha: z.string().max(0).optional(),
});

export type ContactInput = z.input<typeof contactSchema>;
