"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useReducedMotion } from "framer-motion";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

const displayStats = [
  { value: "165Hz", label: "Refresh Rate" },
  { value: "1,800 nits", label: "Peak Brightness" },
  { value: "10-bit", label: "Color Depth" },
];

const FOOTNOTE =
  "100% DCI-P3 · HDR10+ · Dolby Vision · Gorilla Glass Victus 2";

export function DisplaySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(containerRef);
  const prefersReduced = useReducedMotion();

  const isReduced = !!prefersReduced;

  // Headline: fades out, drifts up, and scales between 0–0.35
  const headlineOpacity = isReduced ? 1 : lerp(1, 0, progress / 0.35);
  const headlineY = isReduced ? 0 : lerp(0, -60, progress / 0.35);
  const headlineScale = isReduced ? 1 : lerp(1, 1.3, progress / 0.35);

  // Background: scales up subtly and brightens as you scroll (0→1)
  const bgScale = isReduced ? 1 : lerp(1, 1.15, progress);
  const bgOpacity = isReduced ? 0.45 : lerp(0.15, 0.55, progress);

  // Stats: stagger in between 0.3→0.7
  const statsOpacity = isReduced
    ? 1
    : lerp(0, 1, (progress - 0.3) / 0.4);
  const statsY = isReduced ? 0 : lerp(40, 0, (progress - 0.3) / 0.4);

  // Footnote: appear after 0.65
  const footnoteOpacity = isReduced
    ? 1
    : lerp(0, 1, (progress - 0.65) / 0.3);

  const inViewport = progress > 0 && progress < 1;

  return (
    <section ref={containerRef} className="h-[200vh] relative bg-black">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Cinematic background — 165Hz speed lines, scales on scroll */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: bgOpacity,
            transform: `scale(${bgScale})`,
            willChange: inViewport ? "transform, opacity" : "auto",
          }}
        >
          <Image
            src="/images/oneplus-15/cdn/backgrounds/section-bg-1.jpg"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        {/* Vignette overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />

        {/* Headline — scales up and fades as you scroll */}
        <div
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          style={{
            opacity: headlineOpacity,
            transform: `translateY(${headlineY}px) scale(${headlineScale})`,
            willChange: inViewport ? "transform, opacity" : "auto",
          }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white text-center px-6">
            6.78&quot; of pure clarity
          </h2>
        </div>

        {/* Stats — fade in as headline fades out */}
        <div
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          style={{
            opacity: statsOpacity,
            transform: `translateY(${statsY}px)`,
            willChange: inViewport ? "transform, opacity" : "auto",
          }}
        >
          <div className="flex gap-12 sm:gap-20 text-center">
            {displayStats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)]">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-white/50 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footnote */}
        <div
          className="absolute bottom-12 left-0 right-0 z-10 pointer-events-none"
          style={{
            opacity: footnoteOpacity,
            willChange: inViewport ? "opacity" : "auto",
          }}
        >
          <p className="text-xs text-white/30 text-center px-6">
            {FOOTNOTE}
          </p>
        </div>
      </div>
    </section>
  );
}
