import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import HeroCTA from "./components/sections/Hero";
import ScrollToTop from "./components/ui/ScrollToTop";
import LazySection from "./components/ui/LazySection";

const sectionSkeleton = (
  <div className="mx-auto max-w-7xl px-6 py-32 animate-pulse">
    <div className="mx-auto mb-16 h-10 w-64 rounded-full bg-zinc-200/60 dark:bg-zinc-800/60" />
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-72 rounded-3xl bg-zinc-200/60 dark:bg-zinc-800/60"
        />
      ))}
    </div>
  </div>
);

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden ">
      <Navbar />

      <section className="flex flex-col items-center justify-center gap-8 md:flex-row">
        <HeroCTA />
        {/* <TechStack /> */}
      </section>

      <LazySection name="FeaturedProjects" skeleton={sectionSkeleton} />
      <LazySection name="Experince" skeleton={sectionSkeleton} />
      <LazySection name="Education" skeleton={sectionSkeleton} />
      <LazySection name="Skills" skeleton={sectionSkeleton} />
      <LazySection name="Services" skeleton={sectionSkeleton} />
      <LazySection name="Aboutme" skeleton={sectionSkeleton} />
      <LazySection name="Testimonials" skeleton={sectionSkeleton} />
      <LazySection name="ContactMe" skeleton={sectionSkeleton} />

      <Footer />

      <ScrollToTop />
    </main>
  );
}
