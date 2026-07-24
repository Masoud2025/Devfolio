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
      className="max-w-4xl mx-auto p-6 md:p-10"
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

      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        <div className="flex items-center gap-3">
          <EnvelopeIcon className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-xs text-gray-500">{lang === "fa" ? "ایمیل" : "Email"}</p>
            <p className="text-sm font-medium">{contactInfo.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <MapPinIcon className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-xs text-gray-500">{lang === "fa" ? "موقعیت" : "Location"}</p>
            <p className="text-sm font-medium">{contactInfo.location}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <CalendarIcon className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-xs text-gray-500">{lang === "fa" ? "سن" : "Age"}</p>
            <p className="text-sm font-medium">{contactInfo.age}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <HeartIcon className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-xs text-gray-500">{lang === "fa" ? "وضعیت تاهل" : "Marital Status"}</p>
            <p className="text-sm font-medium">{contactInfo.maritalStatus}</p>
          </div>
        </div>
      </motion.div>

      {/* About Me Title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="mb-4"
      >
        <h2 className="text-2xl md:text-3xl font-bold">
          {lang === "fa" ? "درباره من" : "About Me"}
        </h2>
      </motion.div>

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