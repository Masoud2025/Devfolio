"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { useTheme } from "@/app/context/ThemeContext";
import {
  Briefcase,
  ChevronDown,
  Code,
  Home,
  Mail,
  Menu,
  Moon,
  Sun,
  User,
  X,
} from "lucide-react";
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
] as const;

type Locale = (typeof locales)[number]["code"];

export default function Navbar({ activeTab, onTabChange }: NavbarProps) {
  const { locale, setLocale, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tooltip, setTooltip] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLocale = locales.find((l) => l.code === locale) || locales[0];

  const handleLocaleChange = (code: Locale) => {
    setLocale(code);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setIsDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleTabClick = (tabId: TabName) => {
    onTabChange(tabId);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getLabel = (key: string) =>
    (t.navbar?.[key as keyof typeof t.navbar] as string) || key;

  const getThemeClasses = () => {
    const isDark = theme === "dark";
    return {
      sidebarBg: isDark ? "bg-zinc-900" : "bg-white",
      border: isDark ? "border-zinc-800" : "border-zinc-200",
      textPrimary: isDark ? "text-white" : "text-zinc-900",
      textSecondary: isDark ? "text-zinc-400" : "text-zinc-500",
      hoverBg: isDark ? "hover:bg-white/10" : "hover:bg-zinc-100",
      activeBg: isDark ? "bg-white/15" : "bg-zinc-200",
      buttonBg: isDark ? "bg-zinc-800" : "bg-zinc-100",
      shadow: isDark ? "shadow-black/30" : "shadow-zinc-200/50",
      dropdownBg: isDark ? "bg-zinc-900" : "bg-white",
      overlay: isDark ? "bg-black/70" : "bg-black/40",
      mobileBg: isDark ? "bg-zinc-900" : "bg-white",
      tooltipBg: isDark ? "bg-zinc-800" : "bg-zinc-900",
      textMuted: isDark ? "text-zinc-500" : "text-zinc-400",
    };
  };

  const themeClasses = getThemeClasses();

  return (
    <>
      {/* Desktop Vertical Sidebar - Right Side */}
      <aside
        className={`
          fixed top-0 right-0 h-screen z-[60]
          hidden md:flex flex-col items-center
          w-16 py-4 gap-2
          border-l border-white/10 dark:border-white/5
          bg-white/80 dark:bg-zinc-900/80
          backdrop-blur-xl
          transition-all duration-300
        `}
      >
        {/* Logo */}
        <div className="mb-4">
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
        </div>

        {/* Nav Links */}
        <div className="flex flex-col items-center gap-1 flex-1">
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
                    relative w-10 h-10 flex items-center justify-center
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
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  {isActive && (
                    <span
                      className={`absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-l-full bg-gradient-to-b from-purple-500 to-blue-500`}
                    />
                  )}
                </button>
                {tooltip === getLabel(tab.key) && (
                  <div
                    className={`
                      absolute right-full mr-3 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap
                      ${themeClasses.tooltipBg} ${themeClasses.textPrimary}
                      shadow-lg border ${themeClasses.border}
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
        <div className="flex flex-col items-center gap-2 mt-auto">
          {/* Theme Toggle */}
          <div className="relative">
            <button
              onClick={toggleTheme}
              className={`
                w-10 h-10 flex items-center justify-center
                rounded-xl transition-all duration-200
                text-zinc-400 hover:text-white hover:bg-white/10
                hover:scale-105 active:scale-95
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50
              `}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun size={18} className="text-yellow-400" />
              ) : (
                <Moon size={18} className="text-indigo-400" />
              )}
            </button>
          </div>

          {/* Language Selector */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`
                w-10 h-10 flex items-center justify-center
                rounded-xl transition-all duration-200
                text-zinc-400 hover:text-white hover:bg-white/10
                hover:scale-105 active:scale-95
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50
              `}
              aria-label="Select language"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              <span className="text-sm">{currentLocale.flag}</span>
            </button>

              {isDropdownOpen && (
                <div
                  className={`
                    absolute right-full mr-3 bottom-0 w-40
                    border border-white/10 dark:border-white/5
                    bg-white/90 dark:bg-zinc-900/90
                    backdrop-blur-xl
                    shadow-2xl shadow-black/20 dark:shadow-black/40
                    py-1.5 overflow-hidden z-[70] rounded-xl
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
                          w-full flex items-center gap-2.5 px-3 py-2 text-sm
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
                          <span className={`ml-auto text-xs bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent font-bold`}>
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
            className="w-8 h-8 object-cover rounded-lg border border-white/10"
          >
            <source src="/videos/programmernobg.webm" type="video/mp4" />
          </video>
          <span className={`text-sm font-bold ${themeClasses.textPrimary}`}>
            Masoud
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className={`
              w-9 h-9 flex items-center justify-center
              rounded-xl transition-all duration-200
              ${themeClasses.hoverBg} ${themeClasses.textSecondary}
              hover:scale-105 active:scale-95
            `}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun size={18} className="text-yellow-400" />
            ) : (
              <Moon size={18} className="text-indigo-500" />
            )}
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`
                w-9 h-9 flex items-center justify-center
                rounded-xl transition-all duration-200
                ${themeClasses.hoverBg} ${themeClasses.textSecondary}
                hover:scale-105 active:scale-95
              `}
              aria-label="Select language"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              <span className="text-base">{currentLocale.flag}</span>
            </button>

              {isDropdownOpen && (
                <div
                  className={`
                    absolute right-0 mt-2 w-40
                    border border-white/10 dark:border-white/5
                    bg-white/90 dark:bg-zinc-900/90
                    backdrop-blur-xl
                    shadow-2xl shadow-black/20 dark:shadow-black/40
                    py-1.5 overflow-hidden z-[70] rounded-xl
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
                          w-full flex items-center gap-2.5 px-3 py-2 text-sm
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
                          <span className={`ml-auto text-xs bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent font-bold`}>
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

      {/* Mobile Bottom Bar - Liquid Glass */}
      <nav
        className={`
          fixed bottom-4 left-4 right-4 z-[60]
          md:hidden
          px-4 py-4
          border border-white/20
          bg-white/10 dark:bg-black/20
          backdrop-blur-2xl
          rounded-[2rem]
          transition-all duration-300
          shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-1px_0_rgba(0,0,0,0.1)]
          dark:shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(0,0,0,0.2)]
        `}
      >
        <div className="flex items-center justify-around">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`
                  relative flex flex-col items-center justify-center gap-1
                  transition-all duration-300 ease-out
                  ${
                    isActive
                      ? "scale-110"
                      : "scale-90 opacity-60"
                  }
                `}
                aria-current={isActive ? "page" : undefined}
              >
                <div
                  className={`
                    flex flex-col items-center justify-center gap-0.5
                    w-14 h-14 rounded-2xl transition-all duration-300
                    ${
                      isActive
                        ? "bg-white/90 dark:bg-white/90 text-black shadow-[0_4px_16px_rgba(0,0,0,0.2),inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(0,0,0,0.1)]"
                        : "text-zinc-400 hover:text-white shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]"
                    }
                  `}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
                  )}
                  <Icon size={22} strokeWidth={isActive ? 3 : 2} />
                  <span className={`font-semibold text-[10px]`}>
                    {getLabel(tab.key)}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className={`fixed inset-0 z-[55] md:hidden ${themeClasses.overlay}`}
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
