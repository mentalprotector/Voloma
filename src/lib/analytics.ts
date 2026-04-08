/**
 * Analytics event tracking utilities
 *
 * Currently logs to console for development.
 * In production, integrate with analytics services (e.g., Google Analytics, Yandex.Metrica).
 */

export type AnalyticsEventName =
  | "hero_cta_click"
  | "configurator_open"
  | "option_shape_select"
  | "option_size_select"
  | "option_color_select"
  | "option_quality_select"
  | "gallery_image_view"
  | "contact_click"
  | "custom_order_click"
  | "submit_request";

/**
 * Track an analytics event
 *
 * @param event - The event name to track
 * @param payload - Optional event data
 *
 * @example
 * ```ts
 * trackEvent("hero_cta_click", { source: "header" });
 * ```
 */
export function trackEvent(
  event: AnalyticsEventName,
  payload?: Record<string, string | number | boolean | undefined>,
) {
  if (typeof window === "undefined") {
    return;
  }

  console.info("[analytics]", event, payload ?? {});
}

