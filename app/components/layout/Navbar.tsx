"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { useTheme } from "@/app/context/ThemeContext";
import { Briefcase, Code, Home, Mail, Moon, Sun, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type TabName = "home" | "about" | "blog" | "skills" | "contact";

interface NavbarProps {
  activeTab: TabName;
  onTabChange: (tab: TabName) => void;
}

const navTabs: { id: TabName; key: string; icon: typeof Home }[] = [
  { id: "about", key: "About", icon: User },
  { id: "blog", key: "Blog", icon: Briefcase },
  { id: "home", key: "Home", icon: Home },
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
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [tooltip, setTooltip] = useState<string | null>(null);
  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  const currentLocale = locales.find((l) => l.code === locale) || locales[0];

  const handleLocaleChange = (code: Locale) => {
    setLocale(code);
    setIsDesktopDropdownOpen(false);
    setIsMobileDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(event.target as Node)
      ) {
        setIsDesktopDropdownOpen(false);
      }
      if (
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsMobileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTabClick = (tabId: TabName) => {
    onTabChange(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getLabel = (key: string) =>
    (t.navbar?.[key as keyof typeof t.navbar] as string) || key;

  const isDark = theme === "dark";

  return (
    <>
      {/* Desktop Vertical Sidebar - Right Side */}
      <aside
        className={`
          fixed top-0 right-0 h-screen z-[60]
          hidden md:flex flex-col items-center
          w-20 py-5 gap-3
          border-l border-white/10 dark:border-white/5
          bg-white/80 dark:bg-zinc-900/80
          backdrop-blur-xl
          transition-all duration-300
        `}
      >
        {/* Logo */}
        <div className="mb-6">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-14 h-14 object-cover rounded-xl border border-white/10"
          >
            <source src="/videos/programmernobg.webm" type="video/mp4" />
          </video>
        </div>

        {/* Nav Links */}
        <div className="flex flex-col items-center gap-2 flex-1">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <div
                key={tab.id}
                className="relative"
                onMouseEnter={() => setTooltip(getLabel(tab.key))}
                onMouseLeave={() => setTooltip(null)}
              >
                <button
                  onClick={() => handleTabClick(tab.id)}
                  className={`
                    relative w-12 h-12 flex items-center justify-center
                    rounded-xl transition-all duration-200
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50
                    ${
                      isActive
                        ? "bg-white/20 text-white dark:bg-white/20 dark:text-white shadow-lg shadow-black/10"
                        : "text-zinc-400 hover:text-white hover:bg-white/10"
                    }
                  `}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                  {isActive && (
                    <span
                      className={`absolute right-0 top-1/2 -translate-y-1/2 w-1 h-7 rounded-l-full bg-gradient-to-b from-purple-500 to-blue-500`}
                    />
                  )}
                </button>
                {tooltip === getLabel(tab.key) && (
                  <div
                    className={`
                      absolute right-full mr-3 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap
                      bg-zinc-800 text-white dark:bg-zinc-900 dark:text-white
                      shadow-lg border border-white/10 dark:border-white/5
                      pointer-events-none z-50
                    `}
                  >
                    {getLabel(tab.key)}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col items-center gap-3 mt-auto">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`
              w-12 h-12 flex items-center justify-center
              rounded-xl transition-all duration-200
              text-zinc-400 hover:text-white hover:bg-white/10
              hover:scale-105 active:scale-95
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50
            `}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun size={22} className="text-yellow-400" />
            ) : (
              <Moon size={22} className="text-indigo-400" />
            )}
          </button>

          {/* Language Selector */}
          <div className="relative" ref={desktopDropdownRef}>
            <button
              onClick={() => setIsDesktopDropdownOpen(!isDesktopDropdownOpen)}
              className={`
                w-12 h-12 flex items-center justify-center
                rounded-xl transition-all duration-200
                text-zinc-400 hover:text-white hover:bg-white/10
                hover:scale-105 active:scale-95
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50
              `}
              aria-label="Select language"
              aria-expanded={isDesktopDropdownOpen}
              aria-haspopup="true"
            >
              <span className="text-lg">{currentLocale.flag}</span>
            </button>

            {isDesktopDropdownOpen && (
              <div
                className={`
                  absolute right-full mr-3 bottom-0 w-44
                  border border-white/10 dark:border-white/5
                  bg-white/90 dark:bg-zinc-900/90
                  backdrop-blur-xl
                  shadow-2xl shadow-black/20 dark:shadow-black/40
                  py-2 overflow-hidden z-[70] rounded-xl
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
                        w-full flex items-center gap-3 px-4 py-2.5 text-sm
                        transition-all duration-150
                        ${
                          isActive
                            ? "text-white bg-white/15"
                            : "text-zinc-400 hover:text-white hover:bg-white/10"
                        }
                      `}
                      role="menuitem"
                    >
                      <span>{loc.flag}</span>
                      <span>{loc.label}</span>
                      {isActive && (
                        <span
                          className={`ml-auto text-xs bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent font-bold`}
                        >
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Top Bar - Theme + Language */}
      <div
        className={`
          fixed top-0 left-0 right-0 z-[60]
          md:hidden flex items-center justify-between
          px-4 py-2.5
          border-b border-white/10 dark:border-white/5
          bg-white/80 dark:bg-zinc-900/80
          backdrop-blur-xl
          transition-all duration-300
          shadow-lg shadow-black/10 dark:shadow-black/20
        `}
      >
        <div className="flex items-center gap-2">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-10 h-10 object-cover rounded-lg border border-white/10"
          >
            <source src="/videos/programmernobg.webm" type="video/mp4" />
          </video>
          <span
            className={`text-base font-bold ${isDark ? "text-white" : "text-zinc-900"}`}
          >
            Masoud
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className={`
              w-9 h-9 flex items-center justify-center
              rounded-xl transition-all duration-200
              text-zinc-500 hover:text-white hover:bg-white/10
            `}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-indigo-500" />
            )}
          </button>

          <div className="relative" ref={mobileDropdownRef}>
            <button
              onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
              className={`
                w-9 h-9 flex items-center justify-center
                rounded-xl transition-all duration-200
                text-zinc-500 hover:text-white hover:bg-white/10
              `}
              aria-label="Select language"
              aria-expanded={isMobileDropdownOpen}
              aria-haspopup="true"
            >
              <span className="text-lg">{currentLocale.flag}</span>
            </button>

            {isMobileDropdownOpen && (
              <div
                className={`
                  absolute right-0 mt-2 w-44
                  border border-white/10 dark:border-white/5
                  bg-white/90 dark:bg-zinc-900/90
                  backdrop-blur-xl
                  shadow-2xl shadow-black/20 dark:shadow-black/40
                  py-2 overflow-hidden z-[70] rounded-xl
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
                        w-full flex items-center gap-3 px-4 py-2.5 text-sm
                        transition-all duration-150
                        ${
                          isActive
                            ? "text-white bg-white/15"
                            : "text-zinc-400 hover:text-white hover:bg-white/10"
                        }
                      `}
                      role="menuitem"
                    >
                      <span>{loc.flag}</span>
                      <span>{loc.label}</span>
                      {isActive && (
                        <span
                          className={`ml-auto text-xs bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent font-bold`}
                        >
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Dock */}
      <nav
        className={`
          fixed bottom-4 left-4 right-4 z-[60]
          md:hidden
          flex items-center justify-around
          h-16
          bg-white/70 dark:bg-zinc-900/70
          backdrop-blur-2xl
          rounded-full
          transition-all duration-300
          shadow-[0_8px_32px_rgba(0,0,0,0.12),0_1px_rgba(255,255,255,0.6)_inset]
          dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),0_1px_rgba(255,255,255,0.1)_inset]
        `}
      >
        {navTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`
                relative flex flex-col items-center justify-center gap-0.5
                flex-1 h-full rounded-full transition-all duration-300 ease-out
                ${
                  isActive
                    ? "text-black dark:text-white scale-110"
                    : "text-zinc-500 dark:text-zinc-400"
                }
              `}
              aria-current={isActive ? "page" : undefined}
            >
              {isActive && (
                <span className="absolute inset-1 rounded-full bg-white/40 dark:bg-white/10 pointer-events-none" />
              )}
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span
                className={`font-semibold text-[10px] whitespace-nowrap relative z-10`}
              >
                {getLabel(tab.key)}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
