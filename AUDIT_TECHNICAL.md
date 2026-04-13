# Technical Audit — Voloma Site

**Date:** 2026-04-13  
**Scope:** Code quality, performance, architecture, build health  
**Stack:** Next.js 16.2.2 · React 19.2.4 · TypeScript 5.8 · Framer Motion 12 · CSS Modules

---

## Priority Matrix

| # | Priority | Area | Effort | Impact |
|---|----------|------|--------|--------|
| 1 | **P0 — Blocker** | Lint errors (14 problems, build fails with `--max-warnings=0`) | Low | High |
| 2 | **P0 — Blocker** | React 19 anti-pattern: `setState` in `useEffect` (2 errors) | Low | High |
| 3 | **P1** | Unused imports / dead code (8 warnings) | Low | Medium |
| 4 | **P1** | All pages are `"use client"` — no SSR/static benefits | Medium | High |
| 5 | **P1** | Missing `sitemap` / `robots` verification codes | Low | Medium |
| 6 | **P2** | `unoptimized` on every `<Image>` — bypasses Next.js optimisation | Medium | Medium |
| 7 | **P2** | DOM queries in `useDynamicScroll` (document.querySelector) | Medium | Medium |
| 8 | **P2** | Remotion bundled but unused (+2.5 MB) | Low | Low |
| 9 | **P2** | No error boundary / fallback UI | Medium | Medium |
| 10 | **P3** | No tests (unit, integration, visual) | High | Medium |

---

## 1. P0 — Lint Errors & Build Health

### 1.1 ESLint fails with `--max-warnings=0`

**14 problems** (2 errors + 12 warnings) cause `npm run lint` to exit non-zero:

| File | Issue | Fix |
|------|-------|-----|
| `ImageGallery.tsx:53` | `setState` inside `useEffect` — React 19 `react-hooks/set-state-in-effect` error | Replace with `onTransitionEnd` callback or derive `isEntering` from `activeIndex` via `useMemo` |
| `useIsMobile.ts:21` | Same `setState` in effect pattern | Use `useState(() => window.matchMedia(...).matches)` lazy initializer; subscribe in effect only |
| `ImageGallery.tsx` | Unused: `AnimatePresence`, `motion`, `imageCrossfade` | Remove imports |
| `ConfiguratorControls.tsx` | Unused: `formatPrice` | Remove import |
| `AnimatedChip.tsx` | Unused: `ButtonHTMLAttributes` | Remove import |
| `StickyMobileCTA.tsx` | Unused: `copied` prop | Remove prop or use it |
| `MasonryGallerySection.tsx` | `<img>` instead of `<Image>` | Replace with `next/image` |
| `yandex-metrika.tsx` | `<img>` for tracking pixel (acceptable) | Add `eslint-disable` directive |
| `gallery-images.ts` | Unused eslint-disable directive | Remove directive |
| `order-message.ts` | Unused: `formatPrice` | Remove import |
| `structured-data.ts` | Unused: `baseUrl`, `sizeNames` | Remove variables |

**Recommendation:** Fix all 14 items — they take <30 minutes total and restore green CI.

---

## 2. P0 — React 19 Anti-Patterns

### 2.1 `setState` inside `useEffect`

React 19 treats this as an error because it causes cascading renders:

**`ImageGallery.tsx` — entering animation:**
```ts
// BEFORE (error)
useEffect(() => {
  setIsEntering(true);          // setState in effect → cascade
  const timer = setTimeout(() => setIsEntering(false), 350);
  return () => clearTimeout(timer);
}, [activeIndex]);
```

**Fix options:**
- **A)** Track `isEntering` with `useRef` + `requestAnimationFrame` (no setState)
- **B)** Derive it during render: `const isEntering = activeIndex !== prevActiveIndexRef.current` (store prev in ref, update after render)
- **C)** Use Framer Motion's built-in `key` prop on the animated element — it handles enter/exit automatically

**`useIsMobile.ts` — media query init:**
```ts
// BEFORE (error)
useEffect(() => {
  const mq = window.matchMedia(...);
  setIsMobile(mq.matches);  // setState in effect
  // ...
}, []);
```

