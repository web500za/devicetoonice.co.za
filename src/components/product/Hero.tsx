"use client";

import AnimateIn from "@/components/AnimateIn";
import { formatPrice } from "@/lib/products";
import type { Product } from "@/lib/types";

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

export default function Hero({ product }: { product: Product }) {
  const { r, g, b } = hexToRgb(product.accentColor);
  const glowStyle = {
    background: `radial-gradient(ellipse 600px 400px at 50% 60%, rgba(${r}, ${g}, ${b}, 0.08) 0%, transparent 70%)`,
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden px-6"
    >
      <div className="absolute inset-0 pointer-events-none" style={glowStyle} />

      <AnimateIn delay={100} className="text-center relative z-10">
        <p className="text-apple-gray text-xs md:text-sm uppercase tracking-[0.35em] mb-5 font-[family-name:var(--font-body)]">
          Device Too Nice
        </p>
      </AnimateIn>

      <AnimateIn delay={250} className="text-center relative z-10">
        <h1 className="font-[family-name:var(--font-display)] font-extrabold text-[clamp(3.5rem,10vw,7.5rem)] text-white tracking-[-0.04em] leading-[0.9]">
          {product.name}
        </h1>
      </AnimateIn>

      <AnimateIn delay={450} className="text-center relative z-10">
        <p className="font-[family-name:var(--font-display)] text-[clamp(1.1rem,2.5vw,1.75rem)] text-apple-gray mt-3 tracking-[-0.01em] font-medium">
          {product.tagline}
        </p>
      </AnimateIn>

      <AnimateIn delay={650} className="relative z-10 mt-10 md:mt-14">
        <img
          src={product.heroImage}
          alt={product.name}
          width={384}
          height={480}
          className="w-56 sm:w-64 md:w-72 lg:w-80 animate-float"
          style={{ filter: `drop-shadow(0 20px 60px rgba(${r}, ${g}, ${b}, 0.15))` }}
        />
      </AnimateIn>

      <AnimateIn delay={850} className="text-center relative z-10 mt-8">
        <p className="text-apple-gray text-base md:text-lg font-[family-name:var(--font-body)]">
          From <span className="text-white font-semibold">{formatPrice(product.startingPrice)}</span>
          <span className="text-apple-gray-text text-sm ml-2">free delivery · no customs · 7–10 days</span>
        </p>
      </AnimateIn>

      <AnimateIn delay={1000} className="flex items-center gap-5 mt-5 relative z-10">
        <a
          href="#display"
          className="hover:opacity-80 transition-colors text-base font-[family-name:var(--font-body)] font-medium group"
          style={{ color: product.accentColor }}
        >
          Learn more{" "}
          <span className="inline-block transition-transform group-hover:translate-y-0.5">↓</span>
        </a>
        <a
          href="#order"
          className="text-white px-7 py-2.5 rounded-full font-semibold transition-colors text-base font-[family-name:var(--font-body)]"
          style={{ backgroundColor: product.accentColor }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = product.accentHover)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = product.accentColor)}
        >
          Order Now
        </a>
      </AnimateIn>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-40">
        <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 bg-white/60 rounded-full animate-scroll-hint" />
        </div>
      </div>
    </section>
  );
}
