import type { ProductVariant } from "@/types/product";
import { getGalleryImages } from "@/lib/gallery-images";

/**
 * Product variants for the new configurator model.
 *
 * Images are only populated for variants that actually have files on disk.
 * The matching logic falls back to a variant with images when the exact
 * selection has none yet.
 */

/** The single variant that currently has real photos */
const squareNaturalStandardImages = getGalleryImages(
  "square",
  "m",
  "natural",
  "standard",
);

export const productVariants: ProductVariant[] = [
  // Narrow (Узкое) — S, M, L  (no images yet)
  {
    id: "narrow-s-natural-standard",
    slug: "narrow-s-natural-standard",
    title: "Узкое кашпо S, натуральная сосна, стандарт",
    shape: "narrow",
    size: "s",
    finish: "natural",
    quality: "standard",
    images: [], // photos not yet available
    availability: "made_to_order",
    isCustomizable: true,
    dimensions: { length: 46, width: 23.5, height: 22 },
  },
  {
    id: "narrow-m-natural-standard",
    slug: "narrow-m-natural-standard",
    title: "Узкое кашпо M, натуральная сосна, стандарт",
    shape: "narrow",
    size: "m",
    finish: "natural",
    quality: "standard",
    images: [],
    availability: "made_to_order",
    isCustomizable: true,
    dimensions: { length: 66, width: 23.5, height: 22 },
  },
  {
    id: "narrow-l-natural-standard",
    slug: "narrow-l-natural-standard",
    title: "Узкое кашпо L, натуральная сосна, стандарт",
    shape: "narrow",
    size: "l",
    finish: "natural",
    quality: "standard",
    images: [],
    availability: "made_to_order",
    isCustomizable: true,
    dimensions: { length: 86, width: 23.5, height: 22 },
  },
  // Square (Квадратное) — single size, HAS REAL IMAGES
  {
    id: "square-m-natural-standard",
    slug: "square-m-natural-standard",
    title: "Квадратное кашпо, натуральная сосна, стандарт",
    shape: "square",
    size: "m",
    finish: "natural",
    quality: "standard",
    images: squareNaturalStandardImages,
    availability: "made_to_order",
    isCustomizable: true,
    dimensions: { length: 40, width: 40, height: 22 },
  },
  // Rectangular (Прямоугольное) — single size  (no images yet)
  {
    id: "rect-m-natural-standard",
    slug: "rect-m-natural-standard",
    title: "Прямоугольное кашпо, натуральная сосна, стандарт",
    shape: "rect",
    size: "m",
    finish: "natural",
    quality: "standard",
    images: [],
    availability: "made_to_order",
    isCustomizable: true,
    dimensions: { length: 61.5, width: 42.5, height: 22 },
  },
];
