# Checkout Page Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the current split checkout flow (OrderSection on product page + separate checkout form) with a single consolidated `/checkout` page using shadcn components.

**Architecture:** A single `/checkout` route with a two-column desktop layout (form left, sticky order summary right) that stacks on mobile. Product config (RAM/storage/color) and delivery form are on the same page. OnePlus 15 hardcoded. All existing backend (API routes, webhook, email) stays untouched.

**Tech Stack:** Next.js 15 App Router, React 19, Tailwind CSS 4, shadcn/ui (dark theme), existing Yoco payment integration.

---

### Task 1: Install and configure shadcn/ui

**Files:**
- Create: `components.json`
- Modify: `src/app/globals.css`
- Modify: `package.json` (via npx)
- Create: `src/lib/utils.ts`

**Step 1: Initialize shadcn**

Run: `npx shadcn@latest init`

Choose these options:
- Style: New York
- Base color: Neutral
- CSS variables: yes

This will create `components.json`, install dependencies (`tailwind-merge`, `clsx`, `class-variance-authority`, `lucide-react`), and create `src/lib/utils.ts` with the `cn()` helper.

**Step 2: Verify shadcn installed correctly**

Run: `cat components.json` — should exist with paths configured to `src/components/ui`.
Run: `cat src/lib/utils.ts` — should export `cn` function.

**Step 3: Install required shadcn components**

Run each:
```bash
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add select
npx shadcn@latest add radio-group
npx shadcn@latest add card
npx shadcn@latest add separator
```

**Step 4: Override shadcn CSS variables for dark theme**

In `src/app/globals.css`, the shadcn init will add CSS variables. We need to ensure the dark theme matches our site aesthetic (black backgrounds, not gray). After shadcn init, verify the `:root` / `.dark` CSS variables use `#000` backgrounds and our color palette. Adjust if shadcn defaults to gray-ish dark backgrounds.

**Step 5: Verify build**

Run: `npm run build`
Expected: Build succeeds with no errors.

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: install and configure shadcn/ui with required components"
```

---

### Task 2: Build the new checkout page

**Files:**
- Rewrite: `src/app/checkout/page.tsx`
- Rewrite: `src/components/checkout/CheckoutContent.tsx`

**Step 1: Rewrite `src/app/checkout/page.tsx`**

Keep the existing Suspense wrapper structure, but update the metadata:

```tsx
import { Suspense } from "react";
import CheckoutContent from "@/components/checkout/CheckoutContent";

export const metadata = {
  title: "Checkout — Device Too Nice",
  description: "Complete your OnePlus 15 order",
};

function CheckoutLoading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-apple-gray text-sm font-[family-name:var(--font-body)]">
        Loading checkout...
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoading />}>
      <CheckoutContent />
    </Suspense>
  );
}
```

This file stays almost identical — the real work is in CheckoutContent.

**Step 2: Rewrite `src/components/checkout/CheckoutContent.tsx`**

This is the main file. It must:

1. Hardcode to `oneplus15` product (no search params for product)
2. Include product config section (RAM, storage, color selectors) — ported from `OrderSection.tsx` logic
3. Include delivery details form — ported from existing `CheckoutContent.tsx` form/validation
4. Include live-updating order summary with sticky positioning on desktop
5. Use shadcn components: `Button`, `Input`, `Label`, `Select`, `RadioGroup`, `Card`, `Separator`
6. Submit to existing `/api/checkout` POST endpoint with same payload shape

**Layout structure:**

```
"use client"

imports: React state, shadcn components, product helpers, types

SA_PROVINCES array (keep from existing)
validateForm function (keep from existing)

