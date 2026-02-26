# Minimal Rebuild Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strip the entire site to a minimal black-and-white single-product page with a separate checkout route.

**Architecture:** Single product (OnePlus 15), no dynamic routing, no animations, no accent colors. Two pages: product showcase and checkout. All shadcn/ui components, black and white only.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS 4, shadcn/ui

---

### Task 1: Strip globals.css

**Files:**
- Modify: `src/app/globals.css`

Remove all custom theme variables (colors, fonts, animations, keyframes), custom utility classes, and decorative CSS. Keep only: Tailwind imports, shadcn imports, dark theme CSS variables, base body styles (black bg, white text, system font).

---

### Task 2: Simplify types and product data

**Files:**
- Modify: `src/lib/types.ts`
- Modify: `src/lib/products/oneplus15.ts`
- Modify: `src/lib/products.ts`
- Delete: `src/lib/products/oppo-find-x9-pro.ts`

Remove ProductSlug union (just use string). Remove all section-specific fields from Product type (display*, performance*, camera*, battery*, design* fields). Keep: slug, name, brand, tagline, heroImage, startingPrice, specCategories, variants, colors, ramOptions, storageOptions. Simplify products.ts to export only OnePlus 15 with direct helper functions.

---

### Task 3: Delete old components

**Files:**
- Delete: `src/components/AnimateIn.tsx`
- Delete: `src/components/CountUp.tsx`
- Delete: `src/components/StickyNav.tsx`
- Delete: `src/components/product/Hero.tsx`
- Delete: `src/components/product/DisplaySection.tsx`
- Delete: `src/components/product/PerformanceSection.tsx`
- Delete: `src/components/product/CameraSection.tsx`
- Delete: `src/components/product/BatterySection.tsx`
- Delete: `src/components/product/DesignSection.tsx`
- Delete: `src/components/product/SpecsSection.tsx`
- Delete: `src/components/product/Footer.tsx`
- Delete: `src/app/[slug]/ProductPage.tsx`
- Delete: `src/app/[slug]/page.tsx`

---

### Task 4: Rebuild homepage

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx`

Single server component. No client-side JS. Sections top to bottom:
1. Nav: "Device Too Nice" left-aligned, plain text
2. Hero: Product image (centered, reasonable size), "OnePlus 15" heading, one-line tagline, "From R15,000", black Button linking to /checkout
3. Specs strip: 5 Cards in a horizontal row (display, chip, battery, camera, charging) — just the number and a label
4. One paragraph: 2-3 sentences about the phone
5. Full specs: Two-column layout, every spec from specCategories, Separators between rows
6. Footer: "Device Too Nice" + year, centered, small

---

### Task 5: Rebuild checkout

**Files:**
- Modify: `src/components/checkout/CheckoutContent.tsx`

Strip all accent colors — buttons are black bg/white text. Remove trust signal SVG icons (just plain text). Remove product-colored hover effects. Remove hexToRgb. Remove mobile hero strip (keep it simple). Clean form inputs — no colored focus states, just white border on focus. Keep all form validation and Yoco submission logic.

---

### Task 6: Strip success/cancelled pages

**Files:**
- Modify: `src/app/order/success/page.tsx`
- Modify: `src/app/order/cancelled/page.tsx`

Remove AnimateIn usage, remove accent color logic, remove gradient backgrounds. Plain centered text with a black button.

---

### Task 7: Verify build

Run `npm run build` and fix any issues.
