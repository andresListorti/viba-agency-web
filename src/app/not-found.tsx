import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-svh flex-col justify-center pt-24">
      <p className="text-sm text-smoke">Error 404</p>
      <h1 className="display mt-4 text-[clamp(3rem,10vw,9rem)]">Esta página no existe.</h1>
      <p className="mt-6 max-w-[40ch] text-smoke">Puede que el enlace esté roto o que la hayamos movido.</p>
      <div className="mt-10 flex gap-3">
        <Link href="/" className="btn btn-light">Volver al inicio</Link>
        <Link href="/#contacto" className="btn btn-ghost">Contactarnos</Link>
      </div>
    </section>
  );
}
