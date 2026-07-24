// components/AboutMe.tsx
"use client";
import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";
import Image from "next/image";
import ProfilePicture from "@/public/masoudJafari.jpg";
import { words } from "@/lib/words";

export default function AboutMe() {
  const { lang } = useLang();
  const data = lang === "fa" ? words.fa.about : words.en.about;
  const isRTL = lang === "fa";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto p-6 md:p-10"
    >
      <div className={`flex flex-col ${isRTL ? 'md:flex-row' : 'md:flex-row-reverse'} items-center md:items-start gap-8 pb-8 mb-8 border-b border-gray-300`}>
        
        {/* Profile Image */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.2 }}
          className="flex-shrink-0"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-gray-200">
            <Image
              src={ProfilePicture}
              alt={data.name}
              width={160}
              height={160}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Info */}
        <div className={`flex-1 text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}>
          <motion.h1
            initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold"
          >
            {data.name}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="text-base md:text-lg mt-1"
          >
            {data.title}
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="text-sm mt-2"
          >
            {data.bio}
          </motion.p>
        </div>
      </div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <p className="leading-relaxed text-sm md:text-base whitespace-pre-line">
          {data.description}
        </p>
      </motion.div>
    </motion.div>
  );
}