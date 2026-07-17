"use client";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Code2, Sparkles, ArrowRight, X, SquareCode, Eye, Info } from "lucide-react";
import Image, { StaticImageData } from "next/image";
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
    colorPalette?: string;
    architecture?: string;
    fonts?: string;
    headerSize?: string;
    typography?: string;
    animations?: string;
    performance?: string;
    responsive?: string;
    features?: string[];
  };
}

interface Category {
  id: string;
  label: string;
}

export default function Projects() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const projects: Project[] = [
    {
      id: 1,
      title: t.Projects?.project_1_Name || "E-Commerce Platform",
      description: t.Projects?.project_1_description || "Full-featured online store with payment integration and admin dashboard",
      tech: ["Next.js", "TypeScript", "Tailwind", "Prisma"],
      category: "web",
      image: demo1,
      link: "#",
      github: "#",
      details: {
        colorPalette: "Purple & Blue gradient with dark mode",
        architecture: "Microservices with API Gateway",
        fonts: "Inter, DM Sans",
        headerSize: "H1: 48px, H2: 36px",
        typography: "Sans-serif with 1.6 line-height",
        animations: "Framer Motion, Lottie",
        performance: "98/100 Lighthouse score",
        responsive: "Fully responsive (Mobile-first)",
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
      link: "#",
      github: "#",
      details: {
        colorPalette: "Minimalist with accent gradients",
        architecture: "Component-based with Context API",
        fonts: "Plus Jakarta Sans, Inter",
        headerSize: "H1: 64px, H2: 48px",
        typography: "1.5 line-height, 24px body",
        animations: "Scroll-triggered, Parallax",
        performance: "95/100 Lighthouse score",
        responsive: "Mobile-first approach",
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
      link: "#",
      github: "#",
      details: {
        colorPalette: "N/A (Backend API)",
        architecture: "RESTful API with Middleware",
        fonts: "N/A",
        headerSize: "N/A",
        typography: "N/A",
        animations: "N/A",
        performance: "500+ requests/second",
        responsive: "N/A",
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
      link: "#",
      github: "#",
      details: {
        colorPalette: "Modern with dark/light themes",
        architecture: "Atomic Design Pattern",
        fonts: "SF Pro, Inter",
        headerSize: "H1: 32px, Body: 16px",
        typography: "Mobile-optimized",
        animations: "React Native Reanimated",
        performance: "60 FPS smooth",
        responsive: "iOS & Android",
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
      link: "#",
      github: "#",
      details: {
        colorPalette: "Clean with accent colors",
        architecture: "Event-driven with Socket.io",
        fonts: "Inter, Space Grotesk",
        headerSize: "H1: 40px, H2: 32px",
        typography: "1.6 line-height",
        animations: "CSS Transitions",
        performance: "Real-time with <100ms latency",
        responsive: "Full responsive",
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
      link: "#",
      github: "#",
      details: {
        colorPalette: "Data-centric with gradients",
        architecture: "Component-based with HOCs",
        fonts: "Inter, Roboto Mono",
        headerSize: "H1: 36px, H2: 28px",
        typography: "Consistent with data visualization",
        animations: "D3 transitions",
        performance: "Optimized for big data",
        responsive: "Responsive charts",
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

  const filteredProjects: Project[] = activeTab === "all" 
    ? projects 
    : projects.filter((p: Project) => p.category === activeTab);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const tabVariants = {
    inactive: { scale: 1 },
    active: { 
      scale: 1.05,
      transition: { type: "spring" as const, stiffness: 300, damping: 20 },
    },
  };

  const modalVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring" as const, damping: 25, stiffness: 300 },
    },
    exit: { scale: 0.9, opacity: 0 },
  };

  const handleOpenDetails = (project: Project) => {
    setSelectedProject(project);
    setIsDetailOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

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
      <motion.section 
        id="projects" 
        ref={sectionRef}
        className="mx-auto max-w-7xl px-6 py-32 scroll-mt-28 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <motion.div 
          className="mb-16 text-center"
          variants={containerVariants}
        >
          <motion.span 
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.4em] text-zinc-500"
            variants={itemVariants}
          >
            <Sparkles size={14} className="text-purple-400" />
            {t.Projects?.title || "My Projects"}
            <Sparkles size={14} className="text-blue-400" />
          </motion.span>

          <motion.h2 
            className="mt-4 text-4xl font-black md:text-6xl bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            {t.Projects?.header || "Featured Work"}
          </motion.h2>

          <motion.p 
            className="mx-auto mt-6 max-w-2xl text-muted-foreground"
            variants={itemVariants}
          >
            {t.Projects?.subtitle || "Here are some of my recent projects that showcase my skills and experience"}
          </motion.p>
        </motion.div>

        <motion.div 
          className="mb-12 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {categories.map((category: Category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              variants={tabVariants}
              animate={activeTab === category.id ? "active" : "inactive"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                relative rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300
                ${
                  activeTab === category.id
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25"
                    : "bg-background/50 backdrop-blur-sm border border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }
              `}
            >
              {category.label}
              {activeTab === category.id && (
                <motion.span
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 -z-10"
                  layoutId="activeTab"
                  transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 20 }}
          >
            {filteredProjects.map((project: Project) => (
              <motion.article
                key={project.id}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-3xl border border-border bg-background/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 flex flex-col"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  initial={false}
                  animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                />

                {/* Project Image - FULL SCROLL TO BOTTOM */}
                <div 
                  className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-950 dark:to-blue-950 cursor-pointer flex-shrink-0"
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="relative w-full h-full overflow-hidden">
                    {/* Image with 500% height and 80% translate for full scroll */}
                    <div 
                      className="absolute top-0 left-0 w-full transition-all duration-[3000ms] ease-in-out"
                      style={{ 
                        height: '500%',
                        transform: `translateY(${hoveredId === project.id ? '-80%' : '0%'})` 
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
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-200 to-blue-200 dark:from-purple-800 dark:to-blue-800 flex items-center justify-center">
                          <Code2 size={48} className="text-zinc-400 dark:text-zinc-600 opacity-50" />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-mono z-20">
                    #{String(project.id).padStart(2, '0')}
                  </div>

                  <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-medium z-20">
                    {categories.find(c => c.id === project.category)?.label || project.category}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <motion.h3 className="text-lg font-bold text-foreground">
                    {project.title}
                  </motion.h3>

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

                  <div className="mt-4 flex items-center gap-2">
                    <motion.a
                      href={project.link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Eye size={14} />
                      {t.Projects?.button1 || "Preview"}
                    </motion.a>
                    
                    <motion.button
                      onClick={() => handleOpenDetails(project)}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-full border border-border text-foreground text-xs font-semibold hover:bg-accent transition-all duration-300"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Info size={14} />
                      Details
                    </motion.button>

                    <motion.a
                      href={project.github || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-2 rounded-full border border-border text-foreground hover:bg-accent transition-all duration-300"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="GitHub"
                    >
                      <SquareCode size={16} />
                    </motion.a>
                  </div>
                </div>

                <motion.div
                  className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {filteredProjects.length === 0 && (
            <motion.div 
              className="mt-20 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent mb-6">
                <Sparkles size={32} className="text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                {t.Projects?.noProjects || "No projects found in this category"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 group"
            whileHover={{ x: 6 }}
          >
            Have a project in mind? Let&apos;s talk
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </motion.section>

      <AnimatePresence>
        {isDetailOpen && selectedProject && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseDetails}
            />

            <motion.div
              className="relative w-full h-full max-w-full bg-gradient-to-br from-purple-900/95 via-blue-900/95 to-black/95 overflow-y-auto"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <button
                onClick={handleCloseDetails}
                className="fixed top-6 right-6 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-110 text-white"
                aria-label="Close details"
              >
                <X size={28} />
              </button>

              <div className="max-w-6xl mx-auto p-8 md:p-12 pt-24">
                <motion.h2 
                  className="text-4xl md:text-6xl font-bold text-white mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {selectedProject.title}
                </motion.h2>

                <motion.p 
                  className="text-white/80 text-xl mb-10 max-w-3xl"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {selectedProject.description}
                </motion.p>

                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {selectedProject.details?.colorPalette && (
                    <div className="space-y-2 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                      <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wider">Color Palette</h4>
                      <p className="text-white/90">{selectedProject.details.colorPalette}</p>
                    </div>
                  )}
                  
                  {selectedProject.details?.architecture && (
                    <div className="space-y-2 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                      <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wider">Architecture</h4>
                      <p className="text-white/90">{selectedProject.details.architecture}</p>
                    </div>
                  )}
                  
                  {selectedProject.details?.fonts && (
                    <div className="space-y-2 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                      <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wider">Fonts</h4>
                      <p className="text-white/90">{selectedProject.details.fonts}</p>
                    </div>
                  )}
                  
                  {selectedProject.details?.headerSize && (
                    <div className="space-y-2 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                      <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wider">Header Sizes</h4>
                      <p className="text-white/90">{selectedProject.details.headerSize}</p>
                    </div>
                  )}
                  
                  {selectedProject.details?.typography && (
                    <div className="space-y-2 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                      <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wider">Typography</h4>
                      <p className="text-white/90">{selectedProject.details.typography}</p>
                    </div>
                  )}
                  
                  {selectedProject.details?.animations && (
                    <div className="space-y-2 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                      <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wider">Animations</h4>
                      <p className="text-white/90">{selectedProject.details.animations}</p>
                    </div>
                  )}
                  
                  {selectedProject.details?.performance && (
                    <div className="space-y-2 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                      <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wider">Performance</h4>
                      <p className="text-white/90">{selectedProject.details.performance}</p>
                    </div>
                  )}
                  
                  {selectedProject.details?.responsive && (
                    <div className="space-y-2 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                      <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wider">Responsive</h4>
                      <p className="text-white/90">{selectedProject.details.responsive}</p>
                    </div>
                  )}
                </motion.div>

                {selectedProject.details?.features && (
                  <motion.div 
                    className="mb-10"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-4">Key Features</h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.details.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}

                <motion.div 
                  className="mb-10"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-4">Tech Stack</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>

                <motion.div 
                  className="flex flex-wrap gap-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <motion.a
                    href={selectedProject.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={20} />
                    View Live Demo
                  </motion.a>
                  
                  <motion.a
                    href={selectedProject.github || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SquareCode size={20} />
                    View Source Code
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}