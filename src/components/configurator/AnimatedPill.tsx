"use client";

import type { ReactNode } from "react";
import { type Transition, motion } from "framer-motion";

import { springTransition } from "@/lib/animations";
import styles from "./configurator.module.css";

interface AnimatedPillProps {
  children: ReactNode;
  isActive?: boolean;
  isDisabled?: boolean;
  className?: string;
  badge?: string | null;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

/**
 * Configurator pill button with satisfying press animation.
 * Uses spring physics for tactile feedback — no SVG filters (iOS-safe).
 */
export function AnimatedPill({
  children,
  isActive,
  isDisabled,
  className,
  badge,
  type = "button",
  onClick,
}: AnimatedPillProps) {
  return (
    <motion.button
      type={type}
      className={`${styles.pill} ${isActive ? styles.pillActive : ""} ${isDisabled ? styles.pillDisabled : ""} ${className ?? ""}`.trim()}
      disabled={isDisabled}
      whileTap={isDisabled ? undefined : { scale: 0.94 }}
      transition={springTransition as Transition}
      onClick={onClick}
    >
      {badge && (
        <span className={styles.pillBadge}>{badge}</span>
      )}
      <span className={styles.pillInner}>
        {children}
      </span>
    </motion.button>
  );
}
