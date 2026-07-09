'use client'
import {
  Code2,
  Database,
  Sigma,
  GitBranch,
  Globe,
  Server,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const technologies = [
  {
    title: "Next.js",
    description: "App Router & SSR",
    icon: Globe,
  },
  {
    title: "React",
    description: "Modern UI",
    icon: Code2,
  },
  {
    title: "TypeScript",
    description: "Type Safe",
    icon: Code2,
  },
  {
    title: "Tailwind CSS",
    description: "Utility First",
    icon: Sigma,
  },
  {
    title: "Node.js",
    description: "Backend",
    icon: Server,
  },
  {
    title: "Git",
    description: "Version Control",
    icon: GitBranch,
  },
  {
    title: "PostgreSQL",
    description: "Database",
    icon: Database,
  },
  {
    title: "REST API",
    description: "Integration",
    icon: Globe,
  },
];

export default function TechStack() {
  const { t } = useLanguage();
  return (
    <section
      id="tech"
      className="mx-auto max-w-7xl px-1 py-29 md:-mt-40 md:mr-23"
    >
      <div className="text-center">
        <span className="text-sm font-semibold uppercase tracking-[0.4em] text-zinc-500">
          {t.TechStack.Header}
        </span>

        <h2 className="mt-4 text-4xl font-black text-black md:text-5xl">
          {t.TechStack.Header1}
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-zinc-600">
        {t.TechStack.Subtitle}
        </p>
      </div>

      <div className="mt-16 grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
        {technologies.map(({ title, description, icon: Icon }) => (
          <div
            key={title}
            className="group rounded-3xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:border-black"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white transition-transform duration-300 group-hover:scale-110">
              <Icon size={28} />
            </div>

            <h3 className="mt-6 text-xl font-bold text-black">
              {title}
            </h3>

            <p className="mt-2 text-sm text-zinc-500">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}