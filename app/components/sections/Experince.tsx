"use client";
import { useLanguage } from "../../context/LanguageContext";
import { Briefcase, GraduationCap, Code, Wrench, Calendar, MapPin } from "lucide-react";

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
      icon: <Briefcase size={20} />,
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
      icon: <Code size={20} />,
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
      icon: <Wrench size={20} />,
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "internship":
        return "border-blue-500 dark:border-blue-400";
      case "freelance":
        return "border-green-500 dark:border-green-400";
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
        return "bg-green-500 dark:bg-green-400";
      case "education":
        return "bg-purple-500 dark:bg-purple-400";
      default:
        return "bg-zinc-500 dark:bg-zinc-400";
    }
  };

  return (
    <section id="experience" className="w-full py-20 px-6 md:px-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white transition-colors duration-300">
            {t.Experience?.title || "Experience"}
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400 transition-colors duration-300">
            {t.Experience?.subtitle || "My professional journey"}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-zinc-300 dark:bg-zinc-700 -translate-x-1/2" />

          {timelineData.map((item, index) => (
            <div
              key={item.id}
              className={`relative flex flex-col md:flex-row items-start mb-12 last:mb-0 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 top-1 -translate-x-1/2 z-10">
                <div className={`
                  w-8 h-8 rounded-full 
                  ${getTypeBg(item.type)}
                  flex items-center justify-center
                  text-white
                  border-4 border-white dark:border-zinc-900
                  shadow-lg
                `}>
                  {item.icon}
                </div>
              </div>

              {/* Content */}
              <div className={`
                w-full md:w-[calc(50%-2rem)] 
                ml-12 md:ml-0
                ${index % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}
              `}>
                <div className={`
                  p-6 
                  border-l-4 ${getTypeColor(item.type)}
                  border border-zinc-200 dark:border-zinc-800 
                  rounded-r-2xl rounded-tl-2xl
                  bg-white dark:bg-zinc-900/50
                  hover:shadow-lg
                  transition-all duration-300
                  hover:border-zinc-400 dark:hover:border-zinc-600
                `}>
                  {/* Header */}
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div>
                      <h3 className="text-xl font-bold text-black dark:text-white transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-zinc-600 dark:text-zinc-400 font-medium">
                        {item.company}
                      </p>
                    </div>
                    <span className="text-sm text-zinc-500 dark:text-zinc-500 whitespace-nowrap">
                      {item.date}
                    </span>
                  </div>

                  {/* Location */}
                  {item.location && (
                    <div className="flex items-center gap-1 mt-1 text-sm text-zinc-500 dark:text-zinc-500">
                      <MapPin size={14} />
                      <span>{item.location}</span>
                    </div>
                  )}

                  {/* Description */}
                  <ul className="mt-3 space-y-1">
                    {item.description.map((desc, i) => (
                      <li key={i} className="text-sm text-zinc-600 dark:text-zinc-400 flex items-start gap-2">
                        <span className="text-zinc-400 dark:text-zinc-600 mt-1">•</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Type Badge */}
                  <div className="mt-3">
                    <span className={`
                      text-xs font-medium px-3 py-1 rounded-full
                      ${getTypeBg(item.type)} text-white
                    `}>
                      {item.type === "internship" && (t.Experience?.internship || "Internship")}
                      {item.type === "freelance" && (t.Experience?.freelance || "Freelance")}
                      {item.type === "education" && (t.Experience?.education || "Education")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}