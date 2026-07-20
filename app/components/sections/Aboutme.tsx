"use client";
import { useLanguage } from "../../context/LanguageContext";
import { memo } from "react";
import { Download, Mail, MapPin } from "lucide-react";

function AboutMe() {
  const { t } = useLanguage();

  return (
    <section id="about" className="w-full py-24 px-6 md:px-20 scroll-mt-28">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        {/* Left Side - Image/Visual */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl md:text-8xl font-black text-white/10">MJ</div>
            </div>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="flex-1">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight">
            {t.About.Title}
          </h2>

          <p className="mt-8 text-gray-700 dark:text-gray-300 leading-relaxed text-xl">
            {t.About.description}
          </p>

          <p className="mt-6 text-gray-600 dark:text-gray-400 text-lg">
            {t.About.Descriptiontow}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="px-8 py-3.5 bg-black text-white rounded-full hover:bg-gray-800 transition text-lg font-semibold shadow-lg hover:shadow-xl">
              {t.About.button1}
            </button>

            <button className="px-8 py-3.5 border border-black text-black rounded-full hover:bg-black hover:text-white transition text-lg font-semibold">
              {t.About.button2}
            </button>
          </div>

          {/* Social Links */}
          <div className="mt-10 flex flex-wrap gap-3">
            {[
              { icon: Download, label: "Resume" },
              { icon: Mail, label: "Email" },
              { icon: MapPin, label: "Location" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2.5 border border-black/10 rounded-full hover:bg-black/5 transition"
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-6xl mx-auto mt-24 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { value: "2+", label: t.About.Years },
          { value: "10+", label: t.About.ProjectCount },
          { value: "5+", label: t.About.Technologies },
          { value: "100%", label: t.About.Commitment },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-8 border border-black/10 rounded-3xl hover:shadow-xl transition text-center"
          >
            <h3 className="text-5xl font-black">{stat.value}</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default memo(AboutMe);
