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
      title: "توسعه‌دهنده نرم‌افزار | کارآموز - کارآفرین",
      bio: "سلام! من مسعود هستم. عاشق ساختن چیزهای جدید و کمک به مردم هستم.",
      description: `توسعه دهنده وب ، نیاز ها و مشکلات رو  حل میکنم و تو این مسیر از هر ابزاری که کمک  کنه استفاده میکنم. به نظرم بهترین راه ساده ترین و سریع ترین راهی هست که نیاز اون لحظه رو برطرف کنه و پروژه دچار بدهی فنی نکنه. فارق از موج های ترند بازی .`,
    },
    experience: {
      title: "تجربه‌های کاری",
      items: [
        {
          id: "exp1",
          company: "کاوه نگار",
          logo: "/Experience.svg",
          role: "بنیان‌گذار و توسعه‌دهنده",
          period: "۲۰۲۲ - اکنون",
          location: "تهران، ایران",
          description: "ساخت و مقیاس‌سازی محصولات SaaS از صفر تا صد.",
          achievements: ["راه‌اندازی ۳ محصول موفق", "رشد ۲۰۰٪ کاربران"],
        },
        {
          id: "exp2",
          company: "شرکت‌های بزرگ فناوری",
          logo: "💻",
          role: "توسعه‌دهنده نرم‌افزار",
          period: "۲۰۱۸ - ۲۰۲۲",
          location: "سیلیکون ولی، آمریکا",
          description: "توسعه سیستم‌های مقیاس‌پذیر با جدیدترین تکنولوژی‌ها.",
          achievements: [
            "بهبود عملکرد سیستم تا ۵۰٪",
            "همکاری با تیم‌های بین‌المللی",
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
          title: "کارشناسی ارشد علوم کامپیوتر",
          school: "دانشگاه صنعتی شریف",
          period: "۲۰۱۶ - ۲۰۱۸",
          location: "تهران، ایران",
          image: "/images/sharif.jpg",
          description:
            "گرایش هوش مصنوعی و یادگیری ماشین. پایان‌نامه با موضوع پردازش زبان طبیعی.",
        },
        {
          id: "edu2",
          title: "کارشناسی مدیریت بازرگانی",
          school: "دانشگاه تهران",
          period: "۲۰۱۲ - ۲۰۱۶",
          location: "تهران، ایران",
          image: "/images/tehran.jpg",
          description:
            "گرایش بازاریابی و کارآفرینی. پروژه‌های متعدد در حوزه استارتاپ‌ها.",
        },
      ],
    },
    skills: {
      title: "مهارت‌ها",
      items: [
        { name: "React", icon: "⚛️" },
        { name: "Next.js", icon: "▲" },
        { name: "TypeScript", icon: "📘" },
        { name: "JavaScript", icon: "💛" },
        { name: "Node.js", icon: "🟢" },
        { name: "Python", icon: "🐍" },
        { name: "Docker", icon: "🐳" },
        { name: "AWS", icon: "☁️" },
        { name: "PostgreSQL", icon: "🐘" },
        { name: "MongoDB", icon: "🍃" },
        { name: "Git", icon: "📚" },
        { name: "Figma", icon: "🎨" },
      ],
    },
    projects: {
      title: "پروژه‌ها",
      items: [
        {
          id: "prj1",
          title: "فروشگاه آنلاین",
          description:
            "یک فروشگاه آنلاین کامل با قابلیت پرداخت و مدیریت محصولات",
          image: "/video/automatic-chat.mp4",
          tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
          demoUrl: "https://example.com/demo",
          sourceUrl: "https://github.com/masoudjafari/shop",
        },
        {
          id: "prj2",
          title: "داشبورد مدیریت",
          description:
            "داشبورد تحلیل داده با نمودارهای تعاملی و مدیریت کاربران",
          image: "/video/bento-grid.mp4",
          tech: ["React", "Next.js", "TypeScript", "Chart.js", "Tailwind CSS"],
          demoUrl: "https://example.com/demo",
          sourceUrl: "https://github.com/masoudjafari/dashboard",
        },
        {
          id: "prj3",
          title: "اپلیکیشن چت",
          description:
            "اپلیکیشن چت آنلاین با قابلیت پیام‌رسانی لحظه‌ای و گروه‌ها",
          image: "/video/chat-collect.mp4",
          tech: ["React", "Node.js", "Socket.io", "MongoDB", "Tailwind CSS"],
          demoUrl: "https://example.com/demo",
          sourceUrl: "https://github.com/masoudjafari/chat",
        },
        {
          id: "prj4",
          title: "سیستم مدیریت محتوا",
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
      title: "Software Engineer | Entrepreneur",
      bio: "Hi, I'm Masoud. I love building things and helping people.",
      description: `Frontend Developer focused on React, Next.js, and TypeScript.Building fast, modern, and user-friendly web experiences.`,
    },
    experience: {
      title: "Work Experience",
      items: [
        {
          id: "exp1",
          company: "Kavenegar",
          logo: "/Experience.svg",
          role: "Founder & Developer",
          period: "2022 - Present",
          location: "Tehran, Iran",
          description: "Building and scaling SaaS products from zero to one.",
          achievements: [
            "Launched 3 successful products",
            "200% user growth in 6 months",
          ],
        },
        {
          id: "exp2",
          company: "Big Tech Companies",
          logo: "💻",
          role: "Software Engineer",
          period: "2018 - 2022",
          location: "Silicon Valley, USA",
          description:
            "Developed scalable systems using cutting-edge technologies.",
          achievements: [
            "Improved system performance by 50%",
            "Collaborated with international teams",
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
          title: "M.Sc. in Computer Science",
          school: "Sharif University of Technology",
          period: "2016 - 2018",
          location: "Tehran, Iran",
          image: "/images/sharif.jpg",
          description:
            "Specialized in AI and Machine Learning. Thesis on Natural Language Processing.",
        },
        {
          id: "edu2",
          title: "B.Sc. in Business Administration",
          school: "University of Tehran",
          period: "2012 - 2016",
          location: "Tehran, Iran",
          image: "/images/tehran.jpg",
          description:
            "Specialized in Marketing and Entrepreneurship. Multiple projects in startups.",
        },
      ],
    },
    skills: {
      title: "Tools I worked with it",
      items: [
        { name: "React", icon: "⚛️" },
        { name: "Next.js", icon: "▲" },
        { name: "TypeScript", icon: "📘" },
        { name: "JavaScript", icon: "💛" },
        { name: "Node.js", icon: "🟢" },
        { name: "Python", icon: "🐍" },
        { name: "Docker", icon: "🐳" },
        { name: "AWS", icon: "☁️" },
        { name: "PostgreSQL", icon: "🐘" },
        { name: "MongoDB", icon: "🍃" },
        { name: "Git", icon: "📚" },
        { name: "Figma", icon: "🎨" },
      ],
    },
    projects: {
      title: "Projects",
      items: [
        {
          id: "prj1",
          title: "Online Store",
          description:
            "A complete online store with payment and product management",
          image: "/video/automatic-chat.mp4",
          tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
          demoUrl: "https://example.com/demo",
          sourceUrl: "https://github.com/masoudjafari/shop",
        },
        {
          id: "prj2",
          title: "Admin Dashboard",
          description:
            "Data analytics dashboard with interactive charts and user management",
          image: "/video/bento-grid.mp4",
          tech: ["React", "Next.js", "TypeScript", "Chart.js", "Tailwind CSS"],
          demoUrl: "https://example.com/demo",
          sourceUrl: "https://github.com/masoudjafari/dashboard",
        },
        {
          id: "prj3",
          title: "Chat App",
          description:
            "Online chat app with real-time messaging and group features",
          image: "/video/chat-collect.mp4",
          tech: ["React", "Node.js", "Socket.io", "MongoDB", "Tailwind CSS"],
          demoUrl: "https://example.com/demo",
          sourceUrl: "https://github.com/masoudjafari/chat",
        },
        {
          id: "prj4",
          title: "CMS",
          description:
            "Complete content management system with editor and user management",
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
      ],
    },
    contact: {
      title: "Contact Me",
      description: "For faster communication, reach out to me on Telegram.",
      telegramId: "masoudjafari",
    },
  },
};
