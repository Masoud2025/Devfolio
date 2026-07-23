/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { memo, useEffect, useMemo, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import {
  ArrowLeftRight,
  ArrowUpRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  Layers,
  Play,
  Sparkles,
  Type as TypeIcon,
  X,
  Zap,
  ArrowUp,
} from "lucide-react";
import Image, { StaticImageData } from "next/image";

// ایمپورت عکس‌ها
import demo1 from "@/public/pic/demo1.webp";
import demo2 from "@/public/pic/demo2.webp";
import demo3 from "@/public/pic/demo3.webp";

interface ColorToken {
  name: string;
  hex: string;
}

interface ProjectDetails {
  technical?: string;
  font?: string;
  colors?: ColorToken[];
  year?: string;
  duration?: string;
  role?: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  images: StaticImageData[];
  category: string;
  details?: ProjectDetails;
}

const DEMO_IMAGES: StaticImageData[] = [demo1, demo2, demo3];

function TypeWriter({ text, delay = 80 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setDisplayed("");
    setIndex(0);
  }, [text]);

  useEffect(() => {
    if (index >= text.length) return;
    const timeout = setTimeout(() => {
      setDisplayed((prev) => prev + text[index]);
      setIndex((i) => i + 1);
    }, delay);
    return () => clearTimeout(timeout);
  }, [index, delay, text]);

  return (
    <span>
      {displayed}
      <span className="inline-block w-[2px] h-[0.85em] bg-zinc-600 dark:bg-zinc-400 align-middle ml-0.5 animate-pulse" />
    </span>
  );
}

