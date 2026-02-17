"use client";

import { useState } from "react";
import AnimateIn from "@/components/AnimateIn";
import CountUp from "@/components/CountUp";
import type { Product } from "@/lib/types";

export default function DesignSection({ product }: { product: Product }) {
  const [activeColor, setActiveColor] = useState(0);

  return (
    <section className="relative bg-[#0d0d0d] section-padding px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <AnimateIn>
            <h2 className="font-bold text-[clamp(2rem,5vw,3.5rem)] text-white tracking-[-0.02em] leading-[1.05]" style={{ fontFamily: "var(--font-display)" }}>
              {product.designHeadline.split("\n").map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </h2>
          </AnimateIn>

          <AnimateIn delay={150}>
            <p className="text-apple-gray text-base md:text-lg mt-5 max-w-lg mx-auto leading-relaxed">
              {product.designSubheadline.split("\n").map((line, i) => (
                <span key={i}>
                  {i > 0 && <br className="hidden md:block" />}
                  {line}
                </span>
              ))}
            </p>
          </AnimateIn>
        </div>

        <AnimateIn delay={250}>
          <div className="flex flex-wrap justify-center gap-6 md:gap-14 mt-14 md:mt-20">
            {product.designStats.map((stat) => {
              const isNumeric = /^[\d.]+/.test(stat.value);
              return (
                <div key={stat.label} className="text-center">
                  <div className="stat-number text-[clamp(2rem,4.5vw,3rem)] text-white">
                    {isNumeric ? (
                      <CountUp
                        end={parseFloat(stat.value)}
                        decimals={stat.value.includes(".") ? stat.value.split(".")[1].replace(/[^\d]/g, "").length : 0}
                        suffix={stat.value.replace(/^[\d.]+/, "")}
                      />
                    ) : (
                      stat.value
                    )}
                  </div>
                  <p className="text-apple-gray text-xs md:text-sm mt-1 uppercase tracking-widest">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </AnimateIn>

        <AnimateIn delay={200} className="mt-16 md:mt-24">
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-xs mx-auto mb-10">
              <img
                src={product.colors[activeColor].image}
                alt={`${product.name} in ${product.colors[activeColor].name}`}
                className="w-full transition-opacity duration-500 drop-shadow-[0_0_40px_rgba(255,255,255,0.04)]"
                loading="lazy"
              />
            </div>

            <div className="flex items-center gap-4">
              {product.colors.map((color, i) => (
                <button
                  key={color.key}
                  onClick={() => setActiveColor(i)}
                  className={`w-7 h-7 rounded-full transition-all duration-300 ${
                    activeColor === i ? "scale-110" : "swatch-ring hover:scale-105"
                  }`}
                  style={{
                    backgroundColor: color.hex,
                    boxShadow: activeColor === i ? `0 0 0 2px ${product.accentColor}` : undefined,
                  }}
                  aria-label={color.name}
                />
              ))}
            </div>
            <p className="text-apple-gray text-sm mt-3">
              {product.colors[activeColor].name}
            </p>

            <p className="text-apple-gray-text text-sm mt-6">
              {product.designFootnote}
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
