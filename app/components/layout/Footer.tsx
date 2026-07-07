'use client'
import { useLanguage } from "../../context/LanguageContext";

export default function Footer() {
    const { t } = useLanguage();
  
  return (
    <footer className="w-full bg-white text-black border-t border-black/10 mt-20">
      <div className="max-w-6xl mx-auto px-6 md:px-20 py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold">{t.Footer.title}</h2>
            <p className="text-gray-600 mt-3 leading-relaxed">
              {t.Footer.paragraph}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t.Footer.quickLinks}</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="hover:text-black cursor-pointer">{t.Footer.Home}</li>
              <li className="hover:text-black cursor-pointer">{t.Footer.About}</li>
              <li className="hover:text-black cursor-pointer">{t.Footer.Project}</li>
              <li className="hover:text-black cursor-pointer">{t.Footer.Contact}</li>
            </ul>
          </div>

          {/* Contact / Social */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t.Footer.Contact}</h3>
            <p className="text-gray-600">{t.Footer.Email}: masoud@example.com</p>
            <p className="text-gray-600">{t.Footer.Location}: Azerbaijan</p>

            <div className="flex gap-4 mt-4">
              <a className="text-gray-600 hover:text-black">{t.Footer.Github}</a>
              <a className="text-gray-600 hover:text-black">{t.Footer.Linkedin}</a>
              <a className="text-gray-600 hover:text-black">{t.Footer.Twitter}</a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-black/10 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} {t.Footer.bottomText}
        </div>

      </div>
    </footer>
  );
}