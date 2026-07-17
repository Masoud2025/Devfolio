"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useTheme } from "@/app/context/ThemeContext";

export default function ScrollToTop() {
  const { theme } = useTheme();
  const [scroll, setScroll] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const progress =
        window.scrollY /
        (document.body.scrollHeight - window.innerHeight);

      setScroll(progress);
      setShow(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const size = 64;
  const stroke = 4;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - scroll * circumference;

  const isDark = theme === "dark";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 group focus:outline-none"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          aria-label="Scroll to top"
        >
          {/* Glow effect behind button */}
          <div
            className={`
              absolute inset-0 rounded-full blur-xl transition-opacity duration-500
              ${isDark ? "bg-purple-500/30" : "bg-purple-400/30"}
              group-hover:opacity-100 opacity-60
            `}
            style={{ transform: "scale(1.2)" }}
          />

          {/* Main button container */}
          <div
            className={`
              relative flex items-center justify-center rounded-full
              transition-transform duration-300 group-hover:scale-110
            `}
          >
            {/* Progress Circle - Outer ring */}
            <svg width={size} height={size} className="rotate-[-90deg]">
              {/* Background circle */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}
                strokeWidth={stroke}
                fill="none"
              />
              {/* Progress circle with gradient */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="url(#scrollGradient)"
                strokeWidth={stroke}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-[stroke-dashoffset] duration-200 ease-out"
              />
              {/* Gradient definition */}
              <defs>
                <linearGradient
                  id="scrollGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#a855f7" /> {/* purple-500 */}
                  <stop offset="50%" stopColor="#ec4899" /> {/* pink-500 */}
                  <stop offset="100%" stopColor="#3b82f6" /> {/* blue-500 */}
                </linearGradient>
              </defs>
            </svg>

            {/* Inner circle with arrow */}
            <div
              className={`
                absolute inset-0 flex items-center justify-center rounded-full
                ${isDark ? "bg-zinc-900/90" : "bg-white/90"}
                backdrop-blur-sm border ${isDark ? "border-white/10" : "border-black/5"}
                shadow-lg
                transition-all duration-300
                group-hover:shadow-xl
              `}
              style={{ margin: stroke + 4 }}
            >
              <ArrowUp
                size={22}
                className={`
                  transition-all duration-300
                  ${isDark ? "text-white" : "text-zinc-800"}
                  group-hover:scale-110 group-hover:-translate-y-0.5
                `}
                strokeWidth={2.5}
              />
            </div>
          </div>

          {/* Tooltip on hover (optional) */}
          <span
            className={`
              absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap
              transition-all duration-300 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100
              ${isDark ? "bg-zinc-800 text-white" : "bg-white text-zinc-800"}
              shadow-lg border ${isDark ? "border-white/10" : "border-black/5"}
            `}
          >
            Back to top
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}