// components/DockNav.tsx
"use client";
import { useLang } from "@/context/LangContext";
import {
  ChatBubbleLeftIcon,
  GlobeAltIcon,
  HeartIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
  BookOpenIcon
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartSolid,
  HomeIcon as HomeSolid,
  UserIcon as UserSolid,
} from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { Theme } from "@/context/LangContext";
import { GitHubIcon } from "./GitHubIcon";
import { LinkedinIcon } from "./LinkedinIcon";
import { useRouter } from "next/navigation";

export default function DockNav({
  toggleTheme,
  theme,
}: {
  toggleTheme: () => void;
  theme: Theme;
}) {
  const { lang, toggleLang } = useLang();
  const router = useRouter();
  const [active, setActive] = useState("home");
  const [hovered, setHovered] = useState<string | null>(null);

  const items = [
    {
      id: "home",
      icon: HomeIcon,
      solid: HomeSolid,
      label: lang === "fa" ? "خانه" : "Home",
      href: "/",
      isExternal: false,
    },
    {
      id: "blog",
      icon: BookOpenIcon,
      label: lang === "fa" ? "وبلاگ" : "Blog",
      href: "/blog",
      isExternal: false,
    },
    {
      id: "github",
      icon: GitHubIcon,
      label: lang === "fa" ? "گیتهاب" : "GitHub",
      href: "https://github.com",
      isExternal: true,
    },
    {
      id: "linkedin",
      icon: LinkedinIcon,
      label: lang === "fa" ? "لینکدین" : "Linkedin",
      href: "https://linkedin.com",
      isExternal: true,
    },
    {
      id: "user",
      icon: UserIcon,
      solid: UserSolid,
      label: lang === "fa" ? "پروفایل" : "Profile",
      href: "/profile",
      isExternal: false,
    },
  ];

  const handleItemClick = (item: typeof items[0]) => {
    setActive(item.id);
    
    if (item.isExternal) {
      // باز کردن در تب جدید برای لینک‌های خارجی
      window.open(item.href, "_blank", "noopener,noreferrer");
    } else {
      // ریدایرکت داخلی با Next.js router - بدون رفرش صفحه
      router.push(item.href);
    }
  };

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 backdrop-blur-2xl shadow-2xl rounded-3xl px-3 py-2 flex items-center gap-1 border transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-900/70 border-gray-700/30"
          : "bg-white/70 border-white/30"
      }`}
      style={{
        boxShadow:
          theme === "dark"
            ? "0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.05)"
            : "0 25px 50px -12px rgba(0,0,0,0.25), inset 0 1px 2px rgba(255,255,255,0.8)",
        direction: "ltr", // ← مهم: جهت داک همیشه چپ‌چین بمونه
      }}
    >
      {/* Navigation items */}
      {items.map((item) => {
        const isActive = active === item.id;
        const isHovered = hovered === item.id;
        const scale = isHovered ? 1.35 : isActive ? 1.2 : 1;

        return (
          <motion.div
            key={item.id}
            className="relative cursor-pointer"
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleItemClick(item)}
            animate={{ scale }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 15,
              mass: 0.8,
            }}
          >
            <motion.button
              className={`
                relative p-3 rounded-2xl transition-colors duration-200
                ${
                  isActive
                    ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30"
                    : theme === "dark"
                    ? "text-gray-400 hover:text-white hover:bg-gray-800/80"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/80"
                }
              `}
              whileTap={{ scale: 0.85 }}
            >
              {/* Icon display */}
              {isActive && item.solid ? (
                <item.solid className="w-6 h-6" />
              ) : (
                <item.icon className="w-6 h-6" />
              )}

              {/* Active indicator dot */}
              {isActive && (
                <motion.div
                  layoutId="active-dot"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>

            {/* Tooltip on hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.8 }}
                  animate={{ opacity: 1, y: -5, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shadow-lg ${
                    theme === "dark"
                      ? "bg-gray-800 text-white"
                      : "bg-gray-900 text-white"
                  }`}
                >
                  {item.label}
                  <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 ${
                    theme === "dark" ? "bg-gray-800" : "bg-gray-900"
                  }`}></div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      {/* Separator line */}
      <div className={`w-px h-10 mx-1 ${
        theme === "dark" ? "bg-gray-700/60" : "bg-gray-200/60"
      }`}></div>

      {/* Language toggle button with animation */}
      <motion.div
        className="relative"
        whileHover={{ scale: 1.15 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        onMouseEnter={() => setHovered("lang")}
        onMouseLeave={() => setHovered(null)}
      >
        <motion.button
          onClick={toggleLang}
          className={`relative p-3 rounded-2xl transition-colors duration-200 ${
            theme === "dark"
              ? "text-gray-400 hover:text-white hover:bg-gray-800/80"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/80"
          }`}
          whileTap={{ scale: 0.85 }}
          animate={{ rotate: lang === "fa" ? 0 : 360 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <GlobeAltIcon className="w-6 h-6" />

          {/* Language indicator badge */}
          <motion.span
            className="absolute -top-1 -right-1 text-[10px] bg-gradient-to-br from-blue-500 to-purple-600 text-white w-5 h-5 rounded-full flex items-center justify-center shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {lang === "fa" ? "FA" : "EN"}
          </motion.span>
        </motion.button>

        {/* Tooltip for language toggle */}
        <AnimatePresence>
          {hovered === "lang" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: -5 }}
              exit={{ opacity: 0, y: -10 }}
              className={`absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shadow-lg pointer-events-none ${
                theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-900 text-white"
              }`}
            >
              {lang === "fa" ? "Switch to English" : "تغییر به فارسی"}
              <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 ${
                theme === "dark" ? "bg-gray-800" : "bg-gray-900"
              }`}></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Theme toggle button */}
      <motion.button
        onClick={toggleTheme}
        className={`relative p-3 rounded-2xl transition-colors duration-200 ${
          theme === "dark"
            ? "text-gray-400 hover:text-white hover:bg-gray-800/80"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/80"
        }`}
        whileTap={{ scale: 0.85 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        onMouseEnter={() => setHovered("theme")}
        onMouseLeave={() => setHovered(null)}
      >
        {theme === "dark" ? (
          <SunIcon className="w-6 h-6" />
        ) : (
          <MoonIcon className="w-6 h-6" />
        )}

        {/* Tooltip for theme toggle */}
        <AnimatePresence>
          {hovered === "theme" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: -5 }}
              exit={{ opacity: 0, y: -10 }}
              className={`absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shadow-lg pointer-events-none ${
                theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-900 text-white"
              }`}
            >
              {theme === "dark" ? "حالت روشن" : "حالت تاریک"}
              <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 ${
                theme === "dark" ? "bg-gray-800" : "bg-gray-900"
              }`}></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.nav>
  );
}