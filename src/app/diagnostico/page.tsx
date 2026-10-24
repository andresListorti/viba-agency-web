import type { Metadata } from "next";
import Diagnostic from "./Diagnostic";
import { shareMetadata } from "@/lib/seo";

const title = "Diagnóstico de marca";
const description = "Respondé 3 preguntas y descubrí qué servicios de marketing necesita tu marca hoy.";

export const metadata: Metadata = {
  title,
  description,
  ...shareMetadata({ title: `${title} · VIBA Agency`, description, path: "/diagnostico" }),
};

export default function Page() {
  return <Diagnostic />;
}
