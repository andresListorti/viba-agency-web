import { SITE } from "@/lib/content";

export default function InstagramCta() {
  return (
    <section className="border-t border-line py-24 md:py-32">
      <div className="wrap grid gap-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <p className="text-sm text-smoke">Hacemos marketing, pero con método.</p>
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener"
            className="group mt-4 block w-fit"
            aria-label="Seguinos en Instagram, @viba.agencia"
          >
            <span className="display relative block text-[clamp(1.9rem,9vw,8.5rem)] lowercase">
              @viba.agencia
              <span className="absolute -bottom-1 left-0 h-[0.06em] w-full origin-left scale-x-0 bg-bone transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-x-100" aria-hidden="true" />
            </span>
          </a>
        </div>
        <div className="flex flex-col gap-4 md:col-span-4 md:items-end">
          <p className="max-w-[32ch] text-smoke md:text-right">
            Lo que hacemos y cómo lo hacemos, también en Instagram.
          </p>
          <a href={SITE.instagram} target="_blank" rel="noopener" className="btn btn-ghost">
            <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
            </svg>
            Seguinos en Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
