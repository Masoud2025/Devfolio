"use client";

import { useState } from "react";
import { Globe, Menu, Moon, Sun, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState<"EN" | "FA">("EN");

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="
          fixed top-5 right-5 z-[60]
          flex h-16 w-16 items-center justify-center
          rounded-2xl
          bg-black
          border border-zinc-800
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
            {["Home", "About", "Projects", "Tech Stack", "Contact"].map(
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
            {/* Controls */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {/* Theme */}
              <button
                onClick={() => setDarkMode((prev) => !prev)}
              className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-4 text-white transition-all duration-300 hover:border-white md:min-w-[220px]"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-5 w-5">
                    <Sun
                      size={20}
                      className={`absolute transition-all duration-300
                      ${
                        darkMode
                          ? "scale-0 rotate-180 opacity-0"
                          : "scale-100 rotate-0 opacity-100"
                      }`}
                    />

                    <Moon
                      size={20}
                      className={`absolute transition-all duration-300
                      ${
                        darkMode
                          ? "scale-100 rotate-0 opacity-100"
                          : "scale-0 -rotate-180 opacity-0"
                      }`}
                    />
                  </div>

                  <span className="font-medium text-white">
                    {darkMode ? "Dark Mode" : "Light Mode"}
                  </span>
                </div>
              </button>

              {/* Language */}
              <button
                onClick={() =>
                  setLanguage((prev) => (prev === "EN" ? "FA" : "EN"))
                }
                className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-4 text-white transition-all duration-300 hover:border-white md:min-w-[220px]"
              >
                <div className="flex items-center gap-3">
                  <Globe size={20} />

                  <span className="font-medium">{language}</span>
                </div>

                <span className="text-sm text-zinc-400">
                  {language === "EN" ? "English" : "فارسی"}
                </span>
              </button>
            </div>

            {/* Social */}
            <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm font-medium uppercase tracking-[0.3em] text-zinc-400">
              {["GitHub", "LinkedIn", "Telegram", "Email"].map((item) => (
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