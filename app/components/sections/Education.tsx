"use client";
import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import ImageModal from "../../components/ui/ImageModal";
import { useInView } from "react-intersection-observer";
import { GraduationCap, Calendar, Building2, Maximize2, Award } from "lucide-react";

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

  // استفاده از react-intersection-observer به جای framer-motion
  const { ref: sectionRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
      <section
        id="education"
        ref={sectionRef}
        className="w-full py-20 px-4 md:px-8 lg:px-20 overflow-hidden"
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div
            className={`
              mb-14 text-center transition-all duration-700 ease-out
              ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}
            `}
          >
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              {t.Education?.title || "Education"}
            </h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400 text-base md:text-lg max-w-2xl mx-auto">
              {t.Education?.subtitle || "My educational background"}
            </p>
          </div>

          {/* Education Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {educationData.map((item, index) => (
              <article
                key={item.id}
                className={`
                  group relative
                  flex flex-col sm:flex-row items-start sm:items-center gap-5
                  p-6 md:p-7
                  border border-zinc-200 dark:border-zinc-800 
                  rounded-2xl 
                  bg-white/80 dark:bg-zinc-900/80
                  backdrop-blur-sm
                  hover:shadow-xl hover:shadow-purple-500/10
                  hover:scale-[1.02]
                  transition-all duration-300
                  hover:border-purple-300 dark:hover:border-purple-600
                  ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                `}
                style={{
                  transitionDelay: inView ? `${index * 150}ms` : '0ms',
                }}
              >
                {/* Decorative gradient line on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Left side: Logo or Icon */}
                <div className="flex-shrink-0">
                  {item.logo ? (
                    <div
                      className="
                        relative w-20 h-20 md:w-24 md:h-24 
                        rounded-full overflow-hidden 
                        bg-zinc-100 dark:bg-zinc-800 
                        border-2 border-zinc-200 dark:border-zinc-700
                        cursor-pointer
                        group/logo
                        shadow-md hover:shadow-lg transition-shadow duration-300
                      "
                      onClick={() => handleImageClick(item.logo!, item.institution)}
                    >
                      <img
                        src={item.logo}
                        alt={item.institution}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/logo:scale-110"
                        loading="lazy"
                      />
                      {/* Overlay with zoom icon */}
                      <div className="
                        absolute inset-0 
                        bg-gradient-to-br from-purple-600/60 to-blue-600/60
                        opacity-0 group-hover/logo:opacity-100 
                        transition-opacity duration-300
                        flex items-center justify-center
                        rounded-full
                      ">
                        <Maximize2 size={20} className="text-white drop-shadow-lg" />
                      </div>
                    </div>
                  ) : (
                    <div className="
                      w-20 h-20 md:w-24 md:h-24 
                      rounded-full 
                      bg-gradient-to-br from-purple-100 to-blue-100 
                      dark:from-purple-900/50 dark:to-blue-900/50
                      flex items-center justify-center
                      border-2 border-purple-200 dark:border-purple-800
                      shadow-md
                    ">
                      <GraduationCap size={28} className="text-purple-600 dark:text-purple-400" />
                    </div>
                  )}
                </div>

                {/* Right side: Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg md:text-xl font-bold text-black dark:text-white transition-colors duration-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                      {item.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 mt-2 text-zinc-600 dark:text-zinc-400">
                    <Building2 size={16} className="flex-shrink-0" />
                    <span className="text-sm md:text-base">{item.institution}</span>
                  </div>

                  <div className="flex items-center gap-2 mt-1.5 text-sm text-zinc-500 dark:text-zinc-500">
                    <Calendar size={16} className="flex-shrink-0" />
                    <span>{item.year}</span>
                  </div>

                  {/* Badge: Education */}
                  <div className="mt-3">
                    <span className="
                      inline-flex items-center gap-1.5
                      text-xs font-semibold px-3.5 py-1.5 rounded-full
                      bg-purple-500 text-white
                      shadow-md shadow-purple-500/30
                    ">
                      <Award size={14} />
                      {t.Experience?.education || "Education"}
                    </span>
                  </div>
                </div>

                {/* Click hint (visible on hover) */}
                {item.logo && (
                  <div className="absolute bottom-3 right-4 text-[10px] text-zinc-400 dark:text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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