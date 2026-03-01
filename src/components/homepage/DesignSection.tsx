"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface ProductColor {
  key: string;
  name: string;
  hex: string;
  image: string;
}

interface DesignSectionProps {
  colors: ProductColor[];
}

const buildStats = [
  { value: "IP69K", label: "Water & Dust" },
  { value: "26.3%", label: "Lighter Than Ti" },
  { value: "134%", label: "More Wear Resistant" },
];

export function DesignSection({ colors }: DesignSectionProps) {
  const [selectedColor, setSelectedColor] = useState(
    colors[0]?.key ?? "black"
  );

  const activeColor =
    colors.find((c) => c.key === selectedColor) ?? colors[0];

  return (
    <section className="relative overflow-hidden bg-black">

      <div className="relative py-16 sm:py-32 md:py-40 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 sm:gap-16 items-center">
          {/* Right column — image (after text on mobile, right on desktop) */}
          <div className="order-last md:order-2">
            <ScrollReveal y={0} delay={0.2}>
              <div className="relative flex items-center justify-center min-h-[220px] sm:min-h-[500px]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeColor.key}
                    src={activeColor.image}
                    alt={`OnePlus 15 — ${activeColor.name}`}
                    className="max-h-[380px] sm:max-h-[600px] object-contain mx-auto drop-shadow-[0_0_80px_rgba(255,255,255,0.06)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>
              </div>
            </ScrollReveal>
          </div>

          {/* Left column — text content (first on mobile, left on desktop) */}
          <div className="order-first md:order-1">
            <ScrollReveal y={30}>
              {/* Headline */}
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white leading-[0.95]">
                Built Different.
                <br />
                Literally.
              </h2>

              {/* Description */}
              <p className="mt-6 text-base sm:text-lg text-white/60 leading-relaxed max-w-md">
                Nano-ceramic metal frame. Tougher than titanium. 26% lighter.
                134% more wear resistant.
              </p>

              {/* Stats row */}
              <div className="mt-10 flex gap-4 sm:gap-8">
                {buildStats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-xl sm:text-2xl font-bold text-white">
                      {stat.value}
                    </p>
                    <p className="text-xs text-white/50 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Color swatches */}
              <div className="mt-8">
                <div className="flex gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.key}
                      type="button"
                      aria-label={`Select ${color.name}`}
                      className="w-8 h-8 rounded-full cursor-pointer transition-all duration-300"
                      style={{
                        backgroundColor: color.hex,
                        ...(color.key === selectedColor
                          ? {
                              boxShadow: "0 0 0 2px black, 0 0 0 4px white",
                              transform: "scale(1.1)",
                            }
                          : {}),
                      }}
                      onClick={() => setSelectedColor(color.key)}
                    />
                  ))}
                </div>
                <p className="text-sm text-white/50 mt-3">
                  {activeColor.name}
                </p>
              </div>

              {/* Build details */}
              <p className="mt-6 text-xs text-white/30">
                8.2mm thin · 215g · Gorilla Glass Victus 2
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
