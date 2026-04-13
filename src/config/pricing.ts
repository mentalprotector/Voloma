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
    standard: { s: 1900, m: 2000, l: 2500 },
    premium: { s: 2300, m: 2600, l: 3300 },
  },
  square: {
    standard: { s: 2800, m: 2800, l: 2800 },
    premium: { s: 3500, m: 3500, l: 3500 },
  },
  rect: {
    standard: { s: 3700, m: 3700, l: 3700 },
    premium: { s: 5000, m: 5000, l: 5000 },
  },
} as const;

/** Surcharge for stain treatment (oak or rosewood) */
export const STAIN_SURCHARGE = 800;

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
 * Check if a finish option has a stain surcharge
 */
export function getFinishSurcharge(finish: Finish): number {
  return finish === "natural" ? 0 : STAIN_SURCHARGE;
}

/**
 * Calculate total price with all options
 * - Base price depends on shape + size + quality
 * - Stain finish (oak/rosewood) adds +800 ₽
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
  const base = getBasePrice(shape, size, options.quality);
  const surcharge = getFinishSurcharge(options.finish);
  return base + surcharge;
}
