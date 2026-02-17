"use client";

import { formatPrice } from "@/lib/products";
import type { Product } from "@/lib/types";

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

export default function DeviceCard({ product }: { product: Product }) {
  const { r, g, b } = hexToRgb(product.accentColor);

  return (
    <a
      href={`/${product.slug}`}
      className="group block bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 md:p-8 transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.05]"
      style={
        {
          "--glow-color": `rgba(${r}, ${g}, ${b}, 0.15)`,
        } as React.CSSProperties
      }
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 40px rgba(${r}, ${g}, ${b}, 0.08), 0 0 80px rgba(${r}, ${g}, ${b}, 0.04)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div className="flex justify-center mb-6">
        <img
          src={product.heroImage}
          alt={product.name}
          className="w-36 md:w-44 transition-transform duration-500 group-hover:scale-105"
          style={{ filter: `drop-shadow(0 10px 30px rgba(${r}, ${g}, ${b}, 0.12))` }}
          loading="lazy"
        />
      </div>

      <div className="text-center">
        <p className="text-apple-gray-text text-xs uppercase tracking-[0.2em] mb-1">
          {product.brand}
        </p>
        <h3 className="font-bold text-white text-lg md:text-xl tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          {product.name}
        </h3>
        <p className="text-apple-gray text-sm mt-2">
          From <span className="text-white font-semibold">{formatPrice(product.startingPrice)}</span>
        </p>
        <p
          className="text-sm mt-3 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: product.accentColor }}
        >
          View Details →
        </p>
      </div>
    </a>
  );
}
