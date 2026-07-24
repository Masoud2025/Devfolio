// components/Projects.tsx
"use client";
import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { words, type ProjectItem } from "@/lib/words";
import { GlobeAltIcon, CodeBracketIcon } from "@heroicons/react/24/outline";

export default function Projects() {
  const { lang } = useLang();
  const data = lang === "fa" ? words.fa.projects : words.en.projects;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto px-3 md:px-6 py-4 md:py-8"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-base md:text-lg font-bold whitespace-nowrap"
        >
          {data.title}
        </motion.h2>
        <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {data.items.map((project: ProjectItem, index: number) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300"
          >
            <div className="relative w-full aspect-video bg-gray-100 dark:bg-gray-800 overflow-hidden">
              <video
                src={project.image}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-3 md:p-4">
              <h3 className="text-sm md:text-base font-semibold mb-0.5">
                {project.title}
              </h3>

              <p className="text-xs md:text-sm mb-2 line-clamp-2">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1 mb-2">
                {project.tech.map((tech: string) => (
                  <span
                    key={tech}
                    className="text-[8px] md:text-[10px] px-1.5 py-0.5 rounded-full border border-gray-300 dark:border-gray-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs md:text-sm hover:underline transition-colors duration-200"
                >
                  <GlobeAltIcon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  {lang === "fa" ? "دمو" : "Demo"}
                </a>
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs md:text-sm hover:underline transition-colors duration-200"
                >
                  <CodeBracketIcon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  {lang === "fa" ? "سورس" : "Source"}
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}