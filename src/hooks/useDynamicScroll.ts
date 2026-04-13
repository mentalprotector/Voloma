"use client";

import type { RefObject } from "react";
import { useEffect } from "react";

/**
 * Dynamically adjusts padding-bottom on the controls column to prevent content
 * from being overlapped by the fixed CTA bar.
 *
 * Strategy: "Safe Bottom Margin" with GAP to avoid "stickiness"
 * - Always maintain a 20px gap between content and CTA/bottom edge
 * - If content fits → padding = GAP (clean spacing, no stickiness)
 * - If content overlaps CTA → padding = CTA height + GAP (no overlap + gap)
 *
 * Uses ResizeObserver + scroll listener for reliable updates.
 * Measures the last VISIBLE element (ignores display:none elements).
 *
 * @param controlsRef - Ref to the controls column element
 */
export function useDynamicScroll(controlsRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const controlsColumn = controlsRef.current;
    if (!controlsColumn) return;

    const controlsWrapper = controlsColumn.querySelector('.controls') as HTMLElement | null;
    const ctaElement = document.querySelector('[data-cta]') as HTMLElement | null;
    if (!controlsWrapper || !ctaElement) return;

    const GAP = 20; // Always maintain this gap between content and CTA/bottom

    const getLastVisibleElement = (parent: HTMLElement): HTMLElement | null => {
      const children = Array.from(parent.children) as HTMLElement[];
      // Find the last child that is actually visible (not display:none)
      for (let i = children.length - 1; i >= 0; i--) {
        const child = children[i];
        const style = window.getComputedStyle(child);
        if (style.display !== 'none' && child.offsetHeight > 0) {
          // This child is visible, check its children recursively
          const lastVisibleInChildren = getLastVisibleElement(child);
          return lastVisibleInChildren || child;
        }
      }
      return null;
    };

    const checkOverflow = () => {
      requestAnimationFrame(() => {
        const ctaHeight = ctaElement.offsetHeight;
        const viewportHeight = window.innerHeight;

        // Find the last VISIBLE element (ignores display:none like .summaryBar on mobile)
        const lastElement = getLastVisibleElement(controlsWrapper);
        if (!lastElement) return;

        // Measure position relative to viewport (correct for fixed CTA)
        const lastElementRect = lastElement.getBoundingClientRect();
        const lastElementBottom = lastElementRect.bottom;

        // Calculate where CTA starts from top of viewport
        const ctaTopEdge = viewportHeight - ctaHeight;

        // Check if last element overlaps with CTA area (minus GAP)
        if (lastElementBottom > ctaTopEdge - GAP) {
          // Content overlaps CTA → push it up: CTA height + GAP
          controlsColumn.style.setProperty('--cta-offset', `${ctaHeight + GAP}px`);
        } else {
          // Content fits → just add GAP for clean spacing (no stickiness)
          controlsColumn.style.setProperty('--cta-offset', `${GAP}px`);
        }
      });
    };

    // Initial check
    checkOverflow();

    // Observe the controls column for layout changes
    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(checkOverflow);
    });

    resizeObserver.observe(controlsColumn);

    // Listen to scroll and resize events for dynamic recalculation
    window.addEventListener('scroll', checkOverflow, { passive: true });
    window.addEventListener('resize', checkOverflow);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', checkOverflow);
      window.removeEventListener('resize', checkOverflow);
      // Reset CSS variable
      controlsColumn.style.removeProperty('--cta-offset');
    };
  }, [controlsRef]);
}
