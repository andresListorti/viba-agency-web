import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { SITE } from "@/lib/content";
import { SITE_URL } from "@/lib/site-url";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, jsonLdString, organizationJsonLd, shareMetadata } from "@/lib/seo";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s · VIBA Agency",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE_URL }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "marketing",
  keywords: [
    "agencia de marketing",
    "agencia de marketing digital",
    "marketing digital Argentina",
    "social media",
    "community management",
    "performance",
    "paid media",
    "branding",
    "estrategia digital",
    "VIBA Agency",
  ],
  formatDetection: { telephone: false, email: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  ...shareMetadata({ title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, path: "/" }),
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(organizationJsonLd) }} />
      </body>
    </html>
  );
}
