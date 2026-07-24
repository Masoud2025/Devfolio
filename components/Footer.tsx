// components/Footer.tsx
"use client";
import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { HeartIcon } from "@heroicons/react/24/solid";
import { 
  EnvelopeIcon,
  GlobeAltIcon,
  CodeBracketIcon,
  UserIcon
} from "@heroicons/react/24/outline";

export default function Footer() {
  const { lang } = useLang();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "GitHub", icon: CodeBracketIcon, url: "https://github.com/masoudjafari" },
    { name: "LinkedIn", icon: UserIcon, url: "https://linkedin.com/in/masoudjafari" },
    { name: "Website", icon: GlobeAltIcon, url: "https://masoudjafari.com" },
    { name: "Email", icon: EnvelopeIcon, url: "mailto:masoud@example.com" },
  ];

  return (
    <footer className="relative w-full overflow-hidden mt-12">
      {/* Simple Pattern Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-100/30 to-gray-100/50 dark:via-gray-800/20 dark:to-gray-800/30"></div>
        
        {/* Simple animated dots */}
        <div className="absolute inset-0 opacity-20">
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <pattern id="dot-pattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="currentColor" className="text-gray-400 dark:text-gray-600">
                  <animate attributeName="opacity" values="0.3;1;0.3" dur="4s" repeatCount="indefinite" />
                </circle>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dot-pattern)" />
          </svg>
        </div>
      </div>

      {/* Footer Content */}
      <div className="relative max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-10">
        <div className="flex flex-col items-center gap-6">
          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 md:gap-4"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.15,
                  y: -2,
                }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-gray-200/50 dark:bg-gray-700/30 backdrop-blur-sm hover:bg-gray-300/50 dark:hover:bg-gray-600/30 transition-all duration-300 border border-gray-300/30 dark:border-gray-600/30"
                aria-label={social.name}
              >
                <social.icon className="w-4 h-4 md:w-5 md:h-5 text-gray-700 dark:text-gray-300" />
              </motion.a>
            ))}
          </motion.div>

          {/* Divider with heart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-3 w-full max-w-xs"
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-400/40 to-transparent dark:via-gray-500/20"></div>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <HeartIcon className="w-4 h-4 text-red-500/70" />
            </motion.div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-400/40 to-transparent dark:via-gray-500/20"></div>
          </motion.div>

          {/* Copyright Text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-center"
          >
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
              &copy; {currentYear} {lang === "fa" ? "مسعود جعفری" : "Masoud Jafari"}. 
              {lang === "fa" ? " تمامی حقوق محفوظ است." : " All rights reserved."}
            </p>
            <p className="text-[10px] md:text-xs text-gray-400 dark:text-gray-500 mt-0.5">
              {lang === "fa" ? "ساخته شده با ❤️ و کد" : "Made with ❤️ and code"}
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}