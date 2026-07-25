// components/Skills.tsx
"use client";
import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { words, type SkillItem } from "@/lib/words";

export default function Skills() {
  const { lang } = useLang();
  const data = lang === "fa" ? words.fa.skills : words.en.skills;

  // مهارت‌های نرم (Soft Skills)
  const softSkills = lang === "fa" 
    ? [
        { name: "یادگیری مداوم", icon: "📚" },
        { name: "تمرکز بالا", icon: "🎯" },
        { name: "حل مسئله", icon: "🧩" },
        { name: "تفکر تحلیلی", icon: "🔍" },
        { name: "مدیریت زمان", icon: "⏰" },
        { name: "کار تیمی", icon: "🤝" },
      ]
    : [
        { name: "Continuous Learning", icon: "📚" },
        { name: "High Focus", icon: "🎯" },
        { name: "Problem Solving", icon: "🧩" },
        { name: "Analytical Thinking", icon: "🔍" },
        { name: "Time Management", icon: "⏰" },
        { name: "Teamwork", icon: "🤝" },
      ];

  // ابزارها و تکنولوژی‌ها (Tools & Technologies)
  const tools = data.items || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto px-3 md:px-6 py-2 md:py-4 space-y-4"
    >
      {/* بخش مهارت‌های نرم */}
      <div>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm md:text-base font-bold mb-2"
        >
          {lang === "fa" ? "مهارت‌های نرم" : "Soft Skills"}
        </motion.h3>

        <div className="flex flex-wrap gap-1">
          {softSkills.map((skill, index) => (
            <motion.span
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 0.05 + index * 0.02,
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.15 }
              }}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-gray-300 dark:border-gray-600 text-xs md:text-sm"
            >
              <span className="text-xs md:text-sm">{skill.icon}</span>
              <span className="text-[10px] md:text-xs font-medium">
                {skill.name}
              </span>
            </motion.span>
          ))}
        </div>
      </div>

      {/* بخش ابزارها و تکنولوژی‌ها */}
      <div>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm md:text-base font-bold mb-2"
        >
          {data.title || (lang === "fa" ? "ابزارها و تکنولوژی‌ها" : "Tools & Technologies")}
        </motion.h3>

        <div className="flex flex-wrap gap-1">
          {tools.map((skill: SkillItem, index: number) => (
            <motion.span
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 0.1 + index * 0.02,
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.15 }
              }}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-gray-300 dark:border-gray-600 text-xs md:text-sm"
            >
              <span className="text-xs md:text-sm">{skill.icon}</span>
              <span className="text-[10px] md:text-xs font-medium">
                {skill.name}
              </span>
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}