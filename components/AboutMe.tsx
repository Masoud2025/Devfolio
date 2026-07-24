// components/AboutMe.tsx
"use client";
import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";
import Image from "next/image";
import ProfilePicture from "@/public/masoudJafari.jpg";
import { words } from "@/lib/words";
import { EnvelopeIcon, MapPinIcon, CalendarIcon, HeartIcon } from "@heroicons/react/24/outline";

export default function AboutMe() {
  const { lang } = useLang();
  const data = lang === "fa" ? words.fa.about : words.en.about;
  const isRTL = lang === "fa";

  const contactInfo = lang === "fa" ? {
    email: "masoud@example.com",
    location: "تهران، ایران",
    age: "۳۰ سال",
    maritalStatus: "مجرد"
  } : {
    email: "masoud@example.com",
    location: "Tehran, Iran",
    age: "30 years old",
    maritalStatus: "Single"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 py-4 sm:p-6 md:p-10"
    >
      {/* Profile Section - ساختار ثابت در تمام سایزها */}
      <div className={`flex flex-row items-center gap-4 sm:gap-6 md:gap-8 pb-4 sm:pb-6 md:pb-8 mb-4 sm:mb-6 md:mb-8 border-b border-gray-300`}>
        
        {/* Profile Image */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.2 }}
          className="flex-shrink-0"
        >
          <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 rounded-full overflow-hidden bg-gray-200">
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

        {/* Info - در کنار عکس */}
        <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'} min-w-0`}>
          <motion.h1
            initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-base sm:text-2xl md:text-4xl font-bold break-words"
          >
            {data.name}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xs sm:text-base md:text-lg mt-0.5 sm:mt-1 break-words"
          >
            {data.title}
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="text-[10px] sm:text-sm mt-0.5 sm:mt-1 break-words"
          >
            {data.bio}
          </motion.p>
        </div>
      </div>

      {/* Contact Information - ساختار ثابت */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6 md:mb-8"
      >
        <div className="flex items-center gap-2 sm:gap-3 px-1 sm:px-0">
          <EnvelopeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-[8px] sm:text-xs text-gray-500">{lang === "fa" ? "ایمیل" : "Email"}</p>
            <p className="text-[8px] sm:text-sm font-medium truncate">{contactInfo.email}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3 px-1 sm:px-0">
          <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-[8px] sm:text-xs text-gray-500">{lang === "fa" ? "موقعیت" : "Location"}</p>
            <p className="text-[8px] sm:text-sm font-medium truncate">{contactInfo.location}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3 px-1 sm:px-0">
          <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-[8px] sm:text-xs text-gray-500">{lang === "fa" ? "سن" : "Age"}</p>
            <p className="text-[8px] sm:text-sm font-medium">{contactInfo.age}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3 px-1 sm:px-0">
          <HeartIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-[8px] sm:text-xs text-gray-500">{lang === "fa" ? "وضعیت تاهل" : "Marital Status"}</p>
            <p className="text-[8px] sm:text-sm font-medium">{contactInfo.maritalStatus}</p>
          </div>
        </div>
      </motion.div>

      {/* About Me Title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="mb-2 sm:mb-4"
      >
        <h2 className="text-base sm:text-2xl md:text-3xl font-bold">
          {lang === "fa" ? "درباره من" : "About Me"}
        </h2>
      </motion.div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <p className="leading-relaxed text-xs sm:text-sm md:text-base whitespace-pre-line break-words">
          {data.description}
        </p>
      </motion.div>
    </motion.div>
  );
}