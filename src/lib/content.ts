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
  includes: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "estrategia-digital",
    name: "Estrategia digital",
    pillar: "estrategia",
    img: "estrategia",
    short: "Planificación 360° basada en datos. Objetivos, audiencias y mensajes pensados para cada negocio.",
    long: "Antes de publicar una pieza o invertir un peso, entendemos el negocio. Analizamos mercado, competencia y audiencias para definir objetivos medibles, mensajes y canales. El resultado es un plan accionable, sin fórmulas estandarizadas.",
    includes: ["Diagnóstico de marca y competencia", "Definición de audiencias y buyer personas", "Plan de canales y mensajes", "KPIs y tablero de seguimiento"],
  },
  {
    slug: "brand-marketing-strategy",
    name: "Brand marketing strategy 360°",
    pillar: "estrategia",
    img: "equipo",
    short: "Dirección estratégica para marcas dispuestas a crecer en todo su ecosistema digital.",
    long: "Acompañamos a marcas que quieren crecer de forma consistente y sostenible. Ordenamos el posicionamiento, alineamos cada punto de contacto y convertimos la visión en planes que el equipo puede ejecutar.",
    includes: ["Posicionamiento y propuesta de valor", "Arquitectura de marca", "Roadmap trimestral", "Dirección de equipos y proveedores"],
  },
  {
    slug: "seo-growth",
    name: "SEO & growth",
    pillar: "estrategia",
    img: "performance",
    short: "Crecimiento orgánico sostenible. Posicionamiento que multiplica resultados.",
    long: "Trabajamos el crecimiento que no depende solo de la pauta. Auditamos, optimizamos y medimos para que tu marca aparezca cuando la buscan y convierta cuando la encuentran.",
    includes: ["Auditoría SEO técnica y de contenido", "Estrategia de keywords", "Optimización de conversión (CRO)", "Reportes de crecimiento"],
  },
  {
    slug: "creacion-de-contenido",
    name: "Creación de contenido",
    pillar: "creatividad",
    img: "ecommerce",
    short: "Desde formatos ágiles para redes hasta realizaciones de alto impacto.",
    long: "Producimos contenido a la medida de cada proyecto: piezas ágiles para el día a día de las redes y producciones de alto impacto con equipos y dirección profesional.",
    includes: ["Fotografía de producto y lifestyle", "Video vertical y reels", "Producciones con dirección de arte", "Bancos de contenido mensuales"],
  },
  {
    slug: "diseno-grafico-branding",
    name: "Diseño gráfico & branding",
    pillar: "creatividad",
    img: "estrategia",
    short: "Sistemas visuales que construyen identidad en cada punto de contacto.",
    long: "Diseñamos sistemas visuales consistentes que potencian el valor de marca: desde el logo hasta el packaging, el merchandising y la vía pública.",
    includes: ["Identidad visual y manual de marca", "Packaging y merchandising", "Piezas para vía pública", "Templates para redes"],
  },
  {
    slug: "influencer-marketing",
    name: "Influencer marketing",
    pillar: "creatividad",
    img: "equipo",
    short: "Colaboraciones con criterio estratégico. Creadores que amplifican la marca.",
    long: "Elegimos creadores por afinidad y datos, no solo por seguidores. Diseñamos colaboraciones que amplifican la marca y medimos su impacto real.",
    includes: ["Selección y análisis de perfiles", "Negociación y contratos", "Briefs creativos", "Medición de resultados"],
  },
  {
    slug: "social-media",
    name: "Social media & community",
    pillar: "medios",
    img: "estrategia",
    short: "Estrategia, contenido y conversación en un mismo sistema.",
    long: "Redes que construyen marca, no solo presencia. Planificamos, publicamos y conversamos con tu comunidad con un mismo criterio, y lo medimos todos los meses.",
    includes: ["Estrategia y calendario editorial", "Gestión de comunidad", "Diseño de piezas", "Reporte mensual de métricas"],
  },
  {
    slug: "performance-paid-media",
    name: "Performance / paid media",
    pillar: "medios",
    img: "performance",
    short: "Campañas de alto impacto en Meta y Google Ads con foco en retorno.",
    long: "Planificamos y optimizamos campañas en los principales medios digitales. Cada peso invertido tiene un objetivo, una métrica y una decisión detrás.",
    includes: ["Campañas en Meta Ads y Google Ads", "Estructura de funnel y audiencias", "Testing creativo A/B", "Optimización por ROAS y CPA"],
  },
  {
    slug: "email-marketing",
    name: "Email marketing",
    pillar: "medios",
    img: "ecommerce",
    short: "Campañas y automatizaciones que convierten.",
    long: "Datos, timing y mensajes que activan audiencias. Diseñamos newsletters y automatizaciones que acompañan al cliente desde el primer contacto hasta la recompra.",
    includes: ["Automatizaciones de bienvenida y carrito", "Newsletters y campañas", "Segmentación de bases", "Diseño de templates"],
  },
  {
    slug: "web-development",
    name: "Web development",
    pillar: "medios",
    img: "dev",
    short: "Experiencias digitales rápidas, sólidas y diseñadas para convertir.",
    long: "Desarrollamos sitios y tiendas online rápidos, accesibles y medibles. Diseño y tecnología al servicio de un objetivo: que el visitante avance.",
    includes: ["Landing pages y sitios institucionales", "E-commerce", "Analítica y píxeles", "Performance y SEO técnico"],
  },
  {
    slug: "prensa-pr",
    name: "Prensa & PR",
    pillar: "medios",
    img: "equipo",
    short: "Relaciones estratégicas con medios y voces relevantes.",
    long: "Construimos visibilidad que suma reputación a largo plazo, con relaciones reales con medios, periodistas y voces de cada industria.",
    includes: ["Plan de comunicación", "Gacetillas y notas", "Relación con medios", "Clipping y reporte"],
  },
];

export const pillarName = (id: PillarId) => PILLARS.find((p) => p.id === id)!.name;

export const CLIENTS = [
  "Norimoto", "Lima", "Capello Medicina Capilar", "Trébol Cosmética Natural", "En el Alma", "Maestro de Cocina", "MaCal Rotibar",
  "Tó-ma-te", "La Marquesa", "Asato", "Todo Acá", "Sabores de Oriente", "Sediana", "Portsaid",
  "Bellíssima", "Kamikaze Cosmética", "Bodegón Colegiales", "Murvi Mosaico Veneciano", "Sol Deco", "Warner & Spencer", "Locas de Amar",
].map((name, i) => ({ name, logo: `/logos/logo${String(i).padStart(2, "0")}.webp` }));

export const STATS = [
  { value: 145, suffix: "+", label: "Proyectos realizados" },
  { value: 49, suffix: "", label: "Clientes" },
  { value: 10, suffix: "+", label: "Años en el mercado" },
  { value: 18, suffix: "", label: "Industrias" },
];
