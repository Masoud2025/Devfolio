// components/Experience.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { words, type ExperienceItem } from "@/lib/words";
import Image from "next/image";

export default function Experience() {
  const { lang } = useLang();
  const [openId, setOpenId] = useState<string | null>(null);
  const isRTL = lang === "fa";

  const data = lang === "fa" ? words.fa.experience : words.en.experience;

  const toggleOpen = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  // Check if logo is an emoji or image path
  const isEmoji = (logo: string) => {
    return /^[\u{1F000}-\u{1FFFF}]|[\u2700-\u27BF]|[\u2600-\u26FF]|[\u{1F300}-\u{1F5FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F700}-\u{1F77F}]|[\u{1F780}-\u{1F7FF}]|[\u{1F800}-\u{1F8FF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FA6F}]|[\u{1FA70}-\u{1FAFF}]|[\u2300-\u23FF]|[\u2B00-\u2BFF}]/u.test(logo);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto px-3 md:px-6 py-4 md:py-8"
    >
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-lg md:text-xl font-bold mb-4 "
      >
        {data.title}
      </motion.h2>

      <div className="space-y-2">
        {data.items.map((exp: ExperienceItem, index: number) => {
          const isOpen = openId === exp.id;
          const isLogoEmoji = isEmoji(exp.logo);

          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="border-b last:border-0 overflow-hidden"
            >
              <button
                onClick={() => toggleOpen(exp.id)}
                className="w-full px-3 md:px-4 py-2 md:py-3 flex items-center justify-between text-left cursor-pointer transition-colors duration-200"
              >
                <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                  {/* Logo or Emoji */}
                  {isLogoEmoji ? (
                    <span className="text-2xl md:text-3xl flex-shrink-0">
                      {exp.logo}
                    </span>
                  ) : (
                    <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-lg overflow-hidden ">
                      <Image
                        alt={exp.company}
                        src={exp.logo}
                        fill
                        className="object-contain p-1"
                        sizes="(max-width: 768px) 40px, 48px"
                      />
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <h3 className="font-semibold text-sm md:text-base truncate ">
                        {exp.company}
                      </h3>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 truncate hidden sm:inline">
                        {exp.role}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                      <span>{exp.period}</span>
                      <span>•</span>
                      <span className="truncate">{exp.location}</span>
                    </div>
                  </div>
                </div>
                
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-1 md:ml-2 text-gray-400"
                >
                  <ChevronDownIcon className="w-4 h-4" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 md:px-4 pb-3 md:pb-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-2">
                        {exp.description}
                      </p>
                      
                      {exp.achievements && exp.achievements.length > 0 && (
                        <div>
                          <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                            {data.achievementsLabel}
                          </h4>
                          <ul className={`space-y-0.5 ${isRTL ? 'pr-3' : 'pl-3'}`}>
                            {exp.achievements.map((item: string, index: number) => (
                              <motion.li
                                key={index}
                                initial={{ opacity: 0, x: isRTL ? 5 : -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="text-sm text-gray-600 dark:text-gray-300 list-disc"
                              >
                                {item}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}