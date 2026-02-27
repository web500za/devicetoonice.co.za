import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Device Too Nice",
};

export default function PrivacyPolicyPage() {
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
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-white/30">Last updated: February 2026</p>

        {/* 1. Overview */}
        <h2 className="text-lg font-semibold text-white mt-10 mb-3">
          1. Overview
        </h2>
        <p className="text-sm text-white/60 leading-relaxed">
          Device Too Nice respects your privacy. This policy explains how we
          collect, use, and protect your personal information in compliance with
          the Protection of Personal Information Act (POPIA).
        </p>

        {/* 2. Information We Collect */}
        <h2 className="text-lg font-semibold text-white mt-10 mb-3">
          2. Information We Collect
        </h2>
        <p className="text-sm text-white/60 leading-relaxed">
          When you place an order, we collect the following personal information:
        </p>
        <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-white/60">
          <li>Full name</li>
          <li>Email address</li>
          <li>Phone number (South African mobile)</li>
          <li>
            Delivery address (street, city, province, postal code)
          </li>
        </ul>
        <p className="mt-3 text-sm text-white/60 leading-relaxed">
          We do not collect payment card details &mdash; these are handled
          directly by our payment provider,{" "}
          <span className="text-white/80 font-medium">Yoco</span>.
        </p>

        {/* 3. How We Use Your Information */}
        <h2 className="text-lg font-semibold text-white mt-10 mb-3">
          3. How We Use Your Information
        </h2>
        <p className="text-sm text-white/60 leading-relaxed">
          We use your information to:
        </p>
        <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-white/60">
          <li>Process and fulfil your order</li>
          <li>Send order confirmation and shipping updates via email</li>
          <li>Contact you about your order if needed</li>
          <li>Improve our service</li>
        </ul>

        {/* 4. Third-Party Services */}
        <h2 className="text-lg font-semibold text-white mt-10 mb-3">
          4. Third-Party Services
        </h2>
        <p className="text-sm text-white/60 leading-relaxed">
          We share your information with the following third parties strictly for
          order fulfilment:
        </p>
        <ul className="mt-3 list-disc pl-5 space-y-2 text-sm text-white/60">
          <li>
            <span className="text-white/80 font-medium">Yoco</span> &mdash;
            payment processing (processes your card details directly; we never
            see or store card numbers)
          </li>
          <li>
            <span className="text-white/80 font-medium">Resend</span> &mdash;
            email delivery (sends your order confirmation email)
          </li>
          <li>
            <span className="text-white/80 font-medium">Supabase</span> &mdash;
            secure data storage (stores order and stock data)
          </li>
        </ul>
        <p className="mt-3 text-sm text-white/60 leading-relaxed">
          We do not sell, rent, or share your personal information with any other
          third parties.
        </p>

        {/* 5. Data Retention */}
        <h2 className="text-lg font-semibold text-white mt-10 mb-3">
          5. Data Retention
        </h2>
        <p className="text-sm text-white/60 leading-relaxed">
          We retain your order information for as long as necessary to fulfil
          your order and for our legitimate business records. You may request
          deletion of your personal data at any time by contacting us.
        </p>

        {/* 6. Your Rights Under POPIA */}
        <h2 className="text-lg font-semibold text-white mt-10 mb-3">
          6. Your Rights Under POPIA
        </h2>
        <p className="text-sm text-white/60 leading-relaxed">
          You have the right to:
        </p>
        <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-white/60">
          <li>Access your personal information</li>
          <li>Request correction of inaccurate information</li>
          <li>Request deletion of your personal information</li>
          <li>Object to the processing of your information</li>
          <li>Lodge a complaint with the Information Regulator</li>
        </ul>
        <p className="mt-3 text-sm text-white/60 leading-relaxed">
          To exercise any of these rights, contact us at{" "}
          <a
            href="mailto:web500za@gmail.com"
            className="text-[#e31937] hover:underline"
          >
            web500za@gmail.com
          </a>
          .
        </p>

        {/* 7. Security */}
        <h2 className="text-lg font-semibold text-white mt-10 mb-3">
          7. Security
        </h2>
        <p className="text-sm text-white/60 leading-relaxed">
          We take reasonable measures to protect your personal information.
          Payment processing is handled by Yoco&rsquo;s PCI-DSS compliant
          infrastructure. Our site uses HTTPS encryption for all data
          transmission.
        </p>

        {/* 8. Cookies */}
        <h2 className="text-lg font-semibold text-white mt-10 mb-3">
          8. Cookies
        </h2>
        <p className="text-sm text-white/60 leading-relaxed">
          We use essential cookies only for site functionality. We do not use
          tracking or advertising cookies.
        </p>

        {/* 9. Changes to This Policy */}
        <h2 className="text-lg font-semibold text-white mt-10 mb-3">
          9. Changes to This Policy
        </h2>
        <p className="text-sm text-white/60 leading-relaxed">
          We may update this policy from time to time. Changes take effect
          immediately upon posting.
        </p>

        {/* 10. Contact */}
        <h2 className="text-lg font-semibold text-white mt-10 mb-3">
          10. Contact
        </h2>
        <p className="text-sm text-white/60 leading-relaxed">
          For privacy-related enquiries, contact us at{" "}
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
