// components/Education.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { ChevronDownIcon, CalendarIcon, MapPinIcon, ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import { words, type EducationItem } from "@/lib/words";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";

export default function Education() {
  const { lang } = useLang();
  const [openId, setOpenId] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const isRTL = lang === "fa";

  const data = lang === "fa" ? words.fa.education : words.en.education;

  const toggleOpen = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const openLightbox = (image: string) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

  return (
    <>
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
          className="text-lg md:text-xl font-bold mb-4"
        >
          {data.title}
        </motion.h2>

        <div className="space-y-2">
          {data.items.map((edu: EducationItem, index: number) => {
            const isOpen = openId === edu.id;

            return (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="border border-gray-300 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleOpen(edu.id)}
                  className="w-full px-3 md:px-4 py-2 md:py-3 flex items-center justify-between text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden bg-gray-200 relative">
                      <Image
                        src={edu.image}
                        alt={edu.school}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <h3 className="font-semibold text-sm md:text-base truncate">
                          {edu.title}
                        </h3>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500 truncate hidden sm:inline">
                          {edu.school}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="w-3 h-3" />
                          {edu.period}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPinIcon className="w-3 h-3" />
                          {edu.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openLightbox(edu.image);
                      }}
                      className="p-1 rounded hover:bg-gray-100 transition-colors"
                      type="button"
                    >
                      <ArrowsPointingOutIcon className="w-4 h-4 text-gray-400" />
                    </button>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                    </motion.div>
                  </div>
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
                      <div className="px-3 md:px-4 pb-3 md:pb-4 pt-2 border-t border-gray-200">
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {edu.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Lightbox with Zoom and Fullscreen */}
      {typeof window !== 'undefined' && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={[{ src: selectedImage }]}
          plugins={[Zoom, Fullscreen]}
        />
      )}
    </>
  );
}