import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Returns & Refunds — Device Too Nice",
};

export default function ReturnsPage() {
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
          Returns &amp; Refunds
        </h1>
        <p className="mt-2 text-sm text-white/30">Last updated: February 2026</p>

        {/* 1. Overview */}
        <h2 className="text-lg font-semibold text-white mt-10 mb-3">
          1. Overview
        </h2>
        <p className="text-sm text-white/60 leading-relaxed">
          We want you to be happy with your purchase. This policy explains how
          returns, refunds, and warranty claims work.
        </p>

        {/* 2. Returns */}
        <h2 className="text-lg font-semibold text-white mt-10 mb-3">
          2. Returns
        </h2>
        <p className="text-sm text-white/60 leading-relaxed">
          You may return your device within{" "}
          <span className="text-white/80 font-medium">7 days</span> of
          delivery, provided it is unopened and in its original sealed
          packaging. Opened or used devices cannot be returned.
        </p>
        <p className="text-sm text-white/60 leading-relaxed mt-3">
          To initiate a return, contact us at{" "}
          <a
            href="mailto:web500za@gmail.com"
            className="text-[#e31937] hover:underline"
          >
            web500za@gmail.com
          </a>{" "}
          within the 7-day window. The customer is responsible for return
          shipping costs. Once we receive and inspect the returned item, we will
          process your refund.
        </p>

        {/* 3. Refunds */}
        <h2 className="text-lg font-semibold text-white mt-10 mb-3">
          3. Refunds
        </h2>
        <p className="text-sm text-white/60 leading-relaxed">
          Approved refunds are processed within{" "}
          <span className="text-white/80 font-medium">7 working days</span> of
          receiving the returned item. Refunds are issued to your original
          payment method via Yoco. You will receive an email confirmation when
          your refund has been processed.
        </p>

        {/* 4. Defective Items (DOA) */}
        <h2 className="text-lg font-semibold text-white mt-10 mb-3">
          4. Defective Items (DOA)
        </h2>
        <p className="text-sm text-white/60 leading-relaxed">
          If your device is dead on arrival or develops a fault within{" "}
          <span className="text-white/80 font-medium">30 days</span> of
          delivery, contact us immediately at{" "}
          <a
            href="mailto:web500za@gmail.com"
            className="text-[#e31937] hover:underline"
          >
            web500za@gmail.com
          </a>
          . You will need to provide photos or video showing the defect. We will
          arrange a replacement or full refund at no additional cost to you.
        </p>

        {/* 5. Warranty */}
        <h2 className="text-lg font-semibold text-white mt-10 mb-3">
          5. Warranty
        </h2>
        <p className="text-sm text-white/60 leading-relaxed">
          All devices are covered by the OnePlus manufacturer&rsquo;s warranty
          ({" "}
          <span className="text-white/80 font-medium">
            1 year from date of purchase
          </span>
          ). Warranty claims are handled through OnePlus directly. Device Too
          Nice will assist with facilitating the warranty process where possible,
          but we are not the warranty provider.
        </p>
        <p className="text-sm text-white/60 leading-relaxed mt-3">
          The warranty covers manufacturing defects only &mdash; physical
          damage, water damage (beyond rated IP protection), and software
          modifications are not covered.
        </p>

        {/* 6. Cancellations */}
        <h2 className="text-lg font-semibold text-white mt-10 mb-3">
          6. Cancellations
        </h2>
        <p className="text-sm text-white/60 leading-relaxed">
          Orders can be cancelled for a full refund if the device has not yet
          been shipped from our supplier. Once the device has been shipped,
          cancellations are no longer possible and the returns policy above
          applies.
        </p>
        <p className="text-sm text-white/60 leading-relaxed mt-3">
          To request a cancellation, contact us as soon as possible at{" "}
          <a
            href="mailto:web500za@gmail.com"
            className="text-[#e31937] hover:underline"
          >
            web500za@gmail.com
          </a>
          .
        </p>

        {/* 7. Contact */}
        <h2 className="text-lg font-semibold text-white mt-10 mb-3">
          7. Contact
        </h2>
        <p className="text-sm text-white/60 leading-relaxed">
          For all returns, refunds, and warranty enquiries, email{" "}
          <a
            href="mailto:web500za@gmail.com"
            className="text-[#e31937] hover:underline"
          >
            web500za@gmail.com
          </a>{" "}
          or WhatsApp{" "}
          <a
            href="https://wa.me/27832540891"
            className="text-[#e31937] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            +27 83 254 0891
          </a>
          . Please include your order reference number in all correspondence.
        </p>
      </div>
    </main>
  );
}
