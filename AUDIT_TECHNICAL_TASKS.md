# ПРОМТ ДЛЯ АГЕНТА — Технический рефакторинг Voloma

Ты — опытный senior фронтенд-разработатель, специализирующийся на Next.js App Router и React Server Components.

Проект: `C:\dev\voloma-site` — Next.js 16.2.2, React 19.2.4, TypeScript, CSS Modules, Framer Motion.
Стек уже работает, build проходит. Задача — **уменьшить JS-бандл** и **улучшить архитектуру**.

---

## TASK 1 — Convert Static Sections to React Server Components

Сейчас **каждый** компонент имеет `"use client"`. Многие секции лендинга — чистый статический контент без state/effects. Их нужно перевести на Server Components.

### 1a. `SiteFooter` → Server Component

Файл: `src/components/layout/SiteFooter.tsx`

**Что делает сейчас:** Читает `usePathname()` чтобы скрыться на `/configurator`, рендерит статический контент.

**Как исправить:**
- Убери `"use client"` и `usePathname`
- Перенеси логику скрытия в `layout.tsx`:
  ```tsx
  // В layout.tsx:
  <SiteHeader />
  <main>{children}</main>
  {pathname !== '/configurator' && <SiteFooter />}
  ```
- В `SiteFooter.tsx` убери `usePathname`, импорты `next/navigation`, `trackEvent` (аналитику на клик по email можно оставить через обычный `<a>` без trackEvent, ИЛИ сделай отдельный клиентский компонент-обёртку только для trackEvent)
- Footer должен стать полностью Server Component

### 1b. `HomePage` → Server Component

Файл: `src/app/page.tsx`

**Что делает сейчас:** Композиция 8 секций + JSON-LD скрипты. Никакого state/effects.

**Как исправить:**
- Убери `"use client"` (его там нет — страница уже серверная! Проверь что это так)
- Если есть `"use client"` — убери
- Убедись что все импорты секций совместимы с RSC (они могут быть client components — это OK, RSC может импортировать client components)

### 1c. `MaterialSection`, `InteriorSection`, `PlantSection` → Server Components

Эти три секции — просто `<Image>` + текст + обёртка. Никакой интерактивности.

Файлы:
- `src/components/sections/MaterialSection.tsx`
- `src/components/sections/InteriorSection.tsx`
- `src/components/sections/PlantSection.tsx`

**Для каждой:**
- Убери `"use client"`
- Убери `motion` / Framer Motion анимации — замени на CSS-only анимации через `@keyframes` в `.module.css` с `prefers-reduced-motion` поддержкой ИЛИ просто убери анимации (эти секции — второстепенный декор)
- Если используешь `whileInView` / `initial` / `animate` — замени на CSS `animation` с `intersection-observer` (IntersectionObserver в `useEffect` — это OK для client component обёртки)
- **Альтернатива (проще):** оставь Framer Motion, но выдели client-обёртку:
  ```tsx
  // MaterialSection.tsx — Server Component
  import { MaterialSectionClient } from './MaterialSectionClient';
  export function MaterialSection() {
    return <MaterialSectionClient imageData={...} />;
  }
  
  // MaterialSectionClient.tsx — "use client", только анимация
  ```

Выбери подход: либо убрать анимации (быстрее, проще), либо выделить client-обёртку (сохраняет UX). Рекомендую убрать — эти секции не критичны для вовлечения.

### 1d. `HeroSection` → Split Server + Client

Файл: `src/components/sections/HeroSection.tsx`

**Что делает:** Parallax через `useScroll` + `useTransform`, stagger анимации текста.

**Как исправить:**
- Раздели на Server markup + Client parallax:
  ```tsx
  // HeroSection.tsx — Server
  export function HeroSection() {
    return <HeroSectionParallax />;
  }
  
  // HeroSectionParallax.tsx — "use client"
  // Только parallax эффект, markup в server
  ```
- Или проще: оставь как client component, но вынеси `<picture>` с картинкой в server-рендеринг через `children` prop:
  ```tsx
  // page.tsx
  <HeroSection>
    <picture>...</picture>
  </HeroSection>
  ```

### 1e. `MasonryGallerySection` → Server Component

Файл: `src/components/sections/MasonryGallerySection.tsx`

**Что делает:** CSS Grid gallery с `<img>` (не `<Image>`).

**Как исправить:**
- Убери `"use client"` (если нет интерактивности — проверь)
- Замени `<img>` на `<Image>` из `next/image` (убери eslint-disable если был)
- Если есть hover-анимации — переведи на CSS

### 1f. `FAQSection` → Server shell + Client accordion

Файл: `src/components/sections/FAQSection.tsx`

**Что делает:** Accordion с `useState` + Framer Motion анимации.

**Как исправить:**
- FAQ данные (вопросы/ответы) — в Server Component
- Accordion интерактивность — в Client Component
- ```tsx
  // FAQSection.tsx — Server
  import { FAQAccordion } from './FAQAccordion';
  import { siteContent } from '@/content/site-content';
  
  export function FAQSection() {
    return <FAQAccordion items={siteContent.faq} />;
  }
  
  // FAQAccordion.tsx — "use client"
  // useState + анимации
  ```

