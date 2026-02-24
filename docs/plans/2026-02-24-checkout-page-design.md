# Checkout Page Redesign

**Date:** 2026-02-24
**Status:** Approved

## Problem

The one-page flow is not working. The checkout needs to be on its own dedicated page. The CTA ("Order Now") should navigate directly to a clean, shadcn-based checkout page that consolidates product configuration and delivery details.

## Decision

Single scrollable checkout page (Approach A) — no wizard, no accordion. Two-column on desktop (form left, sticky summary right), single-column stacked on mobile.

## Product Scope

OnePlus 15 only (OPPO paused). Product hardcoded for now — no product selector needed.

## Page Structure

### Route & Navigation
- Route: `/checkout` (replaces current checkout page)
- CTA in StickyNav changes from `href="#order"` to `href="/checkout"`
- No query params needed — product hardcoded to OnePlus 15
- Default config pre-selected: 12GB / 256GB / first color
- "Back to Home" link at top, linking to `/`

### Desktop Layout (>=768px)
- Left column: Configure Your Device section + Delivery Details form
- Right column: Sticky order summary card (product name, config, price breakdown, Pay Now button)

### Mobile Layout (<768px)
- Single column: product hero strip, config, delivery form, inline order summary
- Pay Now button full-width at bottom

## shadcn Components

New installs required:
- RadioGroup — RAM and storage selection
- Input — text fields
- Label — form field labels
- Select — province dropdown
- Button — actions
- Card — order summary container
- Separator — visual dividers

Color selector stays custom (colored swatches with ring indicator).

## Styling

- shadcn dark theme variables, overridden to match site aesthetic
- Black backgrounds, `#86868b` muted text
- Product accent color `#e31937` for interactive elements
- Existing font system (SF Pro Display / SF Pro Text)

## Behaviour

- Live price update when RAM/storage changes
- Invalid RAM+storage combos visually disabled
- Form validation: SA phone format, 4-digit postal code, required fields, inline errors
- Submit hits existing `/api/checkout` POST, receives Yoco redirect URL
- Pay Now button shows loading state during API call

## What Gets Removed

- `OrderSection.tsx` — config moves into checkout
- `#order` anchor section on product pages
- `CheckoutContent.tsx` — replaced by new checkout page
- Product pages become purely showcase (hero, specs, camera, battery, design)

## What Stays

- `/api/checkout` POST endpoint (unchanged)
- `/api/webhook` POST endpoint (unchanged)
- `/order/success` and `/order/cancelled` pages (unchanged)
- Confirmation email via Resend (unchanged)
