# ПРОМТ ДЛЯ АГЕНТА — Выполнение задач по аудиту Voloma

Ты — опытный фронтенд-разработчик. Тебе дано два файла-аудита:
- `AUDIT_TECHNICAL.md` — технический аудит (10 задач)
- `AUDIT_USABILITY.md` — юзабилити аудит (20 задач)

Часть задач уже выполнена (телефон добавлен, lead time унифицирован).
Ниже — разбивка оставшихся задач на подзадачи (tasks). Выполни их ВСЕ по порядку.

---

## TASK 1 — Fix Lint Errors & React 19 Anti-Patterns (P0)

### 1a. Удали неиспользуемые импорты:
- `src/components/configurator/ImageGallery.tsx`: удалить `AnimatePresence`, `motion` (строка 4), `imageCrossfade` (строка 10) — они импортированы но не используются
- `src/components/configurator/ConfiguratorControls.tsx`: удалить `formatPrice`
- `src/components/configurator/AnimatedChip.tsx`: удалить `ButtonHTMLAttributes`
- `src/components/configurator/StickyMobileCTA.tsx`: удалить неиспользуемый prop `copied` (или используй его)
- `src/lib/order-message.ts`: удалить `formatPrice`
- `src/lib/structured-data.ts`: удалить `baseUrl`, `sizeNames`
- `src/lib/gallery-images.ts`: удалить неиспользуемую eslint-disable директиву

### 1b. Исправь React 19 ошибку "setState in useEffect" в `ImageGallery.tsx`:
```
// Сейчас (ОШИБКА):
useEffect(() => {
  setIsEntering(true);
  const timer = setTimeout(() => setIsEntering(false), 350);
  return () => clearTimeout(timer);
}, [activeIndex]);
```
Замени на подход без setState в effect: используй `useRef` для отслеживания предыдущего `activeIndex` и вычисляй `isEntering` прямо в render:
```ts
const prevIndexRef = useRef(activeIndex);
const isEntering = activeIndex !== prevIndexRef.current;
// После render обновляем ref
useEffect(() => { prevIndexRef.current = activeIndex; });
// setTimeout для сброса — оставь в обработчике onTransitionEnd на элементе
```

### 1c. Исправь React 19 ошибку в `useIsMobile.ts`:
```ts
// Сейчас (ОШИБКА):
useEffect(() => {
  const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
  setIsMobile(mq.matches);  // setState в effect
  ...
}, []);
```
Замени на lazy initializer в useState:
```ts
const [isMobile, setIsMobile] = useState(() => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches;
});

useEffect(() => {
  const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
  const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
  mq.addEventListener('change', handler);
  return () => mq.removeEventListener('change', handler);
}, []);
```

### 1d. `<img>` в `MasonryGallerySection.tsx` (строка 69) — замени на `<Image>` из `next/image` или добавь `eslint-disable-next-line @next/next/no-img-element` с комментарием почему нельзя использовать Image.

### 1e. `<img>` в `yandex-metrika.tsx` (строка 59) — это tracking pixel, добавь корректную `eslint-disable-next-line` директиву.

### 1f. Убедись что `npm run lint` проходит БЕЗ ошибок и предупреждений.

---

## TASK 2 — Remove Unused Remotion Dependency (P1)

В `package.json` удали из `dependencies`:
- `@remotion/bundler`
- `@remotion/cli`
- `@remotion/renderer`

Выполни `npm install` для обновления `package-lock.json`.

---

## TASK 3 — Fix `useDynamicScroll` — Replace DOM Queries with Refs (P2)

### 3a. В `Configurator.tsx` добавь refs:
```tsx
const controlsRef = useRef<HTMLDivElement>(null);
// CTA element уже имеет data-cta атрибут (StickyMobileCTA)
```

### 3b. Перепиши `useDynamicScroll` чтобы принимать refs вместо `document.querySelector`:
```ts
// Было:
export function useDynamicScroll() {
  const controlsColumn = document.querySelector('.controlsColumn');
  const ctaElement = document.querySelector('[data-cta]');
  ...
}

// Стало:
export function useDynamicScroll(controlsRef: React.RefObject<HTMLElement | null>) {
  // Используй controlsRef.current вместо querySelector
}
```

### 3c. Передай ref из Configurator в hook: `useDynamicScroll(controlsRef)`.

### 3d. Убедись что ResizeObserver всё ещё работает, но теперь привязан к конкретному элементу а не ко всему body.

---

## TASK 4 — Add Error Boundaries (P2)

### 4a. Создай `src/app/error.tsx` — общий error boundary для всех страниц:
- Красивый UI с сообщением об ошибке
- Кнопка "Попробовать снова" (использует `useRouter().refresh()`)
- Ссылка "Вернуться на главую"

### 4b. Создай `src/app/configurator/error.tsx` — специфичный error boundary для конфигуратора:
- Сохраняет header/footer layout
- Предлагает "Сбросить конфигуратор" или "Вернуться на главную"

---

## TASK 5 — Fix Messenger UX Race Condition (P3)

В `Configurator.tsx`, функция `handleMessengerClick`:
```ts
// Сейчас: копирует → потом открывает URL (async → popup block на iOS)
async function handleMessengerClick(target: MessengerKey) {
  await copyMessage(orderMessage, ...);
  const targetUrl = buildMessengerUrl(target, orderMessage);
  window.open(targetUrl, '_blank', 'noopener,noreferrer');
}
```

Замени на:
1. Сначала `window.open()` (синхронно, в рамках user gesture)
2. Копирование в фоне (не блокирует, без await)
3. Покажи "Открываем Telegram..." вместо "Скопировано" если открытие успешно

Или ещё лучше: не копируй вообще — messenger URL уже содержит pre-filled message. Просто открой URL.

