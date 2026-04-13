"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { type Transition, motion } from "framer-motion";

import { subtleSpring } from "@/lib/animations";
import styles from "./configurator.module.css";

interface AnimatedChipProps {
  children: ReactNode;
  isActive?: boolean;
  className?: string;
  badge?: string | null;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

function parseBadge(badge: string): { sign: string; amount: string } | null {
  const match = badge.match(/^([+\-])\s*(.+)$/);
  if (!match) return null;
  return { sign: match[1], amount: match[2] };
}

export function AnimatedChip({
  children,
  isActive,
  className,
  badge,
  type = "button",
  onClick,
}: AnimatedChipProps) {
  const parsed = badge ? parseBadge(badge) : null;

  return (
    <motion.button
      type={type}
      className={`${styles.chip} ${isActive ? styles.chipActive : ""} ${className ?? ""}`.trim()}
      whileTap={{ scale: 0.94 }}
      transition={subtleSpring as Transition}
      onClick={onClick}
    >
      {children}
      {parsed && (
        <span className={styles.chipBadge}>
          <span className={styles.pillBadgePlus}>{parsed.sign}</span>
          <span className={styles.chipBadgeAmount}>{parsed.amount}</span>
        </span>
      )}
    </motion.button>
  );
}
