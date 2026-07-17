"use client";
import { useState, useRef, useEffect, useMemo, useCallback, memo } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { ExternalLink, Code2, Sparkles, ArrowRight, X, SquareCode, Eye, Info } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useInView } from "react-intersection-observer";
import demo1 from "@/public/pic/demo1.webp";
import demo2 from "@/public/pic/demo2.webp";
import demo3 from "@/public/pic/demo3.webp";

// Type definitions
interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  category: string;
  image?: StaticImageData;
  link?: string;
  github?: string;
  details?: {
    features?: string[];
  };
}

interface Category {
  id: string;
  label: string;
}

function Projects() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // استفاده از IntersectionObserver برای تشخیص ورود به ویوپورت
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { ref: gridRef, inView: gridInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects: Project[] = [
    {
      id: 1,
      title: t.Projects?.project_1_Name || "E-Commerce Platform",
      description: t.Projects?.project_1_description || "Full-featured online store with payment integration and admin dashboard",
      tech: ["Next.js", "TypeScript", "Tailwind", "Prisma"],
      category: "web",
      image: demo1,
      link: "https://example.com",
      github: "https://github.com",
      details: {
        features: ["Payment Gateway", "Admin Panel", "Product Management", "Order Tracking"]
      }
    },
    {
      id: 2,
      title: t.Projects?.project_2_Name || "Portfolio Website",
      description: t.Projects?.project_2_description || "Modern portfolio with smooth animations and responsive design",
      tech: ["React", "Tailwind", "Framer Motion"],
      category: "web",
      image: demo2,
      link: "https://example.com",
      github: "https://github.com",
      details: {
        features: ["Dark/Light Mode", "Animation", "SEO Optimized"]
      }
    },
    {
      id: 3,
      title: t.Projects?.project_3_Name || "Task Manager API",
      description: t.Projects?.project_3_description || "RESTful API for task management with authentication",
      tech: ["Next.js", "Prisma", "PostgreSQL", "JWT"],
      category: "backend",
      image: demo3,
      link: "https://example.com",
      github: "https://github.com",
      details: {
        features: ["JWT Auth", "CRUD Operations", "WebSocket", "Redis Cache"]
      }
    },
    {
      id: 4,
      title: "Mobile App UI Kit",
      description: "Beautiful mobile components with dark mode support",
      tech: ["React Native", "TypeScript", "Tailwind"],
      category: "mobile",
      image: demo1,
      link: "https://example.com",
      github: "https://github.com",
      details: {
        features: ["Components Library", "Theme System", "Form Builder"]
      }
    },
    {
      id: 5,
      title: "Real-time Chat App",
      description: "Real-time messaging with WebSocket and Redis",
      tech: ["Next.js", "Socket.io", "Redis", "Tailwind"],
      category: "web",
      image: demo2,
      link: "https://example.com",
      github: "https://github.com",
      details: {
        features: ["Real-time Chat", "Typing Indicator", "Read Receipts", "File Sharing"]
      }
    },
    {
      id: 6,
      title: "Analytics Dashboard",
      description: "Interactive dashboard with charts and data visualization",
      tech: ["React", "D3.js", "Tailwind", "Recharts"],
      category: "web",
      image: demo3,
      link: "https://example.com",
      github: "https://github.com",
      details: {
        features: ["Interactive Charts", "Data Export", "Filter System", "Real-time Updates"]
      }
    },
  ];

  const categories: Category[] = [
    { id: "all", label: t.Projects?.all || "All" },
    { id: "web", label: t.Projects?.web || "Web" },
    { id: "backend", label: t.Projects?.backend || "Backend" },
    { id: "mobile", label: t.Projects?.mobile || "Mobile" },
  ];

  const filteredProjects: Project[] = useMemo(
    () =>
      activeTab === "all"
        ? projects
        : projects.filter((p: Project) => p.category === activeTab),
    [activeTab]
  );

  const handleOpenDetails = useCallback((project: Project) => {
    setSelectedProject(project);
    setIsDetailOpen(true);
  }, []);

  const handleCloseDetails = useCallback(() => {
    setIsDetailOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  }, []);

  useEffect(() => {
    if (isDetailOpen) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [isDetailOpen]);

  return (
    <>
      <section
        id="projects"
        ref={sectionRef}
        className="mx-auto max-w-7xl px-6 py-32 scroll-mt-28 relative overflow-hidden"
      >
        {/* Background decorations - بدون انیمیشن */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        {/* Header Section */}
        <div
          ref={headerRef}
          className={`mb-16 text-center transition-all duration-700 ${
            headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.4em] text-zinc-500">
            <Sparkles size={14} className="text-purple-400" />
            {t.Projects?.title || "My Projects"}
            <Sparkles size={14} className="text-blue-400" />
          </span>

          <h2 className="mt-4 text-4xl font-black md:text-6xl bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            {t.Projects?.header || "Featured Work"}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            {t.Projects?.subtitle || "Here are some of my recent projects that showcase my skills and experience"}
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
          {categories.map((category: Category) => {
            const isActive = activeTab === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`
                  relative rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300
                  hover:scale-105 active:scale-95
                  ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25"
                      : "bg-background/50 backdrop-blur-sm border border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                  }
                `}
              >
                {category.label}
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 -z-10" />
                )}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div
          ref={gridRef}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 transition-all duration-700"
        >
          {filteredProjects.map((project: Project, index: number) => (
            <div
              key={project.id}
              className={`
                group relative overflow-hidden rounded-3xl border border-border bg-background/50 backdrop-blur-sm
                transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 flex flex-col
                ${gridInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              `}
              style={{
                transitionDelay: gridInView ? `${index * 80}ms` : '0ms',
              }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Gradient overlay - pointer-events-none */}
              <div
                className={`absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 transition-opacity duration-300 pointer-events-none ${
                  hoveredId === project.id ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Project Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-950 dark:to-blue-950 cursor-pointer flex-shrink-0">
                <div className="relative w-full h-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 w-full transition-all duration-[3000ms] ease-in-out"
                    style={{
                      height: '500%',
                      willChange: 'transform',
                      transform: `translateY(${hoveredId === project.id ? '-80%' : '0%'})`,
                    }}
                  >
                    {project.image ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={project.id <= 3}
                          loading={project.id <= 3 ? undefined : "lazy"}
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-200 to-blue-200 dark:from-purple-800 dark:to-blue-800 flex items-center justify-center">
                        <Code2 size={48} className="text-zinc-400 dark:text-zinc-600 opacity-50" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-mono z-20">
                  #{String(project.id).padStart(2, '0')}
                </div>
                <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-medium z-20">
                  {categories.find(c => c.id === project.category)?.label || project.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1 relative z-10">
                <h3 className="text-lg font-bold text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                  {project.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 4).map((item: string) => (
                    <span
                      key={item}
                      className="rounded-full border border-border px-2.5 py-0.5 text-xs font-mono text-muted-foreground bg-background/50"
                    >
                      {item}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="rounded-full px-2.5 py-0.5 text-xs font-mono text-muted-foreground">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex items-center gap-2 relative z-30">
                  <button
                    onClick={() => window.open(project.link || '#', '_blank')}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Eye size={14} />
                    Preview
                  </button>

                  <button
                    onClick={() => handleOpenDetails(project)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-full border border-border text-foreground text-xs font-semibold hover:bg-accent transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Info size={14} />
                    Details
                  </button>

                  <button
                    onClick={() => window.open(project.github || '#', '_blank')}
                    className="flex items-center justify-center p-2 rounded-full border border-border text-foreground hover:bg-accent transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                    aria-label="GitHub"
                  >
                    <SquareCode size={16} />
                  </button>
                </div>
              </div>

              {/* Decorative corner glow */}
              <div
                className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-2xl pointer-events-none transition-opacity duration-400 ${
                  hoveredId === project.id ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="mt-20 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent mb-6">
              <Sparkles size={32} className="text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              {t.Projects?.noProjects || "No projects found in this category"}
            </p>
          </div>
        )}

        {/* View All Link */}
        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 group hover:translate-x-1"
          >
            Have a project in mind? Let&apos;s talk
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </section>

      {/* Project Details Modal - با CSS Transition */}
      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-300 ${
          isDetailOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
          onClick={handleCloseDetails}
        />

        {/* Modal Content */}
        <div
          className={`relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-purple-900/95 via-blue-900/95 to-black/95 rounded-2xl overflow-hidden mx-4 transition-all duration-300 ${
            isDetailOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
          }`}
        >
          <button
            onClick={handleCloseDetails}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-110 text-white"
            aria-label="Close details"
          >
            <X size={24} />
          </button>

          <div className="overflow-y-auto max-h-[90vh] p-6 md:p-8 pt-12">
            {selectedProject && (
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  {selectedProject.title}
                </h2>

                <p className="text-white/80 text-base md:text-lg mb-6">
                  {selectedProject.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedProject.details?.features && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-3">Key Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.details.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white/80 text-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => window.open(selectedProject.link || '#', '_blank')}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <ExternalLink size={18} />
                    View Live Demo
                  </button>

                  <button
                    onClick={() => window.open(selectedProject.github || '#', '_blank')}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <SquareCode size={18} />
                    View Source Code
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(Projects);