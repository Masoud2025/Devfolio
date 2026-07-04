export default function Hero() {
  return (
    <section className="flex min-h-screen items-center justify-center px-6">
      <div className="mx-auto max-w-5xl text-center">
        {/* Badge */}
        <span className="inline-flex items-center rounded-full border border-zinc-300 px-4 py-2 text-xs font-medium uppercase tracking-[0.3em] text-zinc-600">
          Available for Freelance
        </span>

        {/* Title */}
        <h1 className="mt-8 text-5xl font-black leading-tight tracking-tight text-black sm:text-6xl lg:text-8xl">
          Building
          <br />
          Modern Web
          <br />
          Experiences.
        </h1>

        {/* Description */}
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-zinc-600">
          Frontend Developer focused on creating fast, scalable and beautiful
          web applications using React, Next.js, TypeScript and Tailwind CSS.
        </p>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#projects"
            className="rounded-full bg-black px-8 py-4 font-semibold text-white transition hover:scale-105 hover:bg-zinc-900"
          >
            View Projects →
          </a>

          <a
            href="#contact"
            className="rounded-full border border-zinc-300 px-8 py-4 font-semibold text-black transition hover:border-black"
          >
            Contact Me
          </a>
        </div>

        {/* Stats */}
        <div className="mt-20 flex flex-wrap items-center justify-center gap-12 border-t border-zinc-200 pt-10">
          <div>
            <h3 className="text-3xl font-bold text-black">10+</h3>
            <p className="mt-1 text-sm text-zinc-500">Projects</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-black">4+</h3>
            <p className="mt-1 text-sm text-zinc-500">Technologies</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-black">100%</h3>
            <p className="mt-1 text-sm text-zinc-500">Responsive</p>
          </div>
        </div>
      </div>
    </section>
  );
}