"use client";
import { Code, Palette, Server, Smartphone, Wrench, Cloud } from "lucide-react";
import { useMemo, memo } from "react";
import { useInView } from "react-intersection-observer";

interface Service {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

function Services() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services: Service[] = useMemo(() => [
    {
      id: 1,
      icon: <Code size={22} />,
      title: "توسعه وب",
      description: "ساخت اپلیکیشن‌های وب مدرن و واکنش‌گرا",
    },
    {
      id: 2,
      icon: <Palette size={22} />,
      title: "طراحی UI/UX",
      description: "ایجاد رابط‌های کاربری زیبا و شهودی",
    },
    {
      id: 3,
      icon: <Server size={22} />,
      title: "توسعه بک‌اند",
      description: "توسعه راه‌حل‌های مقیاس‌پذیر سمت سرور",
    },
    {
      id: 4,
      icon: <Smartphone size={22} />,
      title: "توسعه موبایل",
      description: "اپلیکیشن‌های موبایل چندسکویی",
    },
    {
      id: 5,
      icon: <Wrench size={22} />,
      title: "نگهداری و پشتیبانی",
      description: "پشتیبانی و نگهداری مداوم",
    },
    {
      id: 6,
      icon: <Cloud size={22} />,
      title: "استقرار و دواپس",
      description: "CI/CD، هاستینگ و خدمات ابری",
    },
  ], []);

  return (
    <section ref={ref} className={`w-full py-16 md:py-24 px-6 md:px-8 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-black dark:text-white mb-8 md:mb-12">
          خدمات
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="
                p-5 md:p-6
                border border-zinc-200 dark:border-zinc-800
                rounded-2xl
                bg-background
                hover:border-zinc-400 dark:hover:border-zinc-600
                hover:shadow-lg
                transition-all duration-300
                group
                ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              "
            >
              <div className="
                w-12 h-12
                rounded-xl
                bg-background
                flex items-center justify-center
                text-black dark:text-white
                group-hover:scale-110
                transition-all duration-300
                mb-4
              ">
                {service.icon}
              </div>

              <h3 className="text-base font-semibold text-black dark:text-white">
                {service.title}
              </h3>

              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(Services);
