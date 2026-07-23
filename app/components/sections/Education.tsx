"use client";
import { useState, useMemo, useCallback, memo } from "react";
import ImageModal from "../../components/ui/ImageModal";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { GraduationCap, Calendar, Building2, Maximize2, Award } from "lucide-react";

interface EducationItem {
  id: number;
  title: string;
  institution: string;
  year: string;
  logo?: string;
}

function Education() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedAlt, setSelectedAlt] = useState<string>("");

  const { ref: sectionRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const educationData: EducationItem[] = useMemo(() => [
    {
      id: 1,
      title: "کارشناسی علوم کامپیوتر",
      institution: "دانشگاه صنعتی",
      year: "2020 - 2024",
      logo: "/pic/license.jpg",
    },
    {
      id: 2,
      title: "توسعه وب فول‌استک",
      institution: "دوره آنلاین",
      year: "2022 - 2023",
      logo: "/pic/license.jpg",
    },
  ], []);

  const handleImageClick = useCallback((src: string, alt: string) => {
    setSelectedImage(src);
    setSelectedAlt(alt);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedImage(null);
    setSelectedAlt("");
  }, []);

  return (
    <>
      <section
        id="education"
        ref={sectionRef}
        className="w-full py-20 px-4 md:px-8 lg:px-20 overflow-hidden"
      >
        <div className="max-w-6xl mx-auto">
          <div
            className={`
              mb-14 text-center transition-all duration-700 ease-out
              ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}
            `}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              تحصیلات
            </h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400 text-base md:text-lg max-w-2xl mx-auto">
              سوابق تحصیلی من
            </p>
          </div>

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
                  bg-background
                  backdrop-blur-sm
                  hover:shadow-xl hover:shadow-zinc-500/10
                  hover:scale-[1.02]
                  transition-all duration-300
                  hover:border-zinc-300 dark:hover:border-zinc-700
                  ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                `}
                style={{
                  transitionDelay: inView ? `${index * 150}ms` : '0ms',
                  willChange: 'transform, opacity',
                }}
              >
                     <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-zinc-500/0 via-zinc-500/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex-shrink-0">
                  {item.logo ? (
                    <div
                      className="
                        relative w-20 h-20 md:w-24 md:h-24 
                        rounded-full overflow-hidden 
                        bg-zinc-100 dark:bg-background
                        border-2 border-zinc-200 dark:border-zinc-700
                        cursor-pointer
                        group/logo
                        shadow-md hover:shadow-lg transition-shadow duration-300
                      "
                      onClick={() => handleImageClick(item.logo!, item.institution)}
                    >
                      <Image
                        src={item.logo!}
                        alt={item.institution}
                        fill
                        sizes="(max-width: 768px) 96px, 96px"
                        className="object-cover transition-transform duration-500 group-hover/logo:scale-110"
                        loading="lazy"
                      />
                      <div className="
                        absolute inset-0 
                        bg-gradient-to-br from-zinc-600/60 to-zinc-700/60
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
                        bg-gradient-to-br from-zinc-100 to-zinc-200 
                        dark:from-zinc-800/50 dark:to-zinc-700/50
                        flex items-center justify-center
                        border-2 border-zinc-200 dark:border-zinc-700
                        shadow-md
                      ">
                        <GraduationCap size={28} className="text-zinc-600 dark:text-zinc-400" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg md:text-xl font-bold text-black dark:text-white transition-colors duration-300 group-hover:text-zinc-600 dark:group-hover:text-zinc-400">
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

                  <div className="mt-3">
                    <span className="
                      inline-flex items-center gap-1.5
                      text-xs font-semibold px-3.5 py-1.5 rounded-full
                      bg-zinc-500 text-white
                      shadow-md shadow-zinc-500/30
                    ">
                      <Award size={14} />
                      تحصیلات
                    </span>
                  </div>
                </div>

                {item.logo && (
                  <div className="absolute bottom-3 right-4 text-[10px] text-zinc-400 dark:text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    برای بزرگنمایی  رو عکس کلیک کنید
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <ImageModal
        isOpen={!!selectedImage}
        onClose={handleCloseModal}
        imageSrc={selectedImage || ""}
        alt={selectedAlt}
      />
    </>
  );
}

export default memo(Education);
