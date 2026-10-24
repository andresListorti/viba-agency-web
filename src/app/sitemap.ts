import type { MetadataRoute } from "next";
import { SERVICES, SITE } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/diagnostico`, changeFrequency: "yearly", priority: 0.7 },
    ...SERVICES.map((s) => ({ url: `${SITE.url}/servicios/${s.slug}`, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
