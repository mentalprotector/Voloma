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

export function AnimatedChip({
  children,
  isActive,
  className,
  badge,
  type = "button",
  onClick,
}: AnimatedChipProps) {
  return (
    <motion.button
      type={type}
      className={`${styles.chip} ${isActive ? styles.chipActive : ""} ${className ?? ""}`.trim()}
      whileTap={{ scale: 0.94 }}
      transition={subtleSpring as Transition}
      onClick={onClick}
    >
      {badge && (
        <span className={styles.chipBadge}>{badge}</span>
      )}
      <span className={styles.chipInner}>
        {children}
      </span>
    </motion.button>
  );
}
