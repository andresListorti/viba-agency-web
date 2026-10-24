import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Method from "@/components/home/Method";
import Services from "@/components/home/Services";
import Clients from "@/components/home/Clients";
import DiagnosticTeaser from "@/components/home/DiagnosticTeaser";
import InstagramCta from "@/components/home/InstagramCta";
import Contact from "@/components/home/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Method />
      <Services />
      <Clients />
      <DiagnosticTeaser />
      <InstagramCta />
      <Contact />
    </>
  );
}
