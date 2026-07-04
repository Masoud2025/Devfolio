import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6">
      <div className="absolute inset-0 opacity-[0.05]">
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:28px_28px]" />
      </div>

      <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-[150px]" />

      <div className="relative z-10 max-w-3xl text-center">
        <span className="inline-flex rounded-full border border-white/15 px-5 py-2 text-xs font-medium uppercase tracking-[0.4em] text-zinc-400">
          Error 404
        </span>

        <h1 className="mt-8 text-[7rem] font-black leading-none text-white md:text-[12rem]">
          404
        </h1>

        <div className="mx-auto mt-6 h-px w-40 bg-gradient-to-r from-transparent via-white to-transparent" />

        <h2 className="mt-8 text-3xl font-bold text-white md:text-5xl">
          Lost in Space
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-zinc-400">
          The page you&apos;re looking for doesn&apos;t exist or has been moved to another
          location.
        </p>

        <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="rounded-2xl bg-white px-8 py-4 font-semibold text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            Back to Home
          </Link>

          <button
            onClick={() => history.back()}
            className="rounded-2xl border border-white/15 px-8 py-4 font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
          >
            Go Back
          </button>
        </div>

        <div className="mt-20 flex items-center justify-center gap-3">
          <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
          <div className="h-2 w-2 rounded-full bg-white/70 animate-pulse delay-150" />
          <div className="h-2 w-2 rounded-full bg-white/40 animate-pulse delay-300" />
        </div>

        <p className="mt-8 text-xs uppercase tracking-[0.5em] text-zinc-600">
          MASOUD JAFARI PORTFOLIO
        </p>
      </div>
    </main>
  );
}