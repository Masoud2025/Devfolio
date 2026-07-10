"use client";
import { useLanguage } from "../../context/LanguageContext";

export default function ContactMe() {
  const { t } = useLanguage();

  return (
    <section className="w-full py-20 px-6 md:px-20">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-10  transition-colors duration-300">
          {t.ContactMe.Header}
        </h2>

        <form className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2  transition-colors duration-300">
              {t.ContactMe.Name}
            </label>
            <input
              type="text"
              placeholder={t.ContactMe.namePlaceholder}
              className="
                w-full px-4 py-3 
                border border-zinc-300 dark:border-zinc-700 
                rounded-xl 
               
                text-black dark:text-white 
                placeholder:text-zinc-400 dark:placeholder:text-zinc-500
                focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white 
                transition-all duration-300
              "
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium mb-2 text-black dark:text-white transition-colors duration-300">
              {t.ContactMe.Subject}
            </label>
            <input
              type="text"
              placeholder={t.ContactMe.subjectPlaceholder}
              className="
                w-full px-4 py-3 
                border border-zinc-300 dark:border-zinc-700 
                rounded-xl 
               
                text-black dark:text-white 
                placeholder:text-zinc-400 dark:placeholder:text-zinc-500
                focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white 
                transition-all duration-300
              "
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="
              w-full 
              dark:bg-white 
              text-white dark:text-black 
              font-semibold
              py-3 rounded-xl 
              hover:bg-zinc-800 dark:hover:bg-zinc-200 
              transition-all duration-300
              hover:scale-[1.02]
              active:scale-[0.98]
            "
          >
            {t.ContactMe.Button}
          </button>
        </form>
      </div>
    </section>
  );
}