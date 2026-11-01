import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Page() {
  return (
    <main className="relative z-10">
      <Hero />
      <Services />
      <Projects />
      <About />
      <Contact />
    </main>
  );
}
