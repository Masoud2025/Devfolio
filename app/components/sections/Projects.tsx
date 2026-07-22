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
  SquareCode,
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
} from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { memo, useCallback, useMemo, useState } from "react";
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

const CATEGORIES = [
  "all",
  "sass",
  "software",
  "business",
  "landingpage",
  "blog",
  "portfolio",
  "ai",
  "documentation",
  "boilerplate",
  "startup",
  "dashboard",
  "ecommerce",
];

function Projects() {
  const { t } = useLanguage();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [mobileScrollId, setMobileScrollId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
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

  const categoryLabels: Record<string, string> = (() => {
    const blog = t.Blog ?? {};
    const map: Record<string, string> = {};
    for (const key of CATEGORIES) {
      map[key] = (blog as Record<string, string>)[key] || key;
    }
    return map;
  })();

  // Build projects from translation data
  const projects: Project[] = useMemo(
    () =>
      (t.Blog?.projects ?? []).map((p: Record<string, unknown>, i: number) => ({
        id: p.id as number,
        title: p.name as string,
        description: p.description as string,
        tech: p.tech as string[],
        category: (p.category as string) || "software",
        images: [DEMO_IMAGES[i % DEMO_IMAGES.length], demo2, demo3],
        details: {
          ...p.details,
          year: (p.details as Record<string, unknown>)?.year as string || "2024",
          duration: (p.details as Record<string, unknown>)?.duration as string || "3 months",
          role: (p.details as Record<string, unknown>)?.role as string || "Full Stack Developer",
        },
      })),
    [t],
  );

  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((p) => p.category === activeCategory);
  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + pageSize);

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
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 dark:from-purple-400 dark:via-purple-300 dark:to-blue-400 bg-clip-text text-transparent">
            {labels.header}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-sm sm:text-base">
            {labels.subtitle}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 flex-wrap justify-center mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-foreground text-background shadow-lg shadow-foreground/10"
                  : "bg-card/30 text-muted-foreground hover:text-foreground hover:bg-foreground/10 border border-border/10"
              }`}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
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
            return (
              <div
                key={project.id}
                className={`
                  group relative overflow-hidden rounded-3xl
                  transition-all duration-500 ease-out
                  hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20
                  flex flex-col
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
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-card/30 flex-shrink-0">
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
                    className="md:hidden absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    aria-label="View project"
                  >
                    <div className="p-4 rounded-full bg-white/20 backdrop-blur-xl border border-white/30">
                      <Play size={28} className="text-white" />
                    </div>
                  </button>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 line-clamp-1">
                      {project.title}
                    </h3>
                    <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-purple-500 transition-colors flex-shrink-0 mt-1" />
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1">
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
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open("#", "_blank");
                      }}
                      className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-foreground bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      <GitBranch size={14} />
                    </button>
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
        {filteredProjects.length === 0 && (
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
