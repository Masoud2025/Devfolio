"use client";

import { useLanguage } from "@/app/context/LanguageContext";

export default function Navbar() {
  const { locale, setLocale } = useLanguage();

  return (
    <>
      {/* Top Bar (Logo + Language Button) */}
      <div className="fixed top-5 left-5 right-5 z-[60] flex items-center justify-between">
        {/* Logo */}
        <div className="rounded-lg border border-white px-3 py-1 text-xl font-bold text-white mix-blend-difference">
          M.
        </div>

        {/* Language Button */}
        <button
          onClick={() => setLocale(locale === "en" ? "fa" : "en")}
          className="
            flex items-center gap-2
            rounded-full
            border border-zinc-700
            bg-black/80
            px-4 py-2
            text-sm font-medium
            text-white
            backdrop-blur-sm
            transition-all duration-300
            hover:scale-105
            hover:border-white
            active:scale-95
          "
        >
          <span className={locale === "en" ? "text-white" : "text-zinc-500"}>
            EN
          </span>
          <span className="text-zinc-600">/</span>
          <span className={locale === "fa" ? "text-white" : "text-zinc-500"}>
            FA
          </span>
        </button>
      </div>
    </>
  );
}