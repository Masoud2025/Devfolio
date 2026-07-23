"use client";

import { MessageCircle, Minimize2, X, Sparkles } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { memo } from "react";

type Role = "user" | "assistant";
type Intent =
  | "greeting"
  | "skills"
  | "experience"
  | "projects"
  | "education"
  | "contact"
  | "about"
  | "services"
  | "availability"
  | "pricing"
  | "smalltalk"
  | "fallback";

interface Message {
  id: string;
  role: Role;
  content: string;
  intent?: Intent;
}

interface ConversationContext {
  lastIntent?: Intent;
  askedAbout?: string[];
  followUpCount: number;
  userName?: string;
}

function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [context, setContext] = useState<ConversationContext>({
    followUpCount: 0,
    askedAbout: [],
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  // همه متن‌ها به فارسی
  const labels = {
    title: "دستیار هوشمند",
    subtitle: "هر سوالی درباره مسعود داری بپرس",
    welcome: "سلام! 👋 من دستیار هوشمند مسعود هستم. هر سوالی درباره مهارت‌ها، تجربه، پروژه‌ها، تحصیلات یا هر چیز دیگه‌ای که می‌خوای بدونی، بپرس!",
    suggestions: [
      "مهارت‌های مسعود چیه؟",
      "تجربه کاریش چطوره؟",
      "چه پروژه‌هایی ساخته؟",
      "تحصیلاتش چیه؟",
      "چطور می‌تونم باهاش تماس بگیرم؟",
      "درباره مسعود بگو",
      "چه خدماتی ارائه می‌ده؟",
      "آیا برای همکاری آماده هست؟",
    ],
  };

  // دیتاهای فارسی
  const skillsData = {
    title: "مهارت‌های من",
    groups: {
      frontend: ["React / Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML / CSS"],
      backend: ["Node.js", "Express.js"],
      database: ["MongoDB", "PostgreSQL", "Prisma"],
      tools: ["Git / GitHub", "Docker", "Vercel / Netlify"],
      design: ["UI/UX Design", "Figma"],
    },
  };

  const aboutData = {
    Title: "درباره من",
    description: "من یک توسعه‌دهنده فول‌استک هستم.",
    Years: "۲+",
    ProjectCount: "۱۰+",
    Technologies: "۵+",
    Commitment: "۱۰۰٪",
  };

  const experienceData = {
    title: "تجربه کاری",
    subtitle: "مسیر حرفه‌ای من",
    internshipTitle: "کارآموز IT",
    internshipCompany: "شرکت کاوه نگار",
    internshipDesc1: "پیکربندی و نگهداری شبکه",
    internshipDesc2: "عیب‌یابی و تعمیر سخت‌افزار",
    internshipDesc3: "نصب و مدیریت Deep Freeze",
    internshipDesc4: "راه‌اندازی پرینتر و نصب درایور",
    internshipDesc5: "بهینه‌سازی سیستم و پشتیبانی کاربران",
    freelanceTitle: "پروژه‌های فریلنسری",
    freelanceCompany: "خوداشتغالی",
    freelanceDesc1: "توسعه ۳ اپلیکیشن فول‌استک",
    freelanceDesc2: "ساخت وب‌سایت‌های ریسپانسیو با Next.js و Tailwind",
    freelanceDesc3: "پیاده‌سازی APIهای RESTful و اتصال به دیتابیس",
    freelanceDesc4: "تحویل به‌موقع پروژه‌ها با رضایت مشتری",
    schoolTitle: "رئیس بخش IT",
    schoolCompany: "دبیرستان فنی",
    schoolLocation: "ایران",
    schoolDesc1: "مدیریت زیرساخت IT مدرسه",
    schoolDesc2: "راه‌اندازی و نگهداری شبکه",
    schoolDesc3: "نصب و پیکربندی Deep Freeze",
    schoolDesc4: "عیب‌یابی سخت‌افزار و نرم‌افزار",
    schoolDesc5: "کمک به معلمان و دانش‌آموزان در مشکلات فنی",
    schoolDesc6: "مدیریت پرینتر و دستگاه‌های جانبی",
    internship: "کارآموزی",
    freelance: "فریلنسری",
    education: "تحصیلات",
  };

  const educationData = {
    title: "تحصیلات",
    degree1: "کارشناسی علوم کامپیوتر",
    institution1: "دانشگاه صنعتی",
    degree2: "توسعه فول‌استک وب",
    institution2: "بوت‌کمپ آنلاین",
  };

  const servicesData = {
    title: "خدمات",
    webDev: "توسعه وب",
    webDevDesc: "ساخت اپلیکیشن‌های وب مدرن و ریسپانسیو",
    uiUx: "طراحی UI/UX",
    uiUxDesc: "ایجاد رابط‌های کاربری زیبا و کاربرپسند",
    backend: "توسعه بک‌اند",
    backendDesc: "توسعه راه‌حل‌های سمت سرور مقیاس‌پذیر",
  };

  // پاسخ‌های ثابت برای هر گزینه
  const getResponse = (intent: string): string => {
    switch (intent) {
      case "skills":
        const frontend = skillsData.groups.frontend.join(", ");
        const backend = skillsData.groups.backend.join(", ");
        const database = skillsData.groups.database.join(", ");
        const tools = skillsData.groups.tools.join(", ");
        const design = skillsData.groups.design.join(", ");
        return `مسعود یک توسعه‌دهنده فول‌استک با تخصص در چندین حوزه است:\n\n🎨 فرانت‌اند: ${frontend}\n⚙️ بک‌اند: ${backend}\n🗄️ دیتابیس: ${database}\n🛠️ ابزارها: ${tools}\n✨ طراحی: ${design}`;

      case "experience":
        return `مسعود ۲+ سال تجربه حرفه‌ای داره:\n\n🏢 **${experienceData.internshipTitle}** در ${experienceData.internshipCompany}\n   ${experienceData.internshipDesc1}\n\n💼 **${experienceData.freelanceTitle}**\n   ${experienceData.freelanceDesc1}\n\n🏫 **${experienceData.schoolTitle}** در ${experienceData.schoolCompany}\n   ${experienceData.schoolDesc1}`;

      case "projects":
        return `مسعود ۱۰+ پروژه ساخته که شامل:\n\n🛒 **پلتفرم فروشگاهی** - فروشگاه آنلاین کامل با سبد خرید، پرداخت و داشبورد مدیریت\n💻 **وب‌سایت نمونه کار** - همین وب‌سایتی که الان داری!\n📋 **API مدیریت تسک** - API RESTful با احراز هویت و آپدیت بلادرنگ\n📱 **کیت UI اپ موبایل** - کامپوننت‌های رابط کاربری کراس‌پلتفرم\n💬 **اپ چت بلادرنگ** - پیام‌رسانی با WebSocket و نمایش وضعیت\n📊 **داشبورد تحلیلی** - مصورسازی داده با نمودارها و متریک‌ها`;

      case "education":
        return `تحصیلات مسعود:\n\n🎓 **${educationData.degree1}**\n   ${educationData.institution1}\n\n📚 **${educationData.degree2}**\n   ${educationData.institution2}\n\nمدرک علوم کامپیوتر پایه‌های محکمی در الگوریتم‌ها، ساختارهای داده و اصول مهندسی نرم‌افزار بهش داده. بوت‌کمپ مهارت‌های عملی و دست‌اول توسعه فول‌استک رو بهش یاد داده.`;

      case "contact":
        return `راه‌های ارتباط با مسعود:\n\n📧 **ایمیل:** masoud@example.com\n\n💼 **لینکدین:** linkedin.com/in/masoudjafari\n🐙 **گیت‌هاب:** github.com/masoudjafari\n\nدر حال حاضر برای فرصت‌های جدید و پروژه‌های فریلنسری آماده هست.`;

      case "about":
        return `مسعود جعفری یک توسعه‌دهنده فول‌استک با علاقه زیاد هست:\n\n${aboutData.Years} سال تجربه داره، ${aboutData.ProjectCount} پروژه ساخته و با ${aboutData.Technologies}+ تکنولوژی کار کرده. روی ساخت اپلیکیشن‌های سریع، مقیاس‌پذیر و تمیز با تکنولوژی‌های مدرن مثل React، Next.js، TypeScript و Tailwind CSS تمرکز داره.`;

      case "services":
        return `مسعود طیف گسترده‌ای از خدمات ارائه می‌ده:\n\n🌐 **${servicesData.webDev}** - ${servicesData.webDevDesc}\n🎨 **${servicesData.uiUx}** - ${servicesData.uiUxDesc}\n⚙️ **${servicesData.backend}** - ${servicesData.backendDesc}\n\nدر کل چرخه توسعه از برنامه‌ریزی تا استقرار مهارت داره. هر پروژه شامل تست کامل، مستندات و پشتیبانی پس از راه‌اندازی هست.`;

      case "availability":
        return `مسعود در حال حاضر برای فرصت‌های جدید آماده هست! 🎉\n\nبرای موارد زیر در دسترس هست:\n✅ موقعیت‌های تمام‌وقت\n✅ پروژه‌های فریلنسری\n✅ کارهای قراردادی\n✅ مشاوره\n\nمی‌تونه فوری شروع کنه و برای همکاری از راه دور با مناطق زمانی مختلف انعطاف‌پذیر هست.`;

      case "greeting":
        return `سلام! 👋 من دستیار هوشمند مسعود هستم. می‌تونم درباره مهارت‌ها، تجربه، پروژه‌ها، تحصیلات و هر چیز دیگه‌ای که می‌خوای بدونی بهت بگم. از گزینه‌های زیر انتخاب کن!`;

      default:
        return `مطمئن نیستم درباره این موضوع، اما می‌تونم در این موارد کمک کنم:\n\n• مهارت‌های فنی و تکنولوژی‌های مسعود\n• تجربه کاری و سابقه‌اش\n• پروژه‌هایی که ساخته\n• تحصیلات و آموزش‌ها\n• خدماتی که ارائه می‌ده\n• اطلاعات تماس\n\nلطفاً یکی از گزینه‌های بالا رو انتخاب کن!`;
    }
  };

  const initWelcome = useCallback(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      setMessages([
        {
          id: crypto.randomUUID?.() || String(Date.now()),
          role: "assistant",
          content: labels.welcome,
          intent: "greeting",
        },
      ]);
    }
  }, [labels.welcome]);

  useEffect(() => {
    if (isOpen) {
      initWelcome();
    }
  }, [isOpen, initWelcome]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSuggestion = useCallback(
    (suggestion: string) => {
      setIsTyping(true);
      
      // تشخیص intent از متن پیشنهاد
      let intent = "fallback";
      if (suggestion.includes("مهارت")) intent = "skills";
      else if (suggestion.includes("تجربه")) intent = "experience";
      else if (suggestion.includes("پروژه")) intent = "projects";
      else if (suggestion.includes("تحصیلات")) intent = "education";
      else if (suggestion.includes("تماس")) intent = "contact";
      else if (suggestion.includes("درباره")) intent = "about";
      else if (suggestion.includes("خدمات")) intent = "services";
      else if (suggestion.includes("همکاری") || suggestion.includes("آماده")) intent = "availability";
      
      // اضافه کردن پیام کاربر
      const userMessage: Message = {
        id: crypto.randomUUID?.() || String(Date.now()),
        role: "user",
        content: suggestion,
        intent: intent as Intent,
      };
      setMessages((prev) => [...prev, userMessage]);
      
      // شبیه‌سازی تایپ
      const delay = 500 + Math.random() * 800;
      setTimeout(() => {
        const response = getResponse(intent);
        const assistantMessage: Message = {
          id: crypto.randomUUID?.() || String(Date.now() + 1),
          role: "assistant",
          content: response,
          intent: intent as Intent,
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setIsTyping(false);
      }, delay);
    },
    []
  );

  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), []);

  const themeClasses = {
    panel: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white",
    header: "bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700",
    suggestion: "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-700",
    icon: "text-zinc-500 dark:text-zinc-400",
    toggle: "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-lg shadow-zinc-500/20 dark:shadow-zinc-800/30 border border-zinc-200 dark:border-zinc-700",
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-12 md:right-20 md:left-auto z-[70] flex flex-col items-end gap-3">
      {isOpen && (
        <div
          className={`
            w-[90vw] sm:w-[380px] h-[520px]
            rounded-2xl border shadow-2xl
            flex flex-col overflow-hidden
            transition-all duration-300 md:origin-bottom-right origin-top-right
            ${themeClasses.panel}
          `}
        >
          <div className={`flex items-center justify-between px-4 py-3 ${themeClasses.header}`}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-500 dark:from-zinc-500 dark:to-zinc-400 flex items-center justify-center text-white text-xs font-bold">
                <Sparkles size={16} />
              </div>
              <div>
                <h3 className="text-sm font-semibold">
                  {labels.title}
                </h3>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  {labels.subtitle}
                </p>
              </div>
            </div>
            <button
              onClick={toggleOpen}
              className={`p-2 rounded-lg transition-all duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-800 ${themeClasses.icon}`}
            >
              <Minimize2 size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`
                    max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed
                    ${
                      message.role === "user"
                        ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-br-sm"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-bl-sm"
                    }
                  `}
                >
                  {message.content.split('\n').map((line, i) => {
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return <div key={i} className="font-semibold mt-1">{line.replace(/\*\*/g, '')}</div>;
                    }
                    if (line.startsWith('• ') || line.startsWith('✅') || line.startsWith('🏢') || line.startsWith('💼') || line.startsWith('🏫') || line.startsWith('🎓') || line.startsWith('📚') || line.startsWith('🛒') || line.startsWith('💻') || line.startsWith('📋') || line.startsWith('📱') || line.startsWith('💬') || line.startsWith('📊') || line.startsWith('🌐') || line.startsWith('🎨') || line.startsWith('⚙️') || line.startsWith('🗄️') || line.startsWith('🛠️') || line.startsWith('✨')) {
                      return <div key={i} className="ml-2">{line}</div>;
                    }
                    if (line.trim() === '') {
                      return <div key={i} className="h-2" />;
                    }
                    return <div key={i}>{line}</div>;
                  })}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm px-4 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* دکمه‌های ثابت - بدون کیبورد */}
          <div className="p-3 border-t border-zinc-200 dark:border-zinc-700">
            <div className="flex flex-wrap gap-2">
              {labels.suggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestion(suggestion)}
                  className={`
                    text-xs px-3 py-2 rounded-full border transition-all duration-200
                    hover:scale-105 active:scale-95
                    ${themeClasses.suggestion}
                  `}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <button
        onClick={toggleOpen}
        className={`
          p-4 rounded-full transition-all duration-300 hover:scale-110 active:scale-95
          ${themeClasses.toggle}
        `}
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}

export default memo(AIChat);