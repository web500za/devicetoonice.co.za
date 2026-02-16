"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AnimateIn from "@/components/AnimateIn";
import { getProduct } from "@/lib/products";

function CancelledContent() {
  const searchParams = useSearchParams();
  const productSlug = searchParams.get("product");
  const product = productSlug ? getProduct(productSlug) : null;

  const backUrl = product ? `/${product.slug}#order` : "/";

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="max-w-lg mx-auto text-center relative z-10">
        <AnimateIn>
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-apple-gray" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </AnimateIn>

        <AnimateIn delay={150}>
          <h1 className="font-[family-name:var(--font-display)] font-bold text-[clamp(2rem,5vw,3rem)] text-white tracking-[-0.03em] leading-[1.05]">
            Payment Cancelled
          </h1>
        </AnimateIn>

        <AnimateIn delay={300}>
          <p className="text-apple-gray text-base md:text-lg mt-5 leading-relaxed font-[family-name:var(--font-body)]">
            Your payment was cancelled. No charges have been made.
          </p>
        </AnimateIn>

        <AnimateIn delay={450}>
          <p className="text-apple-gray-text text-sm mt-4 font-[family-name:var(--font-body)]">
            Your selected configuration is still available. You can try again whenever you&apos;re ready.
          </p>
        </AnimateIn>

        <AnimateIn delay={600} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <a
            href={backUrl}
            className="inline-block text-white px-8 py-3 rounded-full font-semibold text-base transition-all duration-300 font-[family-name:var(--font-body)]"
            style={{ backgroundColor: product?.accentColor || "#e31937" }}
          >
            Try Again
          </a>
          <a
            href="/"
            className="inline-block text-apple-gray hover:text-white transition-colors text-sm font-[family-name:var(--font-body)]"
          >
            Back to Home
          </a>
        </AnimateIn>
      </div>
    </div>
  );
}

export default function OrderCancelledPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-apple-gray text-sm font-[family-name:var(--font-body)]">Loading...</div>
      </div>
    }>
      <CancelledContent />
    </Suspense>
  );
}
