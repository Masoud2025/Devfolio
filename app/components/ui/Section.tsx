import type { ReactNode } from "react";
import { cn } from "@/app/lib/cn";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Standard page section. Provides consistent vertical rhythm, horizontal
 * padding and scroll-margin so anchor navigation lands below the fixed navbar.
 */
export function Section({ id, children, className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("w-full scroll-mt-28 py-20 px-6 md:px-20", className)}
    >
      {children}
    </section>
  );
}
