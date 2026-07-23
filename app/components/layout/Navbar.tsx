"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import {
  Briefcase,
  Code,
  Home,
  Mail,
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
] as const;

type Locale = (typeof locales)[number]["code"];

export default function Navbar({ activeTab, onTabChange }: NavbarProps) {
  const { locale, setLocale, t } = useLanguage();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const languageRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const currentLocale = locales.find((l) => l.code === locale) || locales[0];

  const handleLocaleChange = (code: Locale) => {
    setLocale(code);
    setIsLanguageOpen(false);
  };

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

  const handleTabClick = (tabId: TabName) => {
    onTabChange(tabId);
    setIsMobileMenuOpen(false);
  };

  const getLabel = (key: string) =>
    (t.navbar?.[key as keyof typeof t.navbar] as string) || key;

  return (
    <>
      {/* ===== DESKTOP TASKBAR (Windows Style - Bottom) ===== */}
      <header className="hidden md:block fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-auto max-w-5xl min-w-[700px]">
        <div className="relative">
          {/* Taskbar container - Windows 11 style */}
          <div
            className={`
              flex items-center justify-between
              px-5 py-2.5 rounded-2xl
              bg-[#f3f3f3]/90 dark:bg-[#1a1a1a]/90
              backdrop-blur-xl
              border border-[#e0e0e0]/50 dark:border-[#2a2a2a]/50
              shadow-[0_8px_32px_rgba(0,0,0,0.25)]
              hover:shadow-[0_12px_48px_rgba(0,0,0,0.35)]
              transition-all duration-300
            `}
          >
            {/* Left - Logo / Start Button */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={() => handleTabClick("home")}
                className={`
                  flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl
                  transition-all duration-200
                  hover:bg-[#e0e0e0]/50 dark:hover:bg-[#2a2a2a]/50
                  ${activeTab === "home" ? "bg-[#e0e0e0]/50 dark:bg-[#2a2a2a]/50" : ""}
                `}
              >
                <div className="w-9 h-9 rounded-lg overflow-hidden ring-2 ring-[#0078d4]/20 dark:ring-[#0078d4]/30 flex-shrink-0">
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
                <span className="text-sm font-bold text-[#1a1a1a] dark:text-[#e8e8e8]">
                  Masoud
                </span>
              </button>
            </div>

            {/* Center - Navigation Tabs */}
            <nav className="flex items-center gap-1 px-3 flex-1 justify-center">
              {navTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`
                      group relative px-5 py-2 rounded-xl
                      flex items-center gap-2.5
                      text-sm font-medium
                      transition-all duration-200
                      ${
                        isActive
                          ? "bg-[#0078d4]/10 dark:bg-[#0078d4]/20 text-[#0078d4] dark:text-[#60a5fa]"
                          : "text-[#4a4a4a] dark:text-[#a0a0a0] hover:text-[#1a1a1a] dark:hover:text-[#e8e8e8] hover:bg-[#e0e0e0]/40 dark:hover:bg-[#2a2a2a]/40"
                      }
                    `}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon 
                      size={20} 
                      strokeWidth={isActive ? 2.5 : 2}
                      className={isActive ? "text-[#0078d4] dark:text-[#60a5fa]" : ""}
                    />
                    <span>{getLabel(tab.key)}</span>
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#0078d4] dark:bg-[#60a5fa] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right - System Tray */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="relative" ref={languageRef}>
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className={`
                    flex items-center gap-2 px-3 py-1.5 rounded-xl
                    text-[#4a4a4a] dark:text-[#a0a0a0]
                    hover:text-[#1a1a1a] dark:hover:text-[#e8e8e8]
                    hover:bg-[#e0e0e0]/40 dark:hover:bg-[#2a2a2a]/40
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
                      absolute right-0 bottom-full mb-2
                      w-60 max-h-80 overflow-y-auto
                      p-1.5 rounded-xl
                      bg-[#f3f3f3]/95 dark:bg-[#1a1a1a]/95
                      backdrop-blur-xl
                      border border-[#e0e0e0]/50 dark:border-[#2a2a2a]/50
                      shadow-2xl shadow-black/30
                      animate-in fade-in slide-in-from-bottom-2 duration-200
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
                                ? "bg-[#0078d4]/10 dark:bg-[#0078d4]/20 text-[#0078d4] dark:text-[#60a5fa]"
                                : "text-[#4a4a4a] dark:text-[#a0a0a0] hover:bg-[#e0e0e0]/40 dark:hover:bg-[#2a2a2a]/40"
                            }
                          `}
                          role="menuitem"
                        >
                          <span className="text-lg">{loc.flag}</span>
                          <span>{loc.label}</span>
                          {isActive && (
                            <span className="ml-auto text-[#0078d4] dark:text-[#60a5fa]">✓</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="w-px h-6 bg-[#e0e0e0]/50 dark:bg-[#2a2a2a]/50" />
              
              <div className="flex items-center gap-1.5 px-2 py-1">
                <span className="w-2 h-2 rounded-full bg-green-500 shadow-lg shadow-green-500/30"></span>
                <span className="text-xs text-[#4a4a4a] dark:text-[#a0a0a0] font-medium">
                  Online
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ===== MOBILE BOTTOM TASKBAR ===== */}
      <header className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="px-2 pb-2 pt-1">
          <div
            className={`
              flex items-center justify-between
              px-2 py-1.5 rounded-2xl
              bg-[#f3f3f3]/95 dark:bg-[#1a1a1a]/95
              backdrop-blur-xl
              border border-[#e0e0e0]/50 dark:border-[#2a2a2a]/50
              shadow-[0_-4px_20px_rgba(0,0,0,0.2)]
            `}
          >
            <nav className="flex items-center justify-around flex-1 gap-0.5">
              {navTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`
                      flex flex-col items-center justify-center
                      px-1.5 py-1 rounded-xl
                      transition-all duration-200
                      min-w-[40px] relative
                      ${
                        isActive
                          ? "text-[#0078d4] dark:text-[#60a5fa]"
                          : "text-[#6a6a6a] dark:text-[#808080]"
                      }
                    `}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon 
                      size={20} 
                      strokeWidth={isActive ? 2.5 : 2}
                      className="transition-all duration-200"
                    />
                    <span className={`
                      text-[9px] font-medium mt-0.5 transition-all duration-200
                      ${isActive ? "text-[#0078d4] dark:text-[#60a5fa]" : "text-[#6a6a6a] dark:text-[#808080]"}
                    `}>
                      {getLabel(tab.key)}
                    </span>
                    {isActive && (
                      <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#0078d4] dark:bg-[#60a5fa] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-xl text-[#4a4a4a] dark:text-[#a0a0a0] hover:bg-[#e0e0e0]/40 dark:hover:bg-[#2a2a2a]/40 transition-all flex-shrink-0"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {isMobileMenuOpen && (
            <div
              ref={mobileMenuRef}
              className={`
                mb-2 p-2 rounded-2xl
                bg-[#f3f3f3]/95 dark:bg-[#1a1a1a]/95
                backdrop-blur-xl
                border border-[#e0e0e0]/50 dark:border-[#2a2a2a]/50
                shadow-2xl shadow-black/30
                animate-in slide-in-from-bottom-2 duration-200
              `}
            >
              <div className="border-b border-[#e0e0e0]/50 dark:border-[#2a2a2a]/50 pb-2 mb-2">
                <p className="text-xs font-medium text-[#6a6a6a] dark:text-[#808080] px-2 mb-2">
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
                              ? "bg-[#0078d4]/10 dark:bg-[#0078d4]/20 text-[#0078d4] dark:text-[#60a5fa]"
                              : "text-[#4a4a4a] dark:text-[#a0a0a0] hover:bg-[#e0e0e0]/40 dark:hover:bg-[#2a2a2a]/40"
                          }
                        `}
                      >
                        <span className="text-lg">{loc.flag}</span>
                        <span className="truncate text-xs">{loc.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 shadow-lg shadow-green-500/30"></span>
                <span className="text-xs text-[#4a4a4a] dark:text-[#a0a0a0] font-medium">
                  Online
                </span>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ===== SPACER FOR CONTENT ===== */}
      <div className="h-20 md:h-24" />
    </>
  );
}