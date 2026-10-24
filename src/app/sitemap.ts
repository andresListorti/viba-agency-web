import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/content";
import { SITE_URL } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/diagnostico`, changeFrequency: "yearly", priority: 0.7 },
    ...SERVICES.map((s) => ({ url: `${SITE_URL}/servicios/${s.slug}`, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
