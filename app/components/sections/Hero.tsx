"use client";
import { useLanguage } from "../../context/LanguageContext";
import { 
  ArrowDown, 
  Mail, 
  Code2, 
  Sparkles,
  ExternalLink
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Hero() {
  const { t } = useLanguage();
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
      className="min-h-screen flex items-center justify-center px-4 scroll-mt-28 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text Content */}
          <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 backdrop-blur-sm">
              <Sparkles size={16} className="text-purple-400" />
              <span className="text-sm font-medium text-purple-300">
                {t.hero?.subtitle || "Open to Work"}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                {t.hero?.head1 || "Hi, I'm"}
              </span>
              <br />
              <span className="text-foreground">
                {t.hero?.head2 || "A Developer"}
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
              {t.hero?.Description || "Passionate developer crafting beautiful digital experiences with modern technologies. Specialized in building responsive and performant web applications."}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={scrollToNext}
                className="group relative px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  {t.hero?.Projects || "View My Work"}
                  <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
                </span>
              </button>
              
              <a 
                href="#contact"
                className="px-8 py-3 rounded-full border border-border bg-background/50 backdrop-blur-sm text-foreground font-medium hover:bg-accent transition-all duration-300 hover:scale-105"
              >
                {t.hero?.Contact || "Contact Me"}
              </a>
            </div>

            {/* Social Links - فقط Email */}
            <div className="flex items-center gap-4 pt-4">
              <span className="text-sm text-muted-foreground">Email me</span>
              <a 
                href="mailto:example@email.com" 
                className="p-2 rounded-full border border-border hover:border-foreground hover:bg-accent transition-all duration-300 hover:scale-110"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Right side - Video/Image */}
          <div className={`flex justify-center items-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="relative group">
              {/* Glowing ring effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              
              {/* Code decoration */}
              <div className="absolute -top-4 -right-4 p-2 rounded-lg bg-background/80 backdrop-blur-sm border border-border shadow-lg">
                <Code2 size={24} className="text-purple-400" />
              </div>
              
              {/* Video container */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-purple-500/30 shadow-2xl shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all duration-500 group-hover:scale-105">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/programmernobg.webm" type="video/mp4" />
                </video>
              </div>

              {/* Floating tech tags */}
              <div className="absolute -bottom-2 -left-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-lg text-xs font-mono text-purple-400">
                &lt;React /&gt;
              </div>
              <div className="absolute -top-2 -left-4 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-lg text-xs font-mono text-blue-400">
                Next.js
              </div>
              <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-lg text-xs font-mono text-pink-400">
                TypeScript
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            Scroll
          </span>
          <ArrowDown size={20} className="text-muted-foreground" />
        </div>
      </div>
    </section>
  );
}