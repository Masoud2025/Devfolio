'use client'
import { useLanguage } from "../../context/LanguageContext";
import { useMemo, memo, useRef } from "react";
import { useInView } from "react-intersection-observer";

function Testimonials() {
  const { t } = useLanguage();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const testimonials = useMemo(() => [
    {
      name: t.Testimonials.customer_1_name,
      role: t.Testimonials.Role1,
      text: t.Testimonials.Comment1,
    },
    {
      name: t.Testimonials.customer_2_name,
      role: t.Testimonials.Role2,
      text: t.Testimonials.Comment2,
    },
    {
      name: t.Testimonials.customer_3_name,
      role: t.Testimonials.Role3,
      text: t.Testimonials.Comment3,
    },
  ], [t]);

  return (
    <section ref={ref} className={`w-full py-16 md:py-20 px-6 md:px-8 lg:px-20 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="max-w-5xl mx-auto">

        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-bold mb-8 md:mb-12">
          {t.Testimonials.Header}
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="border border-zinc-200 rounded-2xl p-5 md:p-6 hover:shadow-md transition"
            >
              <p className=" leading-relaxed text-sm md:text-base">
                &quot;{item.text}&quot;
              </p>

               <div className="mt-4 md:mt-6">
                 <h4 className="font-semibold text-sm md:text-base dark:text-white">{item.name}</h4>
                 <p className="text-xs md:text-sm text-gray-500 dark:text-zinc-400">{item.role}</p>
               </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default memo(Testimonials);