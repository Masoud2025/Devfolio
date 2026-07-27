// components/Projects.tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { words, type ProjectItem } from "@/lib/words";
import { GlobeAltIcon, CodeBracketIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Projects() {
  const { lang } = useLang();
  const data = lang === "fa" ? words.fa.projects : words.en.projects;
  const isRTL = lang === "fa";

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalItems = data.items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get current page items
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.items.slice(startIndex, endIndex);

  // Navigation functions
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

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
        {currentItems.map((project: ProjectItem, index: number) => (
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

      {/* Pagination - Only show if more than 1 page */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {/* Previous button */}
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 dark:border-gray-600 transition-colors duration-200 disabled:opacity-30 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isRTL ? (
              <ChevronRightIcon className="w-4 h-4" />
            ) : (
              <ChevronLeftIcon className="w-4 h-4" />
            )}
          </button>

          {/* Page numbers */}
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-8 h-8 flex items-center justify-center rounded border transition-colors duration-200 ${
                  currentPage === page
                    ? 'border-gray-900 dark:border-gray-100 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                    : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 dark:border-gray-600 transition-colors duration-200 disabled:opacity-30 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isRTL ? (
              <ChevronLeftIcon className="w-4 h-4" />
            ) : (
              <ChevronRightIcon className="w-4 h-4" />
            )}
          </button>
        </div>
      )}
    </motion.div>
  );
}