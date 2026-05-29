/**
 * Pricing configuration for Волома planters
 * All prices are in rubles (₽)
 */
import type { Finish, Quality, Shape, Size } from "@/types/product";

/**
 * Base prices by model (natural pine, no stain)
 * Structure: [shape][quality][size] = price
 */
export const BASE_PRICES: Record<Shape, Record<Quality, Record<Size, number>>> = {
  narrow: {
    standard: { s: 2090, m: 2200, l: 2750 },
    premium: { s: 2530, m: 2860, l: 3630 },
  },
  square: {
    standard: { s: 3080, m: 3080, l: 3080 },
    premium: { s: 3850, m: 3850, l: 3850 },
  },
  rect: {
    standard: { s: 4070, m: 4070, l: 4070 },
    premium: { s: 5500, m: 5500, l: 5500 },
  },
} as const;

/**
 * Prices for stained products by model.
 * Oak and rosewood use the same price list.
 */
export const STAINED_PRICES: Record<Shape, Record<Quality, Record<Size, number>>> = {
  narrow: {
    standard: { s: 2860, m: 3080, l: 3740 },
    premium: { s: 3410, m: 3740, l: 4730 },
  },
  square: {
    standard: { s: 3960, m: 3960, l: 3960 },
    premium: { s: 4840, m: 4840, l: 4840 },
  },
  rect: {
    standard: { s: 5390, m: 5390, l: 5390 },
    premium: { s: 6820, m: 6820, l: 6820 },
  },
} as const;

/**
 * Get base price for a planter configuration
 */
export function getBasePrice(
  shape: Shape,
  size: Size,
  quality: Quality,
): number {
  return BASE_PRICES[shape][quality][size];
}

/**
 * Get final price for a finish option.
 */
export function getPriceForFinish(
  shape: Shape,
  size: Size,
  quality: Quality,
  finish: Finish,
): number {
  return finish === "natural"
    ? BASE_PRICES[shape][quality][size]
    : STAINED_PRICES[shape][quality][size];
}

/**
 * Check if a finish option has a stain surcharge for the selected product.
 */
export function getFinishSurcharge(
  finish: Finish,
  shape?: Shape,
  size?: Size,
  quality?: Quality,
): number {
  if (finish === "natural") {
    return 0;
  }

  if (shape && size && quality) {
    return STAINED_PRICES[shape][quality][size] - BASE_PRICES[shape][quality][size];
  }

  return 0;
}

/**
 * Calculate total price with all options
 * - Base price depends on shape + size + quality
 * - Stain finish (oak/rosewood) uses model-specific stained price
 * - Wheels are free (included)
 */
export function calculateTotalPrice(
  shape: Shape,
  size: Size,
  options: {
    quality: Quality;
    finish: Finish;
    hasWheels: boolean;
  },
): number {
  return getPriceForFinish(shape, size, options.quality, options.finish);
}
