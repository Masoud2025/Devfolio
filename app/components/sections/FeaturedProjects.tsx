export default function Projects() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A modern online shopping platform built with Next.js and TypeScript.",
      tech: ["Next.js", "TypeScript", "Tailwind"],
    },
    {
      title: "Portfolio Website",
      description:
        "Personal portfolio focused on performance, responsive design and clean UI.",
      tech: ["React", "Tailwind", "Framer Motion"],
    },
    {
      title: "Task Manager",
      description:
        "Manage tasks efficiently with authentication and real-time updates.",
      tech: ["Next.js", "Prisma", "PostgreSQL"],
    },
  ];

  return (
    <section
      id="projects"
      className="mx-auto max-w-7xl px-6 py-32"
    >
      {/* Header */}
      <div className="mb-16 text-center">
        <span className="text-sm font-semibold uppercase tracking-[0.4em] text-zinc-500">
          Featured Projects
        </span>

        <h2 className="mt-4 text-4xl font-black text-black md:text-6xl">
          Selected Work
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-zinc-600">
          A collection of projects focused on performance,
          scalability and modern user experience.
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
              <h3 className="text-2xl font-bold text-black">
                {project.title}
              </h3>

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
                  Live Demo
                </button>

                <button className="rounded-full border border-zinc-300 px-5 py-3 text-sm font-semibold transition hover:border-black">
                  GitHub
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}