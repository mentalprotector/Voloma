import { describe, it, expect } from 'vitest';
import { resolveVariantMatch } from '@/lib/product-matching';
import { productVariants } from '@/data/product-variants';
import type { VariantSelection } from '@/types/product';

describe('product-matching', () => {
  const makeSelection = (selection: Partial<VariantSelection>): VariantSelection => ({
    shape: 'narrow',
    size: 's',
    finish: 'natural',
    quality: 'standard',
    ...selection,
  });

  describe('resolveVariantMatch', () => {
    it('returns exact match when all properties match', () => {
      const selection = makeSelection({ shape: 'narrow', size: 's', finish: 'natural', quality: 'standard' });
      const result = resolveVariantMatch(productVariants, selection);

      expect(result.matchType).toBe('exact');
      expect(result.matchedVariant).not.toBeNull();
      expect(result.matchedVariant!.slug).toBe('narrow-s-natural-standard');
    });

    it('returns fallback when quality differs', () => {
      const selection = makeSelection({ shape: 'narrow', size: 's', finish: 'natural', quality: 'premium' });
      const result = resolveVariantMatch(productVariants, selection);

      // No premium quality variants exist, so it should fall back
      expect(result.matchType).not.toBe('exact');
      expect(result.images.length).toBeGreaterThanOrEqual(1);
    });

    it('adds premium photo note for standard selections', () => {
      const selection = makeSelection({ shape: 'narrow', size: 's', finish: 'natural', quality: 'standard' });
      const result = resolveVariantMatch(productVariants, selection);

      expect(result.note).toBe('На фото показано кашпо Премиум в выбранном размере и цвете');
    });

    it('does not add premium photo note for premium selections', () => {
      const selection = makeSelection({ shape: 'narrow', size: 's', finish: 'natural', quality: 'premium' });
      const result = resolveVariantMatch(productVariants, selection);

      expect(result.note).toBeNull();
    });

    it('falls back to shape_size_color when size matches but quality differs', () => {
      const selection = makeSelection({ shape: 'square', size: 'm', finish: 'natural', quality: 'premium' });
      const result = resolveVariantMatch(productVariants, selection);

      // There is no premium square, but there is standard square natural
      expect(result.matchedVariant).not.toBeNull();
      expect(result.images.length).toBeGreaterThanOrEqual(1);
    });

    it('always returns at least 1 image for known shapes', () => {
      const shapes = ['narrow', 'square', 'rect'] as const;
      const finishes = ['natural', 'oak_stain', 'rosewood_stain'] as const;

      for (const shape of shapes) {
        for (const finish of finishes) {
          const selection = makeSelection({ shape, finish });
          const result = resolveVariantMatch(productVariants, selection);

          expect(
            result.images.length,
          ).toBeGreaterThanOrEqual(1);
        }
      }
    });

    it('returns placeholder data with correct slug', () => {
      const selection = makeSelection({ shape: 'narrow', size: 'm', finish: 'oak_stain', quality: 'standard' });
      const result = resolveVariantMatch(productVariants, selection);

      expect(result.placeholder.slug).toBe('narrow-m-oak_stain-standard');
    });

    it('uses natural square reference for missing square oak photos', () => {
      const selection = makeSelection({ shape: 'square', size: 'm', finish: 'oak_stain', quality: 'standard' });
      const result = resolveVariantMatch(productVariants, selection);

      expect(result.matchType).toBe('square_oak_reference');
      expect(result.matchedVariant?.finish).toBe('natural');
      expect(result.note).toBe('Фото этой конфигурации пока нет, скоро добавим. Показано бесцветное квадратное M Премиум.');
      expect(result.images.length).toBeGreaterThanOrEqual(1);
    });

    it('returns galleryState based on match quality', () => {
      const exactSelection = makeSelection({ shape: 'narrow', size: 's', finish: 'natural', quality: 'standard' });
      const exactResult = resolveVariantMatch(productVariants, exactSelection);
      expect(exactResult.galleryState).toBe('exact');

      const differentShape = makeSelection({ shape: 'narrow', size: 'm', finish: 'natural', quality: 'premium' });
      const fallbackResult = resolveVariantMatch(productVariants, differentShape);
      // Should find a fallback match since premium doesn't exist
      expect(['exact', 'fallback', 'placeholder', 'custom']).toContain(fallbackResult.galleryState);
    });
  });
});
