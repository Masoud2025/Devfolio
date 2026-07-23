"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`
        fixed bottom-24 left-4 md:bottom-8 md:left-8 z-50 transition-all duration-300 ease-out
        ${show ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-75 pointer-events-none'}
      `}
    >
      <button
        onClick={scrollToTop}
        className="group relative focus:outline-none"
        aria-label="Scroll to top"
      >
        {/* Glow effect behind button - using theme-aware background with opacity */}
        <div
          className={`
            absolute inset-0 rounded-full blur-xl transition-opacity duration-500
            bg-foreground/10
            group-hover:opacity-100 opacity-60
          `}
          style={{ transform: "scale(1.2)" }}
        />

        {/* Main button container - fully dynamic theming */}
        <div
          className={`
            relative flex items-center justify-center rounded-full
            transition-transform duration-300 group-hover:scale-110
            bg-background/90
            backdrop-blur-sm
            border border-border/10
            shadow-lg
          `}
          style={{ margin: stroke + 4 }}
        >
          {/* Progress Circle - Outer ring */}
          <svg width={size} height={size} className="rotate-[-90deg]">
            {/* Background circle - uses border color with low opacity */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="var(--border)"
              strokeOpacity={0.15}
              strokeWidth={stroke}
              fill="none"
            />
            {/* Progress circle with gradient (static design accent) */}
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
            {/* Gradient definition - using accent colors (purple-pink-blue) */}
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

          {/* Inner circle with arrow - dynamic text color */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ margin: stroke + 4 }}
          >
            <ArrowUp
              size={22}
              className={`
                transition-all duration-300
                text-foreground
                group-hover:scale-110 group-hover:-translate-y-0.5
              `}
              strokeWidth={2.5}
            />
          </div>
        </div>

        {/* Tooltip on hover - fully dynamic theming */}
        <span
          className={`
            absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap
            transition-all duration-300 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100
            bg-background/90
            text-foreground
            shadow-lg border border-border/10
            backdrop-blur-sm
          `}
        >
          Back to top
        </span>
      </button>
    </div>
  );
}