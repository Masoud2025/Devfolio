import Navbar from "./components/layout/Navbar";
import HeroCTA from "./components/sections/Hero";

export default function Home() {
  return (
    <section className="flex justify-center items-center">
      <Navbar />
      <HeroCTA/>
    </section>
  );
}
