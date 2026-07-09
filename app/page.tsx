import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import AboutMe from "./components/sections/Aboutme";
import ContactMe from "./components/sections/ContactMe";
import Projects from "./components/sections/FeaturedProjects";
import HeroCTA from "./components/sections/Hero";
import TechStack from "./components/sections/TechStack";
import Testimonials from "./components/sections/Testimonials";
import ScrollToTop from "./components/ui/ScrollToTop";

const sections = [Projects, AboutMe, Testimonials, ContactMe];

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <section className="flex flex-col items-center justify-center gap-8 md:flex-row">
        <HeroCTA />
        <TechStack />
      </section>

      <Projects />
      <AboutMe />
      <Testimonials />
      <ContactMe />

      <Footer />

      <ScrollToTop />
    </main>
  );
}
