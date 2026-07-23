"use client";

import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import AIChat from "./components/sections/AIChat";
import TopBar from "./components/sections/Topbar";
import LazySection from "./components/ui/LazySection";
import ScrollToTop from "./components/ui/ScrollToTop";

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

export default function Home() {
  const [activeTab, setActiveTab] = useState<"home" | "about" | "blog"  | "contact">("home");

  return (
    <main className="min-h-screen overflow-x-hidden md:mr-16 pt-12 md:pt-0 pb-20 md:pb-0 bg-background">
      <TopBar name="مسعود جعفری" />

      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1">
        <LazySection
          name={activeTab === "home" ? "Projects" : activeTab === "about" ? "Aboutme" : activeTab === "blog" ? "Blog" :  "ContactMe"}
          skeleton={sectionSkeleton}
        />
      </div>
      <ScrollToTop />
      {/* <AIChat /> */}
    </main>
  );
}
