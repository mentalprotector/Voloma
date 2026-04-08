/**
 * Pricing configuration for Voloma planters
 */
import type { Shape, Size } from "@/types/product";

/** Base prices by shape and size */
export const BASE_PRICES = {
  square: 4200,
  "rect-m": 4700,
  "long-s": 3900,
  "long-m": 4900,
  "long-l": 5900,
} as const;

/** Extra charges for premium options */
export const EXTRAS = {
  /** Premium wood quality (no knots) surcharge */
  premiumWood: 800,
  /** Hidden wheels for mobility */
  wheels: 500,
} as const;

/**
 * Calculate base price for a planter configuration
 */
export function getBasePrice(shape: Shape, size: Size): number {
  if (shape === "square") {
    return BASE_PRICES.square;
  }

  if (shape === "rect") {
    return BASE_PRICES["rect-m"];
  }

  if (shape === "long") {
    return BASE_PRICES[`${shape}-${size}`];
  }

  return BASE_PRICES.square;
}

/**
 * Calculate total price with all extras applied
 */
export function calculateTotalPrice(
  shape: Shape,
  size: Size,
  options: {
    isPremiumWood: boolean;
    hasWheels: boolean;
  },
): number {
  const base = getBasePrice(shape, size);
  const extras =
    (options.isPremiumWood ? EXTRAS.premiumWood : 0) +
    (options.hasWheels ? EXTRAS.wheels : 0);

  return base + extras;
}
