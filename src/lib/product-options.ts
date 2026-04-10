/**
 * Utilities for managing available product options based on current selection.
 *
 * These functions analyze the product variants and determine which options
 * (shapes, sizes, colors, qualities) are available given the current selection.
 */
import type { Finish, ProductVariant, Quality, Shape, Size, VariantSelection } from "@/types/product";

/**
 * Create a VariantSelection from a ProductVariant
 */
export function createSelectionFromVariant(variant: ProductVariant): VariantSelection {
  return {
    shape: variant.shape,
    size: variant.size,
    finish: variant.finish,
    quality: variant.quality,
  };
}

/**
 * Get initial selection from the first variant in the list
 */
export function getInitialSelection(variants: ProductVariant[]): VariantSelection {
  return createSelectionFromVariant(variants[0]);
}

/**
 * Get all unique shapes available across all variants
 */
export function getAvailableShapes(variants: ProductVariant[]): Shape[] {
  return Array.from(new Set(variants.map((variant) => variant.shape))) as Shape[];
}

/**
 * Get sizes available for a specific shape
 */
export function getAvailableSizes(variants: ProductVariant[], shape: Shape): Size[] {
  return Array.from(
    new Set(variants.filter((variant) => variant.shape === shape).map((variant) => variant.size)),
  ) as Size[];
}

/**
 * Get finishes available for a specific shape and size combination
 */
export function getAvailableFinishes(
  variants: ProductVariant[],
  shape: Shape,
  size: Size,
): Finish[] {
  return Array.from(
    new Set(
      variants
        .filter((variant) => variant.shape === shape && variant.size === size)
        .map((variant) => variant.finish),
    ),
  ) as Finish[];
}

/**
 * Get qualities (standard/premium) available for a specific shape, size, and finish
 */
export function getAvailableQualities(
  variants: ProductVariant[],
  shape: Shape,
  size: Size,
  finish: Finish,
): Quality[] {
  return Array.from(
    new Set(
      variants
        .filter(
          (variant) =>
            variant.shape === shape && variant.size === size && variant.finish === finish,
        )
        .map((variant) => variant.quality),
    ),
  ) as Quality[];
}

/**
 * Reconcile a selection against available variants.
 * Ensures that the selected options are actually available,
 * falling back to the first available option if not.
 */
export function reconcileSelection(
  variants: ProductVariant[],
  selection: VariantSelection,
): VariantSelection {
  const availableShapes = getAvailableShapes(variants);
  const shape = availableShapes.includes(selection.shape) ? selection.shape : availableShapes[0];

  const availableSizes = getAvailableSizes(variants, shape);
  const size = availableSizes.includes(selection.size) ? selection.size : availableSizes[0];

  const availableFinishes = getAvailableFinishes(variants, shape, size);
  const finish = availableFinishes.includes(selection.finish)
    ? selection.finish
    : availableFinishes[0];

  const availableQualities = getAvailableQualities(variants, shape, size, finish);
  const quality = availableQualities.includes(selection.quality)
    ? selection.quality
    : availableQualities[0];

  return { shape, size, finish, quality };
}

