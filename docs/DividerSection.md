# DividerSection — design intent and change log

This document explains **what** `components/sections/DividerSection.tsx` does, **why** key decisions were made, and **what not to regress** when editing. It exists so fixes are not accidentally reverted by later refactors.

---

## Purpose

- Marketing strip with **two panels**: Buyer (left) and Developer (right) on large screens; stacked on small screens.
- **Scroll-driven animation (desktop, `lg+` only)**:
  - A **split banner** (`DIVIDER_BANNER_SRC` / `Banner1.svg`) sits **above** the profile cards and animates apart on scroll.
  - **Profile cards** underneath fade/scale in as the user scrolls through the section.
- **Mobile**: banner overlay is **hidden** (`hidden lg:grid`) because it uses a **2-column** layout that does not match the **stacked** card layout. Cards use `max-lg:opacity-100!` and `max-lg:scale-100!` so they stay fully visible without relying on scroll opacity.

---

## Layering (z-index) — do not invert casually

| Layer | z-index | Role |
|--------|---------|------|
| Profile cards grid | `z-10` | Buyer/Developer content; scroll `opacity` + `scale` |
| Split banner overlay | `z-20` | Full-bleed strip of `Banner1.svg`; scroll `x` on each half |

**Why:** If cards are **above** the banner (`z-30` vs `z-10`), the **split animation is invisible** (you only see the cards). The banner must be **on top** for the motion to be visible, with cards animating **underneath**.

**Regression to avoid:** Putting the profile grid above the banner again without also changing the visual design (e.g. fading the banner out).

---

## “Single image” at the start (banner seam)

**Requirement:** Before scroll, the two banner halves should read as **one continuous image** across the strip.

**Implementation:**

- The overlay grid uses **`gap-0`** (no gutter between the two columns). Any **non-zero gap** inserts a band of background between columns and **breaks** the illusion of one image.
- The **profile cards** grid on `lg` may use **`lg:gap-[40px]`** for spacing between Buyer and Developer. The **banner** overlay stays **`gap-0`** (full-bleed 50% / 50% split asset). The seam is centered on the strip; the 40px gutter sits around that center — a small visual mismatch at the seam is accepted for layout spacing.

**Regression to avoid:** Adding **`gap`** between **banner** columns (breaks the single-image read at scroll start).

**Technical note:** Each half uses a **200%-wide** inner wrapper with `next/image` `fill` + `object-cover`; the right half uses `-left-full` so the same asset shows its **right** portion. Do not remove that pattern without replacing it with an equivalent seam-safe approach.

---

## Scroll ranges (Framer Motion)

`offset: ["start end", "end start"]` on the section; transforms use **`{ clamp: true }`** so after the active window values **stay at their end state** (animation fully “done” as you keep scrolling).

Typical windows (see source for exact numbers):

- **Split (`leftSplitX` / `rightSplitX`):** halves move apart, then **stay** fully split.
- **Cards (`cardsOpacity`, `cardsScale`):** ramp to **full opacity / scale 1**, then **stay** there.
- **Banner layer (`bannerLayerOpacity`):** after split + cards ramp, fades **`1 → 0`** so the **banner no longer sits on top** and the profile cards are **fully visible** without obstruction.

**Reduced motion:** `useReducedMotion()` — banner overlay **`opacity: 0`** (hidden), cards **`opacity` / `scale` full**, split **`x: 0`**.

**Regression to avoid:** Removing `cardsOpacity` / `cardsScale` “to simplify” — that brings back **invisible cards** until scroll unless paired with another visibility strategy.

---

## Figma-aligned styling (current)

- **Surface:** `#F2F2F2` (`FIGMA_CARD_BG`).
- **Selection palette:** documented in-file; taupe `#8F8183` for titles/icons; black `#000000` for “I am a” and CTA border; charcoal `#202225` for CTA label.
- **Per-card gradient overlays:** `FIGMA_GRAD_OVERLAY_BUYER` / `FIGMA_GRAD_OVERLAY_DEVELOPER` (20% linear between grey and taupe stops).

**Regression to avoid:** Reintroducing the older **taupe-only linear gradient** as the **sole** card background without checking Figma — that was superseded by the light surface + overlay tokens.

---

## Files

| File | Role |
|------|------|
| `components/sections/DividerSection.tsx` | Section UI + scroll logic |
| `public/images/Home/Banner1.svg` | Split banner asset (must work as one graphic when halves abut) |
| `public/images/Buyer/*`, `public/images/Developer/*` | Icons, pattern, portraits |

---

## Change log (high level)

| Topic | Outcome |
|--------|---------|
| Visibility | Cards must not sit **above** an opaque banner if the split should be seen; z-order documented above. |
| Seam | `gap-0` on **banner** only; optional **`lg:gap-[40px]`** on **cards** for spacing. |
| End state | Banner layer fades out; cards stay full opacity/scale (clamped). |
| Mobile | Banner split hidden below `lg`; cards forced visible with `!` utilities. |
| Colors | Figma selection colors + light surface + gradient overlays per card. |

When you change this section, **update this doc** in the same PR if behavior or constraints change.
