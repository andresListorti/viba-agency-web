import { ogSize, renderOg } from "@/lib/og";
import { SERVICES, pillarName } from "@/lib/content";

export const alt = "Servicio de VIBA Agency";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = SERVICES.find((x) => x.slug === slug)!;
  return renderOg({ title: s.name, kicker: pillarName(s.pillar) });
}
