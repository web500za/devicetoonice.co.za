# Device Too Nice — Product Requirements Document

**Version:** 1.0
**Date:** 2026-02-27
**Author:** Jared January
**Status:** Approved

---

## 1. Product Overview

Device Too Nice is a single-product e-commerce site selling the OnePlus 15 in South Africa. The business model: customer pays via Yoco, Jared manually orders from Giztop (international supplier), phone is delivered to the customer's door. One phone per customer.

**Current state:** The homepage is a polished, cinematic scroll experience. The checkout works end-to-end. Payment flows through Yoco. Confirmation emails send via Resend. Stock is managed in Supabase.

**The gap:** Everything *after* the customer decides to buy — transactional confidence, post-purchase experience, trust signals, and legal compliance — needs to match the quality of the browsing experience.

---

## 2. User Journey (Current → Target)

```
CURRENT JOURNEY                          TARGET JOURNEY
─────────────────                        ──────────────
Homepage (cinematic) ✅                   Homepage (cinematic) ✅
  ↓                                        ↓
Checkout (functional) ✅                  Checkout (polished, dark theme) 🔧
  ↓                                        ↓
Yoco payment (redirect) ✅               Yoco payment (redirect) ✅
  ↓                                        ↓
Success page (bare) ⚠️                   Success page (order details, next steps) 🔧
  ↓                                        ↓
Confirmation email ✅                     Confirmation email ✅
  ↓                                        ↓
Nothing ❌                                FAQ + Contact + Policies accessible 🔧
                                           Order status comms (manual/future) 🔧
```

---

## 3. Requirements

### 3.1 — Order Success Page (P0 — Critical)

**Problem:** After spending R15,000+, the customer sees a generic "Payment Successful" with zero order details. If the confirmation email is delayed or lands in spam, they have no record of their purchase at all.

**Requirements:**

- [ ] Display order details on the success page: product name, configuration (RAM / storage / colour), total price paid
- [ ] Display the customer's delivery address
- [ ] Display the Yoco payment reference ID
- [ ] Display a clear "What Happens Next" section:
  1. "We've received your order"
  2. "Your OnePlus 15 will be ordered from our supplier"
  3. "Delivered to your door in 7–10 working days"
  4. "You'll receive shipping updates via email"
- [ ] Display contact email for order queries
- [ ] Pass order metadata via URL search params from the Yoco redirect (or read from webhook state if params are insufficient)
- [ ] Maintain the "Back to Home" CTA

**Acceptance criteria:** A customer who never receives the confirmation email can still screenshot the success page and have a complete record of their order.

---

### 3.2 — Contact Information (P0 — Critical)

**Problem:** There is no way to reach the business anywhere on the site. For a R15K+ purchase from an unfamiliar brand, this is a trust killer.

**Requirements:**

- [ ] Add a contact email to the site footer (e.g. `hello@devicetoonice.co.za` or `support@devicetoonice.co.za`)
- [ ] Add the same contact email to the order success page
- [ ] Add the same contact email to the confirmation email
- [ ] Add a WhatsApp link if applicable (common in SA e-commerce)
- [ ] Contact info should be visible without navigating away from any page the customer is on

**Contact details:**
- Email: web500za@gmail.com
- WhatsApp: +27 83 254 0891 (link: `https://wa.me/27832540891`)

---

### 3.3 — Legal & Policy Pages (P0 — Critical)

**Problem:** South African CPA (Consumer Protection Act) requires clear terms of sale, return/refund policies, and a privacy policy for any site collecting personal data and processing payments. Currently there are none.

**Requirements:**

- [ ] Create `/terms` page — Terms & Conditions covering:
  - One phone per customer policy
  - Pricing and currency (ZAR)
  - Order process and fulfilment timeline (7–10 working days)
  - Items are imported from international supplier on your behalf
  - Limitation of liability
- [ ] Create `/privacy` page — Privacy Policy covering:
  - What data is collected (name, email, phone, address)
  - How it's used (order fulfilment, communication)
  - Third parties (Yoco for payment, Resend for email, Supabase for storage)
  - Data retention
  - Customer rights under POPIA (Protection of Personal Information Act)
