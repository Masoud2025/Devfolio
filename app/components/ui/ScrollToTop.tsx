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
        {/* Simple shadow background without blur */}
        <div
          className="absolute inset-0 rounded-full transition-opacity duration-500 opacity-30 group-hover:opacity-50"
          style={{ 
            transform: "scale(1.15)",
            background: "radial-gradient(circle, rgba(0,0,0,0.15) 0%, transparent 70%)"
          }}
        />

        {/* Main button container */}
        <div
          className={`
            relative flex items-center justify-center rounded-full
            transition-transform duration-300 group-hover:scale-110
            bg-white dark:bg-zinc-900
            border border-zinc-200 dark:border-zinc-700
            shadow-lg shadow-zinc-500/10 dark:shadow-zinc-800/30
          `}
          style={{ margin: stroke + 4 }}
        >
          {/* Progress Circle - Outer ring */}
          <svg width={size} height={size} className="rotate-[-90deg]">
            {/* Background circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="var(--border)"
              strokeOpacity={0.15}
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
                <stop offset="0%" stopColor="#71717a" />
                <stop offset="50%" stopColor="#52525b" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>

          {/* Inner circle with arrow */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ margin: stroke + 4 }}
          >
            <ArrowUp
              size={22}
              className={`
                transition-all duration-300
                text-zinc-700 dark:text-zinc-300
                group-hover:scale-110 group-hover:-translate-y-0.5
              `}
              strokeWidth={2.5}
            />
          </div>
        </div>

        {/* Tooltip on hover */}
        <span
          className={`
            absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap
            transition-all duration-300 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100
            bg-white dark:bg-zinc-900
            text-zinc-700 dark:text-zinc-300
            shadow-lg border border-zinc-200 dark:border-zinc-700
          `}
        >
          Back to top
        </span>
      </button>
    </div>
  );
}