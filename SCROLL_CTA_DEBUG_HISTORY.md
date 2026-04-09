# Scroll + Sticky CTA Problem — Full History

## Date
2026-04-09, ~2.5 hours of debugging

---

## Problem Statement

On the mobile configurator page (`/configurator`), there is a **StickyMobileCTA** component — a fixed bottom bar with price and "Написать менеджеру" button.

### Requirements
1. **CTA must ALWAYS be visible in the first viewport** (fixed to bottom of screen)
2. **Scroll should appear ONLY when content doesn't fit** (iPhone XR, small Android)
3. **No scroll when content fits** (square/rectangular on normal screens)
4. **No "stickiness"** — always maintain a gap between content and CTA
5. **No content cutoff** — last option ("Премиум") must be fully visible and accessible

### Device Targets
- iPhone XR (414 × 896) — critical, content doesn't fit
- iPhone 12 Pro (390 × 844) — content doesn't fit
- Larger phones — content fits, no scroll needed

---

## Page Structure

```
html
  body
    main
      section.section (configurator page wrapper, small padding)
        div.inner
          div.layout (display: grid, min-height: 100svh - header)
            section.mediaColumn (images carousel)
            section.controlsColumn (padding-bottom for CTA spacing)
              div.controls
                div.topBar (desktop only, display: none on mobile)
                ... option groups (форма, размер, пропитка, тип дерева) ...
                div.summaryBar (desktop only, display: none on mobile)
          StickyMobileCTA (position: fixed, bottom: 0) ← OUTSIDE .layout
```

### Key CSS
- `.controlsColumn { padding-bottom: var(--cta-offset, 0px); }` — dynamic padding
- `.bar { position: fixed; bottom: 0; left: 0; right: 0; z-index: 30; }` — CTA
- CTA has `data-cta` attribute for JS selection
- CTA height ~80-90px (varies by device/content)

---

## Attempt #1: CSS-only (scrollbar-gutter removal)
**Idea:** Remove `scrollbar-gutter: stable` from html, hide scrollbar via `::-webkit-scrollbar`.
**Result:** Scrollbar hidden, but scroll still appeared when content didn't overflow.
**Files changed:** `src/app/globals.css`

---

## Attempt #2: Remove min-height from .layout
**Idea:** Remove `min-height: calc(100svh - var(--site-header-height))` to prevent empty space.
**Result:** CTA moved outside first viewport on small screens.
**Files changed:** `src/components/configurator/configurator.module.css`

---

## Attempt #3: Reduce padding-bottom to 1rem
**Idea:** Reduce `.controlsColumn` padding from `5rem` to `1rem`.
**Result:** Content covered by CTA on small screens (last option "Премиум" hidden).
**Files changed:** `src/components/configurator/configurator.module.css`

---

## Attempt #4: Dynamic scroll hook v1 (scrollHeight vs innerHeight)
**Idea:** Measure `document.body.scrollHeight` and compare with `window.innerHeight`. If overflow → allow scroll, else → hide.
**Problem:** `padding-bottom: 5rem` was included in scrollHeight, creating false overflow detection even when content fit.
**Result:** Scroll appeared even when content fit (square/rectangular).

---

## Attempt #5: Dynamic scroll hook v2 (subtract CTA height from scrollHeight)
**Idea:** Subtract CTA height from scrollHeight to get "real" content height.
**Problem:** CTA has `position: fixed` — it doesn't affect scrollHeight at all. Subtraction was wrong.
**Result:** Still broken.

---

## Attempt #6: Dynamic scroll hook v3 (offsetTop of children)
**Idea:** Measure `offsetTop + offsetHeight` of child elements to find last element position.
**Problem:** `offsetTop` is relative to offsetParent, not viewport. Wrong coordinate system.
**Result:** Incorrect measurements.

---

## Attempt #7: Dynamic scroll hook v4 (getBoundingClientRect)
**Idea:** Use `getBoundingClientRect().bottom` to measure last element position relative to viewport.
**Problem:** `overflow: hidden` on html prevented scroll when content overlapped CTA.
**Result:** Content cut off, no way to scroll.

---

## Attempt #8: React Portal for CTA
**Idea:** Render CTA via `createPortal` directly into `document.body` to ensure `position: fixed` works correctly (no ancestor with transform/filter/contain).
**Result:** CTA positioned correctly, but content still overlapped. Portal didn't solve the root cause.
**Files changed:** `src/components/configurator/StickyMobileCTA.tsx` (added createPortal)

---

## Attempt #9: Expert's "Safe Bottom Margin" Strategy
**Idea from external expert:**
1. Don't manipulate `overflow-y` — let browser handle scroll naturally
2. Use `ResizeObserver` instead of `setTimeout`
3. Dynamically set `--cta-offset` CSS variable:
   - If content fits → `padding = 0` (no scroll)
   - If content overlaps CTA → `padding = CTA height` (push content up)
