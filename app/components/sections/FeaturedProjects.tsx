"use client";

import demo1 from "@/public/pic/demo1.webp";
import demo2 from "@/public/pic/demo2.webp";
import demo3 from "@/public/pic/demo3.webp";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Eye,
  Search,
  Sparkles,
  SquareCode,
  Type as TypeIcon,
  X,
} from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "../../context/LanguageContext";

// -----------------------------
// Types
// -----------------------------
interface ColorToken {
  name: string;
  hex: string;
}

interface ProjectDetails {
  technical?: string;
  font?: string;
  colors?: ColorToken[];
}

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  category: string;
  images: StaticImageData[];
  details?: ProjectDetails;
}

interface Category {
  id: string;
  label: string;
}

// Image order reused for every card in a stable, deterministic way.
const DEMO_IMAGES: StaticImageData[] = [demo1, demo2, demo3];

function Projects() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTechs, setSelectedTechs] = useState<Set<string>>(new Set());
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
      (t.Projects?.projects ?? []).map((p, i) => ({
        id: p.id,
        title: p.name,
        description: p.description,
        tech: p.tech,
        category: p.category,
        images: [DEMO_IMAGES[i % DEMO_IMAGES.length], demo2, demo3],
        details: p.details,
      })),
    [t],
  );

  const categories: Category[] = useMemo(
    () => [
      { id: "all", label: t.Projects?.all ?? "All" },
      { id: "web", label: t.Projects?.web ?? "Web" },
      { id: "backend", label: t.Projects?.backend ?? "Backend" },
      { id: "mobile", label: t.Projects?.mobile ?? "Mobile" },
    ],
    [t],
  );

  const allTechs = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach((p) => p.tech.forEach((t) => techSet.add(t)));
    return Array.from(techSet).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    let result = projects;

    if (activeTab !== "all") {
      result = result.filter((p) => p.category === activeTab);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tech.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (selectedTechs.size > 0) {
      result = result.filter((p) =>
        p.tech.some((t) => selectedTechs.has(t))
      );
    }

    return result;
  }, [activeTab, projects, searchQuery, selectedTechs]);

  const handleOpenDetails = useCallback((project: Project) => {
    setSelectedProject(project);
    setSlideIndex(0);
    setIsDetailOpen(true);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setIsMounted(true)),
    );
  }, []);

  const handleCloseDetails = useCallback(() => {
    setIsMounted(false);
    setIsDetailOpen(false);
    setTimeout(() => setSelectedProject(null), 350);
  }, []);

  const toggleTech = useCallback((tech: string) => {
    setSelectedTechs((prev) => {
      const next = new Set(prev);
      if (next.has(tech)) {
        next.delete(tech);
      } else {
        next.add(tech);
      }
      return next;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedTechs(new Set());
    setActiveTab("all");
  }, []);

  const nextSlide = useCallback(() => {
    if (!selectedProject) return;
    setSlideIndex((i) => (i + 1) % selectedProject.images.length);
  }, [selectedProject]);

  const prevSlide = useCallback(() => {
    if (!selectedProject) return;
    setSlideIndex((i) => (i === 0 ? selectedProject.images.length - 1 : i - 1));
  }, [selectedProject]);

  // Close on Escape + lock body scroll while modal is open
  useEffect(() => {
    if (isDetailOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseDetails();
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isDetailOpen, handleCloseDetails, nextSlide, prevSlide]);

  const labels = t.Projects;
  const categoryLabel = useCallback(
    (id: string) => categories.find((c) => c.id === id)?.label ?? id,
    [categories],
  );

  return (
    <>
      <section
        id="projects"
        className="mx-auto max-w-7xl px-6 py-32 scroll-mt-28 relative overflow-hidden mt-4"
      >
        {/* Background decorations */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-40 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        </div>

        {/* Header */}
        <div
          ref={headerRef}
          className={`mb-16 text-center transition-all duration-700 ${
            headerInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="mt-4 text-6xl font-black md:text-6xl">
            {labels?.header ?? "Featured Work"}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            {labels?.subtitle ??
              "Here are some of my recent projects that showcase my skills and experience"}
          </p>
        </div>

        {/* Advanced Search */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={labels?.searchPlaceholder ?? "Search projects..."}
                className="w-full pl-10 pr-4 py-3 rounded-none bg-background/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-all duration-300"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <button
              onClick={() => setIsSearchOpen((prev) => !prev)}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-none border border-border bg-background/50 text-foreground hover:border-foreground hover:text-foreground transition-all duration-300"
            >
              <Search size={16} />
              {labels?.advancedSearch ?? "Advanced Search"}
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${
                  isSearchOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {isSearchOpen && (
            <div className="p-5 rounded-none border border-border bg-background/30 backdrop-blur-sm space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-foreground">
                    {labels?.filterByTech ?? "Filter by technology"}
                  </span>
                  {(selectedTechs.size > 0 || searchQuery || activeTab !== "all") && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
                    >
                      {labels?.clearFilters ?? "Clear filters"}
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {allTechs.map((tech) => {
                    const isActive = selectedTechs.has(tech);
                    return (
                      <button
                        key={tech}
                        onClick={() => toggleTech(tech)}
                        className={`
                          px-3 py-1.5 rounded-none text-xs font-mono transition-all duration-300
                          ${
                            isActive
                              ? "bg-white text-black border border-white"
                              : "bg-white/5 border border-white/10 text-white/70 hover:border-white/30 hover:text-white"
                          }
                        `}
                      >
                        {tech}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                {filteredProjects.length}{" "}
                {filteredProjects.length === 1 ? "project" : "projects"}{" "}
                found
              </div>
            </div>
          )}
        </div>

        {/* Category filter */}
        <div className="mb-14 flex flex-wrap items-center justify-center gap-3">
          {categories.map((category) => {
            const isActive = activeTab === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`
                  relative rounded-none px-6 py-2.5 text-sm font-medium transition-all duration-300
                  hover:scale-105 active:scale-95
                  ${
                    isActive
                      ? " text-black shadow-lg shadow-white/25"
                      : "bg-background/50 backdrop-blur-sm border border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                  }
                `}
              >
                {category.label}
                {isActive && (
                  <span className="absolute inset-0 rounded-none bg-white -z-10" />
                )}
              </button>
            );
          })}
        </div>

        {/* Projects grid — bigger cards: max 2 columns instead of 3 */}
        <div
          ref={gridRef}
          className="grid gap-8 md:grid-cols-2 transition-all duration-700"
        >
          {filteredProjects.map((project, index) => {
            const isHovered = hoveredId === project.id;
            return (
              <div
                key={project.id}
                className={`
                  group relative overflow-hidden border border-gray-700 rounded-2xl 
                  transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 flex flex-col cursor-pointer
                  ${gridInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                `}
                style={{
                  transitionDelay: gridInView ? `${index * 80}ms` : "0ms",
                }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleOpenDetails(project)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/10 transition-opacity duration-300 pointer-events-none opacity-0 group-hover:opacity-100" />

                {/* Image — taller aspect ratio for a bigger, more dominant visual */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-white/20 to-white/20 flex-shrink-0">
                  <div className="relative w-full h-full overflow-hidden">
                    <div
                      className="absolute top-0 left-0 w-full transition-all duration-[3000ms] ease-in-out"
                      style={{
                        height: "500%",
                        willChange: "transform",
                        transform: isHovered
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
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority={project.id <= 3}
                          loading={project.id <= 3 ? undefined : "lazy"}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-mono z-20">
                    #{String(project.id).padStart(2, "0")}
                  </div>
                  <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-medium z-20">
                    {categoryLabel(project.category)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-7 flex flex-col flex-1 relative z-10">
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-white dark:group-hover:text-white transition-colors duration-300">
                    {project.title}
                  </h3>

                  {project.description && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                  )}

                  {project.tech.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tech.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-[11px] font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-6 relative z-30 flex gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDetails(project);
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 px-4 py-3 rounded-none bg-white text-black text-sm font-semibold shadow-lg shadow-white/25 hover:shadow-white/40 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <Eye size={16} />
                      {labels?.details ?? "Details"}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open("#", "_blank");
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 px-4 py-3 rounded-none border border-white text-white bg-transparent hover:bg-white/10 text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <ExternalLink size={16} />
                      {labels?.demo ?? "Demo"}
                    </button>
                  </div>
                </div>

                <div
                  className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-white/10 to-white/10 rounded-full blur-2xl pointer-events-none transition-opacity duration-400 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="mt-20 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent mb-6">
              <Sparkles size={32} className="text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              {labels?.noProjects ?? "No projects found in this category"}
            </p>
          </div>
        )}
      </section>

      {/* ----------------------------------------------------------------
          Detail modal
          Redesigned as a centered, rounded panel (not a full-width sheet):
          - Fixed max width/height so it never feels like a broken layout
          - Sticky header with title + close button (always visible)
          - Gallery on top (mobile) / left (desktop), scrollable info panel
          - Single scroll container for the info side, footer actions stay visible
      ----------------------------------------------------------------- */}
      {isDetailOpen && selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6">
          <div
            className={`absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300 ${
              isMounted ? "opacity-100" : "opacity-0"
            }`}
            onClick={handleCloseDetails}
          />

          <div
            className={`
              relative w-full md:max-w-4xl h-[92vh] md:h-[85vh] max-h-[900px]
              bg-[#18181B] shadow-2xl border border-white/10
              rounded-t-3xl md:rounded-2xl overflow-hidden
              flex flex-col
              transition-all duration-400 ease-out
              ${
                isMounted
                  ? "translate-y-0 md:scale-100 opacity-100"
                  : "translate-y-full md:translate-y-4 md:scale-95 opacity-0"
              }
            `}
          >
            {/* Sticky header */}
            <div className="flex items-center justify-between gap-4 px-5 md:px-6 py-4 border-b border-white/10 bg-[#18181B]/95 backdrop-blur-sm flex-shrink-0">
              <div className="min-w-0">
                <h2 className="text-lg md:text-xl font-bold text-white truncate">
                  {selectedProject.title}
                </h2>
                <span className="text-xs text-white/50">
                  {categoryLabel(selectedProject.category)}
                </span>
              </div>
              <button
                onClick={handleCloseDetails}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110 text-white flex-shrink-0"
                aria-label="Close details"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body: gallery + scrollable details, side by side on desktop */}
            <div className="flex flex-col md:flex-row flex-1 min-h-0">
              {/* Gallery */}
              <div className="relative w-full md:w-1/2 h-64 md:h-full flex-shrink-0 bg-black/40">
                <div className="relative w-full h-full">
                  <Image
                    src={selectedProject.images[slideIndex]}
                    alt={`${selectedProject.title} screenshot ${slideIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all duration-300 hover:scale-110"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all duration-300 hover:scale-110"
                      aria-label="Next image"
                    >
                      <ChevronRight size={20} />
                    </button>

                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {selectedProject.images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setSlideIndex(i)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            i === slideIndex
                              ? "w-6 bg-white"
                              : "w-1.5 bg-white/40"
                          }`}
                          aria-label={`Go to image ${i + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Details — the only scrollable region, so header/gallery stay put */}
              <div className="w-full md:w-1/2 flex-1 min-h-0 overflow-y-auto">
                <div className="p-6 md:p-8 flex flex-col gap-6">
                  {selectedProject.details?.technical && (
                    <p className="text-white/80 text-sm leading-relaxed">
                      {selectedProject.details.technical}
                    </p>
                  )}

                  {selectedProject.tech.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                        {labels?.techStack ?? "Tech Stack"}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-3.5 py-1.5 rounded-none bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedProject.details?.colors && (
                    <div>
                      <h4 className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                        {labels?.colorPalette ?? "Color Palette"}
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {selectedProject.details.colors.map((c) => (
                          <div
                            key={c.hex}
                            className="flex items-center gap-2 pr-3 pl-1.5 py-1.5 rounded-none bg-white/5 border border-white/10"
                          >
                            <span
                              className="w-6 h-6 rounded-full border border-white/20 flex-shrink-0"
                              style={{ backgroundColor: c.hex }}
                            />
                            <div className="leading-tight text-left">
                              <div className="text-white/90 text-xs font-medium">
                                {c.name}
                              </div>
                              <div className="text-white/50 text-[11px] font-mono uppercase">
                                {c.hex}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedProject.details?.font && (
                    <div>
                      <h4 className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                        {labels?.typography ?? "Typography"}
                      </h4>
                      <div className="flex items-center gap-2 px-4 py-2.5 rounded-none bg-white/5 border border-white/10 w-fit">
                        <TypeIcon size={14} className="text-white/60" />
                        <span className="text-white/80 text-xs">
                          {selectedProject.details.font}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sticky footer actions — always reachable, no matter how long the details are */}
            <div className="flex flex-wrap justify-center gap-3 px-6 py-4 border-t border-white/10 bg-[#18181B]/95 backdrop-blur-sm flex-shrink-0">
              <button
                onClick={() => window.open("#", "_blank")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-none bg-white text-black text-sm font-semibold shadow-lg shadow-white/25 hover:shadow-white/40 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <ExternalLink size={16} />
                {labels?.liveDemo ?? "Live Demo"}
              </button>

              <button
                onClick={() => window.open("#", "_blank")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-none bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <SquareCode size={16} />
                {labels?.sourceCode ?? "Source Code"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(Projects);