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

export function trackEvent(
  event: AnalyticsEventName,
  payload?: Record<string, string | number | boolean | undefined>,
) {
  if (typeof window === "undefined") {
    return;
  }

  console.info("[analytics]", event, payload ?? {});
}