4. Measure using `getBoundingClientRect().bottom` relative to viewport

**Implementation:**
- `useDynamicScroll.ts` — new hook with ResizeObserver
- `.controlsColumn { padding-bottom: var(--cta-offset, 0px); }`
- `StickyMobileCTA` moved outside `.layout` wrapper (Fragment)

**Result:**
- ✅ CTA always in first viewport
- ✅ No false scroll on large screens
- ❌ On small screens (iPhone XR), last option "Премиум" overlapped by CTA when scrolled to bottom

---

## Attempt #10: GAP Strategy (prevent "stickiness")
**Idea:** Always maintain a 20px gap between content and CTA/bottom edge.
- If content fits → `padding = 20px` (clean spacing)
- If content overlaps → `padding = CTA height + 20px` (no overlap + gap)

**Implementation:** Updated `useDynamicScroll.ts` with GAP constant.

**Result:**
- ✅ No stickiness
- ❌ Still overlapping on iPhone XR — last element measurement was wrong

---

## Attempt #11: Measure LAST VISIBLE element (CURRENT)
**Problem discovered:** `lastElementChild` of `.controls` was `.summaryBar`, which has `display: none` on mobile. We were measuring an invisible element!

**Fix:** Created `getLastVisibleElement()` function that recursively finds the last child with `display !== 'none'` and `offsetHeight > 0`.

**Implementation:**
- `useDynamicScroll.ts` — added `getLastVisibleElement()` recursive function
- `gallery-images.ts` — restored photo order `[7, 1, 2, 3, 4, 5, 6, 8]` (was lost during git stash)

**Current Status:**
- ✅ Photo #7 first (with flowers)
- ✅ CTA always in first viewport
- ✅ GAP prevents stickiness
- ⚠️ Need to test on real device — last element measurement should now be correct

---

## Current Code State

### `src/hooks/useDynamicScroll.ts`
- Measures last VISIBLE element using `getLastVisibleElement()`
- Uses `getBoundingClientRect().bottom` (viewport-relative, correct for fixed CTA)
- GAP = 20px always maintained
- `--cta-offset` set to either `GAP` or `ctaHeight + GAP`
- Triggers: ResizeObserver on body, scroll event, resize event
- No `overflow-y` manipulation

### `src/components/configurator/configurator.module.css`
- `.controlsColumn { padding-bottom: var(--cta-offset, 0px); }`
- `.layout { display: grid; min-height: calc(100svh - var(--site-header-height)); }`

### `src/components/configurator/StickyMobileCTA.tsx`
- `position: fixed; bottom: 0; left: 0; right: 0;`
- `data-cta` attribute for JS selection
- Rendered OUTSIDE `.layout` wrapper (in Fragment)

### `src/components/configurator/Configurator.tsx`
- Calls `useDynamicScroll()` hook
- CTA rendered as sibling to `.layout`, not inside it

### `src/app/globals.css`
- `scrollbar-gutter: stable` REMOVED from html
- `overflow-x: hidden` on html
- `::-webkit-scrollbar` hidden on html and body
- `scrollbar-width: none` on html and body

### `src/lib/gallery-images.ts`
- Photo order: `[7, 1, 2, 3, 4, 5, 6, 8]` (photo #7 with flowers is first)

---

## Known Issues / To Investigate

1. **Content overlap on small screens:** Even with dynamic padding, last option may be partially cut off. Need to verify `getLastVisibleElement()` is finding the correct element.

2. **Scroll listener performance:** `checkOverflow` is called on every scroll event. Should be debounced/throttled or use IntersectionObserver instead.

3. **Safe area insets:** iOS Home Indicator may need additional padding. Currently GAP=20px may not be enough on some devices.

4. **Initial render timing:** 200ms delay was used in previous attempts. Current implementation uses `requestAnimationFrame` but may need `setTimeout` for full layout (images, fonts).

---

## Git History

Relevant commits:
- `edf8e5c` — fix(gallery): show planter-with-flowers photo first (#6 → #1)
- `4dc75b2` — fix(configurator): mobile UX cleanup
- `6561249` — feat: configurator relayout with improved UX

All scroll-related changes are UNCOMMITTED (working directory).

---

## Recommendations for Next Agent

1. **Test on real device** (iPhone XR/Safari), not just DevTools. DevTools may not accurately simulate mobile browser behavior.

2. **Consider IntersectionObserver** instead of scroll listener — more performant and designed for this exact use case (detecting if element is visible in viewport).

3. **Maybe reconsider the approach:** Instead of dynamic padding, consider making the page always scrollable but hiding scrollbar when not needed. Or use `position: sticky` for CTA with a spacer element.

4. **Check if `min-height` on `.layout` is causing issues** — it may create extra space that affects measurements.

5. **Verify `getLastVisibleElement()`** is finding "Тип дерева" → "Премиум" button, not some other element. Add console.log for debugging.
