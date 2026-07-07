"use client";
import { useLanguage } from "../../context/LanguageContext";

export default function ContactMe() {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-white text-black py-20 px-6 md:px-20">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">{t.ContactMe.Header}</h2>

        <form className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2">{t.ContactMe.Name}</label>
            <input
              type="text"
              placeholder={t.ContactMe.namePlaceholder}
              className="w-full px-4 py-3 border border-black/20 rounded-xl focus:outline-none focus:border-black transition"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium mb-2">{t.ContactMe.Subject}</label>
            <input
              type="text"
              placeholder={t.ContactMe.subjectPlaceholder}
              className="w-full px-4 py-3 border border-black/20 rounded-xl focus:outline-none focus:border-black transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition"
          >
            {t.ContactMe.Button}
          </button>
        </form>
      </div>
    </section>
  );
}
