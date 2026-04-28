"use client";

import Script from "next/script";

export const TRACKING_CONSENT_STORAGE_KEY = "voloma_tracking_consent";

const DEFAULT_PRODUCTION_METRICA_ID = "108819606";
const METRICA_ID =
  process.env.NEXT_PUBLIC_YANDEX_METRICA_ID ||
  (process.env.NODE_ENV === "production" ? DEFAULT_PRODUCTION_METRICA_ID : undefined);
const numericMetricaId = METRICA_ID ? Number(METRICA_ID) : null;

export const IS_YANDEX_METRIKA_CONFIGURED = Boolean(numericMetricaId);

interface YandexMetrikaProps {
  /** Дополнительные опции инициализации */
  options?: {
    webvisor?: boolean;
    clickmap?: boolean;
    trackLinks?: boolean;
    accurateTrackBounce?: boolean;
    ecommerce?: string;
    ssr?: boolean;
  };
  enabled: boolean;
}

/**
 * Компонент Яндекс.Метрики. Рендерится только после согласия пользователя.
 */
export function YandexMetrika({ enabled, options = {} }: YandexMetrikaProps) {
  if (!enabled || !numericMetricaId) {
    // В режиме разработки без ID — ничего не рендерим
    return null;
  }

  const {
    webvisor = true,
    clickmap = true,
    trackLinks = true,
    accurateTrackBounce = true,
    ecommerce = "dataLayer",
    ssr = true,
  } = options;

  const metrikaScript = `
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t);a=e.getElementsByTagName(t)[0];k.async=1;k.src=r;a.parentNode.insertBefore(k,a)})
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js?id=${numericMetricaId}", "ym");

    ym(${numericMetricaId}, "init", {
      ssr: ${ssr},
      clickmap: ${clickmap},
      ecommerce: ${JSON.stringify(ecommerce)},
      referrer: document.referrer,
      url: location.href,
      trackLinks: ${trackLinks},
      accurateTrackBounce: ${accurateTrackBounce},
      webvisor: ${webvisor}
    });
  `;

  return (
    <Script
      id="yandex-metrika"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: metrikaScript }}
    />
  );
}

function hasTrackingConsent() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(TRACKING_CONSENT_STORAGE_KEY) === "accepted";
}

/**
 * Утилита для отправки целей в Яндекс.Метрику
 *
 * @param target - Идентификатор цели
 * @param params - Дополнительные параметры
 *
 * @example
 * ```ts
 * yandexReachGoal("order_button_click");
 * ```
 */
export function yandexReachGoal(
  target: string,
  params?: Record<string, string | number | boolean | undefined>
) {
  if (typeof window === "undefined" || !numericMetricaId || !hasTrackingConsent()) {
    return;
  }

  if (typeof window.ym === "function") {
    window.ym(numericMetricaId, "reachGoal", target, params);
  }
}

declare global {
  interface Window {
    ym?: (counterId: number, action: string, ...args: unknown[]) => void;
  }
}
