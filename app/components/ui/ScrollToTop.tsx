"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [scroll, setScroll] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const progress =
        window.scrollY /
        (document.body.scrollHeight - window.innerHeight);

      setScroll(progress);
      setShow(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const size = 60;
  const stroke = 5;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const offset = circumference - scroll * circumference;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-10 right-10 z-50 flex items-center justify-center"
    >
      {/* Circle Progress */}
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="black"
          strokeOpacity="0.1"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="black"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>

      {/* Center Button */}
      <div className="absolute w-10 h-10 bg-black text-white rounded-full flex items-center justify-center text-sm">
        ↑
      </div>
    </button>
  );
}