### 1g. `SectionContainer` → Server Component

Файл: `src/components/ui/SectionContainer.tsx`

Это просто `<div>` с padding — должен быть Server Component. Убери `"use client"` если есть.

### 1h. `Button.tsx`, `Chip.tsx` — оставить Client

Эти UI-компоненты интерактивные — оставь как есть.

---

## TASK 2 — Image Optimization Audit

Сейчас почти каждый `<Image>` имеет `unoptimized` — это отключает всю оптимизацию Next.js (WebP/AVIF конвертацию, ресайз, lazy loading).

### 2a. Найди ВСЕ `<Image unoptimized>` в проекте

Команда: `grep -r "unoptimized" src/`

### 2b. Раздели на две категории:

**Оставить `unoptimized`** (уже WebP, Next.js не может перекодировать):
- Все product images из `/images/cashpo/configs/` — уже WebP
- Hero images `/images/hero/*.webp` — уже WebP

**Убрать `unoptimized`** (JPEG — Next.js может оптимизировать):
- `/images/features/*.jpg`
- `/images/gallery/*.jpg`
- `/images/landing/*.jpg`
- `/images/about/*.svg` — SVG нельзя через Image, оставь `<img>`
- Hero fallback JPG (если есть)

### 2c. Для каждого `<Image>` без `unoptimized`:
- Убедись что `width` и `height` указаны (или `fill` с `sizes`)
- Убедись что `loading="lazy"` стоит (по умолчанию lazy, но для не-hero — OK)
- Для hero-изображений оставь `priority`

### 2d. Обнови `next.config.ts`:
```ts
images: {
  formats: ['image/avif', 'image/webp'],
  // Убедись что remotePatterns не нужен (все изображения локальные)
}
```

---

## TASK 3 — SEO Verification & Metadata

Файл: `src/app/layout.tsx`

### 3a. Заполни verification codes

Сейчас:
```ts
verification: {
  // yandex: "YOUR_YANDEX_VERIFICATION_CODE",
  // google: "YOUR_GOOGLE_VERIFICATION_CODE",
},
```

Замени на чтение из env:
```ts
verification: {
  yandex: process.env.YANDEX_VERIFICATION_CODE,
  google: process.env.GOOGLE_VERIFICATION_CODE,
},
```

### 3b. `metadataBase` — fallback

Сейчас: `metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://voloma.94.140.224.220.sslip.io")`

Это OK для текущего деплоя. Добавь комментарий:
```ts
// TODO: Update URL when custom domain is configured
metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://voloma.94.140.224.220.sslip.io"),
```

### 3c. Создай `.env.example` в корне проекта:
```env
# SEO Verification Codes (optional)
YANDEX_VERIFICATION_CODE=
GOOGLE_VERIFICATION_CODE=

# Site URL (defaults to sslip.io for staging)
NEXT_PUBLIC_SITE_URL=https://voloma.94.140.224.220.sslip.io
```

---

## TASK 4 — Add Unit Tests (Minimum Viable)

Используй **Vitest** + **React Testing Library**.

### 4a. Установи зависимости:
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react
```

### 4b. Создай `vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
});
```

### 4c. Создай `src/test/setup.ts`:
```ts
import '@testing-library/jest-dom/vitest';
```

### 4d. Обнови `package.json` scripts:
```json
"test": "vitest run",
"test:watch": "vitest"
```

### 4e. Напиши тесты:

**`src/lib/__tests__/pricing.test.ts`:**
```ts
import { describe, it, expect } from 'vitest';
import { calculateTotalPrice, getBasePrice, getFinishSurcharge } from '@/config/pricing';

describe('calculateTotalPrice', () => {
  it('returns base price for natural finish', () => {
    expect(calculateTotalPrice('narrow', 's', { quality: 'standard', finish: 'natural', hasWheels: false }))
      .toBe(1900);
  });

  it('adds stain surcharge', () => {
    expect(calculateTotalPrice('narrow', 's', { quality: 'standard', finish: 'oak_stain', hasWheels: false }))
      .toBe(2700); // 1900 + 800
  });

  it('premium costs more than standard', () => {
    const standard = calculateTotalPrice('square', 'm', { quality: 'standard', finish: 'natural', hasWheels: false });
    const premium = calculateTotalPrice('square', 'm', { quality: 'premium', finish: 'natural', hasWheels: false });
    expect(premium).toBeGreaterThan(standard);
  });

  it('wheels are free (no extra charge)', () => {
    const without = calculateTotalPrice('rect', 'm', { quality: 'standard', finish: 'natural', hasWheels: false });
    const withWheels = calculateTotalPrice('rect', 'm', { quality: 'standard', finish: 'natural', hasWheels: true });
    expect(withWheels).toBe(without);
  });
});
```

**`src/lib/__tests__/product-matching.test.ts`:**
```ts
import { describe, it, expect } from 'vitest';
import { resolveVariantMatch } from '@/lib/product-matching';
import { productVariants } from '@/data/product-variants';

