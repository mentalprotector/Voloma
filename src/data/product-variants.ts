import type { ProductVariant } from "@/types/product";

/**
 * Product variants for the new configurator model.
 * Updated to use the new shape/finish model.
 * Images are intentionally left empty — they will be added later.
 */
export const productVariants: ProductVariant[] = [
  // Narrow (Узкое) — S, M, L
  {
    id: "narrow-s-natural-standard",
    slug: "narrow-s-natural-standard",
    title: "Узкое кашпо S, натуральная сосна, стандарт",
    shape: "narrow",
    size: "s",
    finish: "natural",
    quality: "standard",
    images: [],
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
  // Square (Квадратное) — single size
  {
    id: "square-m-natural-standard",
    slug: "square-m-natural-standard",
    title: "Квадратное кашпо, натуральная сосна, стандарт",
    shape: "square",
    size: "m",
    finish: "natural",
    quality: "standard",
    images: [],
    availability: "made_to_order",
    isCustomizable: true,
    dimensions: { length: 40, width: 40, height: 22 },
  },
  // Rectangular (Прямоугольное) — single size
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
