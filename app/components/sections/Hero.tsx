"use client";
import { useLanguage } from "../../context/LanguageContext";
export default function Hero() {
  const { locale, setLocale } = useLanguage();
  const { t } = useLanguage();

  return (
    <section className="flex flex-col items-center mt-32">
       <div className="mx-auto max-w-5xl text-center mt-8">
        {/* Title */}
        <h1 className=" text-4xl md:text-5xl font-black leading-tight tracking-tight  sm:text-6xl lg:text-4xl">
          {t.hero.head1}
          <br />
          {t.hero.head2}
        </h1>
      </div>
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full max-w-[20rem] mx-auto"
      >
        <source src="/videos/programmernobg.webm" type="video/mp4" />
      </video>
     
    </section>
  );
}