---

## TASK 6 — Show Internal Dimensions Inline in Configurator (HIGH)

Данные уже есть в `src/config/availability.ts` (`INTERNAL_DIMENSIONS`, `EXTERNAL_DIMENSIONS`).

### 6a. Создай компонент `DimensionsDisplay.tsx` в `src/components/configurator/`:
```tsx
interface DimensionsDisplayProps {
  shape: Shape;
  size: Size;
}
// Показывает:
// Внешние: 660 × 235 × 220 мм
// Внутренние: 600 × 175 × 150 мм
// Подойдёт для: балконный ящик ~60 см
```

### 6b. Вставь его в `ConfiguratorControls.tsx` сразу после селектора размера — показывать только когда размер выбран (всегда показывать, т.к. размер всегда выбран).

### 6c. Добавь подходящие стили — компактный блок с иконкой 📐 или линейкой.

---

## TASK 7 — Add Shareable Configurator URL (MEDIUM)

### 7a. При изменении любой опции обновляй URL:
```ts
// В Configurator.tsx — при каждом change:
const searchParams = new URLSearchParams(window.location.search);
searchParams.set('shape', shape);
searchParams.set('size', size);
searchParams.set('finish', finish);
searchParams.set('quality', quality);
window.history.replaceState({}, '', `?${searchParams.toString()}`);
```

Или используй `useSearchParams` + `useRouter` из `next/navigation` для более правильного подхода.

### 7b. При загрузке страницы — прочитай параметры и восстанови состояние:
```ts
const searchParams = useSearchParams();
const initialShape = (searchParams.get('shape') as Shape) || 'narrow';
// ... для всех параметров
```

### 7c. Убедись что URL выглядит красиво: `/configurator?shape=narrow&size=m&finish=natural&quality=standard`

---

## TASK 8 — Fix Modal Accessibility: Focus Traps (MEDIUM)

### 8a. Для `OrderSheet.tsx`:
- Добавь `role="dialog"` и `aria-modal="true"` на `<motion.section>`
- Реализуй простой focus trap: при открытии модалки — фокус на первый интерактивный элемент; при Tab — циклически возвращай к началу; при Escape — закрой
- При закрытии — верни фокус на элемент который открыл модалку

### 8b. Для `Lightbox.tsx`:
- Добавь `aria-modal="true"`
- Реализуй focus trap аналогично
- При закрытии верни фокус на thumbnail который был активен

### 8c. Для `SpecsModal.tsx`:
- То же самое — `aria-modal="true"` + focus trap

---

## TASK 9 — Add `.phone` Styling to Footer CSS

В `src/components/layout/site-footer.module.css` добавь стили для `.phone`:
```css
.phone {
  composes: email;
  /* Или отдельные стили если нужно отличие от email */
}
```
(Это уже частично сделано — проверь что composes работает корректно, или продублируй стили из `.email`.)

---

## TASK 10 — Fix prefers-reduced-motion for Framer Motion (HIGH)

В `globals.css` CSS-анимации отключены, но Framer Motion (JS) продолжает работать.

### 10a. Создай хук `src/hooks/usePrefersReducedMotion.ts`:
```ts
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}
```

### 10b. В компонентах с анимациями используй этот хук:
- `HeroSection.tsx`: если reduced → отключить parallax (`useTransform` с одинаковыми значениями), убрать initial scale анимацию
- `FAQSection.tsx`: если reduced → убрать stagger анимации, показывать всё сразу
- `ConfiguratorControls.tsx` / `AnimatedPill.tsx` / `AnimatedChip.tsx` / `AnimatedSwatch.tsx`: если reduced → убрать spring анимации, использовать простые transitions
- `ImageGallery.tsx`: если reduced → убрать `isEntering` animation

Или проще: используй Framer Motion's встроенный `useReducedMotion` из `framer-motion` вместо своего хука!

---

## TASK 11 — Fix Color Contrast (HIGH)

В `globals.css` измени:
```css
/* Было: */
--color-text-muted: #a89880;       /* ~2.8:1 — FAIL */
--color-text-secondary: #7a6a5a;   /* ~4.2:1 — FAIL */

/* Стало: */
--color-text-muted: #6b5b4b;       /* ~6.5:1 — PASS */
--color-text-secondary: #5a4a3a;   /* ~8:1 — PASS */
```

Проверь что после изменения все элементы читаемы.

---

## TASK 12 — Unify Lead Time Messaging (MEDIUM) — УЖЕ СДЕЛАНО

В `Configurator.tsx` уже изменено на `"от 3 дней"`.
Проверь что в footer в `site-content.ts` delivery section тоже указано "от 3 дней" или "3 рабочих дня" — без противоречий.

В `src/content/site-content.ts` в `footer.delivery` сейчас:
```
"Изготовление: 3 рабочих дня",
```
Это ОК — соответствует "от 3 дней" в конфигураторе.

---

## ОБЩИЕ ТРЕБОВАНИЯ

1. После выполнения ВСЕХ задач запусти:
   - `npm run lint` — должно пройти БЕЗ ошибок и предупреждений
   - `npm run build` — должно пройти без ошибок TypeScript
   - `npm run typecheck` — без ошибок

2. Каждый таск — отдельный commit с понятным сообщением:
   - `fix: remove unused imports across components`
   - `fix: resolve React 19 setState-in-effect errors`
   - `feat: add error boundaries for app and configurator`
   - `fix: replace DOM queries in useDynamicScroll with refs`
   - etc.

3. НЕ добавляй отзывы/рецензии — их пока нет.
4. НЕ добавляй skip-to-content — это не нужно для текущего scope.
5. НЕ добавляй время ответа менеджера — будет указано когда будет известно.
6. Телефон `+79992900919` уже добавлен в футер — не трогай.
