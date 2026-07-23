"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { MessageCircle, Minimize2, Send, X, Sparkles } from "lucide-react";
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
  | "tech_detail"
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
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [context, setContext] = useState<ConversationContext>({
    followUpCount: 0,
    askedAbout: [],
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const initializedRef = useRef(false);

  const labels = t.aiChat || {
    title: "AI Assistant",
    subtitle: "Ask me anything about Masoud",
    placeholder: "Type your question...",
    send: "Send",
    typing: "Typing...",
    welcome: "Hi! I'm an AI assistant. Ask me anything about Masoud Jafari — his skills, experience, projects, or background.",
    suggestions: [
      "What are Masoud's main skills?",
      "Tell me about his experience",
      "What projects has he built?",
      "What is his education background?",
      "How can I contact him?",
    ],
    fallback: "I don't have specific information about that, but feel free to ask about Masoud's skills, experience, projects, or education.",
    answers: {
      skills: "",
      experience: "",
      projects: "",
      education: "",
      contact: "",
      about: "",
    },
  };

  const skillsData = t.Skills || {
    title: "My Skills",
    groups: {
      frontend: ["React / Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML / CSS"],
      backend: ["Node.js", "Express.js"],
      database: ["MongoDB", "PostgreSQL", "Prisma"],
      tools: ["Git / GitHub", "Docker", "Vercel / Netlify"],
      design: ["UI/UX Design", "Figma"],
    },
  };

  const aboutData = t.About || {
    Title: "AboutMe",
    description: "I'm a passionate Full-Stack Developer.",
    Years: "2+",
    ProjectCount: "10+",
    Technologies: "5+",
    Commitment: "100%",
  };

  const experienceData = t.Experience || {
    title: "Experience",
    subtitle: "My professional journey",
    internshipTitle: "IT Intern",
    internshipCompany: "Kaveh Negar Company",
    internshipDesc1: "Network configuration and maintenance",
    internshipDesc2: "Hardware troubleshooting and repair",
    internshipDesc3: "Deep Freeze installation and management",
    internshipDesc4: "Printer setup and driver installation",
    internshipDesc5: "System optimization and user support",
    freelanceTitle: "Freelance Projects",
    freelanceCompany: "Self-Employed",
    freelanceDesc1: "Developed 3 full-stack web applications",
    freelanceDesc2: "Built responsive websites with Next.js and Tailwind",
    freelanceDesc3: "Implemented RESTful APIs and database integration",
    freelanceDesc4: "Delivered projects on time with client satisfaction",
    schoolTitle: "IT Department Head",
    schoolCompany: "Technical High School",
    schoolLocation: "Iran",
    schoolDesc1: "Managed school's IT infrastructure",
    schoolDesc2: "Network setup and maintenance",
    schoolDesc3: "Installed and configured Deep Freeze",
    schoolDesc4: "Hardware and software troubleshooting",
    schoolDesc5: "Assisted teachers and students with technical issues",
    schoolDesc6: "Printer and peripheral device management",
    internship: "Internship",
    freelance: "Freelance",
    education: "Education",
  };

  const educationData = t.Education || {
    title: "Education",
    degree1: "Bachelor of Computer Science",
    institution1: "University of Technology",
    degree2: "Full-Stack Web Development",
    institution2: "Online Bootcamp",
  };

  const servicesData = t.Services || {
    title: "Services",
    webDev: "Web Development",
    webDevDesc: "Building modern, responsive web applications",
    uiUx: "UI/UX Design",
    uiUxDesc: "Creating beautiful and intuitive interfaces",
    backend: "Backend Development",
    backendDesc: "Developing scalable server-side solutions",
  };

  const contactData = t.ContactMe || {
    Header: "Contact Me",
    Name: "Name",
    Subject: "Subject",
    Button: "Send Message",
    namePlaceholder: "Enter your name",
    subjectPlaceholder: "Enter subject",
  };

  const detectIntent = (text: string): Intent => {
    const q = text.toLowerCase();

    if (/^(hi|hello|hey|greetings|سلام|مرحبا|هلا|هلو)/.test(q)) return "greeting";

    if (
      q.includes("skill") ||
      q.includes("technology") ||
      q.includes("tech") ||
      q.includes("تکنولوژی") ||
      q.includes("مهارت") ||
      q.includes("Fähigkeit") ||
      q.includes("tool") ||
      q.includes("framework") ||
      q.includes("library") ||
      q.includes("language") ||
      q.includes("programming")
    ) {
      return "skills";
    }

    if (
      q.includes("experience") ||
      q.includes("work") ||
      q.includes("job") ||
      q.includes("career") ||
      q.includes("سابقه") ||
      q.includes("تجربه") ||
      q.includes("Erfahrung") ||
      q.includes("intern") ||
      q.includes("freelance") ||
      q.includes("company") ||
      q.includes("position") ||
      q.includes("role")
    ) {
      return "experience";
    }

    if (
      q.includes("project") ||
      q.includes("built") ||
      q.includes("پروژه") ||
      q.includes("ساخته") ||
      q.includes("Projekt") ||
      q.includes("portfolio") ||
      q.includes("application") ||
      q.includes("website") ||
      q.includes("e-commerce") ||
      q.includes("chat") ||
      q.includes("dashboard")
    ) {
      return "projects";
    }

    if (
      q.includes("education") ||
      q.includes("degree") ||
      q.includes("university") ||
      q.includes("study") ||
      q.includes("تحصیل") ||
      q.includes("دیپلم") ||
      q.includes("Bildung") ||
      q.includes("bootcamp") ||
      q.includes("school") ||
      q.includes("college")
    ) {
      return "education";
    }

    if (
      q.includes("contact") ||
      q.includes("email") ||
      q.includes("reach") ||
      q.includes("hire") ||
      q.includes("تماس") ||
      q.includes("ایمیل") ||
      q.includes("Kontakt") ||
      q.includes("phone") ||
      q.includes("linkedin") ||
      q.includes("github")
    ) {
      return "contact";
    }

    if (
      q.includes("who") ||
      q.includes("about") ||
      q.includes("tell me") ||
      q.includes("معرفی") ||
      q.includes("درباره") ||
      q.includes("who is") ||
      q.includes("background") ||
      q.includes("introduce")
    ) {
      return "about";
    }

    if (
      q.includes("service") ||
      q.includes("offer") ||
      q.includes("سرویس") ||
      q.includes("can you do") ||
      q.includes("help with") ||
      q.includes("develop") ||
      q.includes("design")
    ) {
      return "services";
    }

    if (
      q.includes("react") ||
      q.includes("next.js") ||
      q.includes("typescript") ||
      q.includes("tailwind") ||
      q.includes("node") ||
      q.includes("express") ||
      q.includes("mongodb") ||
      q.includes("postgresql") ||
      q.includes("prisma") ||
      q.includes("docker") ||
      q.includes("git")
    ) {
      return "tech_detail";
    }

    if (
      q.includes("available") ||
      q.includes("hire") ||
      q.includes("free") ||
      q.includes("open to work") ||
      q.includes("freelance") ||
      q.includes("collaborate")
    ) {
      return "availability";
    }

    if (
      q.includes("price") ||
      q.includes("cost") ||
      q.includes("rate") ||
      q.includes("budget") ||
      q.includes("payment") ||
      q.includes("expensive") ||
      q.includes("cheap")
    ) {
      return "pricing";
    }

    if (
      q.includes("thank") ||
      q.includes("thanks") ||
      q.includes("good") ||
      q.includes("great") ||
      q.includes("awesome") ||
      q.includes("amazing") ||
      q.includes("nice") ||
      q.includes("cool") ||
      q.includes("perfect")
    ) {
      return "smalltalk";
    }

    return "fallback";
  };

  const generateSmartResponse = useCallback(
    (text: string, intent: Intent, ctx: ConversationContext): string => {
      const answers = labels.answers || {};
      const followUpDepth = ctx.followUpCount;

      switch (intent) {
        case "greeting":
          return ctx.userName
            ? `Hey ${ctx.userName}! Great to see you again 😊 How can I help you today?`
            : "Hey there! 👋 I'm Masoud's AI assistant. I can tell you about his skills, experience, projects, education, and more. What would you like to know?";

        case "skills": {
          const frontend = skillsData.groups?.frontend || [];
          const backend = skillsData.groups?.backend || [];
          const database = skillsData.groups?.database || [];
          const tools = skillsData.groups?.tools || [];
          const design = skillsData.groups?.design || [];

          if (followUpDepth === 0) {
            return `${answers.skills || "Masoud is a Full-Stack Developer with expertise across multiple domains:"}\n\n🎨 **Frontend:** ${frontend.join(", ")}\n⚙️ **Backend:** ${backend.join(", ")}\n🗄️ **Database:** ${database.join(", ")}\n🛠️ **Tools:** ${tools.join(", ")}\n✨ **Design:** ${design.join(", ")}\n\nWould you like to know more about any specific technology?`;
          }

          if (followUpDepth === 1) {
            const tech = text.toLowerCase();
            if (tech.includes("react") || tech.includes("next")) {
              return "React/Next.js is Masoud's primary frontend framework. He builds server-side rendered applications with Next.js for optimal performance, uses React hooks for state management, and implements modern patterns like Server Components and Streaming. He's particularly strong with Next.js 13+ App Router.";
            }
            if (tech.includes("typescript") || tech.includes("javascript")) {
              return "Masoud writes TypeScript daily — it's his go-to for type safety and better developer experience. He uses advanced TypeScript features like generics, utility types, and strict mode. He believes TypeScript is essential for scalable applications.";
            }
            if (tech.includes("tailwind") || tech.includes("css")) {
              return "Tailwind CSS is his styling framework of choice. He loves the utility-first approach for rapid development and consistent design systems. He builds custom components with Tailwind and uses it with CSS modules for complex animations.";
            }
            if (tech.includes("node") || tech.includes("express")) {
              return "Node.js and Express.js form the backbone of his backend services. He builds RESTful APIs with Express, implements middleware for authentication and validation, and uses Node.js for server-side logic and real-time applications.";
            }
            if (tech.includes("database") || tech.includes("mongo") || tech.includes("postgres")) {
              return "He works with both SQL and NoSQL databases. PostgreSQL for structured data and complex queries, MongoDB for flexible document storage, and Prisma as his ORM for type-safe database access. He designs efficient schemas and writes optimized queries.";
            }
            if (tech.includes("docker") || tech.includes("devops")) {
              return "Docker is part of his deployment workflow. He containers applications for consistent environments, writes Dockerfiles for optimization, and uses Docker Compose for local development. He deploys primarily on Vercel and Netlify.";
            }
            if (tech.includes("git") || tech.includes("github")) {
              return "Git/GitHub is his version control standard. He uses Git with feature branches, pull requests, and code reviews. He's comfortable with Git workflows like GitFlow and trunk-based development.";
            }
            if (tech.includes("figma") || tech.includes("design")) {
              return "Figma is his design tool of choice. He uses it for UI/UX design, prototyping, and design system creation. He translates Figma designs into pixel-perfect code and collaborates with designers using Figma's developer handoff features.";
            }
          }

          if (followUpDepth >= 2) {
            return "Masoud continuously learns new technologies. Currently exploring: AI/ML integration, WebSockets for real-time apps, and advanced React patterns. He believes in staying updated with industry trends while mastering fundamentals.\n\nWant to see these skills in action? Ask about his projects! 🚀";
          }

          return answers.skills || "Masoud is a Full-Stack Developer with strong technical skills across modern web technologies.";
        }

        case "experience": {
          if (followUpDepth === 0) {
            return `${answers.experience || "Masoud has 2+ years of professional experience:"}\n\n🏢 **${experienceData.internshipTitle || "IT Intern"}** at ${experienceData.internshipCompany || "Kaveh Negar Company"}\n   ${experienceData.internshipDesc1 || "Network and system management"}\n\n💼 **${experienceData.freelanceTitle || "Freelance Developer"}**\n   ${experienceData.freelanceDesc1 || "Full-stack web development"}\n\n🏫 **${experienceData.schoolTitle || "IT Department Head"}** at ${experienceData.schoolCompany || "Technical High School"}\n   ${experienceData.schoolDesc1 || "IT infrastructure management"}\n\nWould you like to know more about any specific role?`;
          }

          if (followUpDepth === 1) {
            const expType = text.toLowerCase();
            if (expType.includes("intern") || expType.includes("kaveh")) {
              return `At Kaveh Negar Company, Masoud:\n• ${experienceData.internshipDesc1 || "Network configuration and maintenance"}\n• ${experienceData.internshipDesc2 || "Hardware troubleshooting and repair"}\n• ${experienceData.internshipDesc3 || "Deep Freeze installation and management"}\n• ${experienceData.internshipDesc4 || "Printer setup and driver installation"}\n• ${experienceData.internshipDesc5 || "System optimization and user support"}\n\nThis role gave him solid foundations in IT operations and problem-solving.`;
            }
            if (expType.includes("freelance") || expType.includes("self")) {
              return `As a freelancer, Masoud:\n• ${experienceData.freelanceDesc1 || "Developed full-stack web applications"}\n• ${experienceData.freelanceDesc2 || "Built responsive websites"}\n• ${experienceData.freelanceDesc3 || "Implemented RESTful APIs"}\n• ${experienceData.freelanceDesc4 || "Delivered projects on time"}\n\nThis experience taught him client communication and project management.`;
            }
            if (expType.includes("school") || expType.includes("teacher") || expType.includes("head")) {
              return `As IT Department Head at ${experienceData.schoolCompany || "Technical High School"} (${experienceData.schoolLocation || "Iran"}):\n• ${experienceData.schoolDesc1 || "Managed IT infrastructure"}\n• ${experienceData.schoolDesc2 || "Network setup and maintenance"}\n• ${experienceData.schoolDesc3 || "Installed and configured Deep Freeze"}\n• ${experienceData.schoolDesc4 || "Hardware and software troubleshooting"}\n• ${experienceData.schoolDesc5 || "Assisted teachers and students"}\n• ${experienceData.schoolDesc6 || "Printer and peripheral device management"}\n\nThis role developed his leadership and communication skills.`;
            }
          }

          if (followUpDepth >= 2) {
            return "Masoud's career path shows steady growth from IT operations to full-stack development. Each role built on previous skills while adding new challenges. He's now focused on building scalable web applications and is open to new opportunities!\n\nWant to know about his projects or services? 🚀";
          }

          return answers.experience || "Masoud has diverse experience across IT operations, freelancing, and education technology.";
        }

        case "projects": {
          if (followUpDepth === 0) {
            return `${answers.projects || "Masoud has built 10+ projects including:"}\n\n🛒 **E-commerce Platform** - Full-featured online store with cart, payments, and admin dashboard\n💻 **Portfolio Website** - This portfolio you're viewing now!\n📋 **Task Manager API** - RESTful API with authentication and real-time updates\n📱 **Mobile App UI Kit** - Cross-platform mobile interface components\n💬 **Real-time Chat App** - WebSocket-based messaging with presence detection\n📊 **Analytics Dashboard** - Data visualization with charts and metrics\n\nWould you like to know about any specific project?`;
          }

          if (followUpDepth === 1) {
            const projType = text.toLowerCase();
            if (projType.includes("ecommerce") || projType.includes("e-commerce") || projType.includes("shop")) {
              return "The E-commerce Platform was built with Next.js and includes: product catalog with search/filter, shopping cart with local storage, Stripe payment integration, admin dashboard for inventory management, and responsive design. It demonstrates Masoud's ability to build production-ready applications with real payment processing.";
            }
            if (projType.includes("portfolio") || projType.includes("this")) {
              return "This portfolio showcases Masoud's skills in Next.js, Tailwind CSS, and modern React patterns. It features lazy loading, smooth animations, dark/light theme, multi-language support (English, Persian, Spanish, Portuguese, Japanese, Chinese, Swedish, Norwegian, Russian, Ukrainian, and German), and an AI chat assistant. Built with performance and user experience in mind.";
            }
            if (projType.includes("task") || projType.includes("api")) {
              return "The Task Manager API is a Node.js/Express REST API with JWT authentication, CRUD operations for tasks, user management, real-time updates via WebSockets, PostgreSQL database with Prisma ORM, and comprehensive error handling. It demonstrates backend architecture skills.";
            }
            if (projType.includes("mobile") || projType.includes("app")) {
              return "The Mobile App UI Kit includes reusable React Native components for iOS and Android, custom animations and transitions, theme system with dark/light mode, form components with validation, and navigation patterns. Built for cross-platform consistency.";
            }
            if (projType.includes("chat") || projType.includes("real-time")) {
              return "The Real-time Chat App uses Socket.io for WebSocket communication, features instant messaging with typing indicators, online/offline presence, message history, user authentication, and responsive design. It demonstrates real-time application architecture.";
            }
            if (projType.includes("dashboard") || projType.includes("analytics")) {
              return "The Analytics Dashboard visualizes data with Chart.js and Recharts, includes real-time data updates, customizable widgets, export functionality (PDF/CSV), role-based access control, and responsive charts. Built with Next.js and a Node.js backend.";
            }
          }

          if (followUpDepth >= 2) {
            return "All projects are open source and available on GitHub. Masoud focuses on clean code, performance optimization, and great UX. Each project includes comprehensive documentation and follows modern development practices.\n\nInterested in working together? Ask about his contact info! 🤝";
          }

          return answers.projects || "Masoud has built diverse projects showcasing full-stack development skills.";
        }

        case "education": {
          if (followUpDepth === 0) {
            return `${answers.education || "Masoud's educational background:"}\n\n🎓 **${educationData.degree1 || "Bachelor of Computer Science"}**\n   ${educationData.institution1 || "University of Technology"}\n\n📚 **${educationData.degree2 || "Full-Stack Web Development"}**\n   ${educationData.institution2 || "Online Bootcamp"}\n\nHis computer science degree provided strong foundations in algorithms, data structures, and software engineering principles. The bootcamp gave him practical, hands-on full-stack development skills.\n\nWould you like to know more about his technical training?`;
          }

          if (followUpDepth >= 1) {
            return "Beyond formal education, Masoud is a lifelong learner. He regularly takes online courses, reads technical books, contributes to open source, and experiments with new technologies. He believes continuous learning is essential in software development.\n\nWant to see how he applies this knowledge? Ask about his projects! 💻";
          }

          return answers.education || "Masoud has a strong educational foundation in computer science and web development.";
        }

        case "contact": {
          if (followUpDepth === 0) {
            return `${answers.contact || "You can reach Masoud via:"}\n\n📧 **Email:** masoud@example.com\n\n💼 **LinkedIn:** linkedin.com/in/masoudjafari\n🐙 **GitHub:** github.com/masoudjafari\n\nHe's currently open to new opportunities and freelance projects. Don't hesitate to reach out!\n\nWould you like to know about his availability or services?`;
          }

          if (followUpDepth >= 1) {
            return "Masoud typically responds within 24 hours. For urgent inquiries, LinkedIn is the fastest way to reach him. He's based in Azerbaijan and is open to remote work opportunities worldwide.\n\nFeel free to ask anything else! 😊";
          }

          return answers.contact || "Feel free to reach out to Masoud via email or social media.";
        }

        case "about": {
          if (followUpDepth === 0) {
            return `${answers.about || "Masoud Jafari is a passionate Full-Stack Developer:"}\n\nHe has ${aboutData.Years || "2+"} years of experience, built ${aboutData.ProjectCount || "10+"} projects, and worked with ${aboutData.Technologies || "5+"}+ technologies. He's focused on building fast, scalable, and clean web applications with modern technologies like React, Next.js, TypeScript, and Tailwind CSS.\n\nWhat would you like to know more about?`;
          }

          if (followUpDepth >= 1) {
            return "Masoud believes in writing clean, maintainable code and creating excellent user experiences. He's passionate about performance optimization, accessibility, and modern development practices. Outside of coding, he enjoys learning new technologies and sharing knowledge with the community.\n\nWant to see his work? Ask about projects! 🚀";
          }

          return answers.about || "Masoud is a dedicated Full-Stack Developer with a passion for clean code and modern web technologies.";
        }

        case "services": {
          if (followUpDepth === 0) {
            return `Masoud offers a range of services:\n\n🌐 **${servicesData.webDev || "Web Development"}** - ${servicesData.webDevDesc || "Building modern web apps"}\n🎨 **${servicesData.uiUx || "UI/UX Design"}** - ${servicesData.uiUxDesc || "Creating beautiful interfaces"}\n⚙️ **${servicesData.backend || "Backend Development"}** - ${servicesData.backendDesc || "Scalable server solutions"}\n\nHe's proficient in the full development lifecycle from planning to deployment. Each project includes thorough testing, documentation, and post-launch support.\n\nWould you like to discuss a specific service or project idea?`;
          }

          if (followUpDepth >= 1) {
            return "Masoud takes a client-focused approach: he listens to your needs, proposes solutions, iterates based on feedback, and delivers high-quality code on time. He's experienced with agile methodologies and can work independently or as part of a team.\n\nReady to start a project? Ask about his contact info! 🤝";
          }

          return "Masoud provides comprehensive web development services from design to deployment.";
        }

        case "tech_detail": {
          const tech = text.toLowerCase();
          if (tech.includes("react") || tech.includes("next")) {
            return "React/Next.js is Masoud's specialty. He uses Next.js 13+ with App Router, Server Components, and Server Actions for optimal performance. He implements React hooks, context for state management, and follows component composition patterns. He's experienced with Next.js features like Image Optimization, Font Optimization, and Middleware.";
          }
          if (tech.includes("typescript") || tech.includes("javascript")) {
            return "TypeScript is essential in Masoud's workflow. He uses strict mode, generics, utility types, and advanced patterns like discriminated unions and conditional types. He believes TypeScript prevents bugs and improves code maintainability in large applications.";
          }
          if (tech.includes("tailwind") || tech.includes("css")) {
            return "Tailwind CSS allows Masoud to build consistent, responsive designs quickly. He creates custom design systems with Tailwind config, uses @apply for component classes, and combines it with CSS animations for enhanced UX. He prefers Tailwind over traditional CSS for maintainability.";
          }
          if (tech.includes("node") || tech.includes("express")) {
            return "Node.js and Express.js form Masoud's backend stack. He builds RESTful APIs with Express, implements middleware for auth/validation, uses Winston for logging, and follows REST conventions. He's experienced with API versioning, rate limiting, and error handling patterns.";
          }
          if (tech.includes("database") || tech.includes("mongo") || tech.includes("postgres")) {
            return "Masoud uses PostgreSQL for relational data with complex queries and MongoDB for flexible document storage. Prisma is his ORM of choice for type-safe database access. He designs efficient schemas, writes optimized queries, and implements proper indexing strategies.";
          }
          if (tech.includes("docker") || tech.includes("devops")) {
            return "Docker containers ensure consistent deployment environments. Masoud writes optimized Dockerfiles, uses multi-stage builds for smaller images, and Docker Compose for local development. He deploys on Vercel, Netlify, and AWS with CI/CD pipelines.";
          }
          return answers.skills || "Masoud has deep expertise in modern web technologies and best practices.";
        }

        case "availability": {
          return "Masoud is currently open to new opportunities! 🎉\n\nHe's available for:\n✅ Full-time positions\n✅ Freelance projects\n✅ Contract work\n✅ Consulting\n\nHe can start immediately and is flexible with time zones for remote collaboration. Feel free to reach out to discuss how he can contribute to your team or project!";
        }

        case "pricing": {
          return "Masoud's rates vary depending on project scope, complexity, and timeline:\n\n💡 **Freelance Projects:** Custom quotes based on requirements\n💼 **Full-time:** Competitive salary expectations\n📊 **Hourly:** Varies by project type\n\nHe believes in transparent pricing and will provide detailed estimates after understanding your needs. Contact him for a personalized quote!\n\nWould you like to discuss a specific project?";
        }

        case "smalltalk": {
          const responses = [
            "Thank you! 😊 Is there anything specific about Masoud you'd like to know?",
            "I appreciate that! Feel free to ask me anything about Masoud's skills, experience, or projects.",
            "Great! I'm here to help. What would you like to explore about Masoud?",
            "Thanks! Masoud is passionate about what he does. Want to know more?",
          ];
          return responses[Math.floor(Math.random() * responses.length)];
        }

        case "fallback":
        default: {
          if (followUpDepth >= 2) {
            return "I'm not sure about that specific topic, but I can tell you about Masoud's skills, experience, projects, education, or services. What interests you most? 😊";
          }

          const suggestions = [
            "I'm not quite sure about that, but here's what I can help with:\n\n• Masoud's technical skills and technologies\n• His work experience and background\n• Projects he's built\n• Education and training\n• Services he offers\n• Contact information\n\nTry asking about any of these topics!",
            "That's a great question! While I don't have specific info on that, I know a lot about Masoud's work. Try asking about his skills, projects, or experience!",
            "Hmm, I'm still learning! But I'm great at talking about Masoud's skills, experience, and projects. What would you like to know?",
          ];
          return suggestions[Math.floor(Math.random() * suggestions.length)];
        }
      }
    },
    [labels.answers, skillsData, experienceData, educationData, servicesData, contactData, aboutData]
  );

  const getSmartSuggestions = (intent: Intent, followUpCount: number): string[] => {
    switch (intent) {
      case "greeting":
        return [
          "What are Masoud's main skills?",
          "Tell me about his experience",
          "What projects has he built?",
        ];
      case "skills":
        if (followUpCount === 0) {
          return [
            "Tell me more about React/Next.js",
            "What about his backend skills?",
            "Show me his design skills",
          ];
        }
        return [
          "What projects used these technologies?",
          "Is he available for hire?",
          "How can I contact him?",
        ];
      case "experience":
        if (followUpCount === 0) {
          return [
            "Tell me about his internship",
            "What about freelance work?",
            "His role at the school?",
          ];
        }
        return [
          "What technologies did he use?",
          "What projects came from this experience?",
          "Is he available for new roles?",
        ];
      case "projects":
        if (followUpCount === 0) {
          return [
            "Tell me about the E-commerce Platform",
            "What about the Chat App?",
            "Show me the Analytics Dashboard",
          ];
        }
        return [
          "What tech stack does he use?",
          "Are these projects open source?",
          "How can I see his work?",
        ];
      case "education":
        return [
          "What certifications does he have?",
          "How does he continue learning?",
          "What's his educational philosophy?",
        ];
      case "contact":
        return [
          "Is he available for freelance?",
          "What's his preferred contact method?",
          "Does he do remote work?",
        ];
      case "about":
        return [
          "What are his core values?",
          "What motivates him?",
          "What's his work philosophy?",
        ];
      case "services":
        return [
          "What's his development process?",
          "Does he do UI/UX design?",
          "What technologies does he recommend?",
        ];
      default:
        return [
          "Tell me about Masoud's skills",
          "What projects has he built?",
          "How can I contact him?",
        ];
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
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, initWelcome]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const processMessage = useCallback(
    (text: string) => {
      const intent = detectIntent(text);
      const newContext: ConversationContext = {
        ...context,
        lastIntent: intent,
        followUpCount: context.lastIntent === intent ? context.followUpCount + 1 : 0,
        askedAbout: [...new Set([...(context.askedAbout || []), intent])],
      };

      const response = generateSmartResponse(text, intent, newContext);

      const userMessage: Message = {
        id: crypto.randomUUID?.() || String(Date.now()),
        role: "user",
        content: text,
        intent,
      };

      const assistantMessage: Message = {
        id: crypto.randomUUID?.() || String(Date.now() + 1),
        role: "assistant",
        content: response,
        intent,
      };

      setMessages((prev) => [...prev, userMessage, assistantMessage]);
      setContext(newContext);
      setIsTyping(false);
    },
    [context, generateSmartResponse]
  );

  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    const userMessage: Message = {
      id: crypto.randomUUID?.() || String(Date.now()),
      role: "user",
      content: trimmed,
      intent: detectIntent(trimmed),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
      processMessage(trimmed);
    }, delay);
  }, [input, isTyping, processMessage]);

  const handleSuggestion = useCallback(
    (suggestion: string) => {
      setInput(suggestion);
      inputRef.current?.focus();
      setTimeout(() => {
        handleSend();
      }, 150);
    },
    [handleSend]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), []);

  const themeClasses = {
    panel: "bg-zinc-900/80 border-zinc-700/50 text-white",
    header: "bg-zinc-900/90 border-b border-zinc-800/50",
    input: "bg-zinc-800/80 border-zinc-700/50 text-white placeholder:text-zinc-400",
    userBubble: "bg-white text-black",
    assistantBubble: "bg-zinc-800/80 text-white",
    suggestion: "bg-zinc-800/60 border-zinc-700/50 text-zinc-300 hover:border-zinc-500 hover:bg-zinc-700/60",
    icon: "text-zinc-400",
    toggle: "bg-white text-black shadow-lg shadow-black/30",
  };

  const currentSuggestions =
    messages.length <= 2 && !isTyping
      ? getSmartSuggestions(
          context.lastIntent || "greeting",
          context.followUpCount
        )
      : [];

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
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                <Sparkles size={16} />
              </div>
              <div>
                <h3 className="text-sm font-semibold">
                  {labels.title}
                </h3>
                <p className="text-[11px] opacity-70">
                  {labels.subtitle}
                </p>
              </div>
            </div>
            <button
              onClick={toggleOpen}
              className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${themeClasses.icon}`}
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
                        ? `${themeClasses.userBubble} rounded-br-sm`
                        : `${themeClasses.assistantBubble} rounded-bl-sm`
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
                <div className={`rounded-2xl rounded-bl-sm px-4 py-3 ${themeClasses.assistantBubble}`}>
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

          {currentSuggestions.length > 0 && (
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {currentSuggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestion(suggestion)}
                    className={`
                      text-xs px-3 py-1.5 rounded-full border transition-all duration-200
                      hover:scale-105 active:scale-95
                      ${themeClasses.suggestion}
                    `}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-3 border-t border-white/10">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={labels.placeholder}
                className={`
                  flex-1 rounded-xl px-4 py-2.5 text-sm outline-none
                  border transition-all duration-200
                  focus:ring-2 focus:ring-purple-500/30
                  ${themeClasses.input}
                `}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="p-2.5 rounded-xl bg-white text-black hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
              >
                <Send size={16} />
              </button>
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
