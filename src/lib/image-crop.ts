import type { ProductImage } from "@/types/product";

/**
 * Get the appropriate object-position CSS value for an image,
 * choosing mobile or desktop based on the isMobile flag.
 * Falls back to 'center center' if not specified.
 */
export function getObjectPosition(
  image: ProductImage,
  isMobile: boolean,
): string {
  return isMobile
    ? image.objectPositionMobile ?? "center center"
    : image.objectPositionDesktop ?? "center center";
}

/**
 * Build an inline style object for object-position.
 * Returns undefined if the image has no crop configuration (uses CSS default).
 */
export function getImageCropStyle(
  image: ProductImage,
  isMobile: boolean,
): React.CSSProperties | undefined {
  const position = getObjectPosition(image, isMobile);
  // Only apply inline style if explicitly configured
  if (
    !image.objectPositionDesktop &&
    !image.objectPositionMobile
  ) {
    return undefined;
  }
  return { objectPosition: position };
}

/**
 * Build a React CSSProperties object for object-position.
 * Always returns a valid style object (defaults to 'center center').
 */
export function getImageCropStyleRequired(
  image: ProductImage,
  isMobile: boolean,
): React.CSSProperties {
  const position = getObjectPosition(image, isMobile);
  return { objectPosition: position };
}
