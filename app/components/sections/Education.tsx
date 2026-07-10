"use client";
import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import ImageModal from "../../components/ui/ImageModal";
import { GraduationCap, Calendar, Building2, Maximize2 } from "lucide-react";
import TempoImage from "@/public/pic/license.jpg"

interface EducationItem {
  id: number;
  title: string;
  institution: string;
  year: string;
  logo?: string;
}

export default function Education() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedAlt, setSelectedAlt] = useState<string>("");

  const educationData: EducationItem[] = [
    {
      id: 1,
      title: t.Education?.degree1 || "Bachelor of Computer Science",
      institution: t.Education?.institution1 || "University of Technology",
      year: "2020 - 2024",
      logo: "/pic/license.jpg",
    },
    {
      id: 2,
      title: t.Education?.degree2 || "Full-Stack Web Development",
      institution: t.Education?.institution2 || "Online Bootcamp",
      year: "2022 - 2023",
      logo: "/pic/license.jpg",
    },
  ];

  const handleImageClick = (src: string, alt: string) => {
    setSelectedImage(src);
    setSelectedAlt(alt);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setSelectedAlt("");
  };

  return (
    <>
      <section id="education" className="w-full py-20 px-6 md:px-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white transition-colors duration-300">
              {t.Education?.title || "Education"}
            </h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400 transition-colors duration-300">
              {t.Education?.subtitle || "My educational background"}
            </p>
          </div>

          {/* Education List */}
          <div className="space-y-6">
            {educationData.map((item) => (
              <article
                key={item.id}
                className="
                  flex items-center gap-6 
                  p-6 
                  border border-zinc-200 dark:border-zinc-800 
                  rounded-2xl 
                  bg-white dark:bg-zinc-900/50 
                  hover:border-zinc-400 dark:hover:border-zinc-600
                  transition-all duration-300
                  hover:shadow-lg
                  group
                "
              >
                {/* Logo */}
                {item.logo ? (
                  <div className="relative flex-shrink-0">
                    <div
                      className="
                        w-20 h-20 rounded-full overflow-hidden 
                        bg-zinc-100 dark:bg-zinc-800 
                        border-2 border-zinc-200 dark:border-zinc-700
                        cursor-pointer
                        group/image
                        relative
                      "
                      onClick={() => handleImageClick(item.logo!, item.institution)}
                    >
                      <img
                        src={item.logo}
                        alt={item.institution}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover/image:scale-110"
                        loading="lazy"
                      />
                      {/* Overlay with zoom icon */}
                      <div className="
                        absolute inset-0 
                        bg-black/40 
                        opacity-0 group-hover/image:opacity-100 
                        transition-opacity duration-300
                        flex items-center justify-center
                        rounded-full
                      ">
                        <Maximize2 size={20} className="text-white" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
                      <GraduationCap size={24} className="text-zinc-700 dark:text-zinc-300" />
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-black dark:text-white transition-colors duration-300">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-zinc-600 dark:text-zinc-400">
                    <Building2 size={16} />
                    <span>{item.institution}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-sm text-zinc-500 dark:text-zinc-500">
                    <Calendar size={16} />
                    <span>{item.year}</span>
                  </div>
                </div>

                {/* Click hint */}
                {item.logo && (
                  <div className="text-xs text-zinc-400 dark:text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {t.Education?.clickToZoom || "Click to zoom"}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      <ImageModal
        isOpen={!!selectedImage}
        onClose={handleCloseModal}
        imageSrc={selectedImage || ""}
        alt={selectedAlt}
      />
    </>
  );
}