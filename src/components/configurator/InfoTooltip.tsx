"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import styles from "./info-tooltip.module.css";

interface InfoTooltipProps {
  text: string;
  children?: React.ReactNode;
}

function parseRichText(text: string): React.ReactNode {
  const parts = text.split(/\*\*([^*]+)\*\*/g);
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      // Bold part
      return <strong key={i}>{part}</strong>;
    }
    // Regular part — split by newlines
    const lines = part.split("\n");
    return (
      <span key={i}>
        {lines.map((line, j) => (
          <span key={j}>
            {line}
            {j < lines.length - 1 && <br />}
          </span>
        ))}
      </span>
    );
  });
}

export function InfoTooltip({ text, children }: InfoTooltipProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== "undefined" &&
    (window.matchMedia("(max-width: 767px)").matches ||
      "ontouchstart" in window);
  const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({});

  const content = useMemo(() => parseRichText(text), [text]);

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    const popover = popoverRef.current;
    if (!trigger || !popover) return;

    const rect = trigger.getBoundingClientRect();
    const popoverRect = popover.getBoundingClientRect();

    // Position above trigger on desktop, centered horizontally
    const left = rect.left + rect.width / 2 - popoverRect.width / 2;
    const top = rect.top - popoverRect.height - 8;

    // Ensure popover stays within viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const padding = 16;

    // Clamp horizontal position
    const clampedLeft = Math.max(padding, Math.min(left, viewportWidth - popoverRect.width - padding));

    // Clamp vertical position - don't let it go off screen
    const clampedTop = Math.max(padding, Math.min(top, viewportHeight - popoverRect.height - padding));

    setPopoverStyle({
      left: `${clampedLeft}px`,
      top: `${clampedTop}px`,
    });
  }, []);

  useEffect(() => {
    if (!open) return;

    // Position after popover is rendered
    requestAnimationFrame(updatePosition);

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
    window.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", updatePosition, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
      document.removeEventListener("keydown", handleEsc);
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open, updatePosition]);

  return (
    <span className={styles.wrapper}>
      {children}
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-label="Подробнее"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => {
          if (!isMobile) {
            requestAnimationFrame(() => {
              updatePosition();
              setOpen(true);
            });
          }
        }}
        onMouseLeave={() => {
          if (!isMobile) setOpen(false);
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
          style={isMobile ? undefined : popoverStyle}
          role="tooltip"
        >
          {content}
        </div>
      )}
    </span>
  );
}
