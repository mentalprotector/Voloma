import type { Color, ProductVariant, Quality, Shape, Size, VariantSelection } from "@/types/product";

export function createSelectionFromVariant(variant: ProductVariant): VariantSelection {
  return {
    shape: variant.shape,
    size: variant.size,
    color: variant.color,
    quality: variant.quality,
  };
}

export function getInitialSelection(variants: ProductVariant[]): VariantSelection {
  return createSelectionFromVariant(variants[0]);
}

export function getAvailableShapes(variants: ProductVariant[]): Shape[] {
  return Array.from(new Set(variants.map((variant) => variant.shape))) as Shape[];
}

export function getAvailableSizes(variants: ProductVariant[], shape: Shape): Size[] {
  return Array.from(
    new Set(variants.filter((variant) => variant.shape === shape).map((variant) => variant.size)),
  ) as Size[];
}

export function getAvailableColors(
  variants: ProductVariant[],
  shape: Shape,
  size: Size,
): Color[] {
  return Array.from(
    new Set(
      variants
        .filter((variant) => variant.shape === shape && variant.size === size)
        .map((variant) => variant.color),
    ),
  ) as Color[];
}

export function getAvailableQualities(
  variants: ProductVariant[],
  shape: Shape,
  size: Size,
  color: Color,
): Quality[] {
  return Array.from(
    new Set(
      variants
        .filter(
          (variant) =>
            variant.shape === shape && variant.size === size && variant.color === color,
        )
        .map((variant) => variant.quality),
    ),
  ) as Quality[];
}

export function reconcileSelection(
  variants: ProductVariant[],
  selection: VariantSelection,
): VariantSelection {
  const availableShapes = getAvailableShapes(variants);
  const shape = availableShapes.includes(selection.shape) ? selection.shape : availableShapes[0];

  const availableSizes = getAvailableSizes(variants, shape);
  const size = availableSizes.includes(selection.size) ? selection.size : availableSizes[0];

  const availableColors = getAvailableColors(variants, shape, size);
  const color = availableColors.includes(selection.color) ? selection.color : availableColors[0];

  const availableQualities = getAvailableQualities(variants, shape, size, color);
  const quality = availableQualities.includes(selection.quality)
    ? selection.quality
    : availableQualities[0];

  return { shape, size, color, quality };
}

