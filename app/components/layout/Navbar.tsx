"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { useTheme } from "@/app/context/ThemeContext";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const { locale, setLocale } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {/* Top Bar (Logo + Language Button + Theme Button) */}
      <div className="fixed top-5 left-5 right-5 z-[60] flex items-center justify-between">
        {/* Logo */}
        <div className="rounded-lg border border px-3 py-1 text-xl font-bold  mix-blend-difference">
          M.
        </div>

        {/* Right side buttons */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="
              flex items-center justify-center
              rounded-full
              border border-zinc-700
              bg-black/80
              w-10 h-10
              text-white
              backdrop-blur-sm
              transition-all duration-300
              hover:scale-105
              hover:border-white
              active:scale-95
            "
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun size={18} className="text-yellow-400" />
            ) : (
              <Moon size={18} className="text-blue-400" />
            )}
          </button>

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
      </div>
    </>
  );
}