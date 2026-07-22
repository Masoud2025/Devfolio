"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { useTheme } from "@/app/context/ThemeContext";
import {
  Briefcase,
  Code,
  Home,
  Mail,
  Moon,
  Sun,
  User,
  Menu,
  X,
  ChevronDown,
  Globe,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type TabName = "home" | "about" | "blog" | "skills" | "contact";

interface NavbarProps {
  activeTab: TabName;
  onTabChange: (tab: TabName) => void;
}

const navTabs: { id: TabName; key: string; icon: typeof Home }[] = [
  { id: "home", key: "Home", icon: Home },
  { id: "about", key: "About", icon: User },
  { id: "blog", key: "Blog", icon: Briefcase },
  { id: "skills", key: "Skills", icon: Code },
  { id: "contact", key: "contact", icon: Mail },
];

const locales = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fa", label: "فارسی", flag: "🇮🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "pt-BR", label: "Português (BR)", flag: "🇧🇷" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "sv", label: "Svenska", flag: "🇸🇪" },
  { code: "no", label: "Norsk", flag: "🇳🇴" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "uk", label: "Українська", flag: "🇺🇦" },
] as const;

type Locale = (typeof locales)[number]["code"];

export default function Navbar({ activeTab, onTabChange }: NavbarProps) {
  const { locale, setLocale, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const languageRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const currentLocale = locales.find((l) => l.code === locale) || locales[0];

  const handleLocaleChange = (code: Locale) => {
    setLocale(code);
    setIsLanguageOpen(false);
  };

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageRef.current &&
        !languageRef.current.contains(event.target as Node)
      ) {
        setIsLanguageOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on tab change
  const handleTabClick = (tabId: TabName) => {
    onTabChange(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getLabel = (key: string) =>
    (t.navbar?.[key as keyof typeof t.navbar] as string) || key;

  const isDark = theme === "dark";

  return (
    <>
      {/* ===== DESKTOP NAVBAR ===== */}
      <header className="hidden md:block fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative mt-4">
            {/* Glass morphism container */}
            <div
              className={`
                flex items-center justify-between
                px-6 py-3 rounded-2xl
                bg-white/70 dark:bg-gray-900/70
                backdrop-blur-xl backdrop-saturate-150
                border border-white/20 dark:border-gray-700/30
                shadow-[0_8px_32px_rgba(0,0,0,0.08)]
                dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]
                transition-all duration-300
              `}
            >
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-purple-500/20 dark:ring-purple-400/20">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  >
                    <source src="/videos/programmernobg.webm" type="video/mp4" />
                  </video>
                </div>
                <span
                  className={`
                    text-lg font-bold tracking-tight
                    bg-gradient-to-r from-purple-600 to-blue-600
                    dark:from-purple-400 dark:to-blue-400
                    bg-clip-text text-transparent
                  `}
                >
                  Masoud
                </span>
              </div>

              {/* Navigation Links */}
              <nav className="flex items-center gap-1">
                {navTabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id)}
                      className={`
                        group relative px-4 py-2 rounded-xl
                        flex items-center gap-2
                        text-sm font-medium
                        transition-all duration-200
                        ${
                          isActive
                            ? "text-purple-600 dark:text-purple-400 bg-purple-50/80 dark:bg-purple-900/30"
                            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/60 dark:hover:bg-gray-800/60"
                        }
                      `}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                      <span>{getLabel(tab.key)}</span>
                      {isActive && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                      )}
                    </button>
    );
  }                )}
              </nav>

              {/* Right Actions */}
              <div className="flex items-center gap-2">
                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className={`
                    p-2 rounded-xl
                    text-gray-500 dark:text-gray-400
                    hover:text-gray-900 dark:hover:text-white
                    hover:bg-gray-100/60 dark:hover:bg-gray-800/60
                    transition-all duration-200
                    hover:scale-105 active:scale-95
                  `}
                  aria-label="Toggle theme"
                >
                  {isDark ? (
                    <Sun size={20} className="text-yellow-400" />
                  ) : (
                    <Moon size={20} className="text-indigo-500" />
                  )}
                </button>

                {/* Language Selector */}
                <div className="relative" ref={languageRef}>
                  <button
                    onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-xl
                      text-gray-600 dark:text-gray-400
                      hover:text-gray-900 dark:hover:text-white
                      hover:bg-gray-100/60 dark:hover:bg-gray-800/60
                      transition-all duration-200
                    `}
                    aria-expanded={isLanguageOpen}
                    aria-haspopup="true"
                  >
                    <Globe size={18} />
                    <span className="text-lg">{currentLocale.flag}</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        isLanguageOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isLanguageOpen && (
                    <div
                      className={`
                        absolute right-0 top-full mt-2
                        w-56 max-h-80 overflow-y-auto
                        p-1 rounded-xl
                        bg-white/95 dark:bg-gray-900/95
                        backdrop-blur-xl
                        border border-gray-200/50 dark:border-gray-700/50
                        shadow-2xl shadow-black/10 dark:shadow-black/40
                        animate-in fade-in slide-in-from-top-2 duration-200
                      `}
                      role="menu"
                    >
                      {locales.map((loc) => {
                        const isActive = locale === loc.code;
                        return (
                          <button
                            key={loc.code}
                            onClick={() => handleLocaleChange(loc.code)}
                            className={`
                              w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                              text-sm transition-all duration-150
                              ${
                                isActive
                                  ? "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/60 dark:hover:bg-gray-800/60"
                              }
                            `}
                            role="menuitem"
                          >
                            <span>{loc.flag}</span>
                            <span>{loc.label}</span>
                            {isActive && (
                              <span className="ml-auto text-purple-500">✓</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ===== MOBILE HEADER ===== */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50">
        <div className="px-4 pt-3">
          <div
            className={`
              flex items-center justify-between
              px-4 py-2.5 rounded-2xl
              bg-white/80 dark:bg-gray-900/80
              backdrop-blur-xl backdrop-saturate-150
              border border-white/20 dark:border-gray-700/30
              shadow-[0_4px_20px_rgba(0,0,0,0.06)]
              dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]
            `}
          >
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg overflow-hidden ring-2 ring-purple-500/20">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/programmernobg.webm" type="video/mp4" />
                </video>
              </div>
              <span className="text-base font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Masoud
              </span>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100/60 dark:hover:bg-gray-800/60 transition-all"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100/60 dark:hover:bg-gray-800/60 transition-all"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div
              ref={mobileMenuRef}
              className={`
                mt-2 p-2 rounded-2xl
                bg-white/95 dark:bg-gray-900/95
                backdrop-blur-xl
                border border-gray-200/50 dark:border-gray-700/50
                shadow-2xl shadow-black/10 dark:shadow-black/40
                animate-in slide-in-from-top-2 duration-200
              `}
            >
              <nav className="flex flex-col gap-1">
                {navTabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id)}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl
                        text-sm font-medium
                        transition-all duration-200
                        ${
                          isActive
                            ? "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/60 dark:hover:bg-gray-800/60"
                        }
                      `}
                    >
                      <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                      <span>{getLabel(tab.key)}</span>
                      {isActive && (
                        <span className="ml-auto text-purple-500">✓</span>
                      )}
                    </button>
                  );
                })}

                <div className="border-t border-gray-200/50 dark:border-gray-700/50 my-1" />

                {/* Mobile Language Selector */}
                <div className="p-2">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 px-2 mb-2">
                    Language
                  </p>
                  <div className="grid grid-cols-2 gap-1">
                    {locales.slice(0, 8).map((loc) => {
                      const isActive = locale === loc.code;
                      return (
                        <button
                          key={loc.code}
                          onClick={() => handleLocaleChange(loc.code)}
                          className={`
                            flex items-center gap-2 px-3 py-2 rounded-lg
                            text-sm transition-all duration-150
                            ${
                              isActive
                                ? "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/60 dark:hover:bg-gray-800/60"
                            }
                          `}
                        >
                          <span>{loc.flag}</span>
                          <span className="truncate">{loc.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

    </>
  );
}