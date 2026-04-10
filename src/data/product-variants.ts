import type { ProductVariant } from "@/types/product";
import { getGalleryImages } from "@/lib/gallery-images";

/**
 * Product variants for the new configurator model.
 *
 * Images are populated for variants that have files on disk.
 */

// --- Square (Квадратное) ---
const squareNaturalImages = getGalleryImages("square", "m", "natural", "standard");
const squareRosewoodImages = getGalleryImages("square", "m", "rosewood_stain", "standard");
const squareOakImages = getGalleryImages("square", "m", "oak_stain", "standard");

// --- Rectangular (Прямоугольное) ---
const rectNaturalImages = getGalleryImages("rect", "m", "natural", "standard");
const rectOakImages = getGalleryImages("rect", "m", "oak_stain", "standard");
const rectRosewoodImages = getGalleryImages("rect", "m", "rosewood_stain", "standard");

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

  // Square (Квадратное) — HAS IMAGES for natural & rosewood-stain
  {
    id: "square-m-natural-standard",
    slug: "square-m-natural-standard",
    title: "Квадратное кашпо, натуральная сосна, стандарт",
    shape: "square",
    size: "m",
    finish: "natural",
    quality: "standard",
    images: squareNaturalImages,
    availability: "made_to_order",
    isCustomizable: true,
    dimensions: { length: 40, width: 40, height: 22 },
  },
  {
    id: "square-m-rosewood-standard",
    slug: "square-m-rosewood-standard",
    title: "Квадратное кашпо, палисандр, стандарт",
    shape: "square",
    size: "m",
    finish: "rosewood_stain",
    quality: "standard",
    images: squareRosewoodImages,
    availability: "made_to_order",
    isCustomizable: true,
    dimensions: { length: 40, width: 40, height: 22 },
  },
  {
    id: "square-m-oak-standard",
    slug: "square-m-oak-standard",
    title: "Квадратное кашпо, дуб, стандарт",
    shape: "square",
    size: "m",
    finish: "oak_stain",
    quality: "standard",
    images: squareOakImages, // empty — no originals yet
    availability: "made_to_order",
    isCustomizable: true,
    dimensions: { length: 40, width: 40, height: 22 },
  },

  // Rectangular (Прямоугольное) — HAS IMAGES for all 3 finishes
  {
    id: "rect-m-natural-standard",
    slug: "rect-m-natural-standard",
    title: "Прямоугольное кашпо, натуральная сосна, стандарт",
    shape: "rect",
    size: "m",
    finish: "natural",
    quality: "standard",
    images: rectNaturalImages,
    availability: "made_to_order",
    isCustomizable: true,
    dimensions: { length: 61.5, width: 42.5, height: 22 },
  },
  {
    id: "rect-m-oak-standard",
    slug: "rect-m-oak-standard",
    title: "Прямоугольное кашпо, дуб, стандарт",
    shape: "rect",
    size: "m",
    finish: "oak_stain",
    quality: "standard",
    images: rectOakImages,
    availability: "made_to_order",
    isCustomizable: true,
    dimensions: { length: 61.5, width: 42.5, height: 22 },
  },
  {
    id: "rect-m-rosewood-standard",
    slug: "rect-m-rosewood-standard",
    title: "Прямоугольное кашпо, палисандр, стандарт",
    shape: "rect",
    size: "m",
    finish: "rosewood_stain",
    quality: "standard",
    images: rectRosewoodImages,
    availability: "made_to_order",
    isCustomizable: true,
    dimensions: { length: 61.5, width: 42.5, height: 22 },
  },
];
