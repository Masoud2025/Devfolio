"use client";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  const scrollToNext = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="h-screen flex items-center justify-center px-4 scroll-mt-28 relative overflow-hidden"
    >
      <div className="mx-auto max-w-6xl w-full flex flex-col items-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span className="text-foreground">
              مسعود جعفری
            </span>
            <span className="text-foreground">
              برنامه نویس
            </span>
          </h1>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            اسکرول
          </span>
          <ArrowDown size={20} className="text-muted-foreground" />
        </div>
      </div>
    </section>
  );
}
