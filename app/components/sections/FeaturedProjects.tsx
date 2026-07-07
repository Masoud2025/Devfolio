"use client";
import { useLanguage } from "../../context/LanguageContext";

export default function Projects() {
  const { t } = useLanguage();
  const projects = [
    {
      title: t.Projects.project_1_Name,
      description:t.Projects.project_1_description,
      tech: ["Next.js", "TypeScript", "Tailwind"],
    },
    {
      title: t.Projects.project_2_Name,
      description:t.Projects.project_2_description,
      tech: ["React", "Tailwind", "Framer Motion"],
    },
    {
      title: t.Projects.project_3_Name,
      description:t.Projects.project_3_description,
      tech: ["Next.js", "Prisma", "PostgreSQL"],
    },
  ];

  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-32">
      {/* Header */}
      <div className="mb-16 text-center">
        <span className="text-sm font-semibold uppercase tracking-[0.4em] text-zinc-500">
          {t.Projects.title}
        </span>

        <h2 className="mt-4 text-4xl font-black text-black md:text-6xl">
          {t.Projects.header}
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-zinc-600">
          {t.Projects.subtitle}
        </p>
      </div>

      {/* Projects */}
      <div className="grid gap-8 lg:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.title}
            className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:border-black"
          >
            {/* Image */}
            <div className="flex aspect-video items-center justify-center bg-zinc-100">
              <span className="text-zinc-400">Project Preview</span>
            </div>

            {/* Content */}
            <div className="p-7">
              <h3 className="text-2xl font-bold text-black">{project.title}</h3>

              <p className="mt-4 leading-7 text-zinc-600">
                {project.description}
              </p>

              {/* Tech */}
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-zinc-300 px-3 py-1 text-sm text-zinc-700"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="mt-8 flex gap-3">
                <button className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800">
                  {t.Projects.button1}
                </button>

                <button className="rounded-full border border-zinc-300 px-5 py-3 text-sm font-semibold transition hover:border-black">
                  {t.Projects.button2}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
