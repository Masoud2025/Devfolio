"use client";
import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

// Type definitions
interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  category: string;
}

interface Category {
  id: string;
  label: string;
}

export default function Projects() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("all");
  
  // Project data with proper typing and fallback values
  const projects: Project[] = [
    {
      id: 1,
      title: t.Projects?.project_1_Name || "E-Commerce Platform",
      description: t.Projects?.project_1_description || "Full-featured online store",
      tech: ["Next.js", "TypeScript", "Tailwind"],
      category: "web",
    },
    {
      id: 2,
      title: t.Projects?.project_2_Name || "Portfolio Website",
      description: t.Projects?.project_2_description || "Personal portfolio with animations",
      tech: ["React", "Tailwind", "Framer Motion"],
      category: "web",
    },
    {
      id: 3,
      title: t.Projects?.project_3_Name || "Task Manager API",
      description: t.Projects?.project_3_description || "RESTful API for task management",
      tech: ["Next.js", "Prisma", "PostgreSQL"],
      category: "backend",
    },
  ];

  // Category definitions with fallback values
  const categories: Category[] = [
    { id: "all", label: t.Projects?.all || "All" },
    { id: "web", label: t.Projects?.web || "Web" },
    { id: "backend", label: t.Projects?.backend || "Backend" },
    { id: "mobile", label: t.Projects?.mobile || "Mobile" },
  ];

  // Filter projects based on active tab
  const filteredProjects: Project[] = activeTab === "all" 
    ? projects 
    : projects.filter((p: Project) => p.category === activeTab);

  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-32">
      {/* Header Section */}
      <div className="mb-16 text-center">
        <span className="text-sm font-semibold uppercase tracking-[0.4em] text-zinc-500">
          {t.Projects?.title || "My Projects"}
        </span>

        <h2 className="mt-4 text-4xl font-black text-black md:text-6xl">
          {/* {t.Projects.header} */}
        </h2>

        <p className="mx-auto mt-6 max-w-2xl ">
          {t.Projects?.subtitle || "Here are some of my recent projects"}
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
        {categories.map((category: Category) => (
          <button
            key={category.id}
            onClick={() => setActiveTab(category.id)}
            className={`
              rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300
              ${
                activeTab === category.id
                  ? " text-white shadow-lg scale-105 border border-zinc-200 "
                  : "  hover:border-zinc-400 hover:text-black"
              }
            `}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {filteredProjects.map((project: Project) => (
          <article
            key={project.id}
            className="group overflow-hidden rounded-3xl border border-zinc-200  transition-all duration-300 hover:-translate-y-2 hover:border-black"
          >
            {/* Project Image Placeholder */}
            <div className="flex aspect-video items-center justify-center bg-zinc-100">
              <span className="text-zinc-400">Project Preview</span>
            </div>

            {/* Project Content */}
            <div className="p-7">
              <h3 className="text-2xl font-bold text-black">{project.title}</h3>

              <p className="mt-4 leading-7 ">
                {project.description}
              </p>

              {/* Technology Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((item: string) => (
                  <span
                    key={item}
                    className="rounded-full border border-zinc-300 px-3 py-1 text-sm "
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex gap-3">
                <button className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 border">
                  {t.Projects?.button1 || "Live Demo"}
                </button>

                <button className="rounded-full border border-zinc-300 px-5 py-3 text-sm font-semibold transition hover:border-black">
                  {t.Projects?.button2 || "View Code"}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Empty State Message */}
      {filteredProjects.length === 0 && (
        <div className="mt-20 text-center">
          <p className="text-zinc-500">
            {t.Projects?.noProjects || "No projects found in this category"}
          </p>
        </div>
      )}
    </section>
  );
}