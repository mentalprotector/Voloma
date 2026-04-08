import type { Finish, ProductImage, Shape, Size, Quality } from "@/types/product";

/** Maps shape enum value to folder name */
const shapeFolderMap: Record<Shape, string> = {
  narrow: "узкое",
  square: "квадратное",
  rect: "прямоугольное",
};

/** Maps finish enum value to folder name */
const finishFolderMap: Record<Finish, string> = {
  natural: "natural",
  oak_stain: "oak-stain",
  rosewood_stain: "rosewood-stain",
};

const shapeLabelMap: Record<Shape, string> = {
  narrow: "Узкое",
  square: "Квадратное",
  rect: "Прямоугольное",
};

/** Number of photos we expect per variant config */
const MAX_PHOTOS = 10;

/** Number of photos shown in the main gallery grid */
const GRID_PHOTOS = 4;

/**
 * Build image paths for a given variant configuration.
 *
 * @param tier  "thumbnails" | "medium" | "large" — controls which size folder to use
 */
export function getGalleryImages(
  shape: Shape,
  size: Size,
  finish: Finish,
  _quality: Quality,
  maxImages = MAX_PHOTOS,
  tier: "thumbnails" | "medium" | "large" = "medium",
): ProductImage[] {
  const shapeFolder = shapeFolderMap[shape];
  const sizeSuffix = shape === "narrow" ? `-${size.toUpperCase()}` : "";
  const finishFolder = finishFolderMap[finish];

  const basePath = `/images/cashpo/configs/${shapeFolder}${sizeSuffix}/${finishFolder}`;

  const images: ProductImage[] = [];

  for (let i = 1; i <= maxImages; i++) {
    images.push({
      url: `${basePath}/${tier}/${i}.webp`,
      alt: `${shapeLabelMap[shape]} кашпо${sizeSuffix ? " " + sizeSuffix : ""}, ${finish.replace("_", " ")}, фото ${i}`,
    });
  }

  return images;
}

/** Build only the subset of images used in the main gallery grid */
export function getGridImages(
  shape: Shape,
  size: Size,
  finish: Finish,
  quality: Quality,
  count = GRID_PHOTOS,
): ProductImage[] {
  return getGalleryImages(shape, size, finish, quality, count, "medium");
}

/** Build full-resolution image paths for the lightbox */
export function getLargeImages(
  shape: Shape,
  size: Size,
  finish: Finish,
  quality: Quality,
  count = MAX_PHOTOS,
): ProductImage[] {
  return getGalleryImages(shape, size, finish, quality, count, "large");
}
