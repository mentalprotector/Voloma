# Usability & Design Audit — Voloma Site

**Date:** 2026-04-13  
**Scope:** UX, accessibility, conversion funnel, content, mobile experience  
**Pages reviewed:** Landing page (`/`) + Configurator (`/configurator`)

---

## Must-Have Usability Gaps

| # | Severity | Area | Problem | Recommendation |
|---|----------|------|---------|----------------|
| 1 | **Critical** | Conversion | No phone number anywhere | Add phone/tel link in header + footer |
| 2 | **Critical** | Trust | No real customer reviews / testimonials | Add review section or testimonial cards |
| 3 | **Critical** | Accessibility | No skip-to-content link | Add `<a href="#main" class="sr-only">` as first DOM element |
| 4 | **Critical** | Legal | No privacy policy / personal data consent | Link in footer to privacy policy page |
| 5 | **High** | Configurator | No way to see internal dimensions during configuration | Show dimensions inline when size selected |
| 6 | **High** | Configurator | "Написать менеджеру" — manager response time unknown | Add "Ответим в течение 30 мин" or similar SLA |
| 7 | **High** | Navigation | No anchor nav on landing page | Add section dots or sticky nav for long-scroll landing |
| 8 | **High** | Mobile | Sticky CTA overlaps content (relies on JS `useDynamicScroll`) | Use CSS `padding-bottom: var(--cta-offset)` properly, test on real devices |
| 9 | **High** | Accessibility | Low contrast on secondary text (`--color-text-muted: #a89880` on `#faf8f5`) | Run through contrast checker, aim for WCAG AA (4.5:1) |
| 10 | **High** | Accessibility | No `prefers-reduced-motion` testing — Framer Motion animations may cause vestibular issues | Audit all animations, ensure `prefers-reduced-motion` kills them (partial — CSS done, JS not) |
| 11 | **Medium** | Configurator | No "undo" or "reset to defaults" in configurator | Add reset button or back navigation between steps |
| 12 | **Medium** | Content | "Готово за 3 рабочих дня" in footer vs "7–10 дней" in configurator — **contradiction** | Unify lead time messaging |
| 13 | **Medium** | Trust | No photos of workshop / team / process | Add "About us" or "How we make it" section |
| 14 | **Medium** | Accessibility | Modals (OrderSheet, Lightbox) don't trap focus | Implement focus trap, return focus on close |
| 15 | **Medium** | Configurator | Finish swatches show color, but no texture preview | Add small wood texture pattern or sample photo |
| 16 | **Medium** | SEO / UX | No shareable configurator URL | Encode selection in URL: `/configurator?shape=narrow&size=m&finish=natural` |
| 17 | **Low** | Landing | Hero parallax is nice but adds 1.2s animation on load | Consider static hero for above-the-fold, animate on scroll only |
| 18 | **Low** | Configurator | Image thumbnails strip (desktop) shows up to 17 images — overwhelming | Limit to 8-12, paginate or lazy-load rest |
| 19 | **Low** | Content | No "What's in the box" visible without modal | Show packaging dimensions and комплектация inline, not hidden in modal |
| 20 | **Low** | Accessibility | No `lang` switching support (only Russian) — fine for now, but consider adding EN later | N/A for current scope |

---

## Deep Dive

### 1. CRITICAL: No Phone Number

**Problem:** The only contact method is `hello@voloma.ru` email. For a product that costs 1,900–5,000 ₽ and requires personal consultation (delivery calculation, custom orders), many Russian customers expect to call.

**Impact:** Lost conversions from customers who prefer phone contact, especially older demographics and B2B buyers.

**Fix:** Add a `tel:` link in header and footer:
```html
<a href="tel:+79001234567">+7 (900) 123-45-67</a>
```
Track clicks as `trackEvent('contact_click', { source: 'header_phone' })`.

---

### 2. CRITICAL: No Testimonials / Social Proof

**Problem:** The landing page lists benefits ("Готово за 3 рабочих дня", "Колёсики в комплекте") but has zero social proof. For a small brand from Petrozavodsk, trust is the #1 barrier.

**What's missing:**
- Customer photos (real installations in real interiors)
- Star ratings or review quotes
- "X кашпо уже изготовлено" counter
- Before/after photos

**Minimum viable fix:** Add a "Отзывы" section with 3-4 customer quotes and photos. Even screenshots from Telegram conversations work.

---

