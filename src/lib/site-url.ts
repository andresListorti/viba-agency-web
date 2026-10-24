import { SITE } from "./content";

// Dirección pública del sitio, usada en canonical, Open Graph, sitemap y datos estructurados.
// Prioridad: variable propia > dominio de producción de Vercel > dominio de la agencia.
// Así las vistas previas de WhatsApp funcionan hoy en *.vercel.app y,
// cuando se conecte vibaagency.com en Vercel, pasan a usarlo sin tocar código.
function resolve() {
  const explicit = process.env.SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return SITE.url;
}

export const SITE_URL = resolve();
export const absolute = (path = "/") => new URL(path, SITE_URL).toString();
