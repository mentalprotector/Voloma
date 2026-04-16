import type { Transition, Variants } from "framer-motion";

/**
 * Reusable Framer Motion animation variants
 * All use transform + opacity only (GPU-accelerated, no layout shifts)
 */

// Fade in + slide up (default for most content)
export const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }, // ease-out quad
  },
};

// Fade in + subtle scale (for images)
export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// Fade in only (simple, lightweight)
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// Stagger container - children animate one after another
export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0.1) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

// Stagger child - used inside stagger containers
export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// Hero stagger - longer delays for dramatic entrance
export const heroStaggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Hero child - slide up with slightly longer duration
export const heroChild: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// Scale pulse for price (used in hero)
export const priceFadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 },
  },
};

// Viewport trigger options (default settings)
export const viewportOptions = {
  once: true, // only animate once
  amount: 0.2 as const, // trigger when 20% visible
  margin: "0px 0px -50px 0px", // trigger slightly before entering viewport
};

// ===== Configurator button press animations =====

// Spring transition for button press feel
export const springTransition: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 0.5,
};

// Subtle spring for smaller elements (chips, swatches)
export const subtleSpring: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 25,
  mass: 0.4,
};

// Image crossfade transition (for gallery)
export const imageCrossfade: Transition = {
  duration: 0.3,
  ease: [0.25, 0.1, 0.25, 1],
};

// Bottom sheet spring animation
export const sheetSpring: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
      mass: 0.8,
    },
  },
  exit: {
    y: "100%",
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 35,
      duration: 0.25,
    },
  },
};

// Sheet overlay fade
export const overlayFade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
};
