"use client";

import AnimateIn from "@/components/AnimateIn";
import CountUp from "@/components/CountUp";
import type { Product } from "@/lib/types";

export default function PerformanceSection({ product }: { product: Product }) {
  return (
    <section className="relative bg-op-black section-padding px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <AnimateIn>
          <p
            className="text-xs md:text-sm uppercase tracking-[0.3em] mb-4 font-semibold"
            style={{ color: product.accentColor }}
          >
            {product.chipLabel}
          </p>
        </AnimateIn>

        <AnimateIn delay={150}>
          <h2 className="font-bold text-[clamp(2rem,5vw,3.5rem)] text-white tracking-[-0.02em] leading-[1.05]" style={{ fontFamily: "var(--font-display)" }}>
            {product.performanceHeadline.split("\n").map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h2>
        </AnimateIn>

        <AnimateIn delay={300}>
          <p className="text-apple-gray text-base md:text-lg mt-5 max-w-lg mx-auto leading-relaxed">
            {product.performanceSubheadline.split("\n").map((line, i) => (
              <span key={i}>
                {i > 0 && <br className="hidden md:block" />}
                {line}
              </span>
            ))}
          </p>
        </AnimateIn>

        <AnimateIn delay={400}>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-14 md:mt-20">
            {product.performanceStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="stat-number text-[clamp(2.5rem,6vw,4.5rem)] text-white">
                  <CountUp
                    end={stat.value}
                    decimals={stat.decimals || 0}
                    suffix={stat.suffix}
                    separator={stat.separator || ""}
                  />
                </div>
                <p className="text-apple-gray text-xs md:text-sm mt-1 uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </AnimateIn>

        <AnimateIn delay={200} className="mt-14">
          <div className="inline-flex flex-wrap justify-center gap-3">
            {product.performanceTags.map((tag) => (
              <span
                key={tag}
                className="text-apple-gray text-xs md:text-sm border border-white/10 rounded-full px-4 py-1.5"
              >
                {tag}
              </span>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
