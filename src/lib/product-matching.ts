import { finishLabels, qualityLabels, shapeLabels, sizeLabels } from "@/content/site-content";
import type {
  Finish,
  GalleryState,
  MatchType,
  PlaceholderGalleryData,
  ProductVariant,
  ResolvedVariantMatch,
  VariantSelection,
} from "@/types/product";

const PREMIUM_STANDARD_NOTE = "На фото показано кашпо Премиум в выбранном размере и цвете";
const SQUARE_OAK_REFERENCE_NOTE =
  "Фото этой конфигурации пока нет, скоро добавим. Показано бесцветное квадратное M Премиум.";

function buildVariantTitle(selection: VariantSelection) {
  return `${shapeLabels[selection.shape]} кашпо ${sizeLabels[selection.size]}, ${finishLabels[
    selection.finish
  ]?.toLowerCase() ?? selection.finish}, ${qualityLabels[selection.quality].toLowerCase()}`;
}

export function selectionToSlug(selection: VariantSelection) {
  return `${selection.shape}-${selection.size}-${selection.finish}-${selection.quality}`;
}

export function createPlaceholderData(selection: VariantSelection): PlaceholderGalleryData {
  const slug = selectionToSlug(selection);

  return {
    ...selection,
    slug,
    title: buildVariantTitle(selection),
    imagePath: `/public/images/products/${slug}/`,
  };
}

function matchBy(
  variants: ProductVariant[],
  predicate: (variant: ProductVariant) => boolean,
): ProductVariant | null {
  return variants.find(predicate) ?? null;
}

function hasImages(variant: ProductVariant | null) {
  return Boolean(variant?.images?.length);
}

function isPremiumPhotoReference(selection: VariantSelection, matchedVariant: ProductVariant) {
  return selection.quality === "standard" && hasImages(matchedVariant);
}

function getPhotoNote(
  selection: VariantSelection,
  matchType: MatchType,
  matchedVariant: ProductVariant | null,
) {
  if (matchType === "square_oak_reference") {
    return SQUARE_OAK_REFERENCE_NOTE;
  }

  if (matchedVariant && isPremiumPhotoReference(selection, matchedVariant)) {
    return PREMIUM_STANDARD_NOTE;
  }

  return null;
}

function getGalleryState(matchType: MatchType, matchedVariant: ProductVariant | null): GalleryState {
  if (!matchedVariant) {
    return "custom";
  }

  if (!hasImages(matchedVariant)) {
    return matchType === "exact" ? "placeholder" : "custom";
  }

  return matchType === "exact" ? "exact" : "fallback";
}

/**
 * Resolves the best matching product variant for a given selection
 * and determines the appropriate gallery state.
 *
 * Matching strategies (in order of priority):
 * 1. Exact match - all properties match (shape, size, color, quality)
 * 2. Shape + size + color - quality differs
 * 3. Shape + color - size and quality may differ
 * 4. Shape only - only the shape matches
 *
 * Returns gallery state:
 * - "exact": Perfect match with images
 * - "fallback": Close match, showing similar variant
 * - "placeholder": Match found but no images
 * - "custom": No match, custom configuration
 */
export function resolveVariantMatch(
  variants: ProductVariant[],
  selection: VariantSelection,
): ResolvedVariantMatch {
  const placeholder = createPlaceholderData(selection);

  const findSquareReference = (finish: Finish) =>
    matchBy(
      variants,
      (variant) =>
        variant.shape === "square" &&
        variant.size === "m" &&
        variant.finish === finish &&
        hasImages(variant),
    );

  const strategies: Array<{
    type: MatchType;
    label: string | null;
    predicate: (variant: ProductVariant) => boolean;
  }> = [
    {
      type: "exact",
      label: null,
      predicate: (variant) =>
        variant.shape === selection.shape &&
        variant.size === selection.size &&
        variant.finish === selection.finish &&
        variant.quality === selection.quality,
    },
    {
      type: "shape_size_color",
      label: null, // Same photos for standard/premium — no "close match" label
      predicate: (variant) =>
        variant.shape === selection.shape &&
        variant.size === selection.size &&
        variant.finish === selection.finish,
    },
    {
      type: "shape_color",
      label: "Показаны фото близкого варианта, размер или оттенок может отличаться.",
      predicate: (variant) =>
        variant.shape === selection.shape && variant.finish === selection.finish,
    },
    {
      type: "shape_only",
      label: "Показаны фото близкого варианта, форма совпадает, но другие параметры могут отличаться.",
      predicate: (variant) => variant.shape === selection.shape,
    },
  ];

  if (selection.shape === "square" && selection.size === "m" && selection.finish === "oak_stain") {
    const matchedVariant = findSquareReference("natural");

    if (matchedVariant && hasImages(matchedVariant)) {
      return {
        matchType: "square_oak_reference",
        galleryState: "fallback",
        matchedVariant,
        label: "Показан близкий вариант",
        note: getPhotoNote(selection, "square_oak_reference", matchedVariant),
        images: matchedVariant.images,
        placeholder,
      };
    }
  }

  for (const strategy of strategies) {
    const matchedVariant = matchBy(variants, strategy.predicate);

    // Only return this match if it actually has images; otherwise keep falling back
    if (matchedVariant && hasImages(matchedVariant)) {
      const galleryState = getGalleryState(strategy.type, matchedVariant);

      return {
        matchType: strategy.type,
        galleryState: strategy.type === "shape_size_color" ? "exact" : galleryState,
        matchedVariant,
        label:
          galleryState === "fallback"
            ? "Показан близкий вариант"
            : strategy.type === "shape_size_color"
              ? null
              : galleryState === "placeholder"
                ? "Изготавливаем под заказ"
                : galleryState === "custom"
                ? "Сделаем под ваш вариант"
                : null,
        note: getPhotoNote(selection, strategy.type, matchedVariant),
        images: matchedVariant.images,
        placeholder,
      };
    }
  }

  // Final fallback: use any variant that has images
  const anyWithImages = variants.find(hasImages) ?? null;
  if (anyWithImages) {
    return {
      matchType: "none",
      galleryState: "fallback",
      matchedVariant: anyWithImages,
      label: "Показан близкий вариант",
      note: getPhotoNote(selection, "none", anyWithImages),
      images: anyWithImages.images,
      placeholder,
    };
  }

  return {
    matchType: "none",
    galleryState: "custom",
    matchedVariant: null,
    label: "Сделаем под ваш вариант",
    note: null,
    images: [],
    placeholder,
  };
}