function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [mobileScrollId, setMobileScrollId] = useState<number | null>(null);
  const [flippedId, setFlippedId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showUpButton, setShowUpButton] = useState<number | null>(null);
  const pageSize = 6;
  const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { ref: gridRef, inView: gridInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects: Project[] = useMemo(
    () => [
      {
        id: 1,
        title: "فروشگاه آنلاین محصولات دیجیتال همراه",
        description: "سیستم کامل فروش محصول قابلیت درگاه پرداخت ، نمایش موجودی ، پنل کنرتل ادمین کامل",
        tech: ["Next.js", "TypeScript", "Tailwind", "Prisma"],
        category: "ecommerce",
        images: [demo1, demo2, demo3],
        details: {
          year: "۱۴۰۳",
          duration: "۴ ماه",
          role: "توسعه‌دهنده فول‌استک",
          technical: "رندر ترکیبی SSR/ISR با App Router برای صفحات محصول، لایه دیتابیس با Prisma روی PostgreSQL و کش کوئری با React Query. تراکنش‌های پرداخت با webhook امن و idempotency key پیاده‌سازی شده تا از پرداخت تکراری جلوگیری شود.",
          font: "Inter (UI) / JetBrains Mono (کد و قیمت‌ها)",
          colors: [
            { name: "Primary Slate", hex: "#52525B" },
            { name: "Accent Blue", hex: "#2563EB" },
            { name: "Base Zinc", hex: "#18181B" },
          ],
        },
      },
      {
        id: 2,
        title: "سایت معرفی شخص محور پورتفولیو",
        description: "طراحی تمیز رسپانسیو کامل و سیستم مدرن کامل و درتسری پذیز",
        tech: ["React", "Tailwind", "Framer Motion"],
        category: "web",
        images: [demo2, demo3, demo1],
        details: {
          year: "۱۴۰۳",
          duration: "۲ ماه",
          role: "توسعه‌دهنده فرانت‌اند",
          technical: "کامپوننت‌های اتمیک با معماری فولدر Feature-based، انیمیشن‌های scroll-linked با Framer Motion و بهینه‌سازی تصاویر با next/image و AVIF fallback. امتیاز Lighthouse Performance بالای ۹۵.",
          font: "Poppins (تیتر) / Inter (متن)",
          colors: [
            { name: "Ink Black", hex: "#0A0A0A" },
            { name: "Signal Slate", hex: "#71717A" },
            { name: "Sky Blue", hex: "#3B82F6" },
          ],
        },
      },
      {
        id: 3,
        title: "برنامه مدیریت گیم نت",
        description: "محاسبه دقیق هزینه و زمان بازی برای هر دستگاه با قابلیت تعیین قیمت و متوفق کردن زمان قابلیت نسیه دادن الارم برای دستگاه که زمان تمام شده",
        tech: ["Next.js", "Prisma", "PostgreSQL", "JWT"],
        category: "software",
        images: [demo3, demo1, demo2],
        details: {
          year: "۱۴۰۳",
          duration: "۳ ماه",
          role: "توسعه‌دهنده بک‌اند",
          technical: "احراز هویت stateless با JWT + refresh token rotation، اعتبارسنجی ورودی با Zod و rate limiting در سطح middleware. لایه‌ی دسترسی به داده با Prisma و migration نسخه‌بندی‌شده.",
          font: "JetBrains Mono (مستندات API)",
          colors: [
            { name: "Deep Navy", hex: "#1E293B" },
            { name: "Cyan Accent", hex: "#06B6D4" },
            { name: "Alert Red", hex: "#EF4444" },
          ],
        },
      },
      {
        id: 4,
        title: "کیت رابط کاربری موبایل",
        description: "کامپوننت‌های زیبای موبایل با پشتیبانی حالت تاریک",
        tech: ["React Native", "TypeScript", "Tailwind"],
        category: "software",
        images: [demo1, demo2, demo3],
        details: {
          year: "۱۴۰۳",
          duration: "۱٫۵ ماه",
          role: "توسعه‌دهنده موبایل",
          technical: "سیستم طراحی توکن‌محور با پشتیبانی کامل از تم روشن/تاریک، کامپوننت‌های قابل ترکیب با forwardRef و پشتیبانی از RTL. فرم‌ساز داینامیک با اعتبارسنجی schema-based.",
          font: "SF Pro / Roboto (پلتفرم‌محور)",
          colors: [
            { name: "Graphite", hex: "#27272A" },
            { name: "Violet", hex: "#8B5CF6" },
            { name: "Mint", hex: "#34D399" },
          ],
        },
      },
      {
        id: 5,
        title: "اپلیکیشن چت بلادرنگ",
        description: "پیام‌رسانی بلادرنگ با WebSocket و Redis",
        tech: ["Next.js", "Socket.io", "Redis", "Tailwind"],
        category: "ai",
        images: [demo2, demo3, demo1],
        details: {
          year: "۱۴۰۳",
          duration: "۲ ماه",
          role: "توسعه‌دهنده فول‌استک",
          technical: "اتصال دوطرفه با Socket.io روی adapter مبتنی بر Redis برای مقیاس‌پذیری افقی، صف پیام با presence tracking و ack-based delivery برای تضمین رسیدن پیام‌ها.",
          font: "Inter (UI) / IBM Plex Mono (تایم‌استمپ)",
          colors: [
            { name: "Charcoal", hex: "#111827" },
            { name: "Live Green", hex: "#10B981" },
            { name: "Bubble Blue", hex: "#3B82F6" },
          ],
        },
      },
      {
        id: 6,
        title: "داشبورد تحلیلی",
        description: "داشبورد تعاملی با نمودار و تصویرسازی داده",
        tech: ["React", "D3.js", "Tailwind", "Recharts"],
        category: "dashboard",
        images: [demo3, demo1, demo2],
        details: {
          year: "۱۴۰۳",
          duration: "۱٫۵ ماه",
          role: "توسعه‌دهنده فرانت‌اند",
          technical: "نمودارهای تعاملی با D3.js برای ویژوالایزیشن سفارشی و Recharts برای نمودارهای استاندارد، پردازش داده در Web Worker برای جلوگیری از بلاک شدن UI روی دیتاست‌های بزرگ.",
          font: "Space Grotesk (اعداد) / Inter (متن)",
          colors: [
            { name: "Slate Base", hex: "#0F172A" },
            { name: "Data Orange", hex: "#F97316" },
            { name: "Chart Teal", hex: "#14B8A6" },
          ],
        },
      },
    ],
    []
  );

  const totalPages = Math.max(1, Math.ceil(projects.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProjects = projects.slice(startIndex, startIndex + pageSize);

  const labels = {
    header: "پروژه ها",
    subtitle: "مسعود جعفری برنامه نویس",
    details: "جزئیات",
    demo: "دمو",
    noProjects: "هیچ پروژه‌ای در این دسته‌بندی یافت نشد",
    techStack: "تکنولوژی‌ها",
    colorPalette: "پالت رنگی",
    typography: "فونت‌بندی",
    liveDemo: "دمو زنده",
    sourceCode: "سورس کد",
  };

  const scrollToCardTop = (id: number) => {
    const cardElement = cardRefs.current[id];
    if (cardElement) {
      const cardTop = cardElement.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: cardTop,
        behavior: "smooth"
      });
    }
  };

  const startAutoScroll = (id: number) => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = null;
    }

    scrollToCardTop(id);
    setShowUpButton(id);

    let scrollPosition = 0;
    const maxScroll = 500;
    const step = 2;
    const interval = 16;

    scrollTimeoutRef.current = setInterval(() => {
      scrollPosition += step;
      if (scrollPosition >= maxScroll) {
        if (scrollTimeoutRef.current) {
          clearInterval(scrollTimeoutRef.current);
          scrollTimeoutRef.current = null;
        }
        setShowUpButton(id);
        return;
      }
      window.scrollBy({
        top: step,
        behavior: "smooth"
      });
    }, interval);

    const handleScrollStop = () => {
      if (scrollTimeoutRef.current) {
        clearInterval(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
        setShowUpButton(id);
      }
      document.removeEventListener("click", handleScrollStop);
    };

    setTimeout(() => {
      if (scrollTimeoutRef.current) {
        clearInterval(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
        setShowUpButton(id);
      }
      document.removeEventListener("click", handleScrollStop);
    }, 8000);

    document.addEventListener("click", handleScrollStop);
  };

  const scrollToTop = (id: number) => {
    if (scrollTimeoutRef.current) {
      clearInterval(scrollTimeoutRef.current);
      scrollTimeoutRef.current = null;
    }
    scrollToCardTop(id);
    setTimeout(() => {
      setShowUpButton(null);
      setMobileScrollId(null);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearInterval(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }
    };
  }, []);

  const toggleMobileScroll = (id: number) => {
    if (mobileScrollId === id) {
      setMobileScrollId(null);
      setShowUpButton(null);
      if (scrollTimeoutRef.current) {
        clearInterval(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }
    } else {
      setMobileScrollId(id);
      startAutoScroll(id);
    }
  };

  const toggleFlip = (id: number) => {
    setFlippedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="projects"
      className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 md:py-20 scroll-mt-28"
    >
      <div className="mb-12 sm:mb-16 text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground">
          {labels.header}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-sm sm:text-base">
          {labels.subtitle}
        </p>
      </div>

      <div
        ref={gridRef}
        className="grid gap-6 sm:gap-8 lg:grid-cols-2 xl:grid-cols-3 transition-all duration-700"
        style={{
          opacity: gridInView ? 1 : 0,
          transform: gridInView ? "translateY(0)" : "translateY(10px)",
        }}
      >
        {paginatedProjects.map((project, index) => {
          const isHovered = hoveredId === project.id;
          const isMobileScrolled = mobileScrollId === project.id;
          const isScrolled = isHovered || isMobileScrolled;
          const isFlipped = flippedId === project.id;
          const showUp = showUpButton === project.id;
          
          return (
            <div
              key={project.id}
              ref={(el) => {
                cardRefs.current[project.id] = el;
              }}
              className="group relative overflow-hidden rounded-3xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-zinc-500/20 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500"
              style={{
                transitionDelay: gridInView ? `${index * 100}ms` : "0ms",
              }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div
                className="relative w-full transition-transform duration-700"
                style={{
                  transformStyle: "preserve-3d",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                <div className="relative" style={{ backfaceVisibility: "hidden" }}>
                  <div className="relative h-80 sm:h-96 md:h-[28rem] overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex-shrink-0">
                    <div className="relative w-full h-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 w-full transition-all duration-[9000ms] ease-in-out"
                        style={{
                          height: "500%",
                          willChange: "transform",
                          transform: isScrolled
                            ? "translateY(-80%)"
                            : "translateY(0%)",
                        }}
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src={project.images[0]}
                            alt={project.title}
                            fill
                            className="object-cover object-top"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            priority={project.id <= 3}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="absolute top-3 left-3 flex gap-2">
                      <div className="px-3 py-1 rounded-full bg-black/60 border border-white/10 text-white/70 text-[10px] font-mono">
                        #{String(project.id).padStart(2, "0")}
                      </div>
                      {project.details?.year && (
                        <div className="px-3 py-1 rounded-full bg-black/60 border border-white/10 text-white/70 text-[10px] font-mono">
                          {project.details.year}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMobileScroll(project.id);
                      }}
                      className="md:hidden absolute inset-0 flex items-center justify-center"
                      aria-label="View project"
                    >
                      <div
                        className="p-4 rounded-full bg-white/20 border border-white/30 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
                        style={{
                          opacity: isMobileScrolled ? 0 : 1,
                          transform: isMobileScrolled ? "scale(0.75)" : "scale(1)",
                        }}
                      >
                        <Play size={28} className="text-white drop-shadow-lg" />
                      </div>
                    </button>

                    {showUp && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollToTop(project.id);
                        }}
                        className="absolute bottom-4 right-4 md:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-zinc-900 text-sm font-medium hover:bg-zinc-100 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
                      >
                        <ArrowUp size={18} />
                        <span>UP</span>
                      </button>
                    )}
                  </div>

                  <div className="p-5 flex flex-col bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-700">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-white transition-colors duration-300 line-clamp-1">
                        {project.title}
                      </h3>
                      <ArrowUpRight
                        size={16}
                        className="text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors shrink-0 mt-1"
                      />
                    </div>

                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open("#", "_blank");
                        }}
                        className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
                      >
                        <ExternalLink size={14} />
                        <span>{labels.liveDemo}</span>
                      </button>
                      <button
                        onClick={() => toggleFlip(project.id)}
                        className="px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all duration-300 hover:scale-105 active:scale-95"
                        aria-label="Flip card"
                      >
                        <ArrowLeftRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute inset-0 bg-white dark:bg-zinc-900 rounded-3xl flex flex-col border border-zinc-200 dark:border-zinc-700 shadow-2xl"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex-shrink-0">
                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-zinc-900 dark:text-white truncate">
                        {project.title}
                      </h3>
                      {project.details?.role && (
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">
                          {project.details.role}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => toggleFlip(project.id)}
                      className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all duration-300 hover:scale-110 text-zinc-900 dark:text-white flex-shrink-0"
                      aria-label="Flip back"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-5 space-y-5">
                    {project.description && (
                      <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {project.description}
                      </p>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                      {project.details?.year && (
                        <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                          <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs">
                            <Calendar size={14} />
                            <span>سال</span>
                          </div>
                          <p className="text-sm font-medium mt-1 text-zinc-900 dark:text-white">
                            {project.details.year}
                          </p>
                        </div>
                      )}
                      {project.details?.duration && (
                        <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                          <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs">
                            <Clock size={14} />
                            <span>مدت زمان</span>
                          </div>
                          <p className="text-sm font-medium mt-1 text-zinc-900 dark:text-white">
                            {project.details.duration}
                          </p>
                        </div>
                      )}
                    </div>

                    {project.tech.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <Layers size={14} />
                          {labels.techStack}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium border border-zinc-200 dark:border-zinc-700"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {project.details?.colors && (
                      <div>
                        <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
                          {labels.colorPalette}
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {project.details.colors.map((c) => (
                            <div
                              key={c.hex}
                              className="flex items-center gap-2 pr-3 pl-1.5 py-1.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                            >
                              <span
                                className="w-6 h-6 rounded-full border border-zinc-300 dark:border-zinc-600 flex-shrink-0"
                                style={{ backgroundColor: c.hex }}
                              />
                              <div className="leading-tight">
                                <div className="text-xs font-medium text-zinc-900 dark:text-white">
                                  {c.name}
                                </div>
                                <div className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono uppercase">
                                  {c.hex}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {project.details?.font && (
                      <div>
                        <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                          {labels.typography}
                        </h4>
                        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 w-fit">
                          <TypeIcon size={16} className="text-zinc-500 dark:text-zinc-400" />
                          <span className="text-sm text-zinc-700 dark:text-zinc-300">
                            {project.details.font}
                          </span>
                        </div>
                      </div>
                    )}

                    {project.details?.technical && (
                      <div>
                        <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                          جزئیات فنی
                        </h4>
                        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                          {project.details.technical}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    currentPage === page
                      ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-lg"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700"
                  }`}
                >
                  {page}
                </button>
              ),
            )}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {projects.length === 0 && (
        <div className="mt-20 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 mb-6">
            <Sparkles size={32} className="text-zinc-400 dark:text-zinc-500" />
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
            {labels.noProjects}
          </p>
        </div>
      )}
    </section>
  );
}

export default memo(Projects);