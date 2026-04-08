/**
 * Product availability configuration
 * Defines which sizes are available for each shape
 */
import type { Shape, Size } from "@/types/product";

/** Available sizes for each shape */
export const SHAPE_AVAILABILITY: Record<Shape, Size[]> = {
  narrow: ["s", "m", "l"],
  square: ["m"],
  rect: ["m"],
} as const;

/**
 * External dimensions (outer) for each model
 * Format: length × width × height in mm
 */
export const EXTERNAL_DIMENSIONS: Record<Shape, Record<Size, { l: number; w: number; h: number }>> = {
  narrow: {
    s: { l: 460, w: 235, h: 220 },
    m: { l: 660, w: 235, h: 220 },
    l: { l: 860, w: 235, h: 220 },
  },
  square: {
    m: { l: 400, w: 400, h: 280 },
    s: { l: 400, w: 400, h: 280 },
    l: { l: 400, w: 400, h: 280 },
  },
  rect: {
    m: { l: 615, w: 425, h: 250 },
    s: { l: 615, w: 425, h: 250 },
    l: { l: 615, w: 425, h: 250 },
  },
} as const;

/**
 * Internal dimensions (for pot selection) in mm
 */
export const INTERNAL_DIMENSIONS: Record<Shape, Record<Size, { l: number; w: number; h: number }>> = {
  narrow: {
    s: { l: 400, w: 175, h: 150 },
    m: { l: 600, w: 175, h: 150 },
    l: { l: 800, w: 175, h: 150 },
  },
  square: {
    m: { l: 340, w: 340, h: 300 },
    s: { l: 340, w: 340, h: 300 },
    l: { l: 340, w: 340, h: 300 },
  },
  rect: {
    m: { l: 555, w: 365, h: 250 },
    s: { l: 555, w: 365, h: 250 },
    l: { l: 555, w: 365, h: 250 },
  },
} as const;

/**
 * Get initial size for a shape (first available option)
 */
export function getInitialSize(shape: Shape): Size {
  return SHAPE_AVAILABILITY[shape][0];
}

/**
 * Check if size is available for a shape
 */
export function isSizeAvailable(shape: Shape, size: Size): boolean {
  return SHAPE_AVAILABILITY[shape].includes(size);
}

/**
 * Get all available sizes for a shape
 */
export function getAvailableSizesForShape(shape: Shape): Size[] {
  return SHAPE_AVAILABILITY[shape];
}

/**
 * Check if the shape has multiple size options (used to decide whether to show size selector)
 */
export function hasSizeOptions(shape: Shape): boolean {
  return SHAPE_AVAILABILITY[shape].length > 1;
}

/**
 * Get dimensions info for a model (external + internal)
 */
export function getDimensions(shape: Shape, size: Size) {
  return {
    external: EXTERNAL_DIMENSIONS[shape][size],
    internal: INTERNAL_DIMENSIONS[shape][size],
  };
}
