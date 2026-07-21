'use client'
import { useLanguage } from "../../context/LanguageContext";

export default function Footer() {
    const { t } = useLanguage();
  
  return (
    <footer className="w-full border-t border-black/10 mt-12 md:mt-20">
      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-20 py-10 md:py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold">{t.Footer.title}</h2>
            <p className=" mt-3 leading-relaxed text-sm md:text-base">
              {t.Footer.paragraph}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4">{t.Footer.quickLinks}</h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li className="hover:text-black cursor-pointer transition-colors">{t.Footer.Home}</li>
              <li className="hover:text-black cursor-pointer transition-colors">{t.Footer.About}</li>
              <li className="hover:text-black cursor-pointer transition-colors">{t.Footer.Blog}</li>
              <li className="hover:text-black cursor-pointer transition-colors">{t.Footer.Contact}</li>
            </ul>
          </div>

          {/* Contact / Social */}
          <div>
            <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4">{t.Footer.Contact}</h3>
            <p className="text-sm md:text-base">{t.Footer.Email}: masoud@example.com</p>
            <p className="text-sm md:text-base">{t.Footer.Location}: Azerbaijan</p>

            <div className="flex gap-4 mt-4">
              <a className="hover:text-black transition-colors text-sm md:text-base">{t.Footer.Github}</a>
              <a className="hover:text-black transition-colors text-sm md:text-base">{t.Footer.Linkedin}</a>
              <a className="hover:text-black transition-colors text-sm md:text-base">{t.Footer.Twitter}</a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-8 md:mt-10 pt-6 border-t border-black/10 text-center text-xs md:text-sm">
          © {new Date().getFullYear()} {t.Footer.bottomText}
        </div>

      </div>
    </footer>
  );
}