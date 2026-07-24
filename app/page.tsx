// app/page.tsx
"use client";
import DockNav from "@/components/DockNav";
import { useLang } from "@/context/LangContext";

export default function Home() {
  const { t, theme, toggleTheme } = useLang();

  return (
    <main
      className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-br from-blue-50 to-purple-50 text-gray-900"
          : "bg-gray-950 text-white"
      }`}
    >
      <div className="text-center mb-8">
        <h1
          className={`text-4xl font-bold mb-4 transition-colors duration-300 ${
            theme === "dark" ? "text-gray-800" : "text-white"
          }`}
        >
          {t("title")}
        </h1>
        <p
          className={`text-xl transition-colors duration-300 ${
            theme === "dark" ? "text-gray-600" : "text-gray-300"
          }`}
        >
          {t("subtitle")}
        </p>
      </div>
      <DockNav toggleTheme={toggleTheme} theme={theme} />
    </main>
  );
}
