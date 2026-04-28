"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function FooterVisibilityWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const normalizedPathname = pathname.replace(/\/$/, "");

  if (normalizedPathname === "/configurator" || normalizedPathname.startsWith("/configurator/")) {
    return null;
  }

  return children;
}
