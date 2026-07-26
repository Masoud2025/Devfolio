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
          className="text-lg md:text-xl font-bold whitespace-nowrap "
        >
          {data.title}
        </motion.h2>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <p className="text-sm md:text-base text-center leading-relaxed max-w-md ">
          {data.description}
        </p>

        {/* Telegram ID - Displayed separately */}
        <div className="text-center">
          <span className="text-sm font-medium ">
            {lang === "fa" ? "آیدی تلگرام" : "Telegram ID"}:
          </span>
          <span className="text-sm font-bold  ml-2">
            @{data.telegramId}
          </span>
        </div>

        {/* Telegram Button */}
        <motion.a
          href={`https://t.me/${data.telegramId}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-gray-200  transition-all duration-200 group"
        >
          <PaperAirplaneIcon className="w-5 h-5  transition-colors duration-200" />
          <span className="text-sm font-medium ">
            {lang === "fa" ? "ارسال پیام در تلگرام" : "Send message on Telegram"}
          </span>
        </motion.a>
      </div>
    </motion.div>
  );
}