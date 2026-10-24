import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { SITE } from "@/lib/content";

const aileron = localFont({
  src: [
    { path: "../fonts/aileron-700.woff2", weight: "700", style: "normal" },
    { path: "../fonts/aileron-900.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-aileron",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "VIBA Agency · Marketing estratégico a medida",
    template: "%s · VIBA Agency",
  },
  description:
    "Hacemos marketing, pero con método. Agencia con +10 años de trayectoria: equipos interdisciplinarios, estrategia data driven, creatividad y performance a medida de cada marca.",
  keywords: ["agencia de marketing", "marketing digital", "social media", "performance", "branding", "Argentina", "VIBA"],
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: SITE.name,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MarketingAgency",
  name: SITE.name,
  url: SITE.url,
  email: SITE.email,
  telephone: SITE.phone,
  slogan: SITE.motto,
  areaServed: "Worldwide",
  address: { "@type": "PostalAddress", addressCountry: "AR" },
  sameAs: [SITE.linkedin, SITE.instagram],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR" className={`${aileron.variable} ${montserrat.variable}`}>
      <body>
        <a
          href="#main"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-bone px-4 py-2 text-sm text-ink focus:translate-y-0"
        >
          Saltar al contenido
        </a>
        <SmoothScroll />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <div className="grain" aria-hidden="true" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
