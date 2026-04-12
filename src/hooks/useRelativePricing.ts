import { useMemo } from "react";
import { formatPrice } from "@/lib/format";

export interface PriceOption {
  id: string;
  priceExtra: number;
}

export interface PriceOptionWithBadge<T extends PriceOption> {
  option: T;
  displayBadge: string | null;
}

/**
 * Calculates relative price differences between options.
 * 
 * For each option, computes: diff = targetOption.priceExtra - selectedOption.priceExtra
 * - diff > 0: "+ [diff] ₽"
 * - diff < 0: "- [abs(diff)] ₽"
 * - diff === 0: null (hide badge)
 */
export function useRelativePricing<T extends PriceOption>(
  options: T[],
  selectedId: string
): PriceOptionWithBadge<T>[] {
  return useMemo(() => {
    const selectedOption = options.find((opt) => opt.id === selectedId);
    if (!selectedOption) {
      return options.map((option) => ({
        option,
        displayBadge: null,
      }));
    }

    const selectedPrice = selectedOption.priceExtra;

    return options.map((option) => {
      const diff = option.priceExtra - selectedPrice;

      let displayBadge: string | null = null;
      if (diff > 0) {
        displayBadge = `+${formatPrice(diff)}`;
      } else if (diff < 0) {
        displayBadge = `-${formatPrice(Math.abs(diff))}`;
      }
      // diff === 0: badge is null (selected option or same price)

      return {
        option,
        displayBadge,
      };
    });
  }, [options, selectedId]);
}
