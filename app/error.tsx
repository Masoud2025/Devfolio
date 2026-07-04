/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6">
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:28px_28px]" />
      </div>

      <div className="relative z-10 max-w-2xl text-center">
        <span className="inline-flex rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-[0.4em] text-zinc-400">
          Unexpected Error
        </span>

        <h1 className="mt-8 text-[7rem] font-black leading-none text-white md:text-[10rem]">
          500
        </h1>

        <div className="mx-auto mt-4 h-px w-40 bg-gradient-to-r from-transparent via-white to-transparent" />

        <h2 className="mt-8 text-3xl font-bold text-white md:text-5xl">
          Something went wrong
        </h2>

        <p className="mx-auto mt-5 max-w-lg text-zinc-400">
          An unexpected error interrupted the application. Try again or return
          to the homepage.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() => reset()}
            className="rounded-2xl bg-white px-8 py-4 font-semibold text-black transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Try Again
          </button>

          <a
            href="/"
            className="rounded-2xl border border-white/20 px-8 py-4 font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
          >
            Go Home
          </a>
        </div>

        <p className="mt-16 text-xs uppercase tracking-[0.5em] text-zinc-600">
          Masoud Jafari Portfolio
        </p>
      </div>

      <div className="pointer-events-none absolute -left-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-white/5 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-white/5 blur-[140px]" />
    </main>
  );
}
