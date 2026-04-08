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
