/**
 * Pricing configuration for Voloma planters
 * All prices are in rubles (₽)
 */
import type { Finish, Quality, Shape, Size } from "@/types/product";

/**
 * Price matrix: prices WITH finish (stain treatment)
 * Structure: [shape][quality][size] = price
 * For shapes with only one size, use "m" as the key.
 */
export const PRICES_WITH_FINISH: Record<Shape, Record<Quality, Record<Size, number>>> = {
  narrow: {
    standard: { s: 2600, m: 2800, l: 3400 },
    premium: { s: 3100, m: 3400, l: 4300 },
  },
  square: {
    standard: { s: 3600, m: 3600, l: 3600 },
    premium: { s: 4400, m: 4400, l: 4400 },
  },
  rect: {
    standard: { s: 4900, m: 4900, l: 4900 },
    premium: { s: 6200, m: 6200, l: 6200 },
  },
} as const;

/**
 * Price matrix: prices WITHOUT finish (natural pine)
 * Structure: [shape][quality][size] = price
 */
export const PRICES_WITHOUT_FINISH: Record<Shape, Record<Quality, Record<Size, number>>> = {
  narrow: {
    standard: { s: 1900, m: 2000, l: 2500 },
    premium: { s: 2300, m: 2600, l: 3300 },
  },
  square: {
    standard: { s: 2700, m: 2700, l: 2700 },
    premium: { s: 3500, m: 3500, l: 3500 },
  },
  rect: {
    standard: { s: 3700, m: 3700, l: 3700 },
    premium: { s: 5000, m: 5000, l: 5000 },
  },
} as const;

/**
 * Wheels availability: narrow S does not support wheels
 */
export const WHEELS_AVAILABLE = (shape: Shape, size: Size): boolean =>
  !(shape === "narrow" && size === "s");

/**
 * Get base price for a planter configuration
 */
export function getBasePrice(
  shape: Shape,
  size: Size,
  quality: Quality,
  hasFinish: boolean,
): number {
  const matrix = hasFinish ? PRICES_WITH_FINISH : PRICES_WITHOUT_FINISH;
  return matrix[shape][quality][size];
}

/**
 * Calculate total price with all options
 * Wheels add 0 ₽ (included in base price when selected)
 */
export function calculateTotalPrice(
  shape: Shape,
  size: Size,
  options: {
    quality: Quality;
    hasFinish: boolean;
    hasWheels: boolean;
  },
): number {
  // Wheels don't add extra cost — they're included
  return getBasePrice(shape, size, options.quality, options.hasFinish);
}
