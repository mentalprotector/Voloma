# Jumpstart for GLM

Date: 2026-04-06
Workspace: `C:\dev\voloma-site`
Branch: `master`

## Goal

Continue the configurator relayout for Voloma and use the next 2 days to finish the new responsive flow instead of patching the old layout.

The current work is not a bugfix. It is an in-progress redesign of the `/configurator` page with simplified option logic, a new summary block, and a new mobile sticky CTA flow.

## Current repo state

Uncommitted modified files:

- `public/voloma-symbol.svg`
- `public/voloma-wordmark.svg`
- `src/app/configurator/page.module.css`
- `src/components/configurator/Configurator.tsx`
- `src/components/configurator/StickyMobileCTA.tsx`
- `src/components/configurator/configurator.module.css`
- `src/components/configurator/image-gallery.module.css`
- `src/components/configurator/sticky-mobile-cta.module.css`
- `src/components/layout/SiteHeader.tsx`
- `src/components/layout/site-header.module.css`
- `CONFIGURATOR_RELAYOUT_BRIEF.md`

Recent commits:

- `11b3117` Update branding and configurator UI
- `c31ac6f` Add third landing feature photo
- `9dfdafe` Refresh landing visuals and feature photos
- `c7b1ed2` desktope configurator layout

## Verified status

As of 2026-04-06, these commands pass:

- `npm run lint`
- `npm run typecheck`
- `npm run build`

This means the current branch is technically buildable even though the redesign is still unfinished from a UX/product perspective.

## What was changed already

### 1. Configurator logic was simplified

File: `src/components/configurator/Configurator.tsx`

The old product-option reconciliation flow was partly replaced with a simpler local configuration model:

- direct local state for `shape`, `size`, `color`, `woodType`, `wheels`
- manual availability map:
  - `square -> m`
  - `rect -> m`
  - `long -> s/m/l`
- manual price table:
  - `square = 4200`
  - `rect-m = 4700`
  - `long-s = 3900`
  - `long-m = 4900`
  - `long-l = 5900`
- extras:
  - premium wood / no knots = `+800`
  - wheels = `+500`

Image resolution still uses `resolveVariantMatch(productVariants, selection)` so gallery fallback behavior is preserved.

Important implication:
The UI price is no longer sourced from `matchedVariant.price`. It is now derived from hardcoded tables in the component.

### 2. Layout moved away from the old step-by-step accordion

File: `src/components/configurator/Configurator.tsx`
File: `src/components/configurator/configurator.module.css`

The previous flow had:

- accordion-like grouped steps
- horizontal scrollers for options
- overlapping white card over gallery
- spacer block near the bottom

The new flow now has:

- media block on top for mobile / left column for desktop
- continuous option groups
- wrap-based pill controls instead of horizontal scrollers
- inline summary card with total price
- separate sticky mobile CTA bar

### 3. Sticky mobile CTA was redesigned but not removed

File: `src/components/configurator/StickyMobileCTA.tsx`
File: `src/components/configurator/sticky-mobile-cta.module.css`

Current mobile CTA behavior:

- fixed bottom bar with product name, selection line, lead time, price, CTA button
- bottom sheet opens on CTA
- sheet allows:
  - copy message
  - open Telegram
  - open VK
  - open MAX
- there is a small price pulse animation on option changes

This is already working technically, but the product question is still open:
Should sticky CTA remain at all, or should the page use only the inline summary + CTA?

### 4. Header was adjusted for configurator mode

File: `src/components/layout/SiteHeader.tsx`
File: `src/components/layout/site-header.module.css`

Current behavior:

- regular pages still show symbol + wordmark + nav/actions
- configurator page on mobile shows a back link and simpler branding treatment
- desktop/header spacing and branding proportions were also tweaked

### 5. Branding SVG files changed

Files:

- `public/voloma-symbol.svg`
- `public/voloma-wordmark.svg`

I did not inspect the SVG internals in detail during this handoff. Assume branding assets were intentionally updated and should not be reverted casually.

## Main design intent

The strongest source of intent is:

- `C:\dev\voloma-site\CONFIGURATOR_RELAYOUT_BRIEF.md`

