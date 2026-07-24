import { Navbar } from "@/components/layout/Navbar";
// import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { Certifications } from "@/components/sections/Certifications"; 
import { ScrollToTop } from "@/components/ui/ScrollToTop";

export default function Home() {
  return (
    <main className="bg-navy-950 dark:bg-navy-950 text-slate-100 overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Certifications /> 
      <Contact />
      {/* <Footer /> */}
      <ScrollToTop />
    </main>
  );
}
