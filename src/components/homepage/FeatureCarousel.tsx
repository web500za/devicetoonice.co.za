"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

const features = [
  {
    id: "colors",
    name: "Colors",
    description:
      "Three bold finishes. Sand Storm, Infinite Black, Ultra Violet.",
    hasSwatches: true,
  },
  {
    id: "display",
    name: "165Hz Display",
    description:
      "The world's first 165Hz at 1.5K resolution. 10-bit LTPO AMOLED.",
  },
  {
    id: "performance",
    name: "Snapdragon 8 Elite",
    description:
      "The fastest mobile chipset. 4.6GHz Oryon CPU. 3nm process.",
  },
  {
    id: "battery",
    name: "7,300 mAh Battery",
    description:
      "Outlast everything. 120W wired, 50W wireless. Charger included.",
  },
  {
    id: "camera",
    name: "Triple 50MP Camera",
    description:
      "Sony IMX906 main. 3.5× periscope telephoto. 116° ultra-wide.",
  },
  {
    id: "frame",
    name: "Nano-Ceramic Frame",
    description:
      "Tougher than titanium. 26% lighter. 134% more wear resistant.",
  },
  {
    id: "ip69k",
    name: "IP69K",
    description:
      "The highest water and dust rating on any flagship.",
  },
] as const;

type Feature = (typeof features)[number];

interface FeatureCarouselProps {
  colors: { key: string; name: string; hex: string; image: string }[];
}

const DEFAULT_IMAGE = "/images/oneplus-15/product/black-front.png";

export function FeatureCarousel({ colors }: FeatureCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const activeFeature: Feature = features[activeIndex];

  const currentImage =
    activeFeature.id === "colors" && colors[selectedColorIndex]
      ? colors[selectedColorIndex].image
      : DEFAULT_IMAGE;

  const clearAutoAdvance = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startAutoAdvance = useCallback(() => {
    clearAutoAdvance();
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 5000);
  }, [clearAutoAdvance]);

  useEffect(() => {
    if (!isPaused) {
      startAutoAdvance();
    } else {
      clearAutoAdvance();
    }
    return clearAutoAdvance;
  }, [isPaused, startAutoAdvance, clearAutoAdvance]);

  const handleSelect = useCallback(
    (index: number) => {
      setActiveIndex(index);
      // Reset auto-advance timer on manual selection
      if (!isPaused) {
        startAutoAdvance();
      }
    },
    [isPaused, startAutoAdvance]
  );

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <div
          className="bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/[0.06] relative min-h-[600px] sm:min-h-[700px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Mobile pills — horizontal scroll */}
          <div className="md:hidden flex gap-2 overflow-x-auto pb-4 px-6 pt-6 -mx-0">
            {features.map((feature, index) => (
              <button
                key={feature.id}
                onClick={() => handleSelect(index)}
                className={`shrink-0 px-4 py-3 rounded-xl text-sm transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-white/[0.1] text-white ring-1 ring-white/20"
                    : "bg-white/[0.04] text-white/60 hover:bg-white/[0.08] hover:text-white/80"
                }`}
              >
                {feature.name}
              </button>
            ))}
          </div>

          {/* Mobile: color swatches below pills when Colors is active */}
          {activeFeature.id === "colors" && (
            <div className="md:hidden flex gap-2 px-6 pb-4">
              {colors.map((color, i) => (
                <button
                  key={color.key}
                  aria-label={color.name}
                  onClick={() => setSelectedColorIndex(i)}
                  className={`w-7 h-7 rounded-full border-2 transition-all duration-300 ${
                    i === selectedColorIndex
                      ? "border-white/60 scale-110"
                      : "border-white/10 hover:border-white/30"
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          )}

          {/* Desktop grid */}
          <div className="grid md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] h-full">
            {/* Left panel — desktop pills */}
            <div className="hidden md:flex p-6 sm:p-8 flex-col gap-2">
              {features.map((feature, index) => (
                <div key={feature.id}>
                  <button
                    onClick={() => handleSelect(index)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-300 ${
                      index === activeIndex
                        ? "bg-white/[0.1] text-white ring-1 ring-white/20"
                        : "bg-white/[0.04] text-white/60 hover:bg-white/[0.08] hover:text-white/80"
                    }`}
                  >
                    {feature.name}
                  </button>

                  {/* Color swatches inside the pill area */}
                  {feature.id === "colors" && index === activeIndex && (
                    <div className="flex gap-2 mt-3 ml-4">
                      {colors.map((color, i) => (
                        <button
                          key={color.key}
                          aria-label={color.name}
                          onClick={() => setSelectedColorIndex(i)}
                          className={`w-7 h-7 rounded-full border-2 transition-all duration-300 ${
                            i === selectedColorIndex
                              ? "border-white/60 scale-110"
                              : "border-white/10 hover:border-white/30"
                          }`}
                          style={{ backgroundColor: color.hex }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right panel — image area */}
            <div className="relative flex items-center justify-center p-8">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImage}
                  src={currentImage}
                  alt={
                    activeFeature.id === "colors" && colors[selectedColorIndex]
                      ? `OnePlus 15 in ${colors[selectedColorIndex].name}`
                      : `OnePlus 15 — ${activeFeature.name}`
                  }
                  className="max-h-[500px] object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              </AnimatePresence>

              {/* Feature description */}
              <div className="absolute bottom-6 left-0 right-0 flex justify-center px-4">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeFeature.id}
                    className="text-sm text-white/50 max-w-sm text-center"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {activeFeature.description}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
