import type { Metadata } from "next";
import { SERVICES, SITE } from "./content";
import { SITE_URL, absolute } from "./site-url";

export const DEFAULT_TITLE = "VIBA Agency · Marketing estratégico a medida";
export const DEFAULT_DESCRIPTION =
  "Hacemos marketing, pero con método. Agencia con +10 años de trayectoria: equipos interdisciplinarios, estrategia data driven, creatividad y performance a medida de cada marca.";

// Imágenes estáticas generadas con scripts/generate-og.py (JPG < 100 KB, ideal para WhatsApp)
const image = (name: string, alt: string) => ({
  url: `/og/${name}.jpg`,
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt,
});

/** Open Graph + Twitter completos para una página (Next no fusiona openGraph entre niveles). */
export function shareMetadata({
  title,
  description,
  path,
  imageName = "home",
  imageAlt = "VIBA Agency: No es instinto. Es método.",
}: {
  title: string;
  description: string;
  path: string;
  imageName?: string;
  imageAlt?: string;
}): Pick<Metadata, "alternates" | "openGraph" | "twitter"> {
  const img = image(imageName, imageAlt);
  return {
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "es_AR",
      siteName: SITE.name,
      url: path,
      title,
      description,
      images: [img],
    },
    twitter: { card: "summary_large_image", title, description, images: [img] },
  };
}

// ---------- Datos estructurados (schema.org) ----------

const ORG_ID = `${SITE_URL}/#agency`;

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MarketingAgency",
      "@id": ORG_ID,
      name: SITE.name,
      alternateName: "VIBA",
      url: SITE_URL,
      logo: absolute("/icons/icon-512.png"),
      image: absolute("/og/home.jpg"),
      description: DEFAULT_DESCRIPTION,
      slogan: SITE.motto,
      email: SITE.email,
      telephone: SITE.phone,
      areaServed: "Worldwide",
      address: { "@type": "PostalAddress", addressCountry: "AR" },
      sameAs: [SITE.linkedin, SITE.instagram],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: SITE.phone,
        email: SITE.email,
        availableLanguage: ["es", "en"],
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios de marketing",
        itemListElement: SERVICES.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.name, url: absolute(`/servicios/${s.slug}`) },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE.name,
      inLanguage: "es-AR",
      publisher: { "@id": ORG_ID },
    },
  ],
};

export function serviceJsonLd(slug: string) {
  const s = SERVICES.find((x) => x.slug === slug)!;
  const url = absolute(`/servicios/${s.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: s.name,
        description: s.long,
        url,
        image: absolute(`/og/${s.slug}.jpg`),
        serviceType: s.name,
        areaServed: "Worldwide",
        provider: { "@id": ORG_ID, "@type": "MarketingAgency", name: SITE.name, url: SITE_URL },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Servicios", item: absolute("/#servicios") },
          { "@type": "ListItem", position: 3, name: s.name, item: url },
        ],
      },
    ],
  };
}

/** JSON-LD seguro: evita que un "</script>" en los datos rompa el HTML. */
export const jsonLdString = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
