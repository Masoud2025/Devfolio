"use client";

import Navbar from "./components/layout/Navbar";
import LazySection from "./components/ui/LazySection";
import ScrollToTop from "./components/ui/ScrollToTop";
import AIChat from "./components/sections/AIChat";
import { useState } from "react";

const sectionSkeleton = (
  <div className="mx-auto max-w-7xl px-6 py-32 animate-pulse">
    <div className="mx-auto mb-16 h-16 w-80 rounded-full bg-zinc-200/60 dark:bg-zinc-800/60" />
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-72 rounded-3xl bg-zinc-200/60 dark:bg-zinc-800/60"
        />
      ))}
    </div>
  </div>
);

type TabName = "home" | "about" | "blog" | "skills" | "contact";

const tabComponents: Record<TabName, "Projects" | "Aboutme" | "Blog" | "Skills" | "ContactMe"> = {
  home: "Projects",
  about: "Aboutme",
  blog: "Blog",
  skills: "Skills",
  contact: "ContactMe",
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabName>("home");

  return (
    <main className="min-h-screen overflow-x-hidden md:mr-16 pt-12 md:pt-0 pb-20 md:pb-0">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1">
        <LazySection name={tabComponents[activeTab]} skeleton={sectionSkeleton} />
      </div>
      <ScrollToTop />
      <AIChat />
    </main>
  );
}
