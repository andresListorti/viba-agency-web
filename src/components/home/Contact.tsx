import { SITE, waLink } from "@/lib/content";
import { WhatsAppIcon } from "@/components/WhatsAppFloat";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contacto" className="border-t border-line bg-graphite py-28 md:py-40">
      <div className="wrap grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 className="display text-[clamp(3rem,12vw,10rem)]">
            Hablemos<span className="text-smoke">.</span>
          </h2>
          <p className="mt-6 max-w-[38ch] text-base md:text-lg leading-relaxed text-smoke">
            Contanos qué está pasando con tu marca y lo pensamos juntos.
          </p>

          <a
            href={waLink("Hola VIBA! Quiero hablar sobre mi marca.")}
            target="_blank"
            rel="noopener"
            className="group mt-10 flex w-full max-w-md items-center gap-5 rounded-2xl border border-line p-5 transition-colors duration-500 hover:border-bone hover:bg-bone hover:text-ink"
          >
            <span className="grid size-14 shrink-0 place-items-center rounded-full bg-bone text-ink transition-colors duration-500 group-hover:bg-ink group-hover:text-bone">
              <WhatsAppIcon className="size-7" />
            </span>
            <span className="flex flex-col">
              <strong className="font-semibold">Escribinos por WhatsApp</strong>
              <span className="text-sm opacity-60">{SITE.phone}</span>
            </span>
          </a>

          <dl className="mt-12 grid max-w-md grid-cols-[7rem_1fr] gap-y-4 text-sm">
            <dt className="text-smoke">Email</dt>
            <dd><a className="ulink" href={`mailto:${SITE.email}`}>{SITE.email}</a></dd>
            <dt className="text-smoke">Instagram</dt>
            <dd><a className="ulink" href={SITE.instagram} target="_blank" rel="noopener">@viba.agencia</a></dd>
            <dt className="text-smoke">LinkedIn</dt>
            <dd><a className="ulink" href={SITE.linkedin} target="_blank" rel="noopener">viba-agency</a></dd>
            <dt className="text-smoke">Ubicación</dt>
            <dd>{SITE.location}</dd>
          </dl>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:pt-6">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
