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

export default function DisplaySection({ product }: { product: Product }) {
  const { r, g, b } = hexToRgb(product.accentColor);

  return (
    <section id="display" className="relative bg-black section-padding px-6 overflow-hidden scroll-mt-14">
      <div className="max-w-5xl mx-auto text-center">
        <AnimateIn>
          <h2 className="font-bold text-[clamp(2rem,5vw,3.5rem)] text-white tracking-[-0.02em] leading-[1.05]" style={{ fontFamily: "var(--font-display)" }}>
            {product.displayHeadline.split("\n").map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h2>
        </AnimateIn>

        <AnimateIn delay={150}>
          <p className="text-apple-gray text-base md:text-lg mt-5 max-w-xl mx-auto leading-relaxed">
            {product.displaySubheadline.split("\n").map((line, i) => (
              <span key={i}>
                {i > 0 && <br className="hidden md:block" />}
                {line}
              </span>
            ))}
          </p>
        </AnimateIn>

        <AnimateIn delay={300}>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-14 md:mt-20">
            {product.displayStats.map((stat) => (
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

        <AnimateIn delay={200} className="mt-16 md:mt-24">
          <img
            src={product.displayImage}
            alt={`${product.name} display`}
            className="w-full max-w-md mx-auto"
            style={{ filter: `drop-shadow(0 0 80px rgba(${r}, ${g}, ${b}, 0.08))` }}
            loading="lazy"
          />
        </AnimateIn>

        <AnimateIn delay={100} className="mt-8">
          <p className="text-apple-gray-text text-sm">
            {product.displayFootnote}
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
