"use client";

import { useTheme } from "@/app/context/ThemeContext";
import { useLanguage } from "@/app/context/LanguageContext";
import { MessageCircle, Minimize2, Send, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { memo } from "react";

type Role = "user" | "assistant";

interface Message {
  id: string;
  role: Role;
  content: string;
}

function AIChat() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
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

  const initWelcome = useCallback(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      setMessages([
        {
          id: crypto.randomUUID?.() || String(Date.now()),
          role: "assistant",
          content: labels.welcome,
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

  const generateAnswer = useCallback(
    (text: string): string => {
      const q = text.toLowerCase();
      const answers = labels.answers || {};

      if (
        q.includes("skill") ||
        q.includes("technology") ||
        q.includes("tech") ||
        q.includes("تکنولوژی") ||
        q.includes("مهارت") ||
        q.includes("Fähigkeit")
      ) {
        return (
          answers.skills ||
          "Masoud is a Full-Stack Developer specializing in React, Next.js, TypeScript, and Tailwind CSS. He also works with Node.js, Express.js, MongoDB, PostgreSQL, Prisma, Docker, and Git. On the design side, he has experience with UI/UX Design and Figma."
        );
      }

      if (
        q.includes("experience") ||
        q.includes("work") ||
        q.includes("job") ||
        q.includes("career") ||
        q.includes("سابقه") ||
        q.includes("تجربه") ||
        q.includes("Erfahrung")
      ) {
        return (
          answers.experience ||
          "Masoud has 2+ years of experience. He worked as an IT Intern at Kaveh Negar Company, completed freelance full-stack projects, and served as an IT Department Head at a Technical High School in Iran."
        );
      }

      if (
        q.includes("project") ||
        q.includes("built") ||
        q.includes("پروژه") ||
        q.includes("ساخته") ||
        q.includes("Projekt")
      ) {
        return (
          answers.projects ||
          "He has built 10+ projects including an E-commerce Platform, Portfolio Website, Task Manager API, Mobile App UI Kit, Real-time Chat App, and Analytics Dashboard."
        );
      }

      if (
        q.includes("education") ||
        q.includes("degree") ||
        q.includes("university") ||
        q.includes("study") ||
        q.includes("تحصیل") ||
        q.includes("دیپلم") ||
        q.includes("Bildung")
      ) {
        return (
          answers.education ||
          "Masoud holds a Bachelor's degree in Computer Science from the University of Technology and completed a Full-Stack Web Development Online Bootcamp."
        );
      }

      if (
        q.includes("contact") ||
        q.includes("email") ||
        q.includes("reach") ||
        q.includes("hire") ||
        q.includes("تماس") ||
        q.includes("ایمیل") ||
        q.includes("Kontakt")
      ) {
        return (
          answers.contact ||
          "You can reach Masoud via Email at masoud@example.com, or connect with him on GitHub and LinkedIn."
        );
      }

      if (
        q.includes("who") ||
        q.includes("about") ||
        q.includes("tell me") ||
        q.includes("معرفی") ||
        q.includes("درباره") ||
        q.includes("who is")
      ) {
        return (
          answers.about ||
          "Masoud Jafari is a passionate Full-Stack Developer focused on building fast, scalable, and clean web applications with modern technologies like React, Next.js, TypeScript, and Tailwind CSS."
        );
      }

      return labels.fallback || labels.fallback;
    },
    [labels.answers, labels.fallback]
  );

  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    const userMessage: Message = {
      id: crypto.randomUUID?.() || String(Date.now()),
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    const delay = 600 + Math.random() * 800;
    setTimeout(() => {
      const assistantMessage: Message = {
        id: crypto.randomUUID?.() || String(Date.now() + 1),
        role: "assistant",
        content: generateAnswer(trimmed),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, delay);
  }, [input, isTyping, generateAnswer]);

  const handleSuggestion = useCallback((suggestion: string) => {
    setInput(suggestion);
    inputRef.current?.focus();
  }, []);

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

  const isDark = theme === "dark";

  const themeClasses = {
    panel: isDark
      ? "bg-zinc-900 border-zinc-800 text-white"
      : "bg-white border-zinc-200 text-zinc-900",
    header: isDark
      ? "bg-zinc-900/95 border-b border-zinc-800"
      : "bg-white/95 border-b border-zinc-200",
    input: isDark
      ? "bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400"
      : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400",
    userBubble: isDark
      ? "bg-white text-black"
      : "bg-black text-white",
    assistantBubble: isDark
      ? "bg-zinc-800 text-white"
      : "bg-zinc-100 text-zinc-900",
    suggestion: isDark
      ? "bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-zinc-500"
      : "bg-zinc-50 border-zinc-200 text-zinc-600 hover:border-zinc-300",
    icon: isDark ? "text-zinc-400" : "text-zinc-500",
    toggle: isDark
      ? "bg-white text-black shadow-lg shadow-black/20"
      : "bg-black text-white shadow-lg shadow-zinc-900/20",
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-6 md:right-6 z-[70] flex flex-col items-end gap-3">
      {isOpen && (
        <div
          className={`
            w-[90vw] sm:w-[380px] h-[520px]
            rounded-2xl border shadow-2xl
            flex flex-col overflow-hidden
            transition-all duration-300 origin-bottom-right
            ${themeClasses.panel}
          `}
        >
          <div className={`flex items-center justify-between px-4 py-3 ${themeClasses.header}`}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                AI
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
                  {message.content}
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

          {messages.length <= 1 && !isTyping && (
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {(labels.suggestions || []).map((suggestion: string, idx: number) => (
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
