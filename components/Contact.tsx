// components/Contact.tsx
"use client";
import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { words } from "@/lib/words";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

export default function Contact() {
  const { lang } = useLang();
  const data = lang === "fa" ? words.fa.contact : words.en.contact;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto px-3 md:px-6 py-8 md:py-12"
    >
      {/* Title with lines */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl font-bold whitespace-nowrap"
        >
          {data.title}
        </motion.h2>
        <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
      </div>

      <div className="flex flex-col items-center gap-6">
        <p className="text-sm md:text-base text-center leading-relaxed max-w-md">
          {data.description}
        </p>

        <motion.a
          href={`https://t.me/${data.telegramId}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
        >
          <PaperAirplaneIcon className="w-5 h-5" />
          <span className="text-sm font-medium">
            {lang === "fa" ? "تلگرام" : "Telegram"} @{data.telegramId}
          </span>
        </motion.a>
      </div>
    </motion.div>
  );
}