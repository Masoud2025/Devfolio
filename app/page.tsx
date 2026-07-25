// app/page.tsx
"use client";
import AboutMe from "@/components/AboutMe";
import Contact from "@/components/Contact";
import DockNav from "@/components/DockNav";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import { useLang } from "@/context/LangContext";

export default function Home() {
  const { t, theme, toggleTheme } = useLang();

  return (
    <main
      className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-950 text-white"
          : "bg-linear-to-br from-blue-50 to-purple-50 text-gray-900"
      }`}
    >
      <AboutMe />
      <Experience />
      <Education />
      <Skills />
      <Projects />
      <Contact />
      {/* <DockNav toggleTheme={toggleTheme} theme={theme} /> */}
    </main>
  );
}
