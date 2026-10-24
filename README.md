# VIBA Agency — sitio web

Rediseño completo de [vibaagency.com](https://vibaagency.com) para **VIBA Agency**, agencia de marketing con base en Argentina.

> *No es instinto. Es método.* — we feel what we do

## Concepto

Todo el sitio es monocromo, con el negro y el blanco hueso de la marca. El color aparece **solo en la fotografía**, cuando las imágenes entran en escena o el usuario interactúa con ellas. Es una traducción visual del lema *"we feel what we do"*. La tipografía Aileron Black, la de la marca, funciona como elemento gráfico principal.

## Stack

| | |
|---|---|
| Framework | **Next.js 16** (App Router, Cache Components, Turbopack) + **React 19** + TypeScript |
| Estilos | **Tailwind CSS v4** con tokens de marca (`@theme`) |
| Animación | **GSAP 3** + ScrollTrigger (scroll), **Motion** (UI/estados), **Lenis** (smooth scroll) |
| Validación | **Zod 4**, el mismo esquema en cliente y servidor |
| Fuentes | Aileron 700/900 (local, woff2) + Montserrat (`next/font`) |
| Deploy | Vercel |

## Qué incluye

- **Home**: intro animada, hero con fotos en parallax y el titular "~~instinto~~", manifiesto que se ilumina mientras se lee, método en 3 pilares, índice de servicios filtrable con preview que sigue al cursor, grilla de clientes con spotlight, contadores, Instagram y contacto.
- **11 páginas de servicio** (`/servicios/[slug]`), generadas estáticamente, cada una con su metadata y su OG image dinámica.
- **Diagnóstico de marca** (`/diagnostico`): 3 preguntas que recomiendan servicios y arman un mensaje de WhatsApp precargado con el resumen. Sirve para generar leads calificados.
- **API de contacto** (`/api/contact`): valida con Zod, filtra spam con honeypot y reenvía al Formspree que la agencia ya usa. No hace falta base de datos.
- **Menú mobile** a pantalla completa y accesible (focus, Escape, scroll lock). En el sitio anterior el menú no funcionaba.
- **Sin carrusel ni ticker infinitos.**
- **SEO**: título y descripción por página, URL canónica, `sitemap.xml`, `robots.txt`, manifest e íconos, y datos estructurados (`MarketingAgency`, `WebSite`, `Service` y `BreadcrumbList`).
- **Vista previa al compartir** (WhatsApp, LinkedIn, X, etc.): una imagen JPG liviana para la home y otra para cada servicio, en `public/og/`.
- **Seguridad**: Content-Security-Policy, HSTS, protección contra iframes (clickjacking), `nosniff`, Referrer-Policy y Permissions-Policy. La API de contacto valida el origen, el tamaño y el formato de cada pedido y limita la cantidad de envíos por persona.
- Accesibilidad: `prefers-reduced-motion` respetado, foco visible, skip link, labels y estados ARIA.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

### Variables de entorno (opcionales)

| Variable | Default | Uso |
|---|---|---|
| `FORMSPREE_ENDPOINT` | `https://formspree.io/f/xwvrqbek` | Destino de los mensajes del formulario |
| `NEXT_PUBLIC_SITE_URL` | dominio de producción de Vercel | Dominio público (canonical, Open Graph, sitemap) |

Si no se define `NEXT_PUBLIC_SITE_URL`, se usa automáticamente el dominio de producción de Vercel. Cuando se conecte `vibaagency.com` al proyecto, las URLs pasan a usarlo sin tocar código.

### Imágenes para compartir e íconos

```bash
python scripts/generate-og.py   # requiere Pillow
```

Regenera `public/og/*.jpg`, `public/icons/*` y los íconos de `src/app/` a partir de las fotos de `public/img` y los servicios de `src/lib/content.ts`.

## Editar contenido

Todo el contenido vive en `src/lib/content.ts`: servicios, pilares, clientes, estadísticas y datos de contacto. Las preguntas y la lógica del diagnóstico están en `src/lib/diagnostic.ts`.

---

Diseño y desarrollo: Andrés Listorti.
