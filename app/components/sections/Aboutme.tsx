"use client";
import { useLanguage } from "../../context/LanguageContext";

export default function AboutMe() {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-white text-black py-20 px-6 md:px-20">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-start">
        {/* Left Side */}
        <div className="flex-1">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            {t.About.Title}
          </h2>

          <p className="mt-6 text-gray-700 leading-relaxed text-lg">
            {t.About.description}
          </p>

          <p className="mt-4 text-gray-600">{t.About.Descriptiontow}</p>

          <div className="mt-8 flex gap-4">
            <button className="px-5 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition">
              {t.About.button1}
            </button>

            <button className="px-5 py-2 border border-black text-black rounded-full hover:bg-black hover:text-white transition">
              {t.About.button2}
            </button>
          </div>
        </div>

        {/* Right Side - Stats / Cool Cards */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          <div className="p-6 border border-black/10 rounded-2xl hover:shadow-lg transition">
            <h3 className="text-2xl font-bold">2+</h3>
            <p className="text-gray-600 mt-1">{t.About.Years}</p>
          </div>

          <div className="p-6 border border-black/10 rounded-2xl hover:shadow-lg transition">
            <h3 className="text-2xl font-bold">10+</h3>
            <p className="text-gray-600 mt-1">{t.About.ProjectCount}</p>
          </div>

          <div className="p-6 border border-black/10 rounded-2xl hover:shadow-lg transition">
            <h3 className="text-2xl font-bold">5+</h3>
            <p className="text-gray-600 mt-1">{t.About.Technologies}</p>
          </div>

          <div className="p-6 border border-black/10 rounded-2xl hover:shadow-lg transition">
            <h3 className="text-2xl font-bold">100%</h3>
            <p className="text-gray-600 mt-1">{t.About.Commitment}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
