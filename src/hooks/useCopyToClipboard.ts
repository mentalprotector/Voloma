/**
 * Hook for copying text to clipboard with status management
 */
import { useCallback, useRef, useState } from "react";

import { copyToClipboard } from "@/lib/clipboard";

interface UseCopyToClipboardResult {
  /** Current copy status message (null if idle) */
  status: string | null;
  /** Copy text to clipboard and update status */
  copy: (text: string, successMessage: string, errorMessage: string) => Promise<boolean>;
  /** Manually reset status to null */
  reset: () => void;
}

const DEFAULT_RESET_DELAY = 2500;

export function useCopyToClipboard(resetDelayMs = DEFAULT_RESET_DELAY): UseCopyToClipboardResult {
  const [status, setStatus] = useState<string | null>(null);
  const resetTimeoutRef = useRef<number | null>(null);

  const reset = useCallback(() => {
    if (resetTimeoutRef.current) {
      window.clearTimeout(resetTimeoutRef.current);
    }

    setStatus(null);
    resetTimeoutRef.current = null;
  }, []);

  const copy = useCallback(
    async (text: string, successMessage: string, errorMessage: string) => {
      const copied = await copyToClipboard(text);
      setStatus(copied ? successMessage : errorMessage);

      if (resetTimeoutRef.current) {
        window.clearTimeout(resetTimeoutRef.current);
      }

      resetTimeoutRef.current = window.setTimeout(() => {
        setStatus(null);
        resetTimeoutRef.current = null;
      }, resetDelayMs);

      return copied;
    },
    [resetDelayMs],
  );

  return { status, copy, reset };
}
