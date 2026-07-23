/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";

interface TopBarProps {
  name?: string;
}

export default function TopBar({ name = "مسعود جعفری" }: TopBarProps) {
  const [dateTime, setDateTime] = useState({
    time: "",
    seconds: "",
    persianDate: "",
    persianDay: "",
  });

  const quotes = [
    "کد مانند شوخ‌طبعی است. وقتی باید توضیحش بدهی، یعنی خوب نیست.",
    "اول مشکل را حل کن، بعد کد را بنویس.",
    "سادگی، روح کارایی است.",
    "هر احمقی می‌تواند کدی بنویسد که کامپیوتر بفهمد. برنامه‌نویسان خوب کدی می‌نویسند که انسان‌ها بفهمند.",
    "تنها راه سریع رفتن، خوب رفتن است.",
    "برنامه‌نویسی درباره چیزهایی نیست که می‌دانی؛ درباره چیزهایی است که می‌توانی کشف کنی.",
    "اول کار کن، بعد درست کن، بعد سریعش کن.",
    "کد تمیز همیشه به نظر می‌رسد که توسط کسی نوشته شده که اهمیت می‌دهد.",
    "بهترین راه برای پیش‌بینی آینده، ساختن آن است.",
    "موفقیت از شکست به شکست می‌آید، بدون اینکه اشتیاق کم شود.",
    "هر روز چیزی یاد بگیر که قبلاً نمی‌دانستی.",
    "کار بزرگ با کار کوچک شروع می‌شود.",
  ];

  const persianMonths = [
    "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
  ];

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const timeStr = `${hours}:${minutes}`;
      const secondsStr = seconds;
      
      const dayName = now.toLocaleDateString('en-US', { weekday: 'long' });
      const persianDay = getPersianDay(dayName);
      
      const persianDate = toPersianDate(now);
      
      setDateTime({
        time: timeStr,
        seconds: secondsStr,
        persianDate: persianDate,
        persianDay: persianDay,
      });
    };

    const toPersianDate = (date: Date) => {
      const gregorianYear = date.getFullYear();
      const gregorianMonth = date.getMonth();
      const gregorianDay = date.getDate();
      
      let persianYear = gregorianYear - 621;
      let persianMonth = 0;
      let persianDay = 0;
      
      const startOfYear = new Date(gregorianYear, 0, 1);
      const diff = (date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24);
      const dayOfYear = Math.floor(diff) + 1;
      
      if (gregorianMonth >= 2) {
        persianYear = gregorianYear - 621;
        let remainingDays = dayOfYear - 79;
        if (remainingDays <= 0) {
          persianYear = gregorianYear - 622;
          remainingDays = dayOfYear + 286;
        }
        
        const monthDays = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
        let monthIndex = 0;
        while (remainingDays > monthDays[monthIndex]) {
          remainingDays -= monthDays[monthIndex];
          monthIndex++;
        }
        persianMonth = monthIndex + 1;
        persianDay = remainingDays;
      } else {
        persianYear = gregorianYear - 622;
        let remainingDays = dayOfYear + 286;
        const monthDays = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
        let monthIndex = 0;
        while (remainingDays > monthDays[monthIndex]) {
          remainingDays -= monthDays[monthIndex];
          monthIndex++;
        }
        persianMonth = monthIndex + 1;
        persianDay = remainingDays;
      }
      
      return `${persianDay} ${persianMonths[persianMonth - 1]} ${persianYear}`;
    };

    const getPersianDay = (englishDay: string) => {
      const dayMap: { [key: string]: string } = {
        'Monday': 'دوشنبه',
        'Tuesday': 'سه‌شنبه',
        'Wednesday': 'چهارشنبه',
        'Thursday': 'پنج‌شنبه',
        'Friday': 'جمعه',
        'Saturday': 'شنبه',
        'Sunday': 'یک‌شنبه',
      };
      return dayMap[englishDay] || englishDay;
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const [quote, setQuote] = useState("");
  
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 mt-2 sm:mt-4 pointer-events-auto">
        {/* Glass container with blur and gradient border */}
        <div className="relative">
          {/* Gradient border glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0078d4]/20 via-[#60a5fa]/20 to-[#0078d4]/20 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Main glass container */}
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl backdrop-saturate-150 border border-white/30 dark:border-zinc-700/30 shadow-lg shadow-[#0078d4]/5 dark:shadow-[#60a5fa]/5 hover:shadow-[#0078d4]/10 dark:hover:shadow-[#60a5fa]/10 transition-all duration-300">
            
            {/* Glass shimmer effect */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
              <div className="absolute -inset-[200%] bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45 translate-x-[-100%] animate-[shimmer_4s_ease-in-out_infinite]" />
            </div>

            {/* Name */}
            <div className="flex-shrink-0 order-1 sm:order-none relative z-10">
              <span className="text-base sm:text-lg md:text-xl font-medium text-[#1a1a1a] dark:text-[#e8e8e8] tracking-tight">
                {name}
              </span>
            </div>

            {/* Center - Time, Date */}
            <div className="flex-1 flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6 order-3 sm:order-none relative z-10">
              {/* Time with seconds */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-base sm:text-lg md:text-xl font-mono font-bold text-[#1a1a1a] dark:text-[#e8e8e8] tabular-nums">
                  {dateTime.time}
                </span>
                <span className="text-[10px] sm:text-xs md:text-sm font-mono text-[#0078d4] dark:text-[#60a5fa] font-semibold">
                  {dateTime.seconds}
                </span>
              </div>

              <div className="w-px h-6 sm:h-7 md:h-8 bg-[#e0e0e0]/30 dark:bg-[#2a2a2a]/30 hidden sm:block" />

              {/* Persian Date */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-sm sm:text-base md:text-lg font-medium text-[#1a1a1a] dark:text-[#e8e8e8]">
                  {dateTime.persianDay}
                </span>
                <span className="text-xs sm:text-sm md:text-base text-[#6a6a6a] dark:text-[#808080]">
                  {dateTime.persianDate}
                </span>
              </div>

              <div className="w-px h-6 sm:h-7 md:h-8 bg-[#e0e0e0]/30 dark:bg-[#2a2a2a]/30 hidden md:block" />

              {/* Quote - Desktop */}
              <div className="flex-1 max-w-sm hidden md:block">
                <p className="text-xs sm:text-sm md:text-base text-[#6a6a6a] dark:text-[#808080] italic leading-relaxed text-center truncate">
                  &quot;{quote}&quot;
                </p>
              </div>
            </div>

            {/* Quote - Mobile */}
            <div className="w-full sm:hidden order-4 relative z-10">
              <p className="text-xs text-[#6a6a6a] dark:text-[#808080] italic leading-relaxed text-center truncate max-w-full">
                &quot;{quote}&quot;
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Add shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(200%) rotate(45deg);
          }
        }
      `}</style>
    </header>
  );
}