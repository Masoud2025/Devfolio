import Navbar from "./components/layout/Navbar";
import Projects from "./components/sections/FeaturedProjects";
import HeroCTA from "./components/sections/Hero";
import TechStack from "./components/sections/TechStack";

export default function Home() {
  return (
    <section className="flex  flex-col ">
      <Navbar />
      <div className="flex flex-col md:flex-row md:justify-center md:items-center">
        <HeroCTA />
        <TechStack />
      </div>
      <Projects />
    </section>
  );
}
