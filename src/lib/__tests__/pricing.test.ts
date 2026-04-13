import { describe, it, expect } from 'vitest';
import { getBasePrice, getFinishSurcharge, calculateTotalPrice } from '@/config/pricing';

describe('pricing', () => {
  describe('getBasePrice', () => {
    it('returns correct price for narrow-s-standard', () => {
      expect(getBasePrice('narrow', 's', 'standard')).toBe(1900);
    });

    it('returns correct price for narrow-m-premium', () => {
      expect(getBasePrice('narrow', 'm', 'premium')).toBe(2600);
    });

    it('returns correct price for rect-m-premium', () => {
      expect(getBasePrice('rect', 'm', 'premium')).toBe(5000);
    });

    it('premium costs more than standard for the same shape and size', () => {
      const standardPrice = getBasePrice('narrow', 's', 'standard');
      const premiumPrice = getBasePrice('narrow', 's', 'premium');
      expect(premiumPrice).toBeGreaterThan(standardPrice);
    });
  });

  describe('getFinishSurcharge', () => {
    it('returns 0 for natural finish', () => {
      expect(getFinishSurcharge('natural')).toBe(0);
    });

    it('returns STAIN_SURCHARGE (800) for oak_stain finish', () => {
      expect(getFinishSurcharge('oak_stain')).toBe(800);
    });

    it('returns STAIN_SURCHARGE (800) for rosewood_stain finish', () => {
      expect(getFinishSurcharge('rosewood_stain')).toBe(800);
    });
  });

  describe('calculateTotalPrice', () => {
    it('returns base price for natural finish without wheels', () => {
      const price = calculateTotalPrice('narrow', 's', {
        quality: 'standard',
        finish: 'natural',
        hasWheels: false,
      });
      expect(price).toBe(1900);
    });

    it('adds stain surcharge for oak finish', () => {
      const price = calculateTotalPrice('narrow', 's', {
        quality: 'standard',
        finish: 'oak_stain',
        hasWheels: false,
      });
      expect(price).toBe(1900 + 800);
    });

    it('premium quality costs more than standard', () => {
      const standardPrice = calculateTotalPrice('square', 'm', {
        quality: 'standard',
        finish: 'natural',
        hasWheels: false,
      });
      const premiumPrice = calculateTotalPrice('square', 'm', {
        quality: 'premium',
        finish: 'natural',
        hasWheels: false,
      });
      expect(premiumPrice).toBeGreaterThan(standardPrice);
    });

    it('wheels are free — no price difference with/without', () => {
      const withoutWheels = calculateTotalPrice('rect', 'm', {
        quality: 'standard',
        finish: 'natural',
        hasWheels: false,
      });
      const withWheels = calculateTotalPrice('rect', 'm', {
        quality: 'standard',
        finish: 'natural',
        hasWheels: true,
      });
      expect(withWheels).toBe(withoutWheels);
    });

    it('calculates correct total for premium rosewood narrow-l', () => {
      const price = calculateTotalPrice('narrow', 'l', {
        quality: 'premium',
        finish: 'rosewood_stain',
        hasWheels: false,
      });
      // Base: 3300 + stain: 800 = 4100
      expect(price).toBe(4100);
    });
  });
});
