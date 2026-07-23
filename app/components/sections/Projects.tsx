"use client";

import Banner from "@/public/pic/Banner.png";
import demo1 from "@/public/pic/demo1.webp";
import demo2 from "@/public/pic/demo2.webp";
import demo3 from "@/public/pic/demo3.webp";
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
} from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { memo, useEffect, useMemo, useState } from "react";
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
      (
        ((t.Blog as Record<string, unknown> | undefined)?.projects as
          | Record<string, unknown>[]
          | undefined) ?? []
      ).map((p: Record<string, unknown>, i: number) => {
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
            duration:
              typeof details.duration === "string"
                ? details.duration
                : "3 months",
            role:
              typeof details.role === "string"
                ? details.role
                : "Full Stack Developer",
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

        {/* Banner Image */}
        <div className="relative w-full h-48 sm:h-56 md:h-72 mb-10 mt-20 sm:mb-14 overflow-hidden rounded-3xl shadow-2xl shadow-zinc-500/10">
          <Image
            src={Banner}
            alt="Projects Banner"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-500/20 via-transparent to-blue-500/20" />

          {/* Banner text overlay */}
          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 md:bottom-12 md:left-12">
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-background/10 backdrop-blur-md rounded-full border border-white/20">
                <span className=" text-xs font-medium">✦ Portfolio</span>
              </div>
              <div className="px-3 py-1 bg-background/10 backdrop-blur-md rounded-full border border-white/20">
                <span className=" text-xs font-medium">
                  {projects.length} Projects
                </span>
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-500/10 dark:bg-zinc-400/10 border border-zinc-500/20 dark:border-zinc-400/20 mb-4">
            <Zap size={14} className="text-zinc-400" />
            <span className="text-zinc-600 dark:text-zinc-400 text-xs font-medium uppercase tracking-wider">
              Open to Work | full time
            </span>
          </div>
          <h2 className="Moraba_font text-4xl sm:text-5xl md:text-6xl font-bold  min-h-[1.2em] ">
            {headerInView && <TypeWriter text={labels.header} delay={70} />}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-sm sm:text-base">
            {labels.subtitle}
          </p>
        </div>


        {/* Projects Grid */}
        <div
          ref={gridRef}
          className={`grid gap-6 sm:gap-8 lg:grid-cols-2 xl:grid-cols-3 transition-all duration-700 ${
            gridInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
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
                      hover:-translate-y-2 hover:shadow-2xl hover:shadow-zinc-500/20
                      border  dark:border-gray-400/30
                      hover:border-zinc-400/30 
                      before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-zinc-500/10 before:to-blue-500/10 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100
                      ${
                        gridInView
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
                    <div className="relative h-80 sm:h-96 md:h-[28rem] overflow-hidden bg-background/30 flex-shrink-0">
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
                              loading={project.id <= 3 ? undefined : "lazy"}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Overlay gradient */}
                      <div className="absolute inset-0  group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex gap-2">
                        <div className="px-3 py-1 rounded-full  backdrop-blur-md  text-[10px] font-mono border border-white/10">
                          #{String(project.id).padStart(2, "0")}
                        </div>
                        {project.details?.year && (
                          <div className="px-3 py-1 rounded-full backdrop-blur-md  text-[10px] font-mono border border-white/10">
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
                        <div className="p-4 rounded-full bg-background backdrop-blur-xl border border-foreground/30">
                          <Play size={28} className="text-white" />
                        </div>
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg font-bold 0 transition-colors duration-300 line-clamp-1">
                          {project.title}
                        </h3>
                        <ArrowUpRight
                          size={16}
                          className="text-muted-foreground group-hover:text-zinc-400 transition-colors shrink-0 mt-1"
                        />
                      </div>

                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {project.description}
                      </p>
                      {/* Action buttons */}
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open("#", "_blank");
                          }}
                          className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-white text-xs font-semibold shadow-lg shadow-zinc-500/25 hover:shadow-xl hover:shadow-zinc-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                          <ExternalLink size={14} />
                          <span>{labels.liveDemo || "Live Demo"}</span>
                        </button>
                        <button
                          onClick={() => toggleFlip(project.id)}
                          className="px-4 py-2 rounded-xl border border-gray-200text-foreground bg-background/50 dark:bg-background/50 hover:bg-background dark:hover:bg-background transition-all duration-300 hover:scale-105 active:scale-95"
                          aria-label="Flip card"
                        >
                          <ArrowLeftRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Back Face */}
                  <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-background/95 dark:bg-background/95 rounded-3xl flex flex-col">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-border/50 dark:border-border/50 bg-background/80 dark:bg-background/80 backdrop-blur-xl flex-shrink-0">
                      <div className="min-w-0">
                        <h3 className="text-base font-bold text-foreground truncate bg-gradient-to-r from-zinc-700 to-blue-600 bg-clip-text text-transparent">
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
                        className="p-2 rounded-full bg-background dark:bg-background hover:bg-background dark:hover:bg-background transition-all duration-300 hover:scale-110 text-foreground flex-shrink-0"
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
                          <div className="p-3 rounded-xl bg-background/60 dark:bg-background/60">
                            <div className="flex items-center gap-2 text-muted-foreground text-xs">
                              <Calendar size={14} />
                              <span>Year</span>
                            </div>
                            <p className="text-sm font-medium mt-1">
                              {project.details.year}
                            </p>
                          </div>
                        )}
                        {project.details?.duration && (
                          <div className="p-3 rounded-xl bg-background/60 dark:bg-background/60">
                            <div className="flex items-center gap-2 text-muted-foreground text-xs">
                              <Clock size={14} />
                              <span>Duration</span>
                            </div>
                            <p className="text-sm font-medium mt-1">
                              {project.details.duration}
                            </p>
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
                                className="px-3 py-1.5 rounded-xl bg-zinc-500/10 dark:bg-zinc-400/10 text-zinc-600 dark:text-zinc-400 text-xs font-medium"
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
                                className="flex items-center gap-2 pr-3 pl-1.5 py-1.5 rounded-xl bg-background/60 dark:bg-background/60 border border-border/50 dark:border-border/50"
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
                          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-background/60 dark:bg-background/60 border border-border/50 dark:border-border/50 w-fit">
                            <TypeIcon
                              size={16}
                              className="text-muted-foreground"
                            />
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
              className="p-2 rounded-xl bg-background/60 dark:bg-background/60 backdrop-blur-sm border border-border/50 dark:border-border/50 text-foreground hover:bg-background dark:hover:bg-background disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
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
                        ? "bg-gradient-to-r from-zinc-700 to-blue-600 text-white shadow-lg shadow-zinc-500/25"
                        : "bg-background/60 dark:bg-background/60 backdrop-blur-sm border border-border/50 dark:border-border/50 text-foreground hover:bg-background dark:hover:bg-background"
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
              className="p-2 rounded-xl bg-background/60 dark:bg-background/60 backdrop-blur-sm border border-border/50 dark:border-border/50 text-foreground hover:bg-background dark:hover:bg-background disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* Empty state */}
        {projects.length === 0 && (
          <div className="mt-20 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-background/60 dark:bg-background/60 backdrop-blur-sm border border-border/50 dark:border-border/50 mb-6">
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
