# Apple iPhone 17 Pro Page — Benchmark PRD

**Purpose:** Reference document for devicetoonice.co.za homepage redesign. This captures the patterns, techniques, and principles that make Apple's product page the gold standard for cinematic device marketing.

---

## Core Principles

1. **Rhythm through contrast** — Dark/light sections alternate deliberately. Dark for emotion and drama, light for information and clarity.
2. **Template variation** — No two consecutive sections use the same layout. Full-bleed images alternate with contained grids, carousels, deep-dives, and interactive tools.
3. **Show, don't tell** — Features demonstrated through photography, video, and interactive elements rather than just stats and text.
4. **Narrative arc** — Hero (identity) → Features (capability journey) → Intelligence (software story) → Values (purchase justification) → Decision tools (conversion).
5. **Breathing room** — Generous negative space around product renders. Content never feels cramped.
6. **Typography as visual design** — Large bold claims ("8x optical-quality zoom") function as visual anchors, not just text.

---

## Section Anatomy (Patterns to Adopt)

### Pattern 1: Cinematic Hero
- Full-viewport, product-focused
- Video loop or animated product rotation (not a static float)
- Minimal text — product name, tagline, one CTA
- Creates immediate emotional impact

### Pattern 2: Feature Highlight Carousel
- Tab-based or swipeable
- Each tab: campaign-quality image + short descriptor
- Equal visual weight per feature (no hierarchy)
- Provides scannable overview before deep-dives

### Pattern 3: Deep-Dive Section (Dark)
- Full-bleed imagery (macro photography, lifestyle shots)
- Bold headline as primary visual element
- Minimal supporting text
- Scroll-triggered reveal or parallax
- Creates drama and desire

### Pattern 4: Interactive Product Viewer
- Contained layout, light background
- Multiple angles/views of the product
- Educational labels pointing to key features
- User-controlled (swipe/click through views)

### Pattern 5: Spec Cards (Light)
- Clean grid of 3 specification cards
- Icon + primary stat + supporting detail
- White background, generous padding
- Provides factual clarity after emotional sections

### Pattern 6: Stat Showcase
- Large typography for key numbers
- Dark background for emphasis
- Comparison table or chart below
- Before/after or model-vs-model framing

### Pattern 7: Full-Width Photography
- Edge-to-edge real-world photos demonstrating capability
- No text overlay on the image itself
- Caption/description below or beside
- Creates "proof" moments

---

## Cinematic Techniques Inventory

| Technique | Apple Usage | Effect |
|-----------|------------|--------|
| Video hero | Product rotation loop | Immediate engagement, premium feel |
| Scroll-driven parallax | Text layers over images | Depth, immersion |
| Zoom progression | Camera section focal length demo | Demonstrates capability interactively |
| Dark-to-light transitions | Section backgrounds alternate | Rhythm, prevents fatigue |
| Full-bleed breaks | Every 2-3 sections | Scale, drama |
| Large stat typography | Battery hours, zoom multiplier | Scannable, memorable |
| Interactive carousel | Highlights, photos, features | User agency, exploration |
| Macro photography | Design/material close-ups | Craft appreciation |
| Background video | Battery section with TV+ content | Lifestyle aspiration |
| Staggered reveals | Elements animate at different scroll points | Progressive storytelling |

---

## Typography Scale

| Element | Treatment |
|---------|-----------|
| Product name (hero) | ~80-120px, bold, tight tracking |
| Section headline | ~48-64px, bold, tight tracking |
| Feature claim | ~32-40px, bold |
| Body copy | ~17-19px, regular, relaxed leading |
| Spec label | ~13-14px, medium, gray |
| Stat number | ~64-96px, bold, tight tracking |

---

## What Apple Does That devicetoonice Does NOT (Gap Analysis)

| Apple | devicetoonice | Gap |
|-------|--------------|-----|
| Video hero with product rotation | Static PNG with CSS float animation | No video/motion |
| Dark/light section alternation | All-dark until specs (then jarring light) | No rhythm |
| 6+ distinct section templates | Same template repeated (headline → stats → image) | Monotony |
| Full-bleed photography moments | Everything in max-w-5xl/6xl container | No scale |
| Interactive product viewer | None | No exploration |
| Scroll-driven parallax/reveals | Same fade-up animation everywhere | No depth |
| Real-world photography | Product renders only | No lifestyle context |
| Spec cards with icons | Dense spec tables | Not scannable |
| Feature highlight carousel | None | No overview |
| Campaign-quality imagery | Giztop product renders | Low production value |

---

## Realistic Adaptation Notes

We cannot match Apple's production budget. We don't have:
- Custom photography or video shoots
- 3D product models for interactive viewers
- Lifestyle campaign imagery

**What we CAN do within constraints:**
- Use Giztop's existing product renders creatively (crop, zoom, tint)
- Add CSS/JS-driven scroll animations (parallax, scale, opacity)
- Vary section templates (not every section needs the same layout)
- Alternate dark/light backgrounds for rhythm
- Use typography at dramatic scale for stat moments
- Add subtle motion (CSS transforms, not video) for cinematic feel
- Break out of max-width containers for full-bleed moments
- Redesign specs section to match dark theme
