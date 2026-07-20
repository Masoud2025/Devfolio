"use client";
import { useLanguage } from "../../context/LanguageContext";
import { useMemo, memo } from "react";

interface Skill {
  name: string;
  category: "frontend" | "backend" | "database" | "tools" | "design";
}

function Skills() {
  const { t } = useLanguage();

  const skills: Skill[] = useMemo(
    () => [
      { name: "React / Next.js", category: "frontend" },
      { name: "TypeScript", category: "frontend" },
      { name: "JavaScript", category: "frontend" },
      { name: "Tailwind CSS", category: "frontend" },
      { name: "HTML / CSS", category: "frontend" },
      { name: "Redux / Zustand", category: "frontend" },
      { name: "Node.js", category: "backend" },
      { name: "Express.js", category: "backend" },
      { name: "GraphQL", category: "backend" },
      { name: "REST APIs", category: "backend" },
      { name: "MongoDB", category: "database" },
      { name: "PostgreSQL", category: "database" },
      { name: "Prisma", category: "database" },
      { name: "Redis", category: "database" },
      { name: "Git / GitHub", category: "tools" },
      { name: "Docker", category: "tools" },
      { name: "Vercel / Netlify", category: "tools" },
      { name: "CI/CD", category: "tools" },
      { name: "UI/UX Design", category: "design" },
      { name: "Figma", category: "design" },
      { name: "Responsive Design", category: "design" },
    ],
    []
  );

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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "frontend": return "🎨";
      case "backend": return "⚙️";
      case "database": return "🗄️";
      case "tools": return "🛠️";
      case "design": return "✨";
      default: return "📌";
    }
  };

  const groupedSkills = useMemo(
    () =>
      skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
        return acc;
      }, {} as Record<string, Skill[]>),
    [skills]
  );

  const totalSkills = skills.length;
  const categories = Object.keys(groupedSkills).length;

  return (
    <section id="skills" className="w-full py-24 px-6 md:px-20 scroll-mt-28">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black">
            {t.Skills?.title || "Skills"}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground text-lg">
            {t.Skills?.subtitle || "Technologies and tools I work with"}
          </p>
          <div className="flex items-center justify-center gap-6 mt-8">
            <div className="px-6 py-3 bg-white/5 dark:bg-white/5 rounded-full border border-white/10">
              <span className="text-2xl font-bold">{totalSkills}</span>
              <span className="text-sm text-muted-foreground ml-2">{t.Skills?.totalSkills || "Total Skills"}</span>
            </div>
            <div className="px-6 py-3 bg-white/5 dark:bg-white/5 rounded-full border border-white/10">
              <span className="text-2xl font-bold">{categories}</span>
              <span className="text-sm text-muted-foreground ml-2">{t.Skills?.categories || "Categories"}</span>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(groupedSkills).map(([category, items]) => (
            <div
              key={category}
              className={`border-l-4 ${getCategoryColor(category)} pl-6 py-6 bg-white/5 dark:bg-white/5 rounded-r-2xl backdrop-blur-sm border border-white/10 dark:border-white/10 hover:border-purple-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{getCategoryIcon(category)}</span>
                <h4 className="text-lg font-bold uppercase tracking-wider">
                  {getCategoryLabel(category)}
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill.name}
                    className="
                      px-4 py-2
                      text-sm font-medium
                      border border-zinc-200 dark:border-zinc-700
                      rounded-xl
                      bg-white dark:bg-zinc-900/50
                      text-black dark:text-white
                      hover:border-zinc-400 dark:hover:border-zinc-500
                      hover:bg-zinc-50 dark:hover:bg-zinc-800
                      transition-all duration-200
                      hover:scale-105
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

export default memo(Skills);
