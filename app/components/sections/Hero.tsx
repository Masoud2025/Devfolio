"use client";
import { useLanguage } from "../../context/LanguageContext";
export default function Hero() {
  const { locale, setLocale } = useLanguage();
  const { t } = useLanguage();

  <h1>{t.hero.title}</h1>;
  return (
    <section className="flex min-h-screen items-center justify-center px-6">
      <div className="mx-auto max-w-5xl text-center">
        {/* Badge */}
        <span className="inline-flex items-center rounded-full border border-zinc-300 px-4 py-2 text-xs font-medium uppercase tracking-[0.3em] text-zinc-600">
          {/* Available for Freelance */}
          {t.hero.title}
        </span>

        {/* Title */}
        <h1 className="mt-8 text-5xl font-black leading-tight tracking-tight text-black sm:text-6xl lg:text-4xl">
          {t.hero.head1}
          <br />
          {t.hero.head2}
          <br />
          {t.hero.head3}
        </h1>

        {/* Description */}
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-zinc-600">
          {t.hero.Description}
        </p>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#projects"
            className="rounded-full bg-black px-8 py-4 font-semibold text-white transition hover:scale-105 hover:bg-zinc-900"
          >
            {t.hero.Projects}
          </a>

          <a
            href="#contact"
            className="rounded-full border border-zinc-300 px-8 py-4 font-semibold text-black transition hover:border-black"
          >
            {t.hero.Contact}
          </a>
        </div>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full max-w-[20rem] mx-auto"
        >
          <source src="/videos/Programmer.mp4" type="video/mp4" />
        </video>
        {/* Stats */}
        <div className="mt-20 flex flex-wrap items-center justify-center gap-12 border-t border-zinc-200 pt-10">
          <div>
            <h3 className="text-3xl font-bold text-black">10+</h3>
            <p className="mt-1 text-sm text-zinc-500">
              {t.hero.ProjectsLength}
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-black">4+</h3>
            <p className="mt-1 text-sm text-zinc-500">{t.hero.Technologies}</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-black">100%</h3>
            <p className="mt-1 text-sm text-zinc-500">{t.hero.Responsive}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
