"use client";
import { useLanguage } from "../../context/LanguageContext";
import { Briefcase, Code, Wrench, Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface TimelineItem {
  id: number;
  title: string;
  company: string;
  location?: string;
  date: string;
  description: string[];
  type: "work" | "education" | "freelance" | "internship";
  icon: React.ReactNode;
}

export default function Experience() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const timelineData: TimelineItem[] = [
    {
      id: 1,
      title: t.Experience?.internshipTitle || "IT Intern",
      company: t.Experience?.internshipCompany || "Kaveh Negar Company",
      location: "Tehran, Iran",
      date: "2024 - 3 Months",
      description: [
        t.Experience?.internshipDesc1 || "Network configuration and maintenance",
        t.Experience?.internshipDesc2 || "Hardware troubleshooting and repair",
        t.Experience?.internshipDesc3 || "Deep Freeze installation and management",
        t.Experience?.internshipDesc4 || "Printer setup and driver installation",
        t.Experience?.internshipDesc5 || "System optimization and user support",
      ],
      type: "internship",
      icon: <Briefcase size={18} />,
    },
    {
      id: 2,
      title: t.Experience?.freelanceTitle || "Freelance Projects",
      company: t.Experience?.freelanceCompany || "Self-Employed",
      location: "Remote",
      date: "2023 - 2024",
      description: [
        t.Experience?.freelanceDesc1 || "Developed 3 full-stack web applications",
        t.Experience?.freelanceDesc2 || "Built responsive websites with Next.js and Tailwind",
        t.Experience?.freelanceDesc3 || "Implemented RESTful APIs and database integration",
        t.Experience?.freelanceDesc4 || "Delivered projects on time with client satisfaction",
      ],
      type: "freelance",
      icon: <Code size={18} />,
    },
    {
      id: 3,
      title: t.Experience?.schoolTitle || "IT Department Head",
      company: t.Experience?.schoolCompany || "Technical High School",
      location: t.Experience?.schoolLocation || "Iran",
      date: "2022 - 2023",
      description: [
        t.Experience?.schoolDesc1 || "Managed school's IT infrastructure",
        t.Experience?.schoolDesc2 || "Network setup and maintenance",
        t.Experience?.schoolDesc3 || "Installed and configured Deep Freeze",
        t.Experience?.schoolDesc4 || "Hardware and software troubleshooting",
        t.Experience?.schoolDesc5 || "Assisted teachers and students with technical issues",
        t.Experience?.schoolDesc6 || "Printer and peripheral device management",
      ],
      type: "education",
      icon: <Wrench size={18} />,
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "internship":
        return "border-blue-500 dark:border-blue-400";
      case "freelance":
        return "border-emerald-500 dark:border-emerald-400";
      case "education":
        return "border-purple-500 dark:border-purple-400";
      default:
        return "border-zinc-500 dark:border-zinc-400";
    }
  };

  const getTypeBg = (type: string) => {
    switch (type) {
      case "internship":
        return "bg-blue-500 dark:bg-blue-400";
      case "freelance":
        return "bg-emerald-500 dark:bg-emerald-400";
      case "education":
        return "bg-purple-500 dark:bg-purple-400";
      default:
        return "bg-zinc-500 dark:bg-zinc-400";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "internship":
        return t.Experience?.internship || "Internship";
      case "freelance":
        return t.Experience?.freelance || "Freelance";
      case "education":
        return t.Experience?.education || "Education";
      default:
        return "";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="w-full py-20 px-4 md:px-8 lg:px-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            {t.Experience?.title || "Experience"}
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400 text-base md:text-lg max-w-2xl mx-auto">
            {t.Experience?.subtitle || "My professional journey"}
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Vertical Line - Always in center */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/30 via-blue-500/30 to-transparent -translate-x-1/2" />

          {timelineData.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className={`
                relative flex flex-col items-start mb-12 last:mb-0
                ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}
              `}
            >
              {/* Timeline Dot - Always in center */}
              <div className="absolute left-1/2 top-1 -translate-x-1/2 z-10">
                <div className={`
                  w-10 h-10 md:w-12 md:h-12 rounded-full 
                  ${getTypeBg(item.type)}
                  flex items-center justify-center
               
                  border-4 
                  shadow-lg shadow-${item.type === 'internship' ? 'blue' : item.type === 'freelance' ? 'emerald' : 'purple'}-500/30
                  ring-4 ring-${item.type === 'internship' ? 'blue' : item.type === 'freelance' ? 'emerald' : 'purple'}-500/20
                `}>
                  {item.icon}
                </div>
              </div>

              {/* Content - Alternating left/right on desktop, offset on mobile */}
              <div className={`
                w-full md:w-[calc(50%-2.5rem)] 
                ${index % 2 === 0 
                  ? "md:mr-auto md:pr-8 md:pl-0 pl-8" 
                  : "md:ml-auto md:pl-8 md:pr-0 pr-8"
                }
                ${index % 2 === 0 ? "text-left" : "text-left md:text-right"}
              `}>
                <div className={`
                  p-5 md:p-6 
                  border-l-4 ${getTypeColor(item.type)}
                  border border-zinc-200 
                  rounded-2xl
                  
              
                  hover:shadow-xl hover:shadow-${item.type === 'internship' ? 'blue' : item.type === 'freelance' ? 'emerald' : 'purple'}-500/10
                  hover:scale-[1.02]
                  transition-all duration-300
                  group
                  ${index % 2 === 0 ? "md:mr-0" : "md:ml-0"}
                `}>
                  {/* Header */}
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-bold text-black dark:text-white transition-colors duration-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                        {item.title}
                      </h3>
                      <p className="font-medium text-sm md:text-base">
                        {item.company}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs md:text-sm text-zinc-500 dark:text-zinc-500 whitespace-nowrap  px-3 py-1 rounded-full">
                      <Calendar size={14} />
                      <span>{item.date}</span>
                    </div>
                  </div>

                  {/* Location */}
                  {item.location && (
                    <div className="flex items-center gap-1.5 mt-1.5 text-xs md:text-sm text-zinc-500 dark:text-zinc-500">
                      <MapPin size={14} />
                      <span>{item.location}</span>
                    </div>
                  )}

                  {/* Description */}
                  <ul className="mt-3 space-y-1.5">
                    {item.description.map((desc, i) => (
                      <li key={i} className="text-sm text-zinc-600 dark:text-zinc-400 flex items-start gap-2.5">
                        <span className="text-purple-500 dark:text-purple-400 mt-0.5 flex-shrink-0">▸</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Type Badge */}
                  <div className="mt-4">
                    <span className={`
                      text-xs font-semibold px-3.5 py-1.5 rounded-full
                      ${getTypeBg(item.type)} text-white
                      shadow-md
                    `}>
                      {getTypeLabel(item.type)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}