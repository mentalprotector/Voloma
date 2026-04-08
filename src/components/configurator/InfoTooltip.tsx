"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./info-tooltip.module.css";

interface InfoTooltipProps {
  text: string;
  children?: React.ReactNode;
}

export function InfoTooltip({ text, children }: InfoTooltipProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const isMobile = useRef(false);

  useEffect(() => {
    isMobile.current =
      typeof window !== "undefined" &&
      (window.matchMedia("(max-width: 767px)").matches ||
        "ontouchstart" in window);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleOutside = (e: MouseEvent | TouchEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  return (
    <span className={styles.wrapper}>
      {children}
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-label="Подробнее"
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => {
          if (!isMobile.current) setOpen(true);
        }}
        onMouseLeave={() => {
          if (!isMobile.current) setOpen(false);
        }}
      >
        <svg
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.icon}
          aria-hidden="true"
        >
          <circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M8 11.5V8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="8" cy="5" r="0.75" fill="currentColor" />
        </svg>
      </button>
      {open && (
        <div
          ref={popoverRef}
          className={styles.popover}
          role="tooltip"
        >
          {text}
        </div>
      )}
    </span>
  );
}
