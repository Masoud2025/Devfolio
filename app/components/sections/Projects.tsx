"use client";

import Banner from "@/public/pic/Banner.png";
import demo1 from "@/public/pic/demo1.webp";
import demo2 from "@/public/pic/demo2.webp";
import demo3 from "@/public/pic/demo3.webp";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Eye,
  Sparkles,
  Type as TypeIcon,
  X,
  ArrowUpRight,
  Calendar,
  Clock,
  Layers,
  Zap,
  GitBranch,
  Link2,
  Play,
  ArrowLeftRight,
} from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "../../context/LanguageContext";

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
  details?: ProjectDetails;
  category: string;
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
      <span className="inline-block w-[2px] h-[0.85em] bg-purple-600 dark:bg-purple-400 align-middle ml-0.5 animate-pulse" />
    </span>
  );
}

function Projects() {
  const { t } = useLanguage();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [mobileScrollId, setMobileScrollId] = useState<number | null>(null);
  const [flippedId, setFlippedId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { ref: gridRef, inView: gridInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects: Project[] = useMemo(
    () =>
      ((t.Blog as Record<string, unknown> | undefined)?.projects as Record<string, unknown>[] | undefined ?? []).map((p: Record<string, unknown>, i: number) => {
        const details = (p.details ?? {}) as Record<string, unknown>;
        const rawCategory = (p.category as string) || "software";
        const categoryMap: Record<string, string> = {
          web: "web",
          portfolio: "web",
          landingpage: "web",
          blog: "web",
          software: "software",
          backend: "software",
          mobile: "software",
          sass: "software",
          business: "software",
          ai: "ai",
          dashboard: "dashboard",
          ecommerce: "ecommerce",
          documentation: "software",
          boilerplate: "software",
          startup: "software",
        };
        return {
          id: p.id as number,
          title: p.name as string,
          description: p.description as string,
          tech: p.tech as string[],
          category: categoryMap[rawCategory] || "software",
          images: [DEMO_IMAGES[i % DEMO_IMAGES.length], demo2, demo3],
          details: {
            ...details,
            year: typeof details.year === "string" ? details.year : "2024",
            duration: typeof details.duration === "string" ? details.duration : "3 months",
            role: typeof details.role === "string" ? details.role : "Full Stack Developer",
          },
        };
      }),
    [t],
  );

  const totalPages = Math.max(1, Math.ceil(projects.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProjects = projects.slice(startIndex, startIndex + pageSize);

  const labels = t.Blog ?? {
    header: "Featured Work",
    subtitle:
      "Here are some of my recent projects that showcase my skills and experience",
    details: "Details",
    demo: "Demo",
    noProjects: "No projects found",
    techStack: "Tech Stack",
    colorPalette: "Color Palette",
    typography: "Typography",
    liveDemo: "Live Demo",
    sourceCode: "Source Code",
  };

  const toggleMobileScroll = (id: number) => {
    setMobileScrollId((prev) => (prev === id ? null : id));
  };

  const toggleFlip = (id: number) => {
    setFlippedId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <section
        id="projects"
        className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 md:py-20 scroll-mt-28 relative"
      >
        {/* Decorative background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/3 to-blue-500/3 rounded-full blur-3xl" />
        </div>

        {/* Banner Image */}
        <div className="relative w-full h-48 sm:h-56 md:h-72 mb-10 sm:mb-14 overflow-hidden rounded-3xl shadow-2xl shadow-purple-500/10">
          <Image
            src={Banner}
            alt="Projects Banner"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-blue-500/20" />
          
          {/* Banner text overlay */}
          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 md:bottom-12 md:left-12">
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <span className="text-white/80 text-xs font-medium">✦ Portfolio</span>
              </div>
              <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <span className="text-white/80 text-xs font-medium">{projects.length} Projects</span>
              </div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div
          ref={headerRef}
          className={`mb-12 sm:mb-16 text-center transition-all duration-700 ${
            headerInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 dark:bg-purple-400/10 border border-purple-500/20 dark:border-purple-400/20 mb-4">
            <Zap size={14} className="text-purple-500" />
            <span className="text-purple-600 dark:text-purple-400 text-xs font-medium uppercase tracking-wider">
              Portfolio
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 dark:from-purple-400 dark:via-purple-300 dark:to-blue-400 bg-clip-text text-transparent min-h-[1.2em]">
            {headerInView && <TypeWriter text={labels.header} delay={70} />}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-sm sm:text-base">
            {labels.subtitle}
          </p>
        </div>

        {/* Projects Grid */}
            <div
              ref={gridRef}
              className="grid gap-6 sm:gap-8 lg:grid-cols-2 xl:grid-cols-3 transition-all duration-700"
            >
              {paginatedProjects.map((project, index) => {
                const isHovered = hoveredId === project.id;
                const isMobileScrolled = mobileScrollId === project.id;
                const isScrolled = isHovered || isMobileScrolled;
                const isFlipped = flippedId === project.id;
                return (
                  <div
                    key={project.id}
                    className={`
                      group relative overflow-hidden rounded-3xl
                      transition-all duration-500 ease-out
                      hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20
                      bg-white/60 dark:bg-gray-900/60
                      backdrop-blur-xl backdrop-saturate-150
                      border border-white/20 dark:border-gray-700/30
                      hover:border-purple-400/30 dark:hover:border-purple-400/30
                      before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-purple-500/10 before:to-blue-500/10 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100
                      ${gridInView
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                      }
                    `}
                    style={{
                      transitionDelay: gridInView ? `${index * 100}ms` : "0ms",
                    }}
                    onMouseEnter={() => setHoveredId(project.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div
                      className="relative w-full transition-transform duration-700 [transform-style:preserve-3d]"
                      style={{
                        transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                      }}
                    >
                      {/* Front Face */}
                      <div className="relative [backface-visibility:hidden] flex flex-col">
                        {/* Image Container */}
                        <div className="relative h-80 sm:h-96 md:h-[28rem] overflow-hidden bg-card/30 flex-shrink-0">
                          <div className="relative w-full h-full overflow-hidden">
                            <div
                              className="absolute top-0 left-0 w-full transition-all duration-[3000ms] ease-in-out"
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
                                  loading={project.id <= 3 ? undefined : "lazy"}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                          {/* Badges */}
                          <div className="absolute top-3 left-3 flex gap-2">
                            <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[10px] font-mono border border-white/10">
                              #{String(project.id).padStart(2, "0")}
                            </div>
                            {project.details?.year && (
                              <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[10px] font-mono border border-white/10">
                                {project.details.year}
                              </div>
                            )}
                          </div>

                          {/* Mobile play button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleMobileScroll(project.id);
                            }}
                            className="md:hidden absolute inset-0 flex items-center justify-center"
                            aria-label="View project"
                          >
                            <div className="p-4 rounded-full bg-black backdrop-blur-xl border border-white/30">
                              <Play size={28} className="text-white" />
                            </div>
                          </button>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex flex-col">
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="text-lg font-bold text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 line-clamp-1">
                              {project.title}
                            </h3>
                            <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-purple-500 transition-colors flex-shrink-0 mt-1" />
                          </div>

                          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                            {project.description}
                          </p>

                          {/* Tech tags */}
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {project.tech.slice(0, 3).map((tech) => (
                              <span
                                key={tech}
                                className="px-2.5 py-1 rounded-lg bg-purple-500/10 dark:bg-purple-400/10 text-purple-600 dark:text-purple-400 text-[10px] font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.tech.length > 3 && (
                              <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-muted-foreground text-[10px] font-medium">
                                +{project.tech.length - 3}
                              </span>
                            )}
                          </div>

                          {/* Action buttons */}
                          <div className="mt-4 flex gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open("#", "_blank");
                              }}
                              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-semibold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
                            >
                              <ExternalLink size={14} />
                              <span>{labels.liveDemo || "Live Demo"}</span>
                            </button>
                            <button
                              onClick={() => toggleFlip(project.id)}
                              className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-foreground bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 active:scale-95"
                              aria-label="Flip card"
                            >
                              <ArrowLeftRight size={14} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Back Face */}
                      <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-white/95 dark:bg-gray-900/95 rounded-3xl flex flex-col">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl flex-shrink-0">
                          <div className="min-w-0">
                            <h3 className="text-base font-bold text-foreground truncate bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                              {project.title}
                            </h3>
                            {project.details?.role && (
                              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                                {project.details.role}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => toggleFlip(project.id)}
                            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 text-foreground flex-shrink-0"
                            aria-label="Flip back"
                          >
                            <X size={16} />
                          </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-5 space-y-5">
                          {/* Description */}
                          {project.description && (
                            <p className="text-sm text-foreground/80 leading-relaxed">
                              {project.description}
                            </p>
                          )}

                          {/* Project metadata */}
                          <div className="grid grid-cols-2 gap-3">
                            {project.details?.year && (
                              <div className="p-3 rounded-xl bg-gray-100/60 dark:bg-gray-800/60">
                                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                                  <Calendar size={14} />
                                  <span>Year</span>
                                </div>
                                <p className="text-sm font-medium mt-1">{project.details.year}</p>
                              </div>
                            )}
                            {project.details?.duration && (
                              <div className="p-3 rounded-xl bg-gray-100/60 dark:bg-gray-800/60">
                                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                                  <Clock size={14} />
                                  <span>Duration</span>
                                </div>
                                <p className="text-sm font-medium mt-1">{project.details.duration}</p>
                              </div>
                            )}
                          </div>

                          {/* Tech Stack */}
                          {project.tech.length > 0 && (
                            <div>
                              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                                <Layers size={14} />
                                {labels.techStack}
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {project.tech.map((tech) => (
                                  <span
                                    key={tech}
                                    className="px-3 py-1.5 rounded-xl bg-purple-500/10 dark:bg-purple-400/10 text-purple-600 dark:text-purple-400 text-xs font-medium"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Color Palette */}
                          {project.details?.colors && (
                            <div>
                              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                                {labels.colorPalette}
                              </h4>
                              <div className="flex flex-wrap gap-3">
                                {project.details.colors.map((c) => (
                                  <div
                                    key={c.hex}
                                    className="flex items-center gap-2 pr-3 pl-1.5 py-1.5 rounded-xl bg-gray-100/60 dark:bg-gray-800/60 border border-gray-200/50 dark:border-gray-700/50"
                                  >
                                    <span
                                      className="w-6 h-6 rounded-full border border-gray-200 dark:border-gray-700 flex-shrink-0"
                                      style={{ backgroundColor: c.hex }}
                                    />
                                    <div className="leading-tight">
                                      <div className="text-xs font-medium text-foreground">
                                        {c.name}
                                      </div>
                                      <div className="text-[10px] text-muted-foreground font-mono uppercase">
                                        {c.hex}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Typography */}
                          {project.details?.font && (
                            <div>
                              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                {labels.typography}
                              </h4>
                              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100/60 dark:bg-gray-800/60 border border-gray-200/50 dark:border-gray-700/50 w-fit">
                                <TypeIcon size={16} className="text-muted-foreground" />
                                <span className="text-sm text-foreground/80">
                                  {project.details.font}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Technical */}
                          {project.details?.technical && (
                            <div>
                              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                Technical
                              </h4>
                              <p className="text-sm text-foreground/80 leading-relaxed">
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
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
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25"
                            : "bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-foreground hover:bg-gray-100 dark:hover:bg-gray-800"
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
                  className="p-2 rounded-xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}

            {/* Empty state */}
            {projects.length === 0 && (
              <div className="mt-20 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 mb-6">
                  <Sparkles size={32} className="text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-sm sm:text-base">
                  {labels.noProjects}
                </p>
              </div>
            )}
      </section>
    </>
  );
}

export default memo(Projects);
