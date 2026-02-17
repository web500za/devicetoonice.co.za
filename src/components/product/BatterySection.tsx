"use client";

import AnimateIn from "@/components/AnimateIn";
import CountUp from "@/components/CountUp";
import type { Product } from "@/lib/types";

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

export default function BatterySection({ product }: { product: Product }) {
  const { r, g, b } = hexToRgb(product.accentColor);

  return (
    <section className="relative bg-op-black section-padding px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: `radial-gradient(ellipse 500px 350px at 50% 50%, rgba(${r}, ${g}, ${b}, 0.15) 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <AnimateIn>
          <h2 className="font-bold text-[clamp(2rem,5vw,3.5rem)] text-white tracking-[-0.02em] leading-[1.05]" style={{ fontFamily: "var(--font-display)" }}>
            {product.batteryHeadline}
          </h2>
        </AnimateIn>

        <AnimateIn delay={200}>
          <div className="mt-12 md:mt-16">
            <div className="stat-number text-[clamp(2.5rem,10vw,7rem)] text-white">
              <CountUp end={product.batteryCapacity} separator="," />
              <span className="text-[0.4em] text-apple-gray ml-2 tracking-normal">
                mAh
              </span>
            </div>
            <p className="text-apple-gray text-base md:text-lg mt-3">
              {product.batteryCapacityNote}
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={350}>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16 md:mt-20">
            {product.batteryStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="stat-number text-[clamp(2rem,5vw,3.5rem)] text-white">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-apple-gray text-xs md:text-sm mt-1 uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </AnimateIn>

        <AnimateIn delay={200} className="mt-12">
          <p className="text-white/80 text-lg md:text-xl font-medium tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            {product.batteryHighlight}
          </p>
          <p className="text-apple-gray-text text-sm mt-2">
            {product.batteryFootnote}
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
