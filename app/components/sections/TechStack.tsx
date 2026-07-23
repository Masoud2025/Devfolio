'use client'
import { useInView } from "react-intersection-observer";
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
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  return (
      <section
        id="tech"
        ref={ref}
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:-mt-32 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
      <div className="text-center">
        <span className="text-sm font-semibold uppercase tracking-[0.4em] text-zinc-500 dark:text-zinc-400">
          {t.TechStack.Header}
        </span>

        <h2 className="mt-4 text-4xl font-black text-zinc-900 dark:text-white md:text-5xl">
          {t.TechStack.Header1}
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-zinc-600 dark:text-zinc-400">
        {t.TechStack.Subtitle}
        </p>
      </div>

      <div className="mt-16 grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
        {technologies.map(({ title, description, icon: Icon }) => (
          <div
            key={title}
            className="group rounded-3xl border border-zinc-200 bg-background p-6 transition-all duration-300 hover:-translate-y-2 hover:border-black dark:border-zinc-800 dark:hover:border-white dark:text-white"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-background text-foreground transition-transform duration-300 group-hover:scale-110">
              <Icon size={28} />
            </div>

            <h3 className="mt-6 text-xl font-bold text-black dark:text-white">
              {title}
            </h3>

            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}