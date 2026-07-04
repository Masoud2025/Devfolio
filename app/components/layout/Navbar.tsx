"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="
          fixed top-5 right-5
          z-[60]
          flex h-16 w-16 items-center justify-center
          rounded-2xl
          bg-black/90
          backdrop-blur-xl
          border border-white/10
          shadow-2xl
          transition-all duration-300
          hover:scale-105
          active:scale-95
        "
      >
        {/* Menu */}
        <Menu
          size={30}
          className={`
            absolute
            text-white
            transition-all
            duration-500
            ease-[cubic-bezier(.22,1,.36,1)]
            ${
              isOpen
                ? "rotate-180 scale-0 opacity-0"
                : "rotate-0 scale-100 opacity-100"
            }
          `}
        />

        {/* Close */}
        <X
          size={30}
          className={`
            absolute
            text-white
            transition-all
            duration-500
            ease-[cubic-bezier(.22,1,.36,1)]
            ${
              isOpen
                ? "rotate-0 scale-100 opacity-100"
                : "-rotate-180 scale-0 opacity-0"
            }
          `}
        />
      </button>

      {/* Fullscreen Menu */}
      <div
        className={`
          fixed inset-0
          z-50
          flex items-center justify-center
          bg-neutral-950
          transition-all
          duration-700
          ease-[cubic-bezier(.22,1,.36,1)]
          ${
            isOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0 pointer-events-none"
          }
        `}
      >
        <nav className="flex flex-col gap-8 text-center">
          {["Home", "About", "Projects", "Contact"].map((item, index) => (
            <a
              key={item}
              href="#"
              className={`
                text-5xl
                font-bold
                text-white
                transition-all
                duration-700
                ease-out
                ${
                  isOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }
              `}
              style={{
                transitionDelay: `${index * 120}ms`,
              }}
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}