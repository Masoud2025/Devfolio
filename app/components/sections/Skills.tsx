"use client";
import { useLanguage } from "../../context/LanguageContext";

interface Skill {
  name: string;
  category: "frontend" | "backend" | "database" | "tools" | "design";
}

export default function Skills() {
  const { t } = useLanguage();

  const skills: Skill[] = [
    // Frontend
    { name: "React / Next.js", category: "frontend" },
    { name: "TypeScript", category: "frontend" },
    { name: "JavaScript", category: "frontend" },
    { name: "Tailwind CSS", category: "frontend" },
    { name: "HTML / CSS", category: "frontend" },
    // Backend
    { name: "Node.js", category: "backend" },
    { name: "Express.js", category: "backend" },
    // Database
    { name: "MongoDB", category: "database" },
    { name: "PostgreSQL", category: "database" },
    { name: "Prisma", category: "database" },
    // Tools
    { name: "Git / GitHub", category: "tools" },
    { name: "Docker", category: "tools" },
    { name: "Vercel / Netlify", category: "tools" },
    // Design
    { name: "UI/UX Design", category: "design" },
    { name: "Figma", category: "design" },
  ];

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "frontend": return t.Skills?.frontend || "Frontend";
      case "backend": return t.Skills?.backend || "Backend";
      case "database": return t.Skills?.database || "Database";
      case "tools": return t.Skills?.tools || "Tools";
      case "design": return t.Skills?.design || "Design";
      default: return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "frontend": return "border-l-blue-500";
      case "backend": return "border-l-green-500";
      case "database": return "border-l-yellow-500";
      case "tools": return "border-l-purple-500";
      case "design": return "border-l-pink-500";
      default: return "border-l-zinc-500";
    }
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <section id="skills" className="w-full py-8 px-4 scroll-mt-28">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h2 className="text-xl md:text-2xl font-bold text-center text-black dark:text-white mb-6">
          {t.Skills?.title || "Skills"}
        </h2>

        {/* Skills Grid - دسته‌بندی شده */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(groupedSkills).map(([category, items]) => (
            <div
              key={category}
              className={`border-l-4 ${getCategoryColor(category)} pl-3`}
            >
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                {getCategoryLabel(category)}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {items.map((skill) => (
                  <span
                    key={skill.name}
                    className="
                      px-2.5 py-1
                      text-xs
                      border border-zinc-200 dark:border-zinc-700
                      rounded-full
                      bg-white dark:bg-zinc-900/50
                      text-black dark:text-white
                      hover:border-zinc-400 dark:hover:border-zinc-500
                      hover:bg-zinc-50 dark:hover:bg-zinc-800
                      transition-all duration-200
                    "
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}