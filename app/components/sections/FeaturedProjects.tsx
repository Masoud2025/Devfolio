"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import {
  ExternalLink,
  Code2,
  Sparkles,
  SquareCode,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Type as TypeIcon,
} from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useInView } from "react-intersection-observer";
import demo1 from "@/public/pic/demo1.webp";
import demo2 from "@/public/pic/demo2.webp";
import demo3 from "@/public/pic/demo3.webp";

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

// Known brand colors for common tech, used as a fallback palette
const TECH_COLOR_MAP: Record<string, string> = {
  "Next.js": "#000000",
  TypeScript: "#3178C6",
  Tailwind: "#06B6D4",
  Prisma: "#16A394",
  React: "#61DAFB",
  "React Native": "#61DAFB",
  "Framer Motion": "#0055FF",
  PostgreSQL: "#4169E1",
  JWT: "#D63AFF",
  "Socket.io": "#010101",
  Redis: "#DC382D",
  "D3.js": "#F9A03C",
  Recharts: "#22B5BF",
};

function Projects() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

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
    [t]
  );

  const categories: Category[] = useMemo(
    () => [
      { id: "all", label: t.Projects?.all ?? "All" },
      { id: "web", label: t.Projects?.web ?? "Web" },
      { id: "backend", label: t.Projects?.backend ?? "Backend" },
      { id: "mobile", label: t.Projects?.mobile ?? "Mobile" },
    ],
    [t]
  );

  const filteredProjects = useMemo(
    () =>
      activeTab === "all"
        ? projects
        : projects.filter((p) => p.category === activeTab),
    [activeTab, projects]
  );

  const handleOpenDetails = useCallback((project: Project) => {
    setSelectedProject(project);
    setSlideIndex(0);
    setIsDetailOpen(true);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setIsMounted(true))
    );
  }, []);

  const handleCloseDetails = useCallback(() => {
    setIsMounted(false);
    setIsDetailOpen(false);
    setTimeout(() => setSelectedProject(null), 350);
  }, []);

  const nextSlide = useCallback(() => {
    if (!selectedProject) return;
    setSlideIndex((i) => (i + 1) % selectedProject.images.length);
  }, [selectedProject]);

  const prevSlide = useCallback(() => {
    if (!selectedProject) return;
    setSlideIndex((i) =>
      i === 0 ? selectedProject.images.length - 1 : i - 1
    );
  }, [selectedProject]);

  useEffect(() => {
    if (isDetailOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isDetailOpen]);

  const labels = t.Projects;
  const categoryLabel = useCallback(
    (id: string) => categories.find((c) => c.id === id)?.label ?? id,
    [categories]
  );

  return (
    <>
      <section
        id="projects"
        className="mx-auto max-w-7xl px-6 py-32 scroll-mt-28 relative overflow-hidden"
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
            headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.4em] text-zinc-500">
            <Sparkles size={14} className="text-white" />
            {labels?.title ?? "My Projects"}
            <Sparkles size={14} className="text-white" />
          </span>

          <h2 className="mt-4 text-6xl font-black md:text-6xl bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
            {labels?.header ?? "Featured Work"}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            {labels?.subtitle ??
              "Here are some of my recent projects that showcase my skills and experience"}
          </p>
        </div>

        {/* Category filter */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
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
                      ? "bg-white text-black shadow-lg shadow-white/25"
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

        {/* Projects grid */}
        <div
          ref={gridRef}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 transition-all duration-700"
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

                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-white/20 to-white/20 flex-shrink-0">
                  <div className="relative w-full h-full overflow-hidden">
                    <div
                      className="absolute top-0 left-0 w-full transition-all duration-[3000ms] ease-in-out"
                      style={{
                        height: "500%",
                        willChange: "transform",
                        transform: isHovered ? "translateY(-80%)" : "translateY(0%)",
                      }}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={project.images[0]}
                          alt={project.title}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                <div className="p-6 flex flex-col flex-1 relative z-10">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-white dark:group-hover:text-white transition-colors duration-300">
                    {project.title}
                  </h3>

                  <div className="mt-4 relative z-30 flex gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDetails(project);
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-none bg-white text-black text-sm font-semibold shadow-lg shadow-white/25 hover:shadow-white/40 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <Eye size={16} />
                      {labels?.details ?? "Details"}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open("#", "_blank");
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-none border border-white text-white bg-transparent hover:bg-white/10 text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
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

      {/* Bottom sheet modal */}
      {isDetailOpen && (
        <div className="fixed inset-0 z-[100]">
          <div
            className={`absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300 ${
              isMounted ? "opacity-100" : "opacity-0"
            }`}
            onClick={handleCloseDetails}
          />

          <div
            className={`absolute inset-x-0 bottom-0 w-full h-[80vh] bg-[#18181B] overflow-hidden shadow-2xl transition-transform duration-500 ease-out ${
              isMounted ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <button
              onClick={handleCloseDetails}
              className="absolute top-4 right-4 z-30 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-110 text-white"
              aria-label="Close details"
            >
              <X size={22} />
            </button>

            {selectedProject && (
              <div className="flex flex-col md:flex-row h-full">
                {/* Gallery */}
                <div className="relative w-full md:w-1/2 h-56 md:h-full flex-shrink-0 bg-black/40">
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
                          i === slideIndex ? "w-6 bg-white" : "w-1.5 bg-white/40"
                        }`}
                        aria-label={`Go to image ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="w-full md:w-1/2 h-full overflow-y-auto p-6 md:p-8 flex flex-col items-center justify-center text-center gap-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    {selectedProject.title}
                  </h2>

                  {selectedProject.details?.technical && (
                    <p className="text-white/80 text-sm leading-relaxed max-w-lg">
                      {selectedProject.details.technical}
                    </p>
                  )}

                  <div className="space-y-4 w-full flex flex-col items-center">
                    {selectedProject.tech.length > 0 && (
                      <div className="w-full">
                        <h4 className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                          {labels?.techStack ?? "Tech Stack"}
                        </h4>
                        <div className="flex flex-wrap justify-center gap-2">
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
                      <div className="w-full">
                        <h4 className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                          {labels?.colorPalette ?? "Color Palette"}
                        </h4>
                        <div className="flex flex-wrap justify-center gap-3">
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
                                <div className="text-white/90 text-xs font-medium">{c.name}</div>
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
                      <div className="w-full">
                        <h4 className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                          {labels?.typography ?? "Typography"}
                        </h4>
                        <div className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-none bg-white/5 border border-white/10 w-fit mx-auto">
                          <TypeIcon size={14} className="text-white/60" />
                          <span className="text-white/80 text-xs">
                            {selectedProject.details.font}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap justify-center gap-3 mt-4">
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
          </div>
        </div>
      )}
    </>
  );
}

export default memo(Projects);