Read that file first in GLM. It explains why the old architecture was conflicting and why the page should become a single responsive flow instead of patched mobile/desktop variants.

The brief recommends starting from:

1. DOM/layout restructuring
2. option rows without horizontal scroll
3. decision about sticky CTA
4. visual polish

## Important risks and open questions

### 1. Hardcoded price logic may diverge from catalog truth

`Configurator.tsx` now uses local pricing constants instead of variant prices from `productVariants`.

This is fine if the business intentionally wants a simpler pricing matrix.
This is risky if `productVariants` is supposed to remain the source of truth.

GLM should decide:

- keep hardcoded pricing and document it clearly
- or reconnect displayed price to structured catalog data

### 2. Availability is also hardcoded now

Availability is encoded in `AVAILABILITY` instead of being inferred from product data.

That is acceptable only if the assortment is intentionally constrained and stable.

### 3. Sticky CTA may still be duplicative

The brief explicitly recommends starting from variant B:

- inline summary + CTA in the page
- no sticky CTA unless testing proves it is needed

Current implementation still keeps sticky CTA on mobile, so this is unfinished from a product-direction standpoint.

### 4. Visual unification is only partly done

The white-card-over-gallery problem was addressed structurally, but the final surface language, spacing rhythm, and brand consistency still need review on real breakpoints.

### 5. Accessibility needs another pass

Build is green, but UX/accessibility still deserves manual checking:

- keyboard order
- focus-visible states
- switch semantics for wheels
- button states for disabled sizes
- long selection strings in narrow widths

## Recommended 2-day plan for GLM

### Day 1

1. Read `CONFIGURATOR_RELAYOUT_BRIEF.md` fully.
2. Open `/configurator` and inspect widths `320`, `360`, `375`, `390`, `414`, `768`, `1024`, `1280`, `1440`.
3. Decide whether sticky CTA stays or is removed.
4. Normalize the summary/CTA architecture so there is one clear primary action model.
5. Review whether manual pricing/availability should stay or move back to data-derived logic.

### Day 2

1. Polish spacing, hierarchy, and surface consistency across gallery, controls, and summary.
2. Tighten mobile header behavior and configurator-specific brand treatment.
3. Validate focus states and keyboard access.
4. Re-run:
   - `npm run lint`
   - `npm run typecheck`
   - `npm run build`
5. If stable, create a commit with a message around configurator relayout completion.

## Concrete files to inspect first in GLM

- `C:\dev\voloma-site\CONFIGURATOR_RELAYOUT_BRIEF.md`
- `C:\dev\voloma-site\src\components\configurator\Configurator.tsx`
- `C:\dev\voloma-site\src\components\configurator\configurator.module.css`
- `C:\dev\voloma-site\src\components\configurator\StickyMobileCTA.tsx`
- `C:\dev\voloma-site\src\components\configurator\sticky-mobile-cta.module.css`
- `C:\dev\voloma-site\src\components\configurator\image-gallery.module.css`
- `C:\dev\voloma-site\src\components\layout\SiteHeader.tsx`
- `C:\dev\voloma-site\src\components\layout\site-header.module.css`
- `C:\dev\voloma-site\src\app\configurator\page.module.css`

## Suggested prompt for GLM

Use this workspace as-is and continue the in-progress relayout of the Voloma configurator.

Start by reading `C:\dev\voloma-site\CONFIGURATOR_RELAYOUT_BRIEF.md` and then inspect the current uncommitted changes in the configurator and header files.

Constraints:

- do not revert unrelated branding asset changes
- preserve buildability
- prefer finishing the responsive flow instead of adding more patch CSS
- verify behavior at mobile and desktop breakpoints

Focus areas:

- decide whether the mobile sticky CTA should remain
- confirm whether manual pricing/availability is acceptable or should reconnect to product data
- refine layout, spacing, and accessibility

Before finishing, run:

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Short handoff summary

This branch is buildable and already contains a substantial rewrite of the configurator, but product/UX decisions are not finished. The biggest remaining decisions are whether sticky mobile CTA should survive and whether price/availability should stay hardcoded in `Configurator.tsx`.
