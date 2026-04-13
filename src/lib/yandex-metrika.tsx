/**
 * Яндекс.Метрика — компонент для аналитики
 * 
 * Для активации:
 * 1. Зарегистрируйте счётчик в Яндекс.Метрике: https://metrika.yandex.ru/
 * 2. Добавьте ID счётчика в переменную окружения NEXT_PUBLIC_YANDEX_METRICA_ID
 *    или укажите напрямую в METRICA_ID ниже
 * 3. При желании настройте вебвизор, карту кликов и другие опции
 */

const METRICA_ID = process.env.NEXT_PUBLIC_YANDEX_METRICA_ID;

interface YandexMetrikaProps {
  /** Дополнительные опции инициализации */
  options?: {
    webvisor?: boolean;
    clickmap?: boolean;
    trackLinks?: boolean;
    accurateTrackBounce?: boolean;
    ecommerce?: string;
  };
}

/**
 * Компонент Яндекс.Метрики для вставки в <head>
 */
export function YandexMetrika({ options = {} }: YandexMetrikaProps) {
  if (!METRICA_ID) {
    // В режиме разработки без ID — ничего не рендерим
    return null;
  }

  const {
    webvisor = true,
    clickmap = true,
    trackLinks = true,
    accurateTrackBounce = true,
  } = options;

  const metrikaScript = `
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t);a=e.getElementsByTagName(t)[0];k.async=1;k.src=r;a.parentNode.insertBefore(k,a)})
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    ym(${METRICA_ID}, "init", {
      clickmap: ${clickmap},
      trackLinks: ${trackLinks},
      accurateTrackBounce: ${accurateTrackBounce},
      webvisor: ${webvisor}
    });
  `;

  return (
    <>
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${METRICA_ID}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{ __html: metrikaScript }}
      />
    </>
  );
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
  if (typeof window === "undefined" || !METRICA_ID) {
    return;
  }

  if (typeof window.ym === "function") {
    window.ym(Number(METRICA_ID), "reachGoal", target, params);
  }
}

declare global {
  interface Window {
    ym?: (counterId: number, action: string, ...args: unknown[]) => void;
  }
}
