'use client'

export default function Footer() {
  return (
    <footer className="w-full border-t border-black/10 mt-12 md:mt-20">
      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-20 py-10 md:py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">

          <div>
            <h2 className="text-xl md:text-2xl font-bold">مسعود جعفری</h2>
            <p className=" mt-3 leading-relaxed text-sm md:text-base">
              برنامه نویس و محقق هوش مصنوعی
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4">دسترسی سریع</h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li className="hover:text-black cursor-pointer transition-colors">خانه</li>
              <li className="hover:text-black cursor-pointer transition-colors">درباره من</li>
              <li className="hover:text-black cursor-pointer transition-colors">وبلاگ</li>
              <li className="hover:text-black cursor-pointer transition-colors">ارتباط با من</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4">ارتباط</h3>
            <p className="text-sm md:text-base">ایمیل: masoud@example.com</p>
            <p className="text-sm md:text-base">موقعیت: آذربایجان</p>

            <div className="flex gap-4 mt-4">
              <a className="hover:text-black transition-colors text-sm md:text-base">گیتهاب</a>
              <a className="hover:text-black transition-colors text-sm md:text-base">لینکدین</a>
              <a className="hover:text-black transition-colors text-sm md:text-base">توییتر</a>
            </div>
          </div>

        </div>

        <div className="mt-8 md:mt-10 pt-6 border-t border-black/10 text-center text-xs md:text-sm">
          © {new Date().getFullYear()} مسعود جعفری ساخته شده با.
        </div>

      </div>
    </footer>
  );
}