### 3. CRITICAL: No Skip-to-Content Link

**Problem:** Keyboard and screen reader users must tab through the entire header (logo, navigation) before reaching page content.

**WCAG 2.1 requirement:** A mechanism to bypass blocks of repeated content.

**Fix:** Add as the **first element** in `<body>`:
```html
<a href="#main-content" className="sr-only" onFocus="this.classList.remove('sr-only')">
  Перейти к содержимому
</a>
```
With CSS:
```css
.sr-only {
  position: absolute; width: 1px; height: 1px;
  padding: 0; margin: -1px; overflow: hidden;
  clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
}
.sr-only:focus {
  position: fixed; top: 0; left: 0; width: auto; height: auto;
  padding: 1rem; background: white; z-index: 9999;
  clip: auto;
}
```
Add `id="main-content"` to the `<main>` element.

---

### 4. CRITICAL: No Privacy Policy

**Problem:** If you collect any personal data (even just messenger usernames when chatting), Russian law 152-ФЗ requires a privacy policy. The email link and messenger forms implicitly involve personal data processing.

**Fix:**
- Create a simple `/privacy` page (static text is fine)
- Link it in footer: `<a href="/privacy">Политика конфиденциальности</a>`
- If you ever add a contact form, add a checkbox: "Согласен на обработку персональных данных"

---

### 5. HIGH: Internal Dimensions Not Visible During Configuration

**Problem:** Users need to know if their plant pot fits inside the planter. The FAQ has internal dimensions buried in text, but the configurator doesn't show them at the moment of decision.

**Current flow:**
1. User selects "Узкое M"
2. Sees price, photos, finish options
3. Has NO idea if their pot fits
4. Must scroll to FAQ → find the right question → read a wall of text

**Fix:** Show dimensions inline below the size selector:
```
Узкое M · 2 000 ₽
┌──────────────────────────────┐
│ Внешние: 660 × 235 × 220 мм │
│ Внутренние: 600 × 175 × 150 мм │
│ Подойдёт для: балконный ящик 60 см │
└──────────────────────────────┘
```

The data already exists in `src/config/availability.ts` — just needs UI.

---

### 6. HIGH: Manager Response Time Unknown

**Problem:** "Написать менеджеру" is the primary CTA, but users have no idea how fast they'll get a response. This uncertainty kills conversions.

**Fix:** Add SLA near the CTA button:
- Desktop order card: `Изготовим за 7–10 дней · Ответим в течение 30 мин в рабочее время`
- Mobile sticky CTA: `· ⚡ Ответим за 30 мин`
- Order sheet modal: `Обычно отвечаем в течение 30 минут в рабочее время (Пн-Пт, 10:00–19:00)`

---

### 7. HIGH: No Anchor Navigation on Landing Page

**Problem:** The landing page is a long single-scroll page with 8 sections. Users can't quickly jump to the section they care about (FAQ, gallery, pricing).

**Fix options:**
- **A)** Add a sticky side nav (dots or labels) on the right — click scrolls to section
- **B)** Add a "table of contents" below hero with anchor links
- **C)** Add a floating "☰ Sections" button that opens a popover nav

Option A is the most common for landing pages and works well on desktop.

---

### 8. HIGH: Mobile Sticky CTA Overlap

**Problem:** `useDynamicScroll` uses `ResizeObserver` + `scroll` listener to dynamically calculate padding. This is fragile:

- On slow connections, images load late → layout shifts → CTA overlaps content
- On iOS, `dvh` unit behaves inconsistently → calculated padding may be wrong
- The hook measures "last visible element" which may not be the actual content bottom

**User impact:** Users can't see the last piece of content (specs button or summary bar) because it's hidden behind the CTA.

**Fix:** 
- Use CSS-only approach: `padding-bottom: calc(var(--cta-height, 80px) + 20px)` on the controls column
- Or: make the CTA part of the document flow (not `position: fixed`) and use `position: sticky` with proper spacing

---

### 9. HIGH: Color Contrast Issues

**Colors to check:**

| Text | Background | Ratio | WCAG AA? |
|------|-----------|-------|----------|
| `#a89880` (muted) | `#faf8f5` (bg) | ~2.8:1 | ❌ Fails (needs 4.5:1) |
| `#7a6a5a` (secondary) | `#faf8f5` (bg) | ~4.2:1 | ❌ Fails large text |
| `#ddd3c5` (border) | `#faf8f5` (bg) | ~1.5:1 | ❌ Decorative only |

