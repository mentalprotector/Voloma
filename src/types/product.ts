export const SHAPES = ["narrow", "square", "rect"] as const;
export const SIZES = ["s", "m", "l"] as const;
/** Finish option: stain color for the wood treatment */
export const FINISHES = ["natural", "oak_stain", "rosewood_stain"] as const;
export const QUALITIES = ["standard", "premium"] as const;
export const AVAILABILITY = ["in_stock", "made_to_order", "preorder"] as const;

export type Shape = (typeof SHAPES)[number];
export type Size = (typeof SIZES)[number];
export type Finish = (typeof FINISHES)[number];
export type Quality = (typeof QUALITIES)[number];
export type Availability = (typeof AVAILABILITY)[number];

export interface ProductImage {
  url: string;
  alt: string;
}

export interface ProductDimensions {
  length?: number;
  width?: number;
  height?: number;
}

export interface ProductVariant {
  id: string;
  slug: string;
  title: string;
  shape: Shape;
  size: Size;
  finish: Finish;
  quality: Quality;
  images: ProductImage[];
  price?: number;
  dimensions?: ProductDimensions;
  availability?: Availability;
  isCustomizable?: boolean;
}

export interface VariantSelection {
  shape: Shape;
  size: Size;
  finish: Finish;
  quality: Quality;
}

export type MatchType =
  | "exact"
  | "shape_size_color"
  | "shape_color"
  | "shape_only"
  | "none";

export type GalleryState = "exact" | "fallback" | "placeholder" | "custom";

export interface PlaceholderGalleryData extends VariantSelection {
  title: string;
  slug: string;
  imagePath: string;
}

export interface ResolvedVariantMatch {
  matchType: MatchType;
  galleryState: GalleryState;
  matchedVariant: ProductVariant | null;
  label: string | null;
  images: ProductImage[];
  placeholder: PlaceholderGalleryData;
}
