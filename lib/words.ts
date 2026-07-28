// lib/words.ts
export interface ExperienceItem {
  id: string;
  company: string;
  logo: string;
  role: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
}

export interface EducationItem {
  id: string;
  title: string;
  school: string;
  period: string;
  location: string;
  image: string;
  cover: string;
  description: string;
}

export interface SkillItem {
  name: string;
  icon: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  demoUrl: string;
  sourceUrl: string;
}

export interface ContactItem {
  title: string;
  description: string;
  telegramId: string;
}

export const words = {
  fa: {
    about: {
      name: "مسعود جعفری",
      title: "توسعه‌دهنده نرم‌افزار | کارآموز امروز - کار آفرین فردا",
      bio: "درود! من مسعود هستم. عاشق ساختن چیزهای جدید و کمک به مردم .",
      description: `برنامه‌نویس ام و کارم تبدیل مشکل به محصوله؛ با استفاده از ابزارهای مناسب. به نظرم ابزار مناسب ابزاری عه که اول تو اون لحظه مشکل رو حل کنه، ساده باشه و بعداً هم بشه توسعه‌ش داد. برای همین مهارت اصلی من، یادگیری سریع و استفاده درست از ابزارهاست.
بک‌گراند فنی من از هنرستان کامپیوتر و ۳ سال مسئولیت اتاق کامپیوتر شروع شد، با کارورزی تو کاوه‌نگار ادامه پیدا کرد و تا الان ۳ تا پروژه‌ی محصول‌محور واقعی رو جمع کردم. کارهای محول شده رو کامل و تو حداقل زمان تحویل میدم؛ مهارتم کار تو فضای پرفشار و ادامه دادن تو شرایط سخته و صبر و سرچ کردن قوی، برگ‌های برنده‌ام هستن. الانم دنبال کارآموزی تو یه شرکت خوبم تا این مسیر رو حرفه‌ای‌تر ادامه بدم. `,
    },
    experience: {
      title: "تجربه‌های کاری",
      items: [
        {
          id: "exp1",
          company: "کاوه نگار",
          logo: "/Experience.svg",
          role: "کارآموز فرانت اند ",
          period: "1403| 3 ماه",
          location: "تهران، ایران",
          description:
            "تکمیل دفترچه کارورزی مدرسه به مدت سه ماه ، حضور در جلسات فنی آشنایی با محیط و انجام تسک های کوچک",
          achievements: [
            "شرکت در جلسات روزانه دیدن مشکلات واقعی محصول با کاربران بالا ، استفاده آشنایی با محیط اولیه چالش ها ",
            "تست قسمت های مختلف سایت واسه رسپانسیو بودن نوشتن گزارش و تحویل به سرپرست تیم",
            "دلیل ترک ام به خاطر همزمانی سال کنکور و عمل جراحی بود و البته پر شدن تمام صفحات دفترچه کارورزی ام",
          ],
        },
        {
          id: "exp2",
          company: "هنرستان باهنر",
          logo: "/images/Bahonar.jpg",
          role: "مسئول اتاق سایت کامپیوتری و توسعه دهنده وردپرس",
          period: "۲۰۱۸ - ۲۰۲۲",
          location: "تهران",
          description:
            "تکمیل سایت های وردپرسی و نگهداری از سیتم های اتاق کامپیوتر ، شبکه کردن تمام سیتم استفاده از یه پرینتر  و.....",
          achievements: [
            "مدیریت کامل چرخه استقرار وب‌سایت (Deployment) شامل خرید دامنه، پیکربندی هاستینگ و اتصال DNS",
            "توسعه، سفارشی‌سازی و راه‌اندازی وب‌سایت‌های مبتنی بر وردپرس (WordPress)",
            "بهینه‌سازی و مدیریت پایگاه داده از طریق نوشتن و اجرای کوئری‌های SQL جهت استخراج و تحلیل داده‌ها",
          ],
        },
      ],
      achievementsLabel: "دستاوردها",
    },
    education: {
      title: "تحصیلات",
      items: [
        {
          id: "edu1",
          title: "کارشناسی  مهندسی کامپیوتر",
          school: "دانشگاه  ایرانیان",
          period:
            "2023 - ادرحال تحصیل مجازی دنبال کار تمام وقت ام ترم 5 ام هستم",
          location: "تهران، ایران",
          image: "/images/Iranian.jpg",
          cover: "/images/StudentCard.jpg",
          description:
            "تلفیق دانش آکادمیک کامپیوتر با تجربه‌ی عملیِ توسعه‌ی محصول و استقرار سیستم‌ها",
        },
        {
          id: "edu2",
          title: "دیپلم تولید و توسعه پایگاه",
          school: "هنرستان شهید باهنر",
          period: "1400 - 1403",
          location: "تهران، ایران",
          image: "/images/Bahonar.jpg",
          cover: "/images/Diplom.jpg",
          description:
            "یادگیری مفاهیم ، شبکه ، دیتابیس ، وردپرس و....",
        },
      ],
    },
    skills: {
      title: "ابزار هایی که باهاشون کار کردم",
      items: [
        { name: "React", icon: "/images/react.png" },
        { name: "Next.js", icon: "/images/next.js.png" },
        { name: "TypeScript", icon: "/images/typescript.png" },
        { name: "JavaScript", icon: "/images/javascript.png" },
        { name: "Node.js", icon: "/images/nodejs.png" },
        { name: "Git", icon: "/images/git.png" },
        { name: "Figma", icon: "/images/figma.png" },
      ],
    },
    projects: {
      title: "پروژه‌ها",
      items: [
        {
          id: "prj1",
          title: "اتاق فرار",
          description:
            "سایت اتاق فرار با قابلیت رزور اتاق در تاریخ رو روز مشخص به همراه پنل ادمین جهت مشاهده افراد که بلیط گرفتن و تعیین وضعیت",
          image: "/video/automatic-chat.mp4",
          tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "lucida-react-icons", "lottie-animations"],
          demoUrl: "https://template-collection-kappa.vercel.app/Templates/escape-rooms",
          sourceUrl: "https://github.com/Masoud2025/Template-Collection/tree/main/app/Templates/escape-rooms",
        },
        {
          id: "prj2",
          title: "فیلم شو",
          description:
            "وب سایت تماشای فیلم ، صفحه خرید اشتراک ، صفحه ورود ، صفحه اختصاصی هر فیلم",
          image: "/video/bento-grid.mp4",
          tech: ["React", "Next.js", "TypeScript",  "Tailwind CSS","Swiper","PWA"],
          demoUrl: "https://template-collection-kappa.vercel.app/Templates/FilmShow",
          sourceUrl: "https://github.com/Masoud2025/Template-Collection/tree/main/app/Templates/FilmShow",
        },
        {
          id: "prj3",
          title: "سایت مشابه پیج ایستاگرام",
          description:
            "    دارای قابلیت هایلایت پیج، و ذخیره کردن پست ،دیسکریپیشن ، پنجره های استوری،3 زبانه اس ، و دکمه تغییر تم اش با یه انمیشین خوشگل دایره ای تغییر میده تم رو مشابه اش تو تلگرام هست",
          image: "/video/chat-collect.mp4",
          tech: ["React", "Node.js", "Socket.io", "MongoDB", "Tailwind CSS"],
          demoUrl: "https://example.com/demo",
          sourceUrl: "https://github.com/masoudjafari/chat",
        },
        {
          id: "prj4",
          title: "وب سایت 3 بعدی مکعبی مخصوص خاص پسندا",
          description: "سیستم مدیریت محتوای کامل با ویرایشگر و مدیریت کاربران",
          image: "/video/openai-demo.mp4",
          tech: [
            "Next.js",
            "TypeScript",
            "Prisma",
            "PostgreSQL",
            "Tailwind CSS",
          ],
          demoUrl: "https://example.com/demo",
          sourceUrl: "https://github.com/masoudjafari/cms",
        },
        {
          id: "prj5",
          title: "فروشگاه کتاب آنلاین",
          description:
            " صفحه اول یه کتاب فروشی انلاین کاملا رسپانسیو   ",
          image: "/video/ketaback.mp4",
          tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "MAterial UI MUI"],
          demoUrl: "https://example.com/demo",
          sourceUrl: "https://github.com/masoudjafari/shop",
        },
        {
          id: "prj6",
          title: "رسانه خبری خودرولوژی",
          description:
            "  یه سایت خبری کامل ، نمایش قیمت لحظه ای ماشین ها و قابلیت تب بندی اخبار ، 2 تم داره ،و رسپانسیو و خیلی سریع قسمت تبلیغات شما در اینجا قرار میگرد داره",
          image: "/video/khodrology.mp4",
          tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
          demoUrl: "https://example.com/demo",
          sourceUrl: "https://github.com/masoudjafari/shop",
        },
        {
          id: "prj7",
          title: "اپ نیازمندی های هویج جان",
          description:
            "یه سیستم خرید فروش جنس دست دوم ، دارای چت و فیل تقیمت ارازن ترین و گران ترین و صفحه پروفایل ",
          image: "/video/divar-copy.mp4",
          tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
          demoUrl: "https://example.com/demo",
          sourceUrl: "https://github.com/masoudjafari/shop",
        },
         {
          id: "prj8",
          title: "لندینگ سایت شخصی",
          description:
            "قالب پورتفولیو شخصی جهت تمرین  ساخت طرح و حس گیرایی سایت بدون طراح ",
          image: "/video/portfolio.mp4",
          tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
          demoUrl: "https://example.com/demo",
          sourceUrl: "https://github.com/masoudjafari/shop",
        },
        {
          id: "prj9",
          title: "هشتیوا",
          description:
            "  سایت دستیار مدیریت اکانت های فضای مجازی شما ، ایسنتاگرام ، با قابلیت یخ شکن دایرکت و پنل  و داشبورد صفحه وردو فراموشی رمز و..",
          image: "/video/hashtiva.mp4",
          tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
          demoUrl: "https://example.com/demo",
          sourceUrl: "https://github.com/masoudjafari/shop",
        },
        {
          id: "prj10",
          title: "یوتوب کلاب",
          description:
            "یک فروشگاه آنلاین کامل با قابلیت پرداخت و مدیریت محصولات و صفحه ادمین و سیستم ثبت آگهی و گردونه شانس اختصاصی که تخفیف اش رو سبد اعمال میشه",
          image: "/video/YTC.mp4",
          tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
          demoUrl: "https://example.com/demo",
          sourceUrl: "https://github.com/masoudjafari/shop",
        },
        {
          id: "prj11",
          title: "پورتفولیو مشابه ویندوز 11",
          description:
            "یه بازی مار داره توش یه مینی اپ تو دو لیست داره داخلش و قرار بود پوتفولیو کامل  ویندزو 11 بشه اما نصفه ول شد اون قابلیت پنجره و درگ و و داره",
          image: "/video/windows-portfolio.mp4",
          tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
          demoUrl: "https://example.com/demo",
          sourceUrl: "https://github.com/masoudjafari/shop",
        },
        {
          id: "prj12",
          title: "قالب سایت شخصی",
          description:
            "رو قسمت عکس هیرو بری ماوس هاور بشه میخنده یارو و اینه که 2 زبانه و 2 تم هم هستش ",
          image: "/video/portfolio2.mp4",
          tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
          demoUrl: "https://example.com/demo",
          sourceUrl: "https://github.com/masoudjafari/shop",
        },
        {
          id: "prj13",
          title: "فروشگاه آنلاین",
          description:
            "یک فروشگاه آنلاین کامل با قابلیت پرداخت و مدیریت محصولات",
          image: "/video/flywitmasoud.mp4",
          tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
          demoUrl: "https://example.com/demo",
          sourceUrl: "https://github.com/masoudjafari/shop",
        },
      ],
    },
    contact: {
      title: "تماس با من",
      description: "برای ارتباط سریع‌تر، از طریق تلگرام با من در تماس باشید.",
      telegramId: "masoudjafari",
    },
  },
  en: {
    about: {
      name: "Masoud Jafari",
      title: "Software Developer | Intern Today - Entrepreneur Tomorrow",
      bio: "Hi! I'm Masoud. I love building new things and helping people.",
      description: `I'm a developer, and my job is turning problems into products using the right tools. In my opinion, a proper tool is one that solves the immediate problem simply and remains scalable for the future. That's why my core skill is fast learning and the right utilization of tools.
My technical background started with a computer vocational high school and 3 years of managing the computer lab, followed by an internship at Kavenegar, and so far, I have delivered 3 real product-oriented projects. I deliver assigned tasks completely and in minimum time; my skill lies in working under high-pressure environments and persevering through tough conditions, backed by patience and strong searching skills. I am currently looking for an internship at a great company to continue this path more professionally.`,
    },
    experience: {
      title: "Work Experience",
      items: [
        {
          id: "exp1",
          company: "Kavenegar",
          logo: "/Experience.svg",
          role: "Frontend Intern",
          period: "2024 | 3 Months",
          location: "Tehran, Iran",
          description:
            "Completed the high school internship logbook for three months, participated in technical meetings, got familiar with the environment, and completed minor tasks.",
          achievements: [
            "Participated in daily meetings to witness real product issues with high user traffic, gaining primary familiarity with environment challenges.",
            "Tested various parts of the website for responsiveness, wrote reports, and delivered them to the team lead.",
            "Reason for leaving was the overlap with the university entrance exam (Konkur) year and a surgical operation, along with fully completing my internship logbook.",
          ],
        },
        {
          id: "exp2",
          company: "Bahonar Vocational School",
          logo: "/images/Bahonar.jpg",
          role: "Computer Lab Manager & WordPress Developer",
          period: "2018 - 2022",
          location: "Tehran, Iran",
          description:
            "Developed WordPress websites and maintained computer lab systems, networking all systems to share a single printer, etc.",
          achievements: [
            "Full management of the website deployment lifecycle, including domain purchasing, hosting configuration, and DNS connection.",
            "Development, customization, and launching of WordPress-based websites.",
            "Database optimization and management by writing and executing SQL queries for data extraction and analysis.",
          ],
        },
      ],
      achievementsLabel: "Achievements",
    },
    education: {
      title: "Education",
      items: [
        {
          id: "edu1",
          title: "B.Sc. in Computer Engineering",
          school: "Iranian University",
          period:
            "2023 - Present (Virtual Education, Looking for full-time work, 5th Semester)",
          location: "Tehran, Iran",
          image: "/images/Iranian.jpg",
          cover: "/images/StudentCard.jpg",
          description:
            "Integrating academic computer science knowledge with practical experience in product development and system deployment.",
        },
        {
          id: "edu2",
          title: "Diploma in Database Production and Development",
          school: "Shahid Bahonar Vocational High School",
          period: "2021 - 2024",
          location: "Tehran, Iran",
          image: "/images/Bahonar.jpg",
          cover: "/images/Diplom.jpg",
          description:
            "Learning core concepts of networks, databases, WordPress, etc.",
        },
      ],
    },
    skills: {
      title: "Tools I Worked With",
      items: [
        { name: "React", icon: "/images/react.png" },
        { name: "Next.js", icon: "/images/next.js.png" },
        { name: "TypeScript", icon: "/images/typescript.png" },
        { name: "JavaScript", icon: "/images/javascript.png" },
        { name: "Node.js", icon: "/images/nodejs.png" },
        { name: "Git", icon: "/images/git.png" },
        { name: "Figma", icon: "/images/figma.png" },
      ],
    },
    projects: {
      title: "Projects",
      items: [
        {
          id: "prj1",
          title: "Escape Room",
          description:
            "An escape room website featuring booking capabilities for specific dates and days, along with an admin panel to view ticket holders and manage booking statuses.",
          image: "/video/automatic-chat.mp4",
          tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "lucida-react-icons", "lottie-animations"],
          demoUrl: "https://template-collection-kappa.vercel.app/Templates/escape-rooms",
          sourceUrl: "https://github.com/Masoud2025/Template-Collection/tree/main/app/Templates/escape-rooms",
        },
        {
          id: "prj2",
          title: "FilmShow",
          description:
            "A movie streaming website including a subscription purchase page, login page, and exclusive pages for each movie.",
          image: "/video/bento-grid.mp4",
          tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Swiper", "PWA"],
          demoUrl: "https://template-collection-kappa.vercel.app/Templates/FilmShow",
          sourceUrl: "https://github.com/Masoud2025/Template-Collection/tree/main/app/Templates/FilmShow",
        },
        {
          id: "prj3",
          title: "Instagram-like Web App",
          description:
            "Features page highlights, post saving, descriptions, story modals, 3-language support, and a smooth circular animation theme-toggle switch similar to Telegram.",
          image: "/video/chat-collect.mp4",
          tech: ["React", "Node.js", "Socket.io", "MongoDB", "Tailwind CSS"],
          demoUrl: "https://example.com/demo",
          sourceUrl: "https://github.com/masoudjafari/chat",
        },
        {
          id: "prj4",
          title: "3D Cube Website for Elite Taste",
          description: "A complete content management system with a rich text editor and user management.",
          image: "/video/openai-demo.mp4",
          tech: [
            "Next.js",
            "TypeScript",
            "Prisma",
            "PostgreSQL",
            "Tailwind CSS",
          ],
          demoUrl: "https://example.com/demo",
          sourceUrl: "https://github.com/masoudjafari/cms",
        },
        {
          id: "prj5",
          title: "Online Book Store",
          description:
            "A fully responsive landing page for an online bookstore.",
          image: "/video/ketaback.mp4",
          tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Material UI MUI"],
          demoUrl: "https://example.com/demo",
          sourceUrl: "https://github.com/masoudjafari/shop",
        },
        {
          id: "prj6",
          title: "Khodrology News Media",
          description:
            "A complete news platform featuring real-time car price tracking, tabbed news feeds, dual themes, responsive design, and a dedicated rapid 'Your Ad Here' banner placement section.",
          image: "/video/khodrology.mp4",
          tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
          demoUrl: "https://example.com/demo",
          sourceUrl: "https://github.com/masoudjafari/shop",
        },
        {
          id: "prj7",
          title: "Havij Jan Classified Ads App",
          description:
            "A second-hand goods trading platform equipped with live chat, lowest/highest price filters, and personal user profile pages.",
          image: "/video/divar-copy.mp4",
          tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
          demoUrl: "https://example.com/demo",
          sourceUrl: "https://github.com/masoudjafari/shop",
        },
        {
          id: "prj8",
          title: "Personal Landing Portfolio",
          description:
            "A personal portfolio template aimed at practicing custom layout creation and capturing visual aesthetics without a dedicated UI designer.",
          image: "/video/portfolio.mp4",
          tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
          demoUrl: "https://example.com/demo",
          sourceUrl: "https://github.com/masoudjafari/shop",
        },
        {
          id: "prj9",
          title: "Hashtiva",
          description:
            "A social media account assistant platform for Instagram featuring a direct message proxy tool, management panel, comprehensive dashboard, login page, and password recovery flow.",
          image: "/video/hashtiva.mp4",
          tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
          demoUrl: "https://example.com/demo",
          sourceUrl: "https://github.com/masoudjafari/shop",
        },
        {
          id: "prj10",
          title: "YouTube Club",
          description:
            "A comprehensive online store featuring payment gateways, product administration, an admin portal, ad submission flows, and a custom wheel of fortune that applies discounts directly to the cart.",
          image: "/video/YTC.mp4",
          tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
          demoUrl: "https://example.com/demo",
          sourceUrl: "https://github.com/masoudjafari/shop",
        },
        {
          id: "prj11",
          title: "Windows 11 Inspired Portfolio",
          description:
            "Includes a playable snake game and a mini todo-list app inside. Originally intended to mimic a full Windows 11 interface, it features functional modal window components and draggable behaviors.",
          image: "/video/windows-portfolio.mp4",
          tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
          demoUrl: "https://example.com/demo",
          sourceUrl: "https://github.com/masoudjafari/shop",
        },
        {
          id: "prj12",
          title: "Personal Site Template",
          description:
            "Features a mouse-hover interaction on the hero image where the character smiles, supporting bilingual translation and dual themes.",
          image: "/video/portfolio2.mp4",
          tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
          demoUrl: "https://example.com/demo",
          sourceUrl: "https://github.com/masoudjafari/shop",
        },
        {
          id: "prj13",
          title: "Online E-Commerce Store",
          description:
            "A fully completed online store with payment processing integration and product management features.",
          image: "/video/flywitmasoud.mp4",
          tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
          demoUrl: "https://example.com/demo",
          sourceUrl: "https://github.com/masoudjafari/shop",
        },
      ],
    },
    contact: {
      title: "Contact Me",
      description: "For faster communication, reach out to me on Telegram.",
      telegramId: "masoudjafari",
    },
  },
};