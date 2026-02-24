# Device Too Nice — Homepage Rebuild PRD

**Date:** 2026-02-24
**Status:** Approved
**Benchmark:** [Apple iPhone 17 Pro](https://www.apple.com/za/iphone-17-pro/) (see `docs/plans/2026-02-24-apple-benchmark-prd.md`)

---

## Goal

Rebuild the homepage from scratch to be immersive, cinematic, and make visitors froth at the idea of the OnePlus 15. Every section gets a unique layout template. No two consecutive sections should feel the same.

## Constraints

- **Performance is a hard constraint.** Page must feel lightweight, load fast, be smooth.
- **No custom photography or video shoots.** Use Giztop product renders creatively + 1-2 OnePlus official promo video clips.
- **Product:** OnePlus 15 only (OPPO paused).
- **Scroll animations must handle high-velocity scrolling** — no thresholds to miss, no jank.

## Technical Foundation

### New Dependencies
- **Lenis** — smooth scroll engine. All scroll-driven animations hook into its RAF loop.
- **Framer Motion** — powers the feature carousel and section transitions.
- **Embla Carousel** — already installed (shadcn carousel dependency).

### Scroll Animation Rules
- All scroll-driven effects use `transform` and `opacity` ONLY (GPU-composited, no layout triggers).
- Animations read Lenis scroll position via `requestAnimationFrame` — no raw `scroll` event listeners.
- `will-change: transform` used sparingly, only when element is in viewport.
- Fast scroll velocity handled gracefully — transforms interpolate per-frame, not tied to scroll thresholds.
- Respect `prefers-reduced-motion` — disable animations for users who opt out.

### Video Strategy
- 1-2 short clips (~5-8 seconds each) from OnePlus official sources.
- Dual format: WebM (VP9) + MP4 (H.264) fallback.
- Compressed to <=1.5MB per clip.
- Lazy-loaded with poster frame (first frame as JPG for instant visual).
- Autoplay muted, plays only when in viewport via IntersectionObserver.
- Pause when out of viewport to save resources.

### Image Optimization
- All product renders via Next.js `<Image>` component.
- WebP auto-conversion, responsive srcSet.
- Priority loading for hero only. All others lazy.
- Drop shadows via CSS `box-shadow` on wrapper, not `filter: drop-shadow()` (avoids repaint).

---

## Section Priority Order

1. Hero (first impression)
2. Display (165Hz screen)
3. Performance (Snapdragon 8 Elite)
4. Battery (7,300 mAh)
5. Design (nano-ceramic, IP69K)
6. Camera (triple 50MP — lower priority)
7. Specs (minimal — collapsible)

---

## Page Structure (10 Sections)

### Section 1: Hero
**Template:** Full-bleed video
**Background:** Video fills entire viewport

```
┌──────────────────────────────────────────────────┐
│                                                  │
│         [muted autoplay video loop]              │
│         OnePlus 15 promo clip                    │
│         full viewport, object-fit: cover         │
│                                                  │
│                                                  │
│              OnePlus 15                          │  large, SF Pro Display
│         Power On. Limits Off.                    │  medium, apple-gray
│                                                  │
│          From R15,000                            │
│                                                  │
│         [Order Now]  [Learn more ↓]              │
│                                                  │
│                   ↓                              │  scroll hint
└──────────────────────────────────────────────────┘
```

**Video:** ~5-8 second loop of OnePlus 15 rotating/being held. <=1.5MB. Poster frame loads instantly, video lazy-loads and plays when ready.

**Scroll behaviour:** As user scrolls down, video and text fade out with slight scale-down (parallax via Lenis). Creates feeling of "leaving" the hero.

**Key differences from current:**
- Video replaces static floating PNG
- No `animate-float` CSS animation
- Simpler/bolder text — just name, tagline, price, CTAs
- Scroll-driven exit animation
- Full viewport (`h-screen`) with content vertically centered

**Mobile:** Same layout. Video autoplays muted (works on iOS/Android). Poster frame for instant visual on slow connections. Text scales via clamp().

---

### Section 2: Feature Highlights Carousel
**Template:** Interactive carousel (adapted Skiper76 component)
**Background:** Contained rounded card on black

The Skiper76 component reskinned for OnePlus 15. Large rounded card with feature pills on the left (desktop) or bottom carousel (mobile), product image filling the background.

**Features data (7 items):**

| # | Name | Description | Image |
|---|------|-------------|-------|
| 1 | Colors | Three bold finishes. Sand Storm, Infinite Black, Ultra Violet. | Color-specific render |
| 2 | 165Hz Display | The world's first 165Hz at 1.5K resolution. 10-bit LTPO AMOLED. | Front-facing render |
| 3 | Snapdragon 8 Elite | The fastest mobile chipset ever. 4.6GHz Oryon CPU. 3nm process. | Angled device render |
| 4 | 7,300 mAh Battery | Outlast everything. 120W wired, 50W wireless. Charger included. | Side profile render |
| 5 | Triple 50MP Camera | Sony IMX906 main. 3.5x periscope telephoto. 116 ultra-wide. | Camera-side render |
| 6 | Nano-Ceramic Frame | Tougher than titanium. 26% lighter. 134% more wear resistant. | Close crop of frame |
| 7 | IP69K | The highest water and dust rating on any flagship. | Full device render |

**First pill (Colors)** includes color swatches. Tapping a swatch changes background image to that color variant.

**Adaptation from Skiper76:**
- Pill colors: `bg-white/10` (dark theme)
- Card background: black, `rounded-3xl`
- Text: white, SF Pro Display for feature names
- Card height: ~700-750px
- Images: existing Giztop product renders, positioned to fill card

**Dependencies:** framer-motion, shadcn carousel (already installed).

---

### Section 3: Display
**Template:** Scroll-driven visual
**Background:** Pure black, phone image as sole element

Phone screen scales up on scroll, creating the feeling of being pulled into the display.

```
Scroll 0%:   Headline visible, phone small (~200px)
Scroll 50%:  Headline fading, phone scaling up
Scroll 100%: Phone fills viewport, stats fade in over screen
```

**How it works:**
- Section has extra scroll height (~200vh sticky container)
- Phone image is `position: sticky`, centered
- Lenis scroll progress drives: `scale` 0.4 → 1.3, headline `opacity` 1 → 0, stats `opacity` 0 → 1
- All `transform: scale()` and `opacity` — pure GPU compositing

**Stats that appear over the screen:**
- 165Hz — Refresh Rate
- 1,800 nits — Peak Brightness
- 10-bit — Color Depth

**Footnote:** 100% DCI-P3 · HDR10+ · Dolby Vision · Gorilla Glass Victus 2

**Image:** Front-facing Giztop render (existing `displayImage` from product data).

**Mobile:** Phone scales from ~60% to ~100% viewport width. Sticky scroll distance shorter (~150vh).

---

### Section 4: Performance
**Template:** Typography-as-design
**Background:** Subtle radial gradient glow (accent red, ~6% opacity, ~600px radius)

No image — the typography itself is the visual.

```
         Snapdragon 8 Elite              ← accent-colored label

              Raw.
           Unmatched.                    ← massive headline, staggered word reveal
             Power.

     3nm         4.6GHz        16GB      ← CountUp stats
    Process     Clock Speed    LPDDR5X

  [Oryon CPU] [Adreno 840] [UFS 4.1] [Wi-Fi 7]   ← tag pills
```

**Scroll-driven effect:** Each word of the headline ("Raw." "Unmatched." "Power.") reveals independently as user scrolls — opacity 0→1 with slight translateY, staggered by scroll position.

**Stats:** CountUp numbers tied to Lenis scroll position for reliability at high velocity.

**Tag pills:** `border border-white/10 rounded-full` — informational, not interactive.

---

### Section 5: Battery
**Template:** Stat hero
**Background:** Near-black (#0a0a0a) with subtle accent gradient glow behind the number

The 7,300 mAh number IS the section.

```
            Outlast Everything.

                 7,300                   ← MASSIVE: clamp(5rem, 15vw, 12rem)
                 mAh                        CountUp tied to scroll progress

    The largest battery ever in a flagship.

     120W          50W           31hrs
    Wired        Wireless     Video Playback

      · 3 day battery with regular use
      · 0 to 50% in 15 minutes
      · Charger included in the box
```

**"7,300" is the largest text on the entire page.** Everything else small by comparison — extreme hierarchy.

**Scroll-driven:** Number counts up as user scrolls into section (tied to scroll progress, not viewport entry). Fast scroll = fast count.

**Highlight claims:** Small accent-colored dot before each bullet point. Visual motif distinguishing highlights from body text.

---

### Section 6: Design
**Template:** Split two-column
**Background:** Pure black

First section that breaks centered layout — asymmetric.

```
Desktop:
  Built Different.              ┌──────────────┐
  Literally.                    │              │
                                │  [product    │
  Nano-ceramic metal            │   render,    │
  frame. Tougher than           │   selected   │
  titanium.                     │   color]     │
                                │              │
  IP69K      26.3%     134%     └──────────────┘
  Water &   Lighter   More Wear
  Dust      Than Ti   Resistant

  [●] [●] [●]
  Sand Storm

  8.2mm thin · 215g · Gorilla Glass Victus 2
```

**Color picker:** Tapping a swatch changes product image with 500ms crossfade. Accent-color ring on active swatch.

**Scroll-driven:** Product image slides in from right (`translateX`). Content on left fades in with slight upward movement. Staggered timing.

**Mobile:** Stacks to single column — headline, image, swatches, stats, copy.

---

### Section 7: Camera
**Template:** Card grid
**Background:** Near-black with subtle divider lines

Clean and informational. Three horizontal cards, one per lens.

```
         Every Shot. A Masterpiece.
         Triple 50MP camera system.

  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
  │ Main Camera  │ │ Telephoto    │ │ Ultra-Wide   │
  │              │ │              │ │              │
  │ Sony IMX906  │ │ Periscope    │ │ 116° FoV    │
  │ 50MP · f/1.8 │ │ 50MP · f/2.8 │ │ 50MP · f/2.0 │
  │ OIS · 24mm   │ │ 3.5× optical │ │ Autofocus    │
  │              │ │ 120× digital │ │              │
  └──────────────┘ └──────────────┘ └──────────────┘

       8K30 · 4K120 Dolby Vision · HDR10+
```

**Card styling:** `bg-white/[0.03] border border-white/10 rounded-2xl` with 2px accent-colored top border.

**Animation:** Cards stagger in from bottom — 0ms, 100ms, 200ms.

**No product image.** Camera details speak for themselves. Keeps section compact.

**Mobile:** Cards stack vertically, full-width.

---

### Section 8: Specs
**Template:** Collapsible accordion
**Background:** Pure black

```
   Specifications                         [See all ▾]

   (collapsed by default)

   When expanded — each category is a collapsible row:
   Display | Performance | Camera | Battery | Connectivity | Durability
```

Uses framer-motion `AnimatePresence` for smooth height animation. Minimal visual weight. Stays dark — no light background break.

Spec data: reuse existing `specCategories` from product data.

---

### Section 9: CTA Band
**Template:** Centered final push
**Background:** Pure black

```
              OnePlus 15
           From R15,000
   Free delivery · No customs · 3 day battery

             [Order Now]                   ← accent button → /checkout
```

Simple conversion moment after seeing everything. Accent-colored button linking to `/checkout`.

---

### Section 10: Footer
**Template:** Minimal footer
**Background:** Near-black (#0a0a0a)

```
  Device Too Nice              Shop
  Premium devices,             · OnePlus 15
  no compromises.              · Checkout

  © 2026 Device Too Nice. Free delivery &
  customs included. No hidden fees.
```

Broken links removed. Just brand, working product links, shipping/copyright.

---

## Background Rhythm Summary

| Section | Background | Template | Energy |
|---------|-----------|----------|--------|
| 1. Hero | Video, full viewport | Full-bleed video | Dramatic |
| 2. Highlights | Contained card on black | Interactive carousel | Interactive |
| 3. Display | Pure black | Scroll-driven visual | Dramatic |
| 4. Performance | Black + accent glow | Typography-as-design | Dramatic |
| 5. Battery | Near-black + accent glow | Stat hero | Dramatic |
| 6. Design | Pure black | Split two-column | Interactive |
| 7. Camera | Near-black | Card grid | Informational |
| 8. Specs | Pure black | Accordion | Utilitarian |
| 9. CTA Band | Pure black | Centered CTA | Conversion |
| 10. Footer | Near-black | Minimal | Utilitarian |

---

## Components to Build

| Component | New/Rewrite | Notes |
|-----------|-------------|-------|
| `LenisProvider` | New | Wraps app, provides smooth scroll context |
| `VideoHero` | New | Replaces current Hero.tsx |
| `FeatureCarousel` | New | Adapted from Skiper76 component |
| `DisplaySection` | Rewrite | Scroll-driven sticky scale effect |
| `PerformanceSection` | Rewrite | Staggered word reveal, no image |
| `BatterySection` | Rewrite | Stat hero with scroll-driven CountUp |
| `DesignSection` | Rewrite | Split two-column with color picker |
| `CameraSection` | Rewrite | Card grid, no hero image |
| `SpecsSection` | Rewrite | Dark accordion, collapsible |
| `CTABand` | New | Final conversion push |
| `Footer` | Rewrite | Minimal, remove broken links |
| `StickyNav` | Keep | Already links to /checkout |
| `ScrollReveal` | New | Utility component for scroll-driven opacity/transform |
| `CountUp` | Keep/adapt | Hook into Lenis scroll position |

## Components to Delete

| Component | Reason |
|-----------|--------|
| `AnimateIn` | Replaced by scroll-driven reveals via Lenis |
| `Hero` | Replaced by VideoHero |
| `OrderSection` | Already deleted (checkout redesign) |

## Existing Infrastructure (Untouched)

- `/api/checkout` POST endpoint
- `/api/webhook` POST endpoint
- `/checkout` page (just rebuilt)
- `/order/success` and `/order/cancelled` pages
- Product data files (`src/lib/products/`, `src/lib/types.ts`)
- Confirmation email via Resend
