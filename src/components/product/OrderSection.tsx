"use client";

import { useState } from "react";
import AnimateIn from "@/components/AnimateIn";
import { findVariant, findColor, formatPrice } from "@/lib/products";
import type { Product } from "@/lib/types";

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

export default function OrderSection({ product }: { product: Product }) {
  const { r, g, b } = hexToRgb(product.accentColor);
  const [selectedRam, setSelectedRam] = useState(product.ramOptions[0]);
  const [selectedStorage, setSelectedStorage] = useState(product.storageOptions[0]);
  const [selectedColorKey, setSelectedColorKey] = useState(product.colors[0].key);

  const availableStorage = product.storageOptions.filter(
    (s) => findVariant(product, selectedRam, s) !== undefined
  );

  const effectiveStorage = availableStorage.includes(selectedStorage)
    ? selectedStorage
    : availableStorage[0];

  const effectiveVariant = findVariant(product, selectedRam, effectiveStorage)!;

  const availableColors = effectiveVariant.colors.map((key) => {
    const color = findColor(product, key)!;
    return color;
  });

  const activeColorKey = effectiveVariant.colors.includes(selectedColorKey)
    ? selectedColorKey
    : effectiveVariant.colors[0];

  const activeColor = findColor(product, activeColorKey)!;

  const checkoutUrl = `/checkout?product=${product.slug}&ram=${selectedRam}&storage=${effectiveStorage}&color=${activeColorKey}`;

  return (
    <section id="order" className="relative bg-black section-padding px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background: `radial-gradient(ellipse 600px 400px at 50% 60%, rgba(${r}, ${g}, ${b}, 0.08) 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <AnimateIn>
          <h2 className="font-bold text-[clamp(2rem,5vw,3.5rem)] text-white tracking-[-0.02em] leading-[1.05]" style={{ fontFamily: "var(--font-display)" }}>
            Get Yours Today.
          </h2>
        </AnimateIn>

        <AnimateIn delay={150}>
          <div className="mt-8">
            <div className="stat-number text-[clamp(2.5rem,6vw,4rem)] text-white transition-all duration-300">
              {formatPrice(effectiveVariant.price)}
            </div>
            <p className="text-apple-gray text-sm mt-2">
              {selectedRam} RAM · {effectiveStorage} · Free delivery nationwide · 7–10 days
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={200} className="mt-10">
          <img
            src={activeColor.image}
            alt={`${product.name} ${activeColor.name}`}
            className="w-48 md:w-56 mx-auto transition-all duration-500"
            style={{ filter: `drop-shadow(0 20px 60px rgba(${r}, ${g}, ${b}, 0.12))` }}
            loading="lazy"
          />
        </AnimateIn>

        {/* RAM selector */}
        <AnimateIn delay={250} className="mt-10">
          <p className="text-apple-gray text-xs uppercase tracking-widest mb-4">
            Memory
          </p>
          <div className="flex justify-center gap-3">
            {product.ramOptions.map((ram) => (
              <button
                key={ram}
                onClick={() => {
                  setSelectedRam(ram);
                  if (!findVariant(product, ram, selectedStorage)) {
                    const firstAvailable = product.storageOptions.find(
                      (s) => findVariant(product, ram, s) !== undefined
                    );
                    if (firstAvailable) setSelectedStorage(firstAvailable);
                  }
                }}
                className="px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border"
                style={
                  selectedRam === ram
                    ? {
                        borderColor: product.accentColor,
                        backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)`,
                        color: "#ffffff",
                      }
                    : { borderColor: "rgba(255,255,255,0.1)", color: "#86868b" }
                }
              >
                {ram}
              </button>
            ))}
          </div>
        </AnimateIn>

        {/* Storage selector */}
        <AnimateIn delay={300} className="mt-6">
          <p className="text-apple-gray text-xs uppercase tracking-widest mb-4">
            Storage
          </p>
          <div className="flex justify-center gap-3">
            {product.storageOptions.map((storage) => {
              const available = findVariant(product, selectedRam, storage) !== undefined;
              return (
                <button
                  key={storage}
                  onClick={() => available && setSelectedStorage(storage)}
                  disabled={!available}
                  className="px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border"
                  style={
                    effectiveStorage === storage
                      ? {
                          borderColor: product.accentColor,
                          backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)`,
                          color: "#ffffff",
                        }
                      : available
                      ? { borderColor: "rgba(255,255,255,0.1)", color: "#86868b" }
                      : {
                          borderColor: "rgba(255,255,255,0.05)",
                          color: "rgba(255,255,255,0.2)",
                          cursor: "not-allowed",
                        }
                  }
                >
                  {storage}
                </button>
              );
            })}
          </div>
        </AnimateIn>

        {/* Color picker */}
        <AnimateIn delay={350} className="mt-8">
          <p className="text-apple-gray text-xs uppercase tracking-widest mb-3">
            Colour
          </p>
          <div className="flex items-center justify-center gap-4">
            {availableColors.map((c) => (
              <button
                key={c.key}
                onClick={() => setSelectedColorKey(c.key)}
                className={`w-8 h-8 rounded-full transition-all duration-300 ${
                  activeColorKey === c.key ? "scale-110" : "swatch-ring hover:scale-105"
                }`}
                style={{
                  backgroundColor: c.hex,
                  boxShadow:
                    activeColorKey === c.key ? `0 0 0 2px ${product.accentColor}` : undefined,
                }}
                aria-label={c.name}
              />
            ))}
          </div>
          <p className="text-apple-gray text-sm mt-2">
            {activeColor.name}
          </p>
        </AnimateIn>

        {/* CTA */}
        <AnimateIn delay={450} className="mt-10">
          <a
            href={checkoutUrl}
            className="inline-block text-white px-10 py-3.5 rounded-full font-semibold text-lg transition-all duration-300"
            style={{ backgroundColor: product.accentColor }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = product.accentHover;
              e.currentTarget.style.boxShadow = `0 0 30px rgba(${r}, ${g}, ${b}, 0.3)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = product.accentColor;
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Proceed to Checkout
          </a>
        </AnimateIn>

        {/* Trust signals */}
        <AnimateIn delay={550} className="mt-10">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-apple-gray text-xs md:text-sm">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.747L15.47 4.397A2.25 2.25 0 0 0 13.643 3.5H9.75v10.75h10.5" />
              </svg>
              Free Delivery Nationwide
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
              No Customs Fees
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              7–10 Day Delivery
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
              </svg>
              Warranty Included
            </span>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
