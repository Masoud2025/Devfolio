"use client";
import { useLanguage } from "../../context/LanguageContext";
import { Code, Palette, Server, Smartphone, Wrench, Cloud } from "lucide-react";
import { useMemo, memo } from "react";

interface Service {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

function Services() {
  const { t } = useLanguage();

  const services: Service[] = useMemo(() => [
    {
      id: 1,
      icon: <Code size={22} />,
      title: t.Services?.webDev || "Web Development",
      description: t.Services?.webDevDesc || "Building modern, responsive web applications",
    },
    {
      id: 2,
      icon: <Palette size={22} />,
      title: t.Services?.uiUx || "UI/UX Design",
      description: t.Services?.uiUxDesc || "Creating beautiful and intuitive interfaces",
    },
    {
      id: 3,
      icon: <Server size={22} />,
      title: t.Services?.backend || "Backend Development",
      description: t.Services?.backendDesc || "Developing scalable server-side solutions",
    },
    {
      id: 4,
      icon: <Smartphone size={22} />,
      title: t.Services?.mobile || "Mobile Development",
      description: t.Services?.mobileDesc || "Cross-platform mobile applications",
    },
    {
      id: 5,
      icon: <Wrench size={22} />,
      title: t.Services?.maintenance || "Maintenance & Support",
      description: t.Services?.maintenanceDesc || "Ongoing support and maintenance",
    },
    {
      id: 6,
      icon: <Cloud size={22} />,
      title: t.Services?.deployment || "Deployment & DevOps",
      description: t.Services?.deploymentDesc || "CI/CD, hosting, and cloud services",
    },
  ], [t]);

  return (
    <section id="services" className="w-full py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h2 className="text-xl md:text-2xl font-bold text-center text-black dark:text-white mb-6">
          {t.Services?.title || "Services"}
        </h2>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="
                p-4
                border border-zinc-200 dark:border-zinc-800
                rounded-xl
                bg-white dark:bg-zinc-900/50
                hover:border-zinc-400 dark:hover:border-zinc-600
                hover:shadow-md
                transition-all duration-300
                group
              "
            >
              {/* Icon */}
              <div className="
                w-10 h-10
                rounded-full
                bg-zinc-100 dark:bg-zinc-800
                flex items-center justify-center
                text-black dark:text-white
                group-hover:scale-110
                transition-all duration-300
                mb-2
              ">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-sm font-semibold text-black dark:text-white">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
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