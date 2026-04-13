/**
 * Analytics event tracking utilities
 *
 * Интегрируется с Яндекс.Метрикой для отслеживания событий.
 * В режиме разработки также логирует в консоль.
 */

import { yandexReachGoal } from "./yandex-metrika";

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

  // Отправляем цель в Яндекс.Метрику
  yandexReachGoal(event, payload);

  // В режиме разработки — логируем в консоль
  if (process.env.NODE_ENV === "development") {
    console.info("[analytics]", event, payload ?? {});
  }
}

