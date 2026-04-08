/**
 * Hook for haptic feedback on user interactions
 */

interface UseVibrationOptions {
  /** Whether vibration is enabled (default: true) */
  enabled?: boolean;
  /** Vibration duration in milliseconds (default: 8) */
  duration?: number;
}

export function useVibration(options: UseVibrationOptions = {}) {
  const { enabled = true, duration = 8 } = options;

  const vibrate = () => {
    if (!enabled) {
      return;
    }

    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(duration);
    }
  };

  return { vibrate };
}
