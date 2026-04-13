import type { CropPosition, Finish, ProductImage, Shape, Size } from "@/types/product";
import imageOrderConfig from "../../public/images/cashpo/configs/image-order.json";

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

/** Number of photos we expect per variant config (fallback) */
const MAX_PHOTOS = 17;

/** Number of photos shown in the main gallery grid */
const GRID_PHOTOS = 6;

/** Crop configuration for a single photo */
interface CropConfig {
  desktop?: CropPosition;
  mobile?: CropPosition;
}

/** Full config for a variant's images */
interface VariantImageConfig {
  order?: number[];
  crops?: Record<string, CropConfig>;
}

/** Type for the JSON config */
type ImageOrderConfig = Record<string, VariantImageConfig>;

const config = imageOrderConfig as ImageOrderConfig;

/**
 * Build the config key from shape/finish.
 * For narrow variants with size suffix: "узкое-L/natural"
 * For others: "квадратное/natural"
 */
function buildConfigKey(
  shape: Shape,
  size: Size,
  finish: Finish,
): string {
  const shapeFolder = shapeFolderMap[shape];
  const sizeSuffix = shape === "narrow" ? `-${size.toUpperCase()}` : "";
  const finishFolder = finishFolderMap[finish];
  return `${shapeFolder}${sizeSuffix}/${finishFolder}`;
}

/**
 * Build image paths for a given variant configuration.
 *
 * @param tier  "thumbnails" | "medium" | "large" — controls which size folder to use
 */
export function getGalleryImages(
  shape: Shape,
  size: Size,
  finish: Finish,
  maxImages = MAX_PHOTOS,
  tier: "thumbnails" | "medium" | "large" = "medium",
): ProductImage[] {
  const shapeFolder = shapeFolderMap[shape];
  const sizeSuffix = shape === "narrow" ? `-${size.toUpperCase()}` : "";
  const finishFolder = finishFolderMap[finish];

  const basePath = `/images/cashpo/configs/${shapeFolder}${sizeSuffix}/${finishFolder}`;

  // Load config from JSON
  const configKey = buildConfigKey(shape, size, finish);
  const variantConfig = config[configKey];

  // Determine order: use config or fall back to sequential [1, 2, 3, ...]
  let order: number[];
  if (variantConfig?.order) {
    order = variantConfig.order;
  } else {
    // Default sequential order
    order = Array.from({ length: maxImages }, (_, i) => i + 1);
  }

  const crops = variantConfig?.crops || {};
  const images: ProductImage[] = [];

  for (let i = 0; i < Math.min(order.length, maxImages); i++) {
    const num = order[i];
    if (!num) break;

    const cropConfig = crops[String(num)];
    const objectPositionDesktop = cropConfig?.desktop;
    const objectPositionMobile = cropConfig?.mobile;

    images.push({
      url: `${basePath}/${tier}/${num}.webp`,
      alt: `${shapeLabelMap[shape]} кашпо${sizeSuffix ? " " + sizeSuffix : ""}, ${finish.replace("_", " ")}, фото ${i + 1}`,
      ...(objectPositionDesktop && { objectPositionDesktop }),
      ...(objectPositionMobile && { objectPositionMobile }),
    });
  }

  return images;
}

/** Build only the subset of images used in the main gallery grid */
export function getGridImages(
  shape: Shape,
  size: Size,
  finish: Finish,
  count = GRID_PHOTOS,
): ProductImage[] {
  return getGalleryImages(shape, size, finish, count, "medium");
}

/** Build full-resolution image paths for the lightbox */
export function getLargeImages(
  shape: Shape,
  size: Size,
  finish: Finish,
  count = MAX_PHOTOS,
): ProductImage[] {
  return getGalleryImages(shape, size, finish, count, "large");
}