describe('resolveVariantMatch', () => {
  it('returns exact match when all properties match', () => {
    const result = resolveVariantMatch(productVariants, {
      shape: 'square', size: 'm', finish: 'natural', quality: 'standard',
    });
    expect(result.matchType).toBe('exact');
    expect(result.galleryState).toBe('exact');
  });

  it('falls back to shape_size_color when quality differs', () => {
    const result = resolveVariantMatch(productVariants, {
      shape: 'square', size: 'm', finish: 'natural', quality: 'premium',
    });
    expect(result.matchType).toBe('shape_size_color');
  });

  it('falls back to shape_color when size and quality differ', () => {
    const result = resolveVariantMatch(productVariants, {
      shape: 'narrow', size: 'l', finish: 'natural', quality: 'premium',
    });
    expect(result.galleryState).toBeOneOf(['exact', 'fallback']);
  });

  it('always returns images when possible', () => {
    const shapes: Array<{ shape: 'narrow' | 'square' | 'rect' }> = [
      { shape: 'narrow' }, { shape: 'square' }, { shape: 'rect' },
    ];
    for (const { shape } of shapes) {
      const result = resolveVariantMatch(productVariants, {
        shape, size: 'm', finish: 'natural', quality: 'standard',
      });
      expect(result.images.length).toBeGreaterThan(0);
    }
  });
});
```

**`src/lib/__tests__/availability.test.ts`:**
```ts
import { describe, it, expect } from 'vitest';
import { isSizeAvailable, getInitialSize, hasSizeOptions, getAvailableSizesForShape } from '@/config/availability';

describe('availability', () => {
  it('narrow has all three sizes', () => {
    expect(getAvailableSizesForShape('narrow')).toEqual(['s', 'm', 'l']);
  });

  it('square only has m', () => {
    expect(getAvailableSizesForShape('square')).toEqual(['m']);
  });

  it('rect only has m', () => {
    expect(getAvailableSizesForShape('rect')).toEqual(['m']);
  });

  it('getInitialSize returns first available', () => {
    expect(getInitialSize('narrow')).toBe('s');
    expect(getInitialSize('square')).toBe('m');
  });

  it('hasSizeOptions true only for narrow', () => {
    expect(hasSizeOptions('narrow')).toBe(true);
    expect(hasSizeOptions('square')).toBe(false);
    expect(hasSizeOptions('rect')).toBe(false);
  });
});
```

**`src/lib/__tests__/messenger-links.test.ts`:**
```ts
import { describe, it, expect } from 'vitest';
import { buildMessengerUrl } from '@/lib/messenger-links';

describe('buildMessengerUrl', () => {
  it('creates telegram URL with pre-filled message', () => {
    const url = buildMessengerUrl('telegram', 'Тестовое сообщение');
    expect(url).toContain('t.me/');
    expect(url).toContain(encodeURIComponent('Тестовое сообщение'));
  });

  it('creates VK URL', () => {
    const url = buildMessengerUrl('vk', 'Тест');
    expect(url).toContain('vk.com/');
  });

  it('creates MAX URL', () => {
    const url = buildMessengerUrl('max', 'Тест');
    expect(url).toBeTruthy();
  });
});
```

### 4f. Обнови `tsconfig.json` для тестов — добавь типы vitest:
```json
// В vitest.config.ts или отдельном tsconfig.test.json
```

---

## TASK 5 — Clean Up Unused Code

### ✅ ВЫПОЛНЕНО

- `cyberpunk-hud/` перемещён в `C:\dev\remotion\cyberpunk-hud`
- Remotion dependencies (`@remotion/bundler`, `@remotion/cli`, `@remotion/renderer`) удалены из `package.json`
- В `src/` нет импортов remotion

Осталось проверить:
- `src/hooks/` — все ли хуки используются? (useCopyToClipboard, useDynamicScroll, useIsMobile, usePriceAnimation, useRelativePricing, useVibration — все ✅ используются)
- `src/lib/image-crop.ts` — используется в ImageGallery ✅
- `src/lib/product-options.ts` — проверить, если не используется — удалить

---

## ОБЩИЕ ТРЕБОВАНИЯ

1. **Каждый таск — отдельный commit:**
   - `refactor: convert SiteFooter to Server Component`
   - `refactor: convert static sections to Server Components`
   - `perf: remove unoptimized from JPEG images`
   - `chore: add SEO verification env vars`
   - `test: add unit tests for pricing, matching, availability`
   - `chore: remove unused code and dependencies`

2. **После ВСЕХ изменений:**
   - `npm run lint` — без ошибок
   - `npm run build` — без ошибок
   - `npm run typecheck` — без ошибок
   - `npm test` — все тесты проходят

3. **НЕ ломай существующий функционал:**
   - Все анимации должны работать (если не сказано убрать)
   - Конфигуратор должен работать как раньше
   - Все маршруты (`/`, `/configurator`) должны работать

4. **Приоритет:** Task 1 (Server Components) > Task 2 (Image optimization) > Task 4 (Tests) > Task 3 (SEO) > Task 5 (Cleanup)

5. **Если что-то неясно** — спроси перед тем как делать деструктивные изменения (удаление анимаций, изменение структуры).
