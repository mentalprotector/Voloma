import type { ProductVariant } from "@/types/product";
import { getGalleryImages } from "@/lib/gallery-images";

// --- Narrow (Узкое) — S, M, L ---
const narrowSNaturalImages = getGalleryImages("narrow", "s", "natural");
const narrowSOakImages = getGalleryImages("narrow", "s", "oak_stain");
const narrowSRosewoodImages = getGalleryImages("narrow", "s", "rosewood_stain");

const narrowMNaturalImages = getGalleryImages("narrow", "m", "natural");
const narrowMOakImages = getGalleryImages("narrow", "m", "oak_stain");
const narrowMRosewoodImages = getGalleryImages("narrow", "m", "rosewood_stain");

const narrowLNaturalImages = getGalleryImages("narrow", "l", "natural");
const narrowLOakImages = getGalleryImages("narrow", "l", "oak_stain");
const narrowLRosewoodImages = getGalleryImages("narrow", "l", "rosewood_stain");

// --- Square (Квадратное) ---
const squareNaturalImages = getGalleryImages("square", "m", "natural");
const squareRosewoodImages = getGalleryImages("square", "m", "rosewood_stain");
const squareOakImages = getGalleryImages("square", "m", "oak_stain");

// --- Rectangular (Прямоугольное) ---
const rectNaturalImages = getGalleryImages("rect", "m", "natural");
const rectOakImages = getGalleryImages("rect", "m", "oak_stain");
const rectRosewoodImages = getGalleryImages("rect", "m", "rosewood_stain");

export const productVariants: ProductVariant[] = [
  // Narrow (Узкое) — S
  {
    id: "narrow-s-natural-standard",
    slug: "narrow-s-natural-standard",
    title: "Узкое кашпо S, натуральная сосна, стандарт",
    shape: "narrow",
    size: "s",
    finish: "natural",
    quality: "standard",
    images: narrowSNaturalImages,
    availability: "made_to_order",
    isCustomizable: true,
    dimensions: { length: 46, width: 23.5, height: 22 },
  },
  {
    id: "narrow-s-oak-standard",
    slug: "narrow-s-oak-standard",
    title: "Узкое кашпо S, дуб, стандарт",
    shape: "narrow",
    size: "s",
    finish: "oak_stain",
    quality: "standard",
    images: narrowSOakImages,
    availability: "made_to_order",
    isCustomizable: true,
    dimensions: { length: 46, width: 23.5, height: 22 },
  },
  {
    id: "narrow-s-rosewood-standard",
    slug: "narrow-s-rosewood-standard",
    title: "Узкое кашпо S, палисандр, стандарт",
    shape: "narrow",
    size: "s",
    finish: "rosewood_stain",
    quality: "standard",
    images: narrowSRosewoodImages,
    availability: "made_to_order",
    isCustomizable: true,
    dimensions: { length: 46, width: 23.5, height: 22 },
  },

  // Narrow (Узкое) — M
  {
    id: "narrow-m-natural-standard",
    slug: "narrow-m-natural-standard",
    title: "Узкое кашпо M, натуральная сосна, стандарт",
    shape: "narrow",
    size: "m",
    finish: "natural",
    quality: "standard",
    images: narrowMNaturalImages,
    availability: "made_to_order",
    isCustomizable: true,
    dimensions: { length: 66, width: 23.5, height: 22 },
  },
  {
    id: "narrow-m-oak-standard",
    slug: "narrow-m-oak-standard",
    title: "Узкое кашпо M, дуб, стандарт",
    shape: "narrow",
    size: "m",
    finish: "oak_stain",
    quality: "standard",
    images: narrowMOakImages,
    availability: "made_to_order",
    isCustomizable: true,
    dimensions: { length: 66, width: 23.5, height: 22 },
  },
  {
    id: "narrow-m-rosewood-standard",
    slug: "narrow-m-rosewood-standard",
    title: "Узкое кашпо M, палисандр, стандарт",
    shape: "narrow",
    size: "m",
    finish: "rosewood_stain",
    quality: "standard",
    images: narrowMRosewoodImages,
    availability: "made_to_order",
    isCustomizable: true,
    dimensions: { length: 66, width: 23.5, height: 22 },
  },

  // Narrow (Узкое) — L
  {
    id: "narrow-l-natural-standard",
    slug: "narrow-l-natural-standard",
    title: "Узкое кашпо L, натуральная сосна, стандарт",
    shape: "narrow",
    size: "l",
    finish: "natural",
    quality: "standard",
    images: narrowLNaturalImages,
    availability: "made_to_order",
    isCustomizable: true,
    dimensions: { length: 86, width: 23.5, height: 22 },
  },
  {
    id: "narrow-l-oak-standard",
    slug: "narrow-l-oak-standard",
    title: "Узкое кашпо L, дуб, стандарт",
    shape: "narrow",
    size: "l",
    finish: "oak_stain",
    quality: "standard",
    images: narrowLOakImages,
    availability: "made_to_order",
    isCustomizable: true,
    dimensions: { length: 86, width: 23.5, height: 22 },
  },
  {
    id: "narrow-l-rosewood-standard",
    slug: "narrow-l-rosewood-standard",
    title: "Узкое кашпо L, палисандр, стандарт",
    shape: "narrow",
    size: "l",
    finish: "rosewood_stain",
    quality: "standard",
    images: narrowLRosewoodImages,
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
