"use client";

import AnimateIn from "@/components/AnimateIn";
import type { Product } from "@/lib/types";

export default function SpecsSection({ product }: { product: Product }) {
  return (
    <section className="bg-apple-light section-padding px-6">
      <div className="max-w-6xl mx-auto">
        <AnimateIn>
          <h2 className="font-[family-name:var(--font-display)] font-bold text-[clamp(2rem,5vw,3rem)] text-apple-dark tracking-[-0.03em] leading-[1.05] text-center">
            Tech Specs
          </h2>
        </AnimateIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mt-12 md:mt-16">
          {product.specCategories.map((cat, i) => (
            <AnimateIn key={cat.title} delay={i * 80}>
              <div className="bg-white rounded-2xl p-6 md:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                <h3 className="font-[family-name:var(--font-display)] font-semibold text-apple-dark text-lg tracking-tight mb-4">
                  {cat.title}
                </h3>
                <div className="space-y-3">
                  {cat.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex justify-between items-start gap-3 text-sm font-[family-name:var(--font-body)]"
                    >
                      <span className="text-apple-gray-text shrink-0">{spec.label}</span>
                      <span className="text-apple-dark text-right font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
