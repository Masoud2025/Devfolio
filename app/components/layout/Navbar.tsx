"use client";

import { useState } from "react";
import { Globe, Menu, X } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { locale, setLocale } = useLanguage();
  const { t } = useLanguage();

  return (
    <>
      {/* Top Bar (Logo + Menu Button) */}
      <div className="fixed top-5 left-5 right-5 z-[60] flex items-center justify-between">
        {/* Logo */}
        <div className="rounded-lg border border-white px-3 py-1 text-xl font-bold text-white mix-blend-difference">
          M.
        </div>

        {/* Menu Button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="
            flex h-16 w-16 items-center justify-center
            rounded-2xl
            border border-zinc-800
            bg-black
            shadow-xl
            transition-all duration-300
            hover:scale-105
            active:scale-95
          "
        >
          <Menu
            size={30}
            className={`absolute text-white transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]
            ${
              isOpen
                ? "rotate-180 scale-0 opacity-0"
                : "rotate-0 scale-100 opacity-100"
            }`}
          />

          <X
            size={30}
            className={`absolute text-white transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]
            ${
              isOpen
                ? "rotate-0 scale-100 opacity-100"
                : "-rotate-180 scale-0 opacity-0"
            }`}
          />
        </button>
      </div>

      {/* Fullscreen Menu */}
      <div
        className={`fixed inset-0 z-50 bg-black transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]
        ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-between px-6 py-24 sm:px-10">
          {/* Navigation */}
          <nav className="flex flex-col gap-6 md:gap-8">
            {[t.navbar.Home, t.navbar.About, t.navbar.Projects, t.navbar.tech, t.navbar.contact].map(
              (item, index) => (
                <a
                  key={item}
                  href="#"
                  className={`text-4xl font-black tracking-tight text-white transition-all duration-500 hover:translate-x-3 sm:text-5xl md:text-6xl
                  ${
                    isOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  {item}
                </a>
              )
            )}
          </nav>

          {/* Bottom */}
          <div className="border-t border-zinc-800 pt-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            

              {/* Language */}
              <button
                onClick={() =>
                  setLocale(locale === "en" ? "fa" : "en")
                }
                className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-4 text-white transition-all duration-300 hover:border-white md:min-w-[220px]"
              >
                <div className="flex items-center gap-3">
                  <Globe size={20} />
                  <span className="font-medium">
                    {locale.toUpperCase()}
                  </span>
                </div>

                <span className="text-sm text-zinc-400">
                  {locale === "en" ? "English" : "فارسی"}
                </span>
              </button>
            </div>

            {/* Social */}
            <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm font-medium uppercase tracking-[0.3em] text-zinc-400">
              {[t.navbar.Github, t.navbar.Linkedin, t.navbar.Telegram, t.navbar.Email].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="transition-colors duration-300 hover:text-white"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}