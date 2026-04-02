export const SHAPES = ["square", "rect", "long"] as const;
export const SIZES = ["s", "m", "l"] as const;
export const COLORS = ["oak", "walnut", "charcoal"] as const;
export const QUALITIES = ["standard", "premium"] as const;
export const AVAILABILITY = ["in_stock", "made_to_order", "preorder"] as const;

export type Shape = (typeof SHAPES)[number];
export type Size = (typeof SIZES)[number];
export type Color = (typeof COLORS)[number];
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
  color: Color;
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
  color: Color;
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
