import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import AboutMe from "./components/sections/Aboutme";
import ContactMe from "./components/sections/ContactMe";
import Education from "./components/sections/Education";
import Experience from "./components/sections/Experince";
import Projects from "./components/sections/FeaturedProjects";
import HeroCTA from "./components/sections/Hero";
import Services from "./components/sections/Services";
import Skills from "./components/sections/Skills";
import TechStack from "./components/sections/TechStack";
import Testimonials from "./components/sections/Testimonials";
import ScrollToTop from "./components/ui/ScrollToTop";


export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden ">
      <Navbar />

      <section className="flex flex-col items-center justify-center gap-8 md:flex-row">
        <HeroCTA />
        {/* <TechStack /> */}
      </section>

      <Projects />
      <Experience/>
      <Education/>
      <Skills/>
      <Services/>
      <AboutMe />
      <Testimonials />
      <ContactMe />

      <Footer />

      <ScrollToTop />
    </main>
  );
}
