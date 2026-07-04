import Navbar from "./components/layout/Navbar";
import HeroCTA from "./components/sections/Hero";
import TechStack from "./components/sections/TechStack";

export default function Home() {
  return (
    <section className="flex  flex-col  md:flex-row md:justify-center md:items-center">
      <Navbar />
      <HeroCTA />
      <TechStack />
    </section>
  );
}