**Fix:**
```ts
const [isMobile, setIsMobile] = useState(
  () => typeof window !== 'undefined' && window.matchMedia(`(max-width: 1023px)`).matches
);
useEffect(() => {
  const mq = window.matchMedia(`(max-width: 1023px)`);
  const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
  mq.addEventListener('change', handler);
  return () => mq.removeEventListener('change', handler);
}, []);
```

---

## 3. P1 — Architecture: Everything is `"use client"`

**Current state:** Every single component and page has `"use client"` directive:
- All 8 section components
- Header, Footer
- Configurator + all 9 sub-components
- Both pages
- All custom hooks
- `Button.tsx`, `Chip.tsx`, `SectionContainer.tsx`

**Impact:**
- No server-side rendering benefits (no static HTML at build time)
- Larger JS bundle (entire app shipped to client)
- Slower initial page load (client must hydrate everything before interactive)
- No streaming or progressive enhancement

**What could be server components:**
| Component | Why |
|-----------|-----|
| `HomePage` | Static composition of sections — no state, no effects |
| `HeroSection` | Only needs `useScroll` for parallax — split: static markup + client parallax overlay |
| `MaterialSection`, `InteriorSection`, `PlantSection` | Pure image + text, no interactivity |
| `MasonryGallerySection` | Static grid — only lightbox needs client |
| `FAQSection` | Could render static HTML, hydrate accordion client-side |
| `SiteFooter` | Pure static content (already has conditional render by pathname) |
| `SiteHeader` | Only scroll listener needs client — logo/nav are static |
| `ConfiguratorPage` wrapper | Page shell could be server, only `<Configurator>` client |

**Recommendation:** Phase this incrementally:
1. **Phase 1:** Convert `SiteFooter`, `HomePage` to server components (low risk, clear win)
2. **Phase 2:** Convert static sections (`MaterialSection`, `InteriorSection`, `PlantSection`) — wrap only animated parts in `"use client"` boundaries
3. **Phase 3:** Refactor `FAQSection` to use `use client` only on the accordion items
4. **Phase 4:** Split `SiteHeader` — static shell + client scroll hook

---

## 4. P1 — Unused Remotion Dependency

`@remotion/bundler`, `@remotion/cli`, `@remotion/renderer` (~2.5 MB bundled) are listed in dependencies but never imported in any source file.

**Fix:** Remove from `package.json` → `npm install` (or move to `devDependencies` if planned for future video generation).

---

## 5. P1 — SEO Verification Codes Missing

`layout.tsx` has placeholder verification:
```ts
verification: {
  // yandex: "YOUR_YANDEX_VERIFICATION_CODE",
  // google: "YOUR_GOOGLE_VERIFICATION_CODE",
}
```

Also `metadataBase` falls back to `sslip.io` URL in production if `NEXT_PUBLIC_SITE_URL` isn't set.

**Fix:**
- Register with Yandex.Webmaster + Google Search Console
- Add verification codes as env vars
- Set `NEXT_PUBLIC_SITE_URL=https://voloma.94.140.224.220.sslip.io` (or your real domain) in server config

---

## 6. P2 — `unoptimized` on Every `<Image>`

Nearly every `<Image>` component has `unoptimized` prop, which **disables all Next.js image optimization** (no WebP/AVIF conversion, no resizing, no lazy loading optimization).

