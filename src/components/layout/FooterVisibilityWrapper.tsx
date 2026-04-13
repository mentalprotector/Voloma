"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function FooterVisibilityWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/configurator") {
    return null;
  }
  return children;
}
