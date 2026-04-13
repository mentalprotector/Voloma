"use client";

import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 1024;

/**
 * Returns true when viewport is below the mobile breakpoint (1024px).
 * SSR-safe: defaults to false, hydrates on mount.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches ?? ("matches" in e ? e.matches : false));
    };

    // Set initial
    setIsMobile(mq.matches);

    // Listen for changes
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
    // Fallback for older browsers
    mq.addListener(handler as never);
    return () => mq.removeListener(handler as never);
  }, []);

  return isMobile;
}
