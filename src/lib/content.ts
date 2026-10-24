export const SITE = {
  name: "VIBA Agency",
  url: "https://vibaagency.com",
  email: "viba.agencia@gmail.com",
  phone: "+54 9 11 2551-4236",
  whatsapp: "5491125514236",
  instagram: "https://www.instagram.com/viba.agencia/",
  linkedin: "https://www.linkedin.com/company/viba-agency",
  motto: "we feel what we do",
  location: "Based in ARG, for the world.",
};

export const waLink = (text?: string) =>
  `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export type PillarId = "estrategia" | "creatividad" | "medios";

export const PILLARS: { id: PillarId; name: string; text: string }[] = [
  {
    id: "estrategia",
    name: "Estrategia",
    text: "Diagnóstico profundo del negocio. Identificamos oportunidades reales y construimos el camino con datos.",
  },
  {
    id: "creatividad",
    name: "Creatividad",
    text: "Conceptos que distinguen marcas y generan conversación relevante con el público correcto.",
  },
  {
    id: "medios",
    name: "Medios & Producción",
    text: "Ejecución impecable. Planificación y producción de alto estándar, orientadas al resultado.",
  },
];

export type Service = {
  slug: string;
  name: string;
  pillar: PillarId;
  img: string;
  short: string;
  long: string;
};

export const SERVICES: Service[] = [
  {
    slug: "estrategia-digital",
    name: "Estrategia digital",
    pillar: "estrategia",
    img: "estrategia",
    short: "Planificación 360° basada en datos. Objetivos, audiencias y mensajes pensados específicamente para cada negocio.",
    long: "Un plan integral, apoyado en datos, que define objetivos, audiencias y mensajes según lo que necesita cada negocio. Hecho a medida, no con una plantilla.",
  },
  {
    slug: "brand-marketing-strategy",
    name: "Brand marketing strategy 360°",
    pillar: "estrategia",
    img: "equipo",
    short: "Dirección estratégica para marcas que quieren crecer de forma consistente y sostenible.",
    long: "Acompañamos a las marcas que quieren crecer en todo su ecosistema digital con un rumbo claro: posicionamiento definido y planes que se pueden ejecutar, de forma consistente y sostenible.",
  },
  {
    slug: "seo-growth",
    name: "SEO & growth",
    pillar: "estrategia",
    img: "performance",
    short: "Crecimiento orgánico sostenible. Estrategias de posicionamiento que multiplican resultados.",
    long: "Crecimiento orgánico que se sostiene en el tiempo, con estrategias de posicionamiento pensadas para potenciar los resultados.",
  },
  {
    slug: "creacion-de-contenido",
    name: "Creación de contenido",
    pillar: "creatividad",
    img: "ecommerce",
    short: "Producción a medida. Desde formatos ágiles para redes hasta realizaciones de alto impacto.",
    long: "Contenido producido a la medida de cada proyecto: desde piezas ágiles para redes hasta producciones de alto impacto con equipo y dirección profesional.",
  },
  {
    slug: "diseno-grafico-branding",
    name: "Diseño gráfico & branding",
    pillar: "creatividad",
    img: "estrategia",
    short: "Sistemas visuales que construyen identidad. Diseño consistente en cada punto de contacto.",
    long: "Construimos identidad con sistemas visuales consistentes, que suman valor de marca en cada punto de contacto: branding, packaging, merchandising, vía pública y más.",
  },
  {
    slug: "influencer-marketing",
    name: "Influencer marketing",
    pillar: "creatividad",
    img: "equipo",
    short: "Colaboraciones con criterio estratégico. Creadores que amplifican la marca, no solo el alcance.",
    long: "Elegimos creadores con criterio estratégico, para que amplifiquen la marca y no solo sumen alcance.",
  },
  {
    slug: "social-media",
    name: "Social media & community management",
    pillar: "medios",
    img: "estrategia",
    short: "Estrategia, contenido y conversación en un mismo sistema. Redes que construyen marca, no solo presencia.",
    long: "Estrategia, contenido y conversación funcionando como un solo sistema. Redes que construyen marca, más allá de tener presencia.",
  },
  {
    slug: "performance-paid-media",
    name: "Performance / paid media",
    pillar: "medios",
    img: "performance",
    short: "Campañas de alto impacto en Meta y Google Ads. Inversión optimizada con foco en retorno.",
    long: "Campañas de alto impacto en los principales medios digitales, como Meta y Google Ads, con la inversión optimizada y el foco puesto en el retorno.",
  },
  {
    slug: "email-marketing",
    name: "Email marketing",
    pillar: "medios",
    img: "ecommerce",
    short: "Campañas y automatizaciones que convierten. Datos, timing y mensajes que activan audiencias.",
    long: "Campañas y automatizaciones pensadas para convertir: el dato correcto, el momento justo y el mensaje que activa a cada audiencia.",
  },
  {
    slug: "web-development",
    name: "Web development",
    pillar: "medios",
    img: "dev",
    short: "Experiencias digitales rápidas, sólidas y diseñadas para convertir.",
    long: "Sitios rápidos y sólidos, diseñados para que la experiencia digital se convierta en resultados.",
  },
  {
    slug: "prensa-pr",
    name: "Prensa & PR",
    pillar: "medios",
    img: "equipo",
    short: "Relaciones con medios y voces relevantes. Visibilidad que construye reputación a largo plazo.",
    long: "Relaciones estratégicas con medios y voces relevantes, para ganar una visibilidad que construye reputación a largo plazo.",
  },
];

export const pillarName = (id: PillarId) => PILLARS.find((p) => p.id === id)!.name;

export const CLIENTS = [
  "Norimoto", "Lima", "Capello Medicina Capilar", "Trébol Cosmética Natural", "En el Alma", "Maestro de Cocina", "MaCal Rotibar",
  "Tó-ma-te", "La Marquesa", "Asato", "Todo Acá", "Sabores de Oriente", "Sediana", "Portsaid",
  "Bellíssima", "Kamikaze Cosmética", "Bodegón Colegiales", "Murvi Mosaico Veneciano", "Sol Deco", "Warner & Spencer", "Locas de Amar",
].map((name, i) => ({ name, logo: `/logos/logo${String(i).padStart(2, "0")}.webp` }));

export const STATS = [
  { value: 145, suffix: "", label: "Proyectos realizados" },
  { value: 49, suffix: "", label: "Clientes satisfechos" },
  { value: 10, suffix: "+", label: "Años en el mercado" },
  { value: 18, suffix: "", label: "Industrias trabajadas" },
];
