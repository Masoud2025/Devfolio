/* eslint-disable react-hooks/static-components */
"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

type SectionName =
  | "Projects"
  | "Blog"
  | "Experince"
  | "Education"
  | "Skills"
  | "Services"
  | "Aboutme"
  | "Testimonials"
  | "ContactMe";

const loaders: Record<SectionName, () => Promise<{ default: ComponentType }>> = {
  Projects: () => import("../sections/Projects"),
  Blog: () => import("../sections/Blog"),
  Experince: () => import("../sections/Experince"),
  Education: () => import("../sections/Education"),
  Skills: () => import("../sections/Skills"),
  Services: () => import("../sections/Services"),
  Aboutme: () => import("../sections/Aboutme"),
  Testimonials: () => import("../sections/Testimonials"),
  ContactMe: () => import("../sections/ContactMe"),
};

export default function LazySection({
  name,
  skeleton,
}: {
  name: SectionName;
  skeleton: React.ReactNode;
}) {
  const Component = dynamic(loaders[name], {
    ssr: false,
    loading: () => <>{skeleton}</>,
  });
  return <Component />;
}
