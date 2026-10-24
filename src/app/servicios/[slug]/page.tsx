import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PILLARS, SERVICES, pillarName, waLink } from "@/lib/content";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) return {};
  return {
    title: s.name,
    description: s.short,
    alternates: { canonical: `/servicios/${s.slug}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) notFound();

  const idx = SERVICES.indexOf(s);
  const next = SERVICES[(idx + 1) % SERVICES.length];
  const related = SERVICES.filter((x) => x.pillar === s.pillar && x.slug !== s.slug);
  const pillar = PILLARS.find((p) => p.id === s.pillar)!;

  return (
    <article className="pt-32 md:pt-40">
      <div className="wrap">
        <nav aria-label="Ruta" className="mb-10 flex gap-2 text-sm text-smoke">
          <Link href="/#servicios" className="ulink hover:text-bone">Servicios</Link>
          <span aria-hidden="true">/</span>
          <span>{pillarName(s.pillar)}</span>
        </nav>

        <Reveal>
          <h1 className="display max-w-[14ch] text-[clamp(3rem,9vw,8.5rem)]">{s.name}</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-[44ch] text-xl leading-relaxed text-smoke md:text-2xl">{s.short}</p>
        </Reveal>
      </div>

      <Reveal delay={0.2} className="wrap mt-16 md:mt-24">
        <figure className="group relative aspect-[16/9] overflow-hidden rounded-lg md:aspect-[21/9]">
          <Image src={`/img/${s.img}.webp`} alt="" fill priority sizes="100vw" className="feel object-cover" />
        </figure>
      </Reveal>

      <div className="wrap grid gap-16 py-24 md:grid-cols-12 md:py-32">
        <div className="md:col-span-6">
          <p className="text-2xl leading-snug md:text-3xl">{s.long}</p>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <h2 className="mb-6 text-sm text-smoke">Qué incluye</h2>
          <ul className="border-t border-line">
            {s.includes.map((item) => (
              <li key={item} className="flex items-center justify-between gap-4 border-b border-line py-5 text-lg">
                {item}
                <span className="size-1.5 rounded-full bg-bone" aria-hidden="true" />
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm leading-relaxed text-smoke">
            Parte del pilar <span className="text-bone">{pillar.name}</span>. {pillar.text}
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <div className="wrap border-t border-line py-20">
          <h2 className="mb-8 text-sm text-smoke">Se combina bien con</h2>
          <div className="flex flex-wrap gap-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/servicios/${r.slug}`} className="btn btn-ghost">
                {r.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-line bg-graphite">
        <div className="wrap grid gap-10 py-20 md:grid-cols-2 md:items-center md:py-28">
          <div>
            <h2 className="display text-[clamp(2.4rem,5vw,4.5rem)]">¿Lo vemos para tu marca?</h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={waLink(`Hola VIBA! Me interesa ${s.name}.`)} target="_blank" rel="noopener" className="btn btn-light">
                Consultar por WhatsApp
              </a>
              <Link href="/diagnostico" className="btn btn-ghost">Hacé el diagnóstico</Link>
            </div>
          </div>
          <Link href={`/servicios/${next.slug}`} className="group flex flex-col items-start gap-2 md:items-end md:text-right">
            <span className="text-sm text-smoke">Siguiente servicio</span>
            <span className="display text-[clamp(1.8rem,3.5vw,3rem)] font-bold tracking-[-0.03em] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-x-3">
              {next.name}
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
