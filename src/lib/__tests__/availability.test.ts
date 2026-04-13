import { describe, it, expect } from 'vitest';
import {
  getAvailableSizesForShape,
  getInitialSize,
  hasSizeOptions,
  isSizeAvailable,
} from '@/config/availability';

describe('availability', () => {
  describe('getAvailableSizesForShape', () => {
    it('narrow shape has sizes s, m, l', () => {
      const sizes = getAvailableSizesForShape('narrow');
      expect(sizes).toEqual(['s', 'm', 'l']);
    });

    it('square shape has size m', () => {
      const sizes = getAvailableSizesForShape('square');
      expect(sizes).toEqual(['m']);
    });

    it('rect shape has size m', () => {
      const sizes = getAvailableSizesForShape('rect');
      expect(sizes).toEqual(['m']);
    });
  });

  describe('getInitialSize', () => {
    it('returns s for narrow shape', () => {
      expect(getInitialSize('narrow')).toBe('s');
    });

    it('returns m for square shape', () => {
      expect(getInitialSize('square')).toBe('m');
    });

    it('returns m for rect shape', () => {
      expect(getInitialSize('rect')).toBe('m');
    });
  });

  describe('hasSizeOptions', () => {
    it('returns true for narrow shape', () => {
      expect(hasSizeOptions('narrow')).toBe(true);
    });

    it('returns false for square shape', () => {
      expect(hasSizeOptions('square')).toBe(false);
    });

    it('returns false for rect shape', () => {
      expect(hasSizeOptions('rect')).toBe(false);
    });
  });

  describe('isSizeAvailable', () => {
    it('returns true for valid narrow sizes', () => {
      expect(isSizeAvailable('narrow', 's')).toBe(true);
      expect(isSizeAvailable('narrow', 'm')).toBe(true);
      expect(isSizeAvailable('narrow', 'l')).toBe(true);
    });

    it('returns false for invalid square sizes', () => {
      expect(isSizeAvailable('square', 's')).toBe(false);
    });

    it('returns true for valid rect size', () => {
      expect(isSizeAvailable('rect', 'm')).toBe(true);
    });
  });
});
