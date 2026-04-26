"use client";

import { useEffect, useState } from "react";

import styles from "./scroll-cue.module.css";

interface ScrollCueProps {
  className?: string;
  label?: string;
  threshold?: number;
  variant?: "light" | "dark";
}

export function ScrollCue({
  className = "",
  label = "Листайте",
  threshold = 80,
  variant = "dark",
}: ScrollCueProps) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setHidden(window.scrollY > threshold);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return (
    <div
      aria-hidden="true"
      className={[
        styles.cue,
        styles[variant],
        hidden ? styles.hidden : "",
        className,
      ].filter(Boolean).join(" ")}
    >
      <span className={styles.line} />
      <span className={styles.text}>{label}</span>
    </div>
  );
}
