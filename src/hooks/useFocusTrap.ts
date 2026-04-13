"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Focus trap for modals/dialogs.
 *
 * When enabled:
 * - Stores the previously focused element
 * - Focuses the first interactive element inside the container
 * - Traps Tab/Shift+Tab within the container
 * - Restores focus to the stored element when disabled
 */
export function useFocusTrap<T extends HTMLElement>(enabled: boolean) {
  const containerRef = useRef<T | null>(null);
  const previousElementRef = useRef<HTMLElement | null>(null);

  const getFocusableElements = useCallback((container: HTMLElement): HTMLElement[] => {
    const focusableSelectors = [
      "a[href]",
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "[tabindex]:not([tabindex=\"-1\"])",
    ].join(", ");
    return Array.from(container.querySelectorAll(focusableSelectors)) as HTMLElement[];
  }, []);

  // Store previous focus and focus first element when enabled
  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    previousElementRef.current = document.activeElement as HTMLElement | null;

    const focusable = getFocusableElements(containerRef.current);
    if (focusable.length > 0) {
      focusable[0].focus();
    }
  }, [enabled, getFocusableElements]);

  // Restore focus when disabled
  useEffect(() => {
    if (enabled) return;

    if (previousElementRef.current && document.contains(previousElementRef.current)) {
      previousElementRef.current.focus();
    }
    previousElementRef.current = null;
  }, [enabled]);

  // Handle Tab key trapping
  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusable = getFocusableElements(containerRef.current!);
      if (focusable.length === 0) return;

      const firstFocusable = focusable[0];
      const lastFocusable = focusable[focusable.length - 1];

      if (e.shiftKey) {
        // Shift+Tab: if on first element, wrap to last
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        // Tab: if on last element, wrap to first
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, [enabled, getFocusableElements]);

  return containerRef;
}
