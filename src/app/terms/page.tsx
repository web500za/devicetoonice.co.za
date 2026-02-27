import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions — Device Too Nice",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-block text-sm text-white/40 hover:text-white transition-colors"
        >
          &larr; Back to home
        </Link>

        <h1 className="mt-8 text-3xl font-bold tracking-tight text-white">
          Terms &amp; Conditions
        </h1>
        <p className="mt-2 text-sm text-white/30">Last updated: February 2026</p>

        {/* 1. Overview */}
        <h2 className="text-lg font-semibold text-white mt-10 mb-3">
          1. Overview
        </h2>
        <p className="text-sm text-white/60 leading-relaxed">
          Device Too Nice is an online retailer selling premium smartphones in
          South Africa. By placing an order on our website, you agree to be bound
          by these terms and conditions. Please read them carefully before making
          a purchase.
        </p>

        {/* 2. Products & Pricing */}
        <h2 className="text-lg font-semibold text-white mt-10 mb-3">
          2. Products &amp; Pricing
        </h2>
        <p className="text-sm text-white/60 leading-relaxed">
          All prices are listed in South African Rand (ZAR) and include free
          delivery and customs clearance. Prices are subject to change without
          prior notice. The price displayed at the time you place your order is
          the price you pay.
        </p>

        {/* 3. Orders & Fulfilment */}
        <h2 className="text-lg font-semibold text-white mt-10 mb-3">
          3. Orders &amp; Fulfilment
        </h2>
        <p className="text-sm text-white/60 leading-relaxed">
          Orders are limited to one phone per customer. All orders are fulfilled
          by importing directly from our international supplier on your behalf.
          Estimated delivery is 7&ndash;10 working days from the date of
          payment. Once your order is placed, we will send a confirmation email
          with your order details.
        </p>

        {/* 4. Payment */}
        <h2 className="text-lg font-semibold text-white mt-10 mb-3">
          4. Payment
        </h2>
        <p className="text-sm text-white/60 leading-relaxed">
          Payment is processed securely via Yoco. We do not store your card
          details at any point. Full payment is required at the time of placing
          your order.
        </p>

        {/* 5. Cancellations */}
        <h2 className="text-lg font-semibold text-white mt-10 mb-3">
          5. Cancellations
        </h2>
        <p className="text-sm text-white/60 leading-relaxed">
          Orders may be cancelled for a full refund provided the device has not
          yet been shipped from our supplier. Once the device has been shipped,
          our returns policy applies. To request a cancellation, contact us at{" "}
          <a
            href="mailto:web500za@gmail.com"
            className="text-[#e31937] hover:underline"
          >
            web500za@gmail.com
          </a>
          .
        </p>

        {/* 6. Returns & Refunds */}
        <h2 className="text-lg font-semibold text-white mt-10 mb-3">
          6. Returns &amp; Refunds
        </h2>
        <p className="text-sm text-white/60 leading-relaxed">
          Please see our{" "}
          <Link
            href="/returns"
            className="text-[#e31937] hover:underline"
          >
            Returns &amp; Refunds policy
          </Link>{" "}
          for full details.
        </p>

        {/* 7. Warranty */}
        <h2 className="text-lg font-semibold text-white mt-10 mb-3">
          7. Warranty
        </h2>
        <p className="text-sm text-white/60 leading-relaxed">
          All devices are covered by the manufacturer&rsquo;s warranty (1 year).
          Device Too Nice will assist with facilitating warranty claims where
          possible but is not the warranty provider.
        </p>

        {/* 8. Limitation of Liability */}
        <h2 className="text-lg font-semibold text-white mt-10 mb-3">
          8. Limitation of Liability
        </h2>
        <p className="text-sm text-white/60 leading-relaxed">
          Device Too Nice acts as an intermediary between you and the
          international supplier. We are not liable for manufacturer defects
          beyond facilitating the warranty process. Our total liability in
          connection with any order is limited to the purchase price of the
          product.
        </p>

        {/* 9. Changes to Terms */}
        <h2 className="text-lg font-semibold text-white mt-10 mb-3">
          9. Changes to Terms
        </h2>
        <p className="text-sm text-white/60 leading-relaxed">
          We reserve the right to update these terms at any time. Changes take
          effect immediately upon posting to the website. Your continued use of
          the site following any changes constitutes acceptance of the revised
          terms.
        </p>

        {/* 10. Contact */}
        <h2 className="text-lg font-semibold text-white mt-10 mb-3">
          10. Contact
        </h2>
        <p className="text-sm text-white/60 leading-relaxed">
          For any questions about these terms, contact us at{" "}
          <a
            href="mailto:web500za@gmail.com"
            className="text-[#e31937] hover:underline"
          >
            web500za@gmail.com
          </a>{" "}
          or WhatsApp at{" "}
          <a
            href="https://wa.me/27832540891"
            className="text-[#e31937] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            +27 83 254 0891
          </a>
          .
        </p>
      </div>
    </main>
  );
}