export default function CheckoutContent() {
  // Hardcode product
  const product = getProduct("oneplus15")!;

  // Config state (from OrderSection logic)
  const [selectedRam, setSelectedRam] = useState(product.ramOptions[0]);
  const [selectedStorage, setSelectedStorage] = useState(product.storageOptions[0]);
  const [selectedColorKey, setSelectedColorKey] = useState(product.colors[0].key);

  // Derived: available storage, effective variant, available colors, active color
  // (copy logic from OrderSection.tsx lines 21-40)

  // Form state (from existing CheckoutContent)
  const [form, setForm] = useState<CheckoutFormData>({...});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // updateField, handleSubmit (copy from existing CheckoutContent)

  return (
    <div className="min-h-screen bg-black">
      {/* Header bar */}
      <div className="border-b border-white/[0.06] bg-black/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <a href="/" className="text-apple-gray hover:text-white text-sm flex items-center gap-2">
            ← Back to Home
          </a>
          <span className="font-bold text-white text-[15px] tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            Device Too Nice
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-5 py-10 md:py-16">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">

          {/* Left column: Config + Form */}
          <div className="lg:col-span-3 space-y-10">

            {/* Product hero strip (mobile) */}
            <div className="flex items-center gap-4 lg:hidden">
              <img src={activeColor.image} alt={product.name} className="w-16" />
              <div>
                <h1 className="text-white font-bold text-lg">{product.name}</h1>
                <p className="text-apple-gray text-sm">{product.tagline}</p>
              </div>
            </div>

            {/* Configure section */}
            <section>
              <h2 className="text-white font-semibold text-lg mb-6">Configure Your Device</h2>

              {/* RAM selector using shadcn RadioGroup */}
              <div className="mb-6">
                <Label className="text-apple-gray text-xs uppercase tracking-widest mb-3 block">Memory</Label>
                {/* Custom toggle buttons styled like existing — not RadioGroup since we want pill buttons */}
                {/* Use the same button styling from OrderSection but with slightly cleaner shadcn-inspired look */}
              </div>

              {/* Storage selector — same approach, with disabled states for invalid combos */}

              {/* Color picker — custom swatches (keep existing approach) */}

              {/* Product image for selected color */}
              <div className="flex justify-center my-8">
                <img src={activeColor.image} alt={...} className="w-40 md:w-52" />
              </div>
            </section>

            <Separator className="bg-white/10" />

            {/* Delivery form section */}
            <section>
              <h2 className="text-white font-semibold text-lg mb-6">Delivery Details</h2>
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Use shadcn Input + Label components */}
                {/* Two-col grid for first/last name */}
                {/* Single fields for email, phone, street address */}
                {/* Two-col grid for city + province (shadcn Select) */}
                {/* Postal code (narrow input) */}

                {/* Submit error banner */}

                {/* Pay Now button — full width, shadcn Button with custom accent color */}

                {/* "Redirected to Yoco" note */}
              </form>
            </section>
          </div>

          {/* Right column: Order Summary (sticky on desktop) */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-20">
              <Card className="bg-white/[0.03] border-white/10">
                <CardContent>
                  {/* Product image */}
                  {/* Product name */}
                  {/* Config summary lines (RAM, Storage, Colour) */}
                  <Separator />
                  {/* Subtotal, Delivery (FREE), Total */}
                  {/* Trust signals (free delivery, no customs, 7-10 days, warranty) */}
                  {/* Pay Now button (desktop — duplicate of mobile one OR only show here on desktop) */}
                </CardContent>
              </Card>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
```

Key implementation details:
- **Config selectors:** Don't use shadcn RadioGroup for RAM/storage — use styled toggle buttons like the existing ones (pill-shaped, accent border when active). This matches the site's premium feel better than radio buttons.
- **Color picker:** Keep the custom colored circle swatches with ring indicator.
- **Form inputs:** Use shadcn `Input` + `Label` components, styled with dark backgrounds.
- **Province:** Use shadcn `Select` / `SelectContent` / `SelectItem`.
- **Pay button:** Use shadcn `Button` with custom `style={{ backgroundColor: product.accentColor }}` for the accent color. Show it in the form section on mobile, and in the order summary on desktop (use responsive `hidden`/`block` classes).
- **Submit logic:** Keep the exact same `handleSubmit` function — POST to `/api/checkout`, redirect to Yoco.
- **Validation:** Keep the exact same `validateForm` function and inline error messages.
- **Focus styles:** Input focus border should use the product accent color.

**Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 4: Manual test**

Run: `npm run dev`
Visit: `http://localhost:3000/checkout`
Verify:
- Config selectors work (RAM, storage, color)
- Invalid combos are disabled
- Price updates live
- Form validation shows inline errors
- Submit redirects to Yoco (or shows error in dev without keys)

**Step 5: Commit**

```bash
git add src/app/checkout/page.tsx src/components/checkout/CheckoutContent.tsx
git commit -m "feat: rebuild checkout as consolidated shadcn page with config + delivery"
```

---

### Task 3: Update StickyNav CTA and remove OrderSection from product pages

**Files:**
- Modify: `src/components/StickyNav.tsx` (line 41: change `href="#order"` to `href="/checkout"`)
- Modify: `src/app/[slug]/ProductPage.tsx` (remove OrderSection import and usage)
- Delete: `src/components/product/OrderSection.tsx`

**Step 1: Update StickyNav CTA**

In `src/components/StickyNav.tsx`, change line 41:
```tsx
// Before
<a href="#order" ...>Order Now</a>

// After
<a href="/checkout" ...>Order Now</a>
```

**Step 2: Remove OrderSection from ProductPage**

In `src/app/[slug]/ProductPage.tsx`:
- Remove line 11: `import OrderSection from "@/components/product/OrderSection";`
- Remove line 26: `<OrderSection product={product} />`

**Step 3: Delete OrderSection.tsx**

Delete: `src/components/product/OrderSection.tsx`

**Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds with no missing import errors.

**Step 5: Manual test**

Run: `npm run dev`
- Visit `/` — verify "Order Now" nav button links to `/checkout`
- Visit `/oneplus15` — verify no order section at bottom, page ends at specs/footer
- Click "Order Now" — verify it navigates to `/checkout`

**Step 6: Commit**

```bash
git add src/components/StickyNav.tsx src/app/[slug]/ProductPage.tsx
git rm src/components/product/OrderSection.tsx
git commit -m "feat: route CTA to /checkout, remove OrderSection from product pages"
```

---

### Task 4: Polish and verify end-to-end flow

**Files:**
- Possibly adjust: `src/components/checkout/CheckoutContent.tsx` (styling tweaks)
- Verify: `src/app/order/cancelled/page.tsx` (the "Try Again" link currently goes to `/{slug}#order` — needs updating)

**Step 1: Update cancelled page "Try Again" link**

In `src/app/order/cancelled/page.tsx`, find the "Try Again" link and change it from `/${product.slug}#order` to `/checkout`.

**Step 2: Verify full flow**

Run: `npm run dev`
1. Visit `/` → scroll down → click "Order Now" → arrives at `/checkout`
2. On checkout: select config, fill form, click Pay Now
3. If payment cancelled → "Try Again" button → back to `/checkout`
4. Verify mobile responsive: resize browser, check single-column stack

**Step 3: Production build**

Run: `npm run build`
Expected: Build succeeds, no warnings.

**Step 4: Commit**

```bash
git add -A
git commit -m "fix: update cancelled page link, polish checkout flow"
```
