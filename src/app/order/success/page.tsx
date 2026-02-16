"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AnimateIn from "@/components/AnimateIn";
import { getProduct } from "@/lib/products";

function SuccessContent() {
  const searchParams = useSearchParams();
  const productSlug = searchParams.get("product");
  const product = productSlug ? getProduct(productSlug) : null;
  const productName = product?.name || "your device";

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="absolute inset-0 pointer-events-none opacity-40" style={{
        background: product
          ? `radial-gradient(ellipse 600px 400px at 50% 60%, ${product.accentColor}14 0%, transparent 70%)`
          : "radial-gradient(ellipse 600px 400px at 50% 60%, rgba(227, 25, 55, 0.08) 0%, transparent 70%)",
      }} />

      <div className="max-w-lg mx-auto text-center relative z-10">
        <AnimateIn>
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
            style={{ backgroundColor: `${product?.accentColor || "#e31937"}26` }}
          >
            <svg className="w-10 h-10" fill="none" stroke={product?.accentColor || "#e31937"} strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
        </AnimateIn>

        <AnimateIn delay={150}>
          <h1 className="font-[family-name:var(--font-display)] font-bold text-[clamp(2rem,5vw,3rem)] text-white tracking-[-0.03em] leading-[1.05]">
            Payment Successful
          </h1>
        </AnimateIn>

        <AnimateIn delay={300}>
          <p className="text-apple-gray text-base md:text-lg mt-5 leading-relaxed font-[family-name:var(--font-body)]">
            Thank you for your order! You&apos;ll receive a confirmation email shortly with your order details.
          </p>
        </AnimateIn>

        <AnimateIn delay={450}>
          <p className="text-apple-gray-text text-sm mt-4 font-[family-name:var(--font-body)]">
            We&apos;ll prepare {productName} for delivery. If you have any questions, feel free to reach out.
          </p>
        </AnimateIn>

        <AnimateIn delay={600}>
          <a
            href="/"
            className="inline-block text-white px-8 py-3 rounded-full font-semibold text-base transition-all duration-300 font-[family-name:var(--font-body)] mt-10"
            style={{ backgroundColor: product?.accentColor || "#e31937" }}
          >
            Back to Home
          </a>
        </AnimateIn>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-apple-gray text-sm font-[family-name:var(--font-body)]">Loading...</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
