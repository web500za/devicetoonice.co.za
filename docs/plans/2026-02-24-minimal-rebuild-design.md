# Minimal Rebuild Design

## Philosophy
One product. Black and white. No animations. The phone sells itself.

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Product page — hero, specs, buy |
| `/checkout` | Config + delivery + pay |
| `/order/success` | Confirmation |
| `/order/cancelled` | Retry |

## Home Page

Single column, top to bottom:
1. Nav — "Device Too Nice" left. Nothing else.
2. Hero — Product image centered. "OnePlus 15" large. One-line tagline. Price. "Buy Now" button.
3. Specs strip — 4-5 key stats in horizontal row. Just numbers + labels. shadcn Cards.
4. One paragraph — 2-3 sentences. Mention 3-day battery.
5. Full specs — Two-column table with Separators. Flat list.
6. Footer — "Device Too Nice" + year.

## Checkout

Two columns desktop, stacked mobile:
- Left: Config (RAM/storage/color via RadioGroup) + delivery form (Input/Label/Select)
- Right: Sticky order summary + "Pay Now"

## Visual Rules
- Black background, white text. No grays, no accents.
- System font stack only.
- shadcn/ui only: Button, Card, Input, Label, Select, RadioGroup, Separator
- One product image per page.
- Generous whitespace.

## Deletions
- AnimateIn, CountUp, StickyNav components
- All product section components (Hero, Display, Performance, Camera, Battery, Design, Specs)
- ProductPage.tsx, [slug]/ dynamic routing
- OPPO product data
- All custom CSS animations, color variables, font declarations

## Kept
- Checkout API route (Yoco)
- Webhook route (emails)
- OnePlus 15 product data (simplified)
- shadcn/ui components
- Success/cancelled pages (stripped)