**Why this matters:**
- The product images ARE already WebP — so `unoptimized` makes sense for them (Next.js can't re-encode WebP)
- BUT section images (`/images/features/*.jpg`, `/images/gallery/*.jpg`, `/images/landing/*.jpg`) are JPEG and would benefit from optimization
- Hero images are WebP — correct to skip optimization

**Recommendation:**
- Keep `unoptimized` on product gallery images (already WebP, custom crop)
- **Remove** `unoptimized` from: section images, hero fallback images, any JPEG
- Configure `next.config.ts` with proper `remotePatterns` or use local images with automatic optimization

---

## 7. P2 — `useDynamicScroll` Uses Global DOM Queries

```ts
const controlsColumn = document.querySelector('.controlsColumn');
const ctaElement = document.querySelector('[data-cta]');
```

**Issues:**
- Breaks component encapsulation (Configurator must render elements with specific class names)
- Fragile — any CSS class rename breaks the hook
- `ResizeObserver` on `document.body` fires on every layout shift (expensive)
- Doesn't clean up properly if component unmounts during resize event

**Fix:** Use `ref` pattern:
```ts
const controlsRef = useRef<HTMLDivElement>(null);
const ctaRef = useRef<HTMLElement>(null);
// Pass refs to hook: useDynamicScroll({ controlsRef, ctaRef })
```

---

## 8. P2 — No Error Boundary / Error Handling

**Missing:**
- `error.tsx` and `global-error.tsx` in `src/app/` — Next.js will show default error pages
- No try/catch around `window.open()` calls (could throw if popup blocked)
- No fallback if Yandex Metrika fails to load
- Clipboard API failure is handled, but no UI path for non-HTTPS contexts where clipboard is unavailable

**Fix:** Add:
- `src/app/error.tsx` — generic error boundary with "Try again" button
- `src/app/configurator/error.tsx` — configurator-specific error state
- Graceful degradation for clipboard (already partially done)

---

## 9. P2 — Clipboard + Messenger UX Race Condition

In `handleMessengerClick`:
```ts
async function handleMessengerClick(target: MessengerKey) {
  await copyMessage(orderMessage, ...);  // copies to clipboard
  const targetUrl = buildMessengerUrl(target, orderMessage);
  window.open(targetUrl, '_blank', 'noopener,noreferrer');
}
```

**Issues:**
- Copy happens **before** `window.open` — if popup is blocked, user sees "copied" toast but nothing opens
- The `orderMessage` is copied to clipboard, but the Telegram URL also contains the message — **duplicate** and confusing
- On iOS Safari, `window.open` from async callback (after `await copyMessage`) may be blocked as "not user-initiated"

**Fix:** Don't copy before opening. Either:
- Copy on success (after window.open)
- Or don't copy at all — let the messenger URL carry the pre-filled message
- Show "Opening Telegram..." loading state

---

## 10. P3 — No Tests

Zero test coverage. Given the complex pricing logic, availability rules, and variant matching, this is risky.

**Minimum viable tests:**
| What | Type | Why |
|------|------|-----|
| `calculateTotalPrice()` | Unit | Pure function, critical for revenue |
| `resolveVariantMatch()` | Unit | Complex fallback logic, 4 strategies |
| `isSizeAvailable()` / `getInitialSize()` | Unit | Pure config functions |
| `buildMessengerUrl()` | Unit | URL encoding correctness |
| Configurator state changes | Integration | Shape change → size reset, price update |
| Homepage renders | Integration | Smoke test for static sections |

**Recommended stack:** Vitest (fast, works with Next.js) + React Testing Library

---

## 11. P3 — TypeScript Strictness Gaps

- `any` usage: None found (good!)
- `suppressHydrationWarning` on `<html>` — acceptable for theme/color, but worth auditing
- No branded types for prices (numbers used directly — could accidentally mix with dimensions)
- `Shape`, `Size`, `Finish`, `Quality` are well-defined enums (good)

---

## 12. P3 — CSS Architecture

**Current:** CSS Modules per component, CSS custom properties in `globals.css`

**Observations:**
- Consistent naming, no inline styles (except dynamic `--cta-offset`)
- Good use of `clamp()`, `min()`, `svh`/`dvh`
- No design tokens file — colors are hardcoded CSS vars
- No CSS linting (Stylelint not configured)

**Recommendations:**
- Extract design tokens into a single `tokens.css` file
- Add Stylelint for consistency (property ordering, no-duplicate-selectors)
- Consider CSS `@layer` for reset → base → component layering

---

## Summary — Action Plan

| Sprint | Items | Estimated Impact |
|--------|-------|-----------------|
| **Hotfix** | #1 Lint fixes, #2 React 19 anti-patterns | Green build, no React warnings |
| **Sprint 1** | #3 Remove Remotion, #5 SEO verification, #6 Image optimization audit | Faster build, better SEO |
| **Sprint 2** | #4 Convert 3-4 sections to Server Components | ~30-40% JS bundle reduction |
| **Sprint 3** | #7 Refs in useDynamicScroll, #8 Error boundaries | More robust architecture |
| **Sprint 4** | #9 Messenger UX fix, #10 Add tests | Better conversion reliability |
