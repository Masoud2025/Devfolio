"use client";
import { useLanguage } from "../../context/LanguageContext";
import { memo } from "react";
import { useInView } from "react-intersection-observer";
import { Download, Mail, MapPin } from "lucide-react";

function AboutMe() {
  const { t } = useLanguage();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="about"
      ref={ref}
      className="w-full py-20 md:py-24 px-6 md:px-8 lg:px-20 scroll-mt-28"
    >
      <div className={`max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 md:gap-16 items-center transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Left Side - Image/Visual */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-border/20 shadow-2xl">
            {/* Gradient overlay using theme-aware background */}
             <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl md:text-8xl font-black text-foreground/10">MJ</div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="flex-1">
           <h2 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">
            {t.About.Title}
          </h2>

          <p className="mt-8 text-foreground/80 leading-relaxed text-xl">
            {t.About.description}
          </p>

          <p className="mt-6 text-foreground/60 text-lg">
            {t.About.Descriptiontow}
          </p>

          {/* Buttons with dynamic theming */}
          <div className="mt-8 md:mt-10 flex flex-wrap gap-3 md:gap-4">
            <button className="px-6 py-3 md:px-8 md:py-3.5 bg-foreground text-background rounded-full hover:bg-foreground/80 transition text-base md:text-lg font-semibold shadow-lg hover:shadow-xl hover:shadow-foreground/20">
              {t.About.button1}
            </button>

            <button className="px-6 py-3 md:px-8 md:py-3.5 border border-foreground/20 text-foreground rounded-full hover:bg-foreground hover:text-background transition text-base md:text-lg font-semibold">
              {t.About.button2}
            </button>
          </div>

          {/* Social Links - dynamic theming */}
          <div className="mt-10 flex flex-wrap gap-3">
            {[
              { icon: Download, label: "Resume" },
              { icon: Mail, label: "Email" },
              { icon: MapPin, label: "Location" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2.5 border border-border/20 rounded-full hover:bg-foreground/5 transition backdrop-blur-sm"
              >
                <Icon size={18} className="text-foreground/60" />
                <span className="text-sm font-medium text-foreground/70">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid - dynamic theming */}
          <div className={`max-w-6xl mx-auto mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {[
          { value: "2+", label: t.About.Years },
          { value: "10+", label: t.About.ProjectCount },
          { value: "5+", label: t.About.Technologies },
          { value: "100%", label: t.About.Commitment },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-6 md:p-8 border border-border/10 rounded-3xl hover:shadow-xl transition text-center bg-background backdrop-blur-sm hover:border-zinc-400/30"
          >
             <h3 className="text-4xl md:text-5xl font-black text-foreground">
              {stat.value}
            </h3>
            <p className="text-muted-foreground mt-2 md:mt-3 text-base md:text-lg">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default memo(AboutMe);