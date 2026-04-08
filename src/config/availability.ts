/**
 * Product availability configuration
 * Defines which sizes are available for each shape
 */
import type { Shape, Size } from "@/types/product";

/** Available sizes for each shape */
export const SHAPE_AVAILABILITY: Record<Shape, Size[]> = {
  square: ["m"],
  rect: ["m"],
  long: ["s", "m", "l"],
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
