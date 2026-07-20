"use client";

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
} from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "../../context/LanguageContext";
import Banner from "@/public/pic/Banner.png"

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
  images: StaticImageData[];
  details?: ProjectDetails;
}

const DEMO_IMAGES: StaticImageData[] = [demo1, demo2, demo3];

function Projects() {
  const { t } = useLanguage();
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
      (t.Blog?.projects ?? []).map((p, i) => ({
        id: p.id,
        title: p.name,
        description: p.description,
        tech: p.tech,
        images: [DEMO_IMAGES[i % DEMO_IMAGES.length], demo2, demo3],
        details: p.details,
      })),
    [t]
  );

  const filteredProjects = projects;

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
    setSlideIndex((i) => (i === 0 ? selectedProject.images.length - 1 : i - 1));
  }, [selectedProject]);

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

  return (
    <>
      <section
        id="projects"
        className="mx-auto max-w-7xl px-6 py-32 scroll-mt-28 relative overflow-hidden mt-4"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-40 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        </div>

        {/* Banner Image */}
        <div className="relative w-full h-48 md:h-64 -mx-6 mb-12 overflow-hidden">
          <Image
            src={Banner}
            alt="Projects Banner"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        <div
          ref={headerRef}
          className={`mb-16 text-center transition-all duration-700 ${
            headerInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="mt-4 text-6xl font-black md:text-6xl">
            {labels.header}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            {labels.subtitle}
          </p>
        </div>

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
                  group relative overflow-hidden rounded-[2rem] 
                  transition-all duration-500 ease-out
                  hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10
                  flex flex-col cursor-pointer
                  bg-white/5 dark:bg-white/5
                  backdrop-blur-xl
                  border border-white/10 dark:border-white/10
                  hover:border-purple-400/30 dark:hover:border-purple-400/30
                  before:absolute before:inset-0 before:rounded-[2rem] before:bg-gradient-to-br before:from-purple-500/5 before:to-blue-500/5 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100
                  min-h-[560px]
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
                onClick={() => handleOpenDetails(project)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent transition-opacity duration-500 pointer-events-none opacity-0 group-hover:opacity-100" />

                <div className="relative aspect-[16/10] mt-6 mx-6 overflow-hidden bg-gradient-to-br from-white/10 to-white/5 flex-shrink-0 rounded-2xl">
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

                  <div className="absolute top-4 right-4 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-mono z-20 border border-white/10">
                    #{String(project.id).padStart(2, "0")}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1 relative z-10">
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-white dark:group-hover:text-white transition-colors duration-300">
                    {project.title}
                  </h3>

                  <div className="mt-4 relative z-30 flex gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDetails(project);
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-black text-sm font-semibold shadow-lg shadow-white/25 hover:shadow-xl hover:shadow-white/40 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <Eye size={16} />
                      {labels.details}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open("#", "_blank");
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-white/20 text-white bg-white/5 hover:bg-white/10 text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-sm"
                    >
                      <ExternalLink size={16} />
                      {labels.demo}
                    </button>
                  </div>
                </div>

                <div
                  className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-2xl pointer-events-none transition-opacity duration-500 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="mt-20 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent mb-6">
              <Sparkles size={32} className="text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">{labels.noProjects}</p>
          </div>
        )}
      </section>

      {isDetailOpen && selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6">
          <div
            className={`absolute inset-0 bg-black/60 backdrop-blur-xl transition-all duration-500 ${
              isMounted ? "opacity-100" : "opacity-0"
            }`}
            onClick={handleCloseDetails}
          />

          <div
            className={`
              relative w-full md:max-w-5xl h-[95vh] md:h-[90vh] max-h-[950px]
              bg-white/90 dark:bg-zinc-900/90
              shadow-2xl shadow-black/30 dark:shadow-purple-500/10
              border border-white/20 dark:border-white/10
              rounded-t-[2rem] md:rounded-[2rem] overflow-hidden
              flex flex-col
              transition-all duration-500 ease-out
              backdrop-blur-2xl
              before:absolute before:inset-0 before:rounded-[2rem] before:bg-gradient-to-br before:from-purple-500/5 before:to-blue-500/5 before:pointer-events-none
              ${
                isMounted
                  ? "translate-y-0 md:scale-100 opacity-100"
                  : "translate-y-full md:translate-y-6 md:scale-95 opacity-0"
              }
            `}
          >
            <div className="flex items-center justify-between gap-4 px-6 md:px-8 py-5 border-b border-white/10 dark:border-white/5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl flex-shrink-0">
              <div className="min-w-0">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white truncate bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {selectedProject.title}
                </h2>
              </div>
              <button
                onClick={handleCloseDetails}
                className="p-2.5 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-all duration-300 hover:scale-110 text-gray-700 dark:text-white flex-shrink-0"
                aria-label="Close details"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col md:flex-row flex-1 min-h-0">
              <div className="relative w-full md:w-1/2 h-64 md:h-full flex-shrink-0 bg-gray-100 dark:bg-black/40">
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
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-all duration-300 hover:scale-110 border border-white/10"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-all duration-300 hover:scale-110 border border-white/10"
                      aria-label="Next image"
                    >
                      <ChevronRight size={20} />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedProject.images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setSlideIndex(i)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            i === slideIndex
                              ? "w-6 bg-white"
                              : "w-2 bg-white/40"
                          }`}
                          aria-label={`Go to image ${i + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="w-full md:w-1/2 flex-1 min-h-0 overflow-y-auto">
                <div className="p-6 md:p-8 flex flex-col gap-6">
                  {selectedProject.details?.technical && (
                    <p className="text-gray-700 dark:text-white/80 text-sm leading-relaxed">
                      {selectedProject.details.technical}
                    </p>
                  )}

                  {selectedProject.tech.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 dark:text-white/70 uppercase tracking-wider mb-3">
                        {labels.techStack}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-3.5 py-1.5 rounded-xl bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/20 text-gray-800 dark:text-white/90 text-xs font-mono shadow-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedProject.details?.colors && (
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 dark:text-white/70 uppercase tracking-wider mb-3">
                        {labels.colorPalette}
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {selectedProject.details.colors.map((c) => (
                          <div
                            key={c.hex}
                            className="flex items-center gap-2 pr-3 pl-1.5 py-1.5 rounded-xl bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-sm"
                          >
                            <span
                              className="w-6 h-6 rounded-full border border-gray-200 dark:border-white/20 flex-shrink-0"
                              style={{ backgroundColor: c.hex }}
                            />
                            <div className="leading-tight text-left">
                              <div className="text-gray-900 dark:text-white/90 text-xs font-medium">
                                {c.name}
                              </div>
                              <div className="text-gray-500 dark:text-white/50 text-[11px] font-mono uppercase">
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
                      <h4 className="text-xs font-semibold text-gray-500 dark:text-white/70 uppercase tracking-wider mb-2">
                        {labels.typography}
                      </h4>
                      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 w-fit shadow-sm">
                        <TypeIcon size={14} className="text-gray-500 dark:text-white/60" />
                        <span className="text-gray-800 dark:text-white/80 text-xs">
                          {selectedProject.details.font}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 px-6 py-4 border-t border-white/10 dark:border-white/5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl flex-shrink-0">
              <button
                onClick={() => window.open("#", "_blank")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-gray-900 text-sm font-semibold shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <ExternalLink size={16} />
                {labels.liveDemo}
              </button>

              <button
                onClick={() => window.open("#", "_blank")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/20 text-gray-800 dark:text-white text-sm font-semibold hover:bg-gray-200 dark:hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <SquareCode size={16} />
                {labels.sourceCode}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(Projects);
