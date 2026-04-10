/**
 * Format a price value as a Russian-localized string with ₽ symbol.
 */
export function formatPrice(value: number): string {
  return `${value.toLocaleString("ru-RU")} ₽`;
}

/**
 * Join class names, filtering falsy values.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
