import type { Metadata } from "next";
import Diagnostic from "./Diagnostic";

export const metadata: Metadata = {
  title: "Diagnóstico de marca",
  description: "Respondé 3 preguntas y descubrí qué servicios de marketing necesita tu marca hoy.",
  alternates: { canonical: "/diagnostico" },
};

export default function Page() {
  return <Diagnostic />;
}