- [ ] Create `/returns` page — Returns & Refunds Policy covering:
  - **Returns:** 7-day return window from delivery date, item must be unopened and in original packaging. Customer covers return shipping. Opened/used devices cannot be returned (dropshipping constraint — we cannot return opened items to supplier).
  - **Refunds:** Full refund processed within 7 working days of receiving returned item, back to original payment method via Yoco.
  - **Defective items:** If the device is dead on arrival (DOA) or develops a fault within 30 days, contact us immediately. We will arrange a replacement or full refund. Customer must provide photos/video of the defect.
  - **Warranty:** OnePlus manufacturer warranty applies (1 year). Warranty claims are handled through OnePlus directly. Device Too Nice will assist with facilitating the process where possible but is not the warranty provider.
  - **Cancellations:** Orders can be cancelled for a full refund if the device has not yet been shipped from supplier. Once shipped, the returns policy applies.
- [ ] Add links to all three pages in the site footer
- [ ] Add a "By placing this order you agree to our Terms & Conditions" notice on the checkout page, linking to `/terms`
- [ ] Pages should use the same dark theme as the homepage

---

### 3.4 — Checkout Theme Consistency (P1 — High)

**Problem:** The homepage is a dark, cinematic, premium experience. Clicking "Order Now" drops you onto a plain white page with no visual transition. The shift undermines the premium feel at the exact moment the customer is deciding to commit R15K+.

**Requirements:**

- [ ] Redesign the checkout page to use the dark theme (matching the homepage aesthetic)
- [ ] Maintain readability and form usability in dark mode — form inputs need clear contrast and focus states
- [ ] Keep the order summary card visually distinct (subtle glass/elevated treatment)
- [ ] Product image and configuration selectors should feel like a continuation of the homepage experience
- [ ] Ensure the pay button remains the prominent red CTA
- [ ] Trust signals section should still be clearly readable

**Constraints:** Form accessibility must not degrade. WCAG contrast ratios must be met for all form labels, inputs, and error messages.

---

### 3.5 — Webhook Security (P1 — High)

**Problem:** The Yoco webhook endpoint (`/api/webhook`) does not verify the webhook signature. Anyone can POST to it and trigger stock decrements or fake confirmation emails.

**Requirements:**

- [ ] Verify the Yoco webhook signature on every incoming request using the webhook secret
- [ ] Reject requests with invalid or missing signatures (return 401)
- [ ] Log rejected attempts for monitoring
- [ ] Store the webhook secret in environment variables (not hardcoded)

**Reference:** Yoco webhook signature verification documentation.

---

### 3.6 — Error & Not Found Pages (P1 — High)

**Problem:** There are no `error.tsx`, `not-found.tsx`, or `loading.tsx` files. Users who navigate to invalid URLs or encounter errors see raw Next.js defaults, which is unprofessional and confusing.

**Requirements:**

- [ ] Create a global `not-found.tsx` — dark themed, "Page not found" message, "Back to Home" CTA
- [ ] Create a global `error.tsx` — dark themed, "Something went wrong" message, "Try Again" button, "Back to Home" link
- [ ] Create a global `loading.tsx` — dark themed, minimal spinner or skeleton, consistent with site aesthetic
- [ ] All error pages should include the contact email so customers can report issues

---

### 3.7 — Form UX Polish (P1 — High)

**Problem:** Several small UX issues in the checkout form create unnecessary friction.

**Requirements:**

- [ ] Add phone number placeholder showing expected format (e.g. `081 234 5678`)
- [ ] Add helper text below the phone field: "South African mobile number"
- [ ] If Google Maps autocomplete fails to load (API key issue, slow connection), ensure manual address fields remain fully functional without autocomplete — no blocking dependency
- [ ] Add a terms agreement notice near the pay button: "By paying, you agree to our [Terms & Conditions](/terms) and [Privacy Policy](/privacy)"
- [ ] Show a brief inline confirmation when email format is valid (subtle checkmark or green border)

---

### 3.8 — Social Proof & Trust (P2 — Medium)

**Problem:** No reviews, testimonials, or social proof anywhere on the site. For an unfamiliar brand selling a premium phone, trust is the biggest conversion barrier.

**Requirements:**

- [ ] Add a "Why Device Too Nice?" or trust section to the homepage (between Specs and CTA Band) with:
  - Number of phones sold (when applicable)
  - Key trust points: "Direct import, no middleman", "Every phone tested before shipping", "Real human support" (or similar authentic messaging)
- [ ] Add a Yoco trust badge / "Secure payment" visual near the checkout pay button (more prominent than current text)
- [ ] Consider adding a brief FAQ section to the homepage addressing top objections:
  - "Is this legit?" — explain the business model simply
  - "What about warranty?" — explain coverage
  - "What if I have a problem?" — point to contact info

**Decision needed:** What trust messaging feels authentic vs. what feels forced? This should reflect Jared's actual voice.

