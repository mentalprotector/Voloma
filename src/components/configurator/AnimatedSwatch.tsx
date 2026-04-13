"use client";

import type { ReactNode } from "react";
import { type Transition, motion } from "framer-motion";

import { subtleSpring } from "@/lib/animations";
import styles from "./configurator.module.css";

interface AnimatedSwatchProps {
  children: ReactNode;
  isActive?: boolean;
  ariaLabel: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export function AnimatedSwatch({
  children,
  isActive,
  ariaLabel,
  className,
  type = "button",
  onClick,
}: AnimatedSwatchProps) {
  return (
    <motion.button
      type={type}
      className={`${styles.swatchButton} ${isActive ? styles.swatchActive : ""} ${className ?? ""}`.trim()}
      aria-label={ariaLabel}
      whileTap={{ scale: 0.92 }}
      transition={subtleSpring as Transition}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
