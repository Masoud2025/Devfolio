import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import AboutMe from "./components/sections/Aboutme";
import ContactMe from "./components/sections/ContactMe";
import Projects from "./components/sections/FeaturedProjects";
import HeroCTA from "./components/sections/Hero";
import TechStack from "./components/sections/TechStack";
import Testimonials from "./components/sections/Testimonials";
import ScrollToTop from "./components/ui/ScrollToTop";

export default function Home() {
  return (
    <section className="flex  flex-col ">
      <Navbar />
      <div className="flex flex-col md:flex-row md:justify-center md:items-center">
        <HeroCTA />
        <TechStack />
      </div>
      <Projects />
      <AboutMe/>
      <Testimonials/>
      <ContactMe/>
      <Footer/>
      <ScrollToTop/>
    </section>
  );
}
