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

function parseBadge(badge: string): { sign: string; amount: string } | null {
  const match = badge.match(/^([+\-])\s*(.+)$/);
  if (!match) return null;
  return { sign: match[1], amount: match[2] };
}

export function AnimatedPill({
  children,
  isActive,
  isDisabled,
  className,
  badge,
  type = "button",
  onClick,
}: AnimatedPillProps) {
  const parsed = badge ? parseBadge(badge) : null;

  return (
    <motion.button
      type={type}
      className={`${styles.pill} ${isActive ? styles.pillActive : ""} ${isDisabled ? styles.pillDisabled : ""} ${className ?? ""}`.trim()}
      disabled={isDisabled}
      whileTap={isDisabled ? undefined : { scale: 0.94 }}
      transition={springTransition as Transition}
      onClick={onClick}
    >
      {children}
      {parsed && (
        <span className={styles.pillBadge}>
          <span className={styles.pillBadgePlus}>{parsed.sign}</span>
          <span className={styles.pillBadgeAmount}>{parsed.amount}</span>
        </span>
      )}
    </motion.button>
  );
}
