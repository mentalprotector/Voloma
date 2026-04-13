/**
 * Packaging and комплектация specifications for Волома planters
 * Based on the official price list
 */
import type { Shape, Size } from "@/types/product";

/** Packaging dimensions and weight per shape+size */
export const PACKAGING_SPECS: Record<Shape, Record<Size, {
  /** Packaging dimensions: Д × Ш × В (мм) */
  packageLength: number;
  packageWidth: number;
  packageHeight: number;
  /** Weight in kg */
  weight: number;
  /** Комплектация: "full" or "no_wheels" */
  комплектация: "full" | "no_wheels";
}>> = {
  narrow: {
    s: {
      packageLength: 470,
      packageWidth: 205,
      packageHeight: 160,
      weight: 4.0,
      комплектация: "no_wheels",
    },
    m: {
      packageLength: 675,
      packageWidth: 210,
      packageHeight: 110,
      weight: 5.5,
      комплектация: "no_wheels",
    },
    l: {
      packageLength: 900,
      packageWidth: 200,
      packageHeight: 100,
      weight: 6.8,
      комплектация: "full",
    },
  },
  square: {
    m: {
      packageLength: 385,
      packageWidth: 315,
      packageHeight: 160,
      weight: 7.6,
      комплектация: "full",
    },
    s: {
      packageLength: 385,
      packageWidth: 315,
      packageHeight: 160,
      weight: 7.6,
      комплектация: "full",
    },
    l: {
      packageLength: 385,
      packageWidth: 315,
      packageHeight: 160,
      weight: 7.6,
      комплектация: "full",
    },
  },
  rect: {
    m: {
      packageLength: 625,
      packageWidth: 395,
      packageHeight: 120,
      weight: 9.4,
      комплектация: "full",
    },
    s: {
      packageLength: 625,
      packageWidth: 395,
      packageHeight: 120,
      weight: 9.4,
      комплектация: "full",
    },
    l: {
      packageLength: 625,
      packageWidth: 395,
      packageHeight: 120,
      weight: 9.4,
      комплектация: "full",
    },
  },
} as const;

/** What "полная комплектация" includes */
export const FULL_KOMPLEKTACIYA_ITEMS = [
  "Наружное ограждение",
  "Шпильки",
  "Гайки",
  "Пол (фанера)",
  "Гидроизоляция",
  "Колёса",
];

/** What "без колёс" includes (narrow S and M) */
export const NO_WHEELS_KOMPLEKTACIYA_ITEMS = [
  "Наружное ограждение",
  "Шпильки",
  "Гайки",
  "Пол (фанера)",
  "Гидроизоляция",
];

/**
 * Get packaging specs for a given shape and size
 */
export function getPackagingSpecs(shape: Shape, size: Size) {
  return PACKAGING_SPECS[shape][size];
}

/**
 * Get комплектация items list for a given shape and size
 */
export function getKomplektatsiyaItems(shape: Shape, size: Size): string[] {
  const spec = PACKAGING_SPECS[shape][size];
  return spec.комплектация === "full"
    ? FULL_KOMPLEKTACIYA_ITEMS
    : NO_WHEELS_KOMPLEKTACIYA_ITEMS;
}