**Affected elements:**
- FAQ question text may use muted color
- Subtitle in configurator
- "Показан близкий вариант" note
- Footer description text
- Gallery image labels ("Ракурс 1")

**Fix:** Darken muted text to at least `#7a6a5a` → `#5a4a3a` or use `#6b5b4b` for better contrast while maintaining the warm tone.

---

### 10. HIGH: `prefers-reduced-motion` — JS Animations Not Respected

**Current:** `globals.css` has:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**But:** All Framer Motion animations (`motion.div`, `useScroll`, `useTransform`, spring physics) run in JavaScript and are **not** affected by this CSS rule.

**Affected:**
- Hero parallax (`useScroll` + `useTransform`)
- Stagger animations on all sections (`whileInView`, `initial`, `animate`)
- Spring animations on pills/buttons (`whileTap`, `whileHover`)
- Sheet spring animation in modals
- Price pulse animation

**Fix:** Use Framer Motion's `useReducedMotion` hook:
```ts
import { useReducedMotion } from 'framer-motion';

function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const heroImageY = useReducedMotion() 
    ? useTransform(scrollYProgress, [0, 1], ["0%", "0%"])  // no parallax
    : useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  // ...
}
```

Or globally: create a wrapper component that disables Framer Motion animations when `prefers-reduced-motion` is set.

---

### 11. MEDIUM: No Reset / Undo in Configurator

**Problem:** If a user explores different shapes and finishes, there's no "start over" button. They must manually click back through each selector.

**Fix:** Add a small "Сбросить" link near the section title that resets all selections to defaults:
```ts
function handleReset() {
  setShape('narrow');
  setSize('m');
  setFinish('natural');
  setQuality('standard');
}
```

---

### 12. MEDIUM: Contradictory Lead Time Messaging

**Problem:**
- **Footer:** "Изготовление: 3 рабочих дня"
- **Configurator:** "Изготовим за 7–10 дней"
- **Hero:** "готово за 3 рабочих дня"
- **WhyVoloma:** "Готово за 3 рабочих дня"

This is a 2-3× discrepancy. Users will notice and lose trust.

**Fix:** Pick one number and use it everywhere. If 3 days is standard and 7-10 is for complex orders, say:
- "Большинство заказов — за 3 рабочих дня. Сложные конфигурации — до 10 дней."

---

### 13. MEDIUM: No Workshop / Process Photos

**Problem:** The landing page shows polished product photos but nothing about how they're made. For a handcrafted product from Karelia, the story is a key differentiator.

**What to add:**
- A "Как мы делаем кашпо" section with 3-4 steps (wood selection → cutting → assembly → finishing)
- Photos of the workshop, tools, hands working
- A short "About" section with founder/maker info

The `feature-01` through `feature-05` images hint at this, but they're generic wood texture photos, not process documentation.

---

### 14. MEDIUM: Modals Don't Trap Focus

**Affected:** `OrderSheet`, `Lightbox`, `SpecsModal`

**Problem:** When a modal is open, pressing Tab can move focus to elements behind the overlay. Screen readers may not announce the modal correctly.

**WCAG 2.1 requirements:**
- Focus must be trapped inside the modal
- Focus must return to the trigger element on close
- Modal must have `role="dialog"` and `aria-modal="true"`

**Current state:**
- `OrderSheet` has `role="presentation"` on overlay, `aria-label` on inner section — missing `role="dialog"` and `aria-modal`
- `Lightbox` has `role="dialog"` but no `aria-modal`
- `SpecsModal` similar

**Fix:** Add focus trap library (`@zag-js/focus-trap` or custom implementation):
```tsx
<section role="dialog" aria-modal="true" aria-label="..." ref={trapRef}>
```

---

### 15. MEDIUM: No Texture Preview for Finish Swatches

**Problem:** The finish swatches show solid colors (`#C8A87A` for natural, `#B8956A` for oak, `#6B4423` for rosewood), but the actual product has wood grain texture. Users can't tell how the stain looks on real wood.

**Fix options:**
- **A)** Use a small wood texture pattern as the swatch background
- **B)** Add a "Посмотреть примеры" link under the finish selector that opens a mini-gallery showing each finish
- **C)** Show a small photo of each finish type below the swatches (like product thumbnails)

---

### 16. MEDIUM: No Shareable Configurator URL

