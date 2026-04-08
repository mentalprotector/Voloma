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

function buildVariantTitle(selection: VariantSelection) {
  const finishValue = selection.color as Finish;
  return `${shapeLabels[selection.shape]} кашпо ${sizeLabels[selection.size]}, ${finishLabels[
    finishValue
  ]?.toLowerCase() ?? selection.color}, ${qualityLabels[selection.quality].toLowerCase()}`;
}

export function selectionToSlug(selection: VariantSelection) {
  return `${selection.shape}-${selection.size}-${selection.color}-${selection.quality}`;
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
        variant.finish === selection.color &&
        variant.quality === selection.quality,
    },
    {
      type: "shape_size_color",
      label: "Показаны фото близкого варианта, оттенок или уровень качества может отличаться.",
      predicate: (variant) =>
        variant.shape === selection.shape &&
        variant.size === selection.size &&
        variant.finish === selection.color,
    },
    {
      type: "shape_color",
      label: "Показаны фото близкого варианта, размер или оттенок может отличаться.",
      predicate: (variant) =>
        variant.shape === selection.shape && variant.finish === selection.color,
    },
    {
      type: "shape_only",
      label: "Показаны фото близкого варианта, форма совпадает, но другие параметры могут отличаться.",
      predicate: (variant) => variant.shape === selection.shape,
    },
  ];

  for (const strategy of strategies) {
    const matchedVariant = matchBy(variants, strategy.predicate);

    if (matchedVariant) {
      const galleryState = getGalleryState(strategy.type, matchedVariant);

      return {
        matchType: strategy.type,
        galleryState,
        matchedVariant,
        label:
          galleryState === "fallback"
            ? "Показан близкий вариант"
            : galleryState === "placeholder"
              ? "Изготавливаем под заказ"
              : galleryState === "custom"
                ? "Сделаем под ваш вариант"
                : null,
        images: matchedVariant.images,
        placeholder,
      };
    }
  }

  return {
    matchType: "none",
    galleryState: "custom",
    matchedVariant: null,
    label: "Сделаем под ваш вариант",
    images: [],
    placeholder,
  };
}