---

### 3.9 — FAQ Page (P2 — Medium)

**Problem:** Customers buying a R15K+ phone from a new brand will have questions. There's nowhere to find answers without contacting support directly.

**Requirements:**

- [ ] Create `/faq` page covering:
  - "How does Device Too Nice work?" (business model explained simply)
  - "Where do the phones come from?" (Giztop / direct import)
  - "Is this a real/legit business?"
  - "Why is it cheaper than network stores?"
  - "What warranty do I get?"
  - "What if my phone is defective?"
  - "How long does delivery take?"
  - "Can I track my order?"
  - "Can I buy more than one?" (No — one per customer)
  - "What payment methods are accepted?" (card via Yoco)
  - "Is my payment secure?"
  - "What happens after I order?"
- [ ] Link to FAQ from the footer
- [ ] Link to FAQ from the checkout page (near trust signals)
- [ ] Dark themed, matching homepage aesthetic
- [ ] Accordion/expandable format for easy scanning

---

### 3.10 — Supabase Failure Resilience (P2 — Medium)

**Problem:** If Supabase is unreachable, stock defaults to `{ remaining: 0, total: 0 }` — the site shows "Sold Out" even if there's stock. A brief outage = lost sales.

**Requirements:**

- [ ] Implement a short retry (1–2 attempts with 500ms delay) before falling back to zero
- [ ] Cache the last known stock value (in-memory or edge cache with short TTL, e.g. 60 seconds) so brief outages don't immediately show sold out
- [ ] Log Supabase connection failures for monitoring
- [ ] If using cached value, ensure stock decrement still goes through Supabase atomically (cache is read-only fallback)

---

### 3.11 — Dead Code Cleanup (P3 — Low)

**Problem:** `FeatureCarousel.tsx` exists in the homepage components folder but is never imported or rendered.

**Requirements:**

- [ ] Delete `FeatureCarousel.tsx` — confirmed deprecated by owner

---

### 3.12 — Confirmation Email Enhancements (P3 — Low)

**Problem:** The confirmation email is well-designed but lacks post-purchase guidance.

**Requirements:**

- [ ] Add a "What Happens Next" section to the email matching the success page content
- [ ] Add the contact email to the email footer ("Questions about your order? Email us at X")
- [ ] Add a "You can also reach us on WhatsApp" link if applicable
- [ ] Include a note: "One phone per customer — this order is for you to enjoy"

---

## 4. Out of Scope (for now)

These are not planned for this iteration:

- **User accounts / login** — Anonymous checkout is intentional and simpler
- **Order tracking dashboard** — Manual fulfilment makes this impractical right now; shipping updates via email are sufficient
- **Multiple products** — This is a single-product store by design
- **Cart system** — One phone per customer, direct-to-checkout is the right flow
- **Reviews system** — Not enough order volume yet to warrant this
- **Search** — Single product, not needed
- **Internationalization** — ZAR only, SA only

---

## 5. Priority Summary

| # | Requirement | Priority | Effort |
|---|-------------|----------|--------|
| 3.1 | Order Success Page | P0 | Medium |
| 3.2 | Contact Information | P0 | Small |
| 3.3 | Legal & Policy Pages | P0 | Medium |
| 3.4 | Checkout Theme Consistency | P1 | Large |
| 3.5 | Webhook Security | P1 | Small |
| 3.6 | Error & Not Found Pages | P1 | Small |
| 3.7 | Form UX Polish | P1 | Small |
| 3.8 | Social Proof & Trust | P2 | Medium |
| 3.9 | FAQ Page | P2 | Medium |
| 3.10 | Supabase Failure Resilience | P2 | Medium |
| 3.11 | Dead Code Cleanup | P3 | Small |
| 3.12 | Email Enhancements | P3 | Small |

---

## 6. Decisions Log

| # | Decision | Owner | Status |
|---|----------|-------|--------|
| 1 | Contact: web500za@gmail.com + WhatsApp +27 83 254 0891 | Jared | Resolved |
| 2 | Returns: 7-day unopened, DOA 30-day replacement, see 3.3 | Jared | Resolved |
| 3 | Warranty: OnePlus 1-year manufacturer warranty, DTN assists | Jared | Resolved |
| 4 | Trust messaging voice and tone | Jared | Pending — will decide during build |
| 5 | FeatureCarousel: Kill it | Jared | Resolved |
| 6 | Yoco webhook secret (env var setup) | Jared | Pending — needs Yoco dashboard |
