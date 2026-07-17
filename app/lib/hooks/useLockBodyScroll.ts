import { useEffect } from "react";

/**
 * Locks body scroll while `locked` is true and restores the previous value on cleanup.
 * Safe to call from multiple components; the last one to unlock wins.
 */
export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}
