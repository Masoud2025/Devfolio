// app/page.tsx
"use client";
import DockNav from "@/components/DockNav";
import { useLang } from "@/context/LangContext";
import AboutMe from "@/components/AboutMe";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";

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
      <Skills/>
      <Projects/>
      {/* <Footer/> */}
      <Contact/>
      <DockNav toggleTheme={toggleTheme} theme={theme} />
    </main>
  );
}
