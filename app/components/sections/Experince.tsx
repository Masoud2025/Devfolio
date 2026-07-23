"use client";
import { Briefcase, Code, Wrench, Calendar, MapPin } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useMemo, memo } from "react";

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

function Experience() {
  const { ref: sectionRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const timelineData: TimelineItem[] = useMemo(() => [
    {
      id: 1,
      title: "کارآموز IT",
      company: "شرکت کاوه نگار",
      location: "تهران، ایران",
      date: "2024 - ۳ ماه",
      description: [
        "پیکربندی و نگهداری شبکه",
        "عیب‌یابی و تعمیر سخت‌افزار",
        "نصب و مدیریت دیپ‌فریز",
        "راه‌اندازی پرینتر و نصب درایور",
        "بهینه‌سازی سیستم و پشتیبانی کاربران",
      ],
      type: "internship",
      icon: <Briefcase size={18} />,
    },
    {
      id: 2,
      title: "پروژه‌های فریلنسری",
      company: "خوداشتغال",
      location: "دورکاری",
      date: "2023 - 2024",
      description: [
        "توسعه ۳ اپلیکیشن وب فول‌استک",
        "ساخت وب‌سایت‌های واکنش‌گرا با Next.js و Tailwind",
        "پیاده‌سازی APIهای RESTful و دیتابیس",
        "تحویل پروژه‌ها با کیفیت و در زمان مقرر",
      ],
      type: "freelance",
      icon: <Code size={18} />,
    },
    {
      id: 3,
      title: "رئیس بخش IT",
      company: "هنرستان",
      location: "ایران",
      date: "2022 - 2023",
      description: [
        "مدیریت زیرساخت IT هنرستان",
        "راه‌اندازی و نگهداری شبکه",
        "نصب و پیکربندی دیپ‌فریز",
        "عیب‌یابی سخت‌افزار و نرم‌افزار",
        "کمک به معلمان و دانش‌آموزان در مشکلات فنی",
        "مدیریت پرینتر و دستگاه‌های جانبی",
      ],
      type: "education",
      icon: <Wrench size={18} />,
    },
  ], []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "internship":
        return "border-blue-500 dark:border-blue-400";
      case "freelance":
        return "border-emerald-500 dark:border-emerald-400";
      case "education":
        return "border-zinc-500 dark:border-zinc-400";
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
        return "bg-zinc-500 dark:bg-zinc-400";
      default:
        return "bg-zinc-500 dark:bg-zinc-400";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "internship":
        return "کارآموزی";
      case "freelance":
        return "فریلنسر";
      case "education":
        return "آموزشی";
      default:
        return "";
    }
  };

  return (
    <section
      id="experience"
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
            سابقه کاری
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400 text-base md:text-lg max-w-2xl mx-auto">
            مسیر حرفه‌ای من
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5 bg-border/20 dark:bg-border md:-translate-x-1/2" />

          {timelineData.map((item: TimelineItem, index: number) => (
            <div
              key={item.id}
              className={`
                relative flex flex-col mb-10 md:mb-12 last:mb-0
                md:flex-row md:items-center
                ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}
                transition-all duration-700 ease-out
                ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              `}
              style={{
                transitionDelay: inView ? `${index * 150}ms` : '0ms',
                willChange: 'transform, opacity',
              }}
            >
              <div className="absolute left-5 md:left-1/2 top-1 translate-x-0 md:-translate-x-1/2 z-10">
                <div className={`
                  w-10 h-10 md:w-12 md:h-12 rounded-full 
                  ${getTypeBg(item.type)}
                  flex items-center justify-center
                  text-white
                  border-4 border-white dark:border-zinc-900
                  shadow-lg shadow-${item.type === 'internship' ? 'blue' : item.type === 'freelance' ? 'emerald' : 'zinc'}-500/30
                  ring-4 ring-${item.type === 'internship' ? 'blue' : item.type === 'freelance' ? 'emerald' : 'zinc'}-500/20
                  transition-all duration-300 hover:scale-110
                `}>
                  {item.icon}
                </div>
              </div>

              <div className={`
                w-full pl-14 md:pl-0
                ${index % 2 === 0 
                  ? "md:w-[calc(50%-2.5rem)] md:mr-auto md:pr-8" 
                  : "md:w-[calc(50%-2.5rem)] md:ml-auto md:pl-8"
                }
                ${index % 2 === 0 ? "text-left" : "text-left md:text-right"}
              `}>
                <div className={`
                  p-5 md:p-6 
                  border-l-4 ${getTypeColor(item.type)}
                  border border-zinc-200 dark:border-zinc-800
                  rounded-2xl
                  bg-background
                  backdrop-blur-sm
                  hover:shadow-xl hover:shadow-zinc-500/10
                  hover:scale-[1.02]
                  transition-all duration-300
                  group
                  ${index % 2 === 0 ? "md:mr-0" : "md:ml-0"}
                `}>
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div className="flex-1">
                       <h3 className="text-lg md:text-xl font-bold text-black dark:text-white transition-colors duration-300 group-hover:text-zinc-600 dark:group-hover:text-zinc-400">
                        {item.title}
                      </h3>
                      <p className="text-zinc-600 dark:text-zinc-400 font-medium text-sm md:text-base">
                        {item.company}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs md:text-sm text-zinc-500 dark:text-zinc-500 whitespace-nowrap bg-background dark:bg-background px-3 py-1 rounded-full">
                      <Calendar size={14} />
                      <span>{item.date}</span>
                    </div>
                  </div>

                  {item.location && (
                    <div className="flex items-center gap-1.5 mt-1.5 text-xs md:text-sm text-zinc-500 dark:text-zinc-500">
                      <MapPin size={14} />
                      <span>{item.location}</span>
                    </div>
                  )}

                  <ul className="mt-3 space-y-1.5">
                    {item.description.map((desc: string, i: number) => (
                      <li key={i} className="text-sm text-zinc-600 dark:text-zinc-400 flex items-start gap-2.5">
                         <span className="text-zinc-500 dark:text-zinc-400 mt-0.5 flex-shrink-0">▸</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>

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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(Experience);
