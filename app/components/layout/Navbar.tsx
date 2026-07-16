"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { useTheme } from "@/app/context/ThemeContext";
import { Moon, Sun, Menu, X, ChevronDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const navLinks = [
  { href: "#home", key: "Home" },
  { href: "#about", key: "About" },
  { href: "#projects", key: "Projects" },
  { href: "#skills", key: "Skills" },
  { href: "#contact", key: "contact" },
];

const locales = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fa", label: "فارسی", flag: "🇮🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
] as const;

type Locale = typeof locales[number]["code"];

export default function Navbar() {
  const { locale, setLocale, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLocale = locales.find((l) => l.code === locale) || locales[0];

  const handleLocaleChange = (code: Locale) => {
    setLocale(code);
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    navLinks.forEach((link) => {
      const el = document.getElementById(link.href.replace("#", ""));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
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

  const handleNavClick = (href: string) => {
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  const getLabel = (key: string) =>
    (t.navbar?.[key as keyof typeof t.navbar] as string) || key;

  // Helper function for theme-aware classes
  const getThemeClasses = () => {
    const isDark = theme === "dark";
    return {
      navBg: isDark ? "bg-zinc-900/80" : "bg-white/80",
      border: isDark ? "border-zinc-700/60" : "border-zinc-200/60",
      textPrimary: isDark ? "text-white" : "text-zinc-900",
      textSecondary: isDark ? "text-zinc-300" : "text-zinc-600",
      textMuted: isDark ? "text-zinc-500" : "text-zinc-400",
      hoverBg: isDark ? "hover:bg-white/5" : "hover:bg-zinc-100/80",
      activeBg: isDark ? "bg-white/10" : "bg-zinc-200/80",
      buttonBg: isDark ? "bg-black/80" : "bg-white/80",
      shadow: isDark ? "shadow-black/20" : "shadow-zinc-200/50",
      dropdownBg: isDark ? "bg-zinc-900/95" : "bg-white/95",
      overlay: isDark ? "bg-black/60" : "bg-black/30",
      mobileBg: isDark ? "bg-zinc-900/95" : "bg-white/95",
    };
  };

  const themeClasses = getThemeClasses();

  return (
    <>
      <nav
        className={`
          fixed top-5 left-5 right-5 z-[60]
          flex items-center justify-between
          px-4 py-3 md:px-6
          rounded-full
          border ${themeClasses.border}
          ${themeClasses.navBg}
          backdrop-blur-sm
          transition-all duration-300 ease-out
          ${scrolled ? `shadow-lg ${themeClasses.shadow} backdrop-blur-md` : ""}
        `}
      >
        <div className={`rounded-lg border ${themeClasses.border} px-3 py-1 text-xl font-bold select-none ${themeClasses.textPrimary}`}>
          M:D
        </div>

        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`
                  relative px-4 py-2 text-sm font-medium rounded-full
                  transition-all duration-200 ease-out
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-${theme === "dark" ? "white" : "zinc-900"}/50
                  ${isActive 
                    ? `${themeClasses.textPrimary} ${themeClasses.activeBg}` 
                    : `${themeClasses.textSecondary} ${themeClasses.textPrimary} ${themeClasses.hoverBg}`
                  }
                `}
                aria-current={isActive ? "page" : undefined}
              >
                {getLabel(link.key)}
                {isActive && (
                  <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${theme === "dark" ? "bg-white" : "bg-zinc-900"}`} />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={toggleTheme}
            className={`
              flex items-center justify-center rounded-full 
              border ${themeClasses.border} ${themeClasses.buttonBg}
              w-10 h-10 ${themeClasses.textPrimary}
              backdrop-blur-sm transition-all duration-300 
              hover:scale-105 hover:border-${theme === "dark" ? "white" : "zinc-900"}
              active:scale-95 focus-visible:outline-none 
              focus-visible:ring-2 focus-visible:ring-${theme === "dark" ? "white" : "zinc-900"}/50
            `}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun size={18} className="text-yellow-400" />
            ) : (
              <Moon size={18} className="text-indigo-600" />
            )}
          </button>

          {/* Dropdown Language Selector - Desktop */}
          <div className="hidden sm:block relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`
                flex items-center gap-2 rounded-full 
                border ${themeClasses.border} ${themeClasses.buttonBg}
                px-4 py-2 text-sm font-medium ${themeClasses.textPrimary}
                backdrop-blur-sm transition-all duration-300 
                hover:scale-105 hover:border-${theme === "dark" ? "white" : "zinc-900"}
                active:scale-95 focus-visible:outline-none 
                focus-visible:ring-2 focus-visible:ring-${theme === "dark" ? "white" : "zinc-900"}/50
              `}
              aria-label="Select language"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              <span>{currentLocale.flag}</span>
              <span>{currentLocale.label}</span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isDropdownOpen && (
              <div
                className={`
                  absolute right-0 mt-2 w-48 rounded-xl 
                  border ${themeClasses.border} ${themeClasses.dropdownBg}
                  backdrop-blur-md shadow-2xl py-1 overflow-hidden z-50
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
                        transition-all duration-200
                        ${isActive 
                          ? `${themeClasses.textPrimary} ${themeClasses.activeBg}` 
                          : `${themeClasses.textSecondary} hover:${themeClasses.textPrimary} ${themeClasses.hoverBg}`
                        }
                      `}
                      role="menuitem"
                    >
                      <span>{loc.flag}</span>
                      <span>{loc.label}</span>
                      {isActive && (
                        <span className={`ml-auto ${themeClasses.textPrimary}`}>✓</span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`
              md:hidden flex items-center justify-center rounded-full 
              border ${themeClasses.border} ${themeClasses.buttonBg}
              w-10 h-10 ${themeClasses.textPrimary}
              backdrop-blur-sm transition-all duration-300 
              hover:scale-105 hover:border-${theme === "dark" ? "white" : "zinc-900"}
              active:scale-95 focus-visible:outline-none 
              focus-visible:ring-2 focus-visible:ring-${theme === "dark" ? "white" : "zinc-900"}/50
            `}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`
          fixed inset-0 z-[55] md:hidden
          transition-opacity duration-300 ease-out
          ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        aria-hidden={!mobileOpen}
      >
        <div 
          className={`absolute inset-0 ${themeClasses.overlay} backdrop-blur-sm`} 
          onClick={() => setMobileOpen(false)} 
        />

        <div
          className={`
            absolute right-0 top-0 h-full w-72
            ${themeClasses.mobileBg}
            border-l ${themeClasses.border} shadow-2xl
            transition-transform duration-300 ease-out
            ${mobileOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <div className="flex flex-col p-6 pt-20 gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`
                    w-full text-left px-4 py-3 rounded-xl text-base font-medium
                    transition-all duration-200 ease-out
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-${theme === "dark" ? "white" : "zinc-900"}/50
                    ${isActive 
                      ? `${themeClasses.textPrimary} ${themeClasses.activeBg}` 
                      : `${themeClasses.textSecondary} hover:${themeClasses.textPrimary} ${themeClasses.hoverBg}`
                    }
                  `}
                  aria-current={isActive ? "page" : undefined}
                >
                  {getLabel(link.key)}
                  {isActive && (
                    <span className={`inline-block w-1.5 h-1.5 rounded-full ml-2 ${theme === "dark" ? "bg-white" : "bg-zinc-900"}`} />
                  )}
                </button>
              );
            })}
          </div>

          <div className="absolute bottom-8 left-6 right-6">
            <div className="flex flex-col gap-2">
              <span className={`text-xs ${themeClasses.textMuted} px-2 mb-1`}>
                Select Language
              </span>
              {locales.map((loc) => {
                const isActive = locale === loc.code;
                return (
                  <button
                    key={loc.code}
                    onClick={() => {
                      handleLocaleChange(loc.code);
                      setMobileOpen(false);
                    }}
                    className={`
                      w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                      transition-all duration-200
                      ${isActive 
                        ? `${themeClasses.textPrimary} ${themeClasses.activeBg}` 
                        : `${themeClasses.textSecondary} hover:${themeClasses.textPrimary} ${themeClasses.hoverBg}`
                      }
                    `}
                  >
                    <span>{loc.flag}</span>
                    <span>{loc.label}</span>
                    {isActive && (
                      <span className={`ml-auto ${themeClasses.textPrimary}`}>✓</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}