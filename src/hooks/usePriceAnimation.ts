/**
 * Hook for animating price changes with a pulse effect
 */
import { useCallback, useState } from "react";

import { useRef, useEffect } from "react";

interface UsePriceAnimationResult {
  /** Trigger a pulse animation */
  pulse: () => void;
  /** Ref to attach to the price element */
  elementRef: React.RefObject<HTMLSpanElement | null>;
}

export function usePriceAnimation(scale = 1.06, durationMs = 150): UsePriceAnimationResult {
  const elementRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    if (!elementRef.current) {
      return;
    }

    elementRef.current.style.transform = `scale(${scale})`;

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      if (elementRef.current) {
        elementRef.current.style.transform = "scale(1)";
      }

      timeoutRef.current = null;
    }, durationMs);

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [pulseKey, scale, durationMs]);

  const pulse = useCallback(() => {
    setPulseKey((prev) => prev + 1);
  }, []);

  return { pulse, elementRef };
}
