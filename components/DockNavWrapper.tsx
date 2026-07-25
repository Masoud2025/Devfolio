// components/DockNavWrapper.tsx
"use client";
import { useLang } from "@/context/LangContext";
import DockNav from "./DockNav";

export default function DockNavWrapper() {
  const { theme, toggleTheme } = useLang();
  
  return <DockNav theme={theme} toggleTheme={toggleTheme} />;
}