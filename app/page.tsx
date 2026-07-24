// app/page.tsx
"use client";
import DockNav from "@/components/DockNav";
import { useLang } from "@/context/LangContext";
import AboutMe from "../components/AboutMe";
import Experience from "../components/Experience";
import Education from "../components/Education";

export default function Home() {
  const { t, theme, toggleTheme } = useLang();

  return (
    <main
      className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-950 text-white"
          : "bg-gradient-to-br from-blue-50 to-purple-50 text-gray-900"
      }`}
    >
      <AboutMe />
      <Experience />
      <Education/>
      <DockNav toggleTheme={toggleTheme} theme={theme} />
    </main>
  );
}