**Problem:** If a user configures "Узкое M, Натуральная, Стандарт" and wants to share it with their spouse, they can only screenshot it. The URL is always `/configurator`.

**Fix:** Encode selection in URL query params:
```
/configurator?shape=narrow&size=m&finish=natural&quality=standard
```

Parse on mount:
```ts
const searchParams = useSearchParams();
const initialShape = (searchParams.get('shape') as Shape) || 'narrow';
```

This also enables:
- Sharing links in Telegram conversations
- Bookmarking configurations
- Analytics on popular configurations

---

### 17. LOW: Hero Parallax May Hurt Performance

**Problem:** The hero section uses Framer Motion's `useScroll` + `useTransform` for parallax, with `initial` scale animation on load. This runs on the main thread and competes with image loading.

**Impact:** On low-end devices, the hero animation may stutter during the critical LCP (Largest Contentful Paint) window.

**Fix:** Consider:
- Using CSS-only parallax (`background-attachment: fixed` or `transform` on scroll)
- Deferring animation until after LCP (`requestIdleCallback` or after `onLoad`)
- Removing scale animation (the 1.05 → 1.0 zoom is barely noticeable)

---

### 18. LOW: Thumbnail Strip Shows Too Many Images

**Problem:** On desktop, the configurator's left column shows up to 17 thumbnails. This is overwhelming and takes vertical space from the controls.

**Fix:**
- Limit to 8-12 visible thumbnails
- Add "Show more" button or scrollable area
- Or: replace with a single larger image grid

---

### 19. LOW: Packaging Details Hidden in Modal

**Problem:** "Упаковка и комплектация" is behind a button → modal flow. For a product that ships disassembled, this info is critical for purchase decisions.

**Fix:** Show key info inline:
```
📦 В коробке: 660×280×80 мм, 1.2 кг
✓ Гидроизоляционная прокладка
✓ Колёсики (4 шт)
✓ Инструкция по сборке
```

Keep the modal for the full detailed breakdown.

---

## Accessibility Quick Score

| Criterion | Status | Notes |
|-----------|--------|-------|
| Semantic HTML | ⚠️ Partial | Sections/ nav present, but some `<button>` used as links |
| Alt text | ✅ Good | All images have descriptive Russian alt text |
| ARIA labels | ⚠️ Partial | Buttons labeled, but modals missing `aria-modal` |
| Focus management | ❌ Missing | No focus trap in modals, no skip link |
| Color contrast | ❌ Fails | Muted text fails WCAG AA |
| Keyboard nav | ⚠️ Partial | Tabs work, but no visible focus indicators beyond outline |
| Reduced motion | ❌ Fails | CSS done, JS animations not respected |
| Screen reader | ⚠️ Partial | JSON-LD good, but no live region announcements for dynamic content |
| Touch targets | ✅ Good | Pill buttons > 44px, good spacing |
| Form labels | N/A | No forms (all messenger-based) |

**Estimated WCAG 2.1 AA compliance: ~60%**

---

## Conversion Funnel Analysis

```
Landing Page → Hero CTA → Configurator → Select Options → "Написать менеджеру" → Messenger
     ✓             ✓            ✓              ✓                    ❌
```

**Drop-off risks:**
1. **Hero → Configurator:** CTA is clear ("Собрать своё кашпо") — good
2. **Configurator engagement:** Interactive, fun, well-designed — good
3. **Selection → Order:** "Написать менеджеру" requires trust — **no phone, no reviews, no SLA** = drop-off
4. **Messenger → Actual message:** User must paste the copied message — **extra step, may forget**

**Biggest win:** Add phone number + testimonials → immediate trust boost  
**Second biggest:** Show response time near CTA → reduces anxiety

---

## Summary — Action Plan

| Sprint | Items | Impact |
|--------|-------|--------|
| **Hotfix** | #12 Unify lead time messaging | Immediate trust fix |
| **Sprint 1** | #1 Phone number, #4 Privacy policy | Legal compliance + conversion |
| **Sprint 2** | #2 Testimonials, #13 Workshop photos | Trust & storytelling |
| **Sprint 3** | #3 Skip link, #9 Contrast, #10 Reduced motion, #14 Focus traps | Accessibility ~85% |
| **Sprint 4** | #5 Dimensions inline, #6 Response time, #16 Shareable URL | Conversion rate boost |
| **Backlog** | #7 Anchor nav, #8 CTA overlap, #15 Texture preview, #19 Inline packaging | Polish |
