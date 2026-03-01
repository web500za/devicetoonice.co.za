"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { CountUp } from "@/components/ui/count-up";

const stats = [
  { end: 3, suffix: "nm", decimals: 0, label: "Process" },
  { end: 4.6, suffix: "GHz", decimals: 1, label: "Clock Speed" },
  { end: 16, suffix: "GB", decimals: 0, label: "LPDDR5X" },
] as const;

const pills = ["Oryon CPU", "Adreno 840", "UFS 4.1", "Wi-Fi 7"];

const words = ["Raw.", "Unmatched.", "Power."];

export function PerformanceSection() {
  return (
    <section className="relative overflow-hidden bg-black">
      {/* Cinematic background — Snapdragon tri-chip render */}
      <div className="absolute inset-0">
        <Image
          src="/images/oneplus-15/cdn/backgrounds/section-bg-0.jpg"
          alt=""
          fill
          className="object-cover object-[50%_60%] sm:object-center opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" />
      </div>

      {/* Chip render — floating behind text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] pointer-events-none">
        <Image
          src="/images/oneplus-15/cdn/performance/tri-chip-d7111-5c0c12.png.webp"
          alt=""
          fill
          className="object-contain opacity-15"
          sizes="700px"
        />
      </div>

      {/* Subtle radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(227,25,55,0.08)_0%,transparent_70%)]"
      />

      <div className="relative py-32 sm:py-40 px-6 max-w-4xl mx-auto text-center">
        {/* Label */}
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--cta)] font-medium mb-8">
            Snapdragon 8 Elite
          </p>
        </ScrollReveal>

        {/* Massive headline — staggered word reveal */}
        <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[0.95]">
          {words.map((word, i) => (
            <ScrollReveal key={word} delay={i * 0.15} y={30}>
              <span className="block">{word}</span>
            </ScrollReveal>
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-16 flex justify-center gap-6 sm:gap-12 md:gap-16">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={0.4 + i * 0.1}>
              <div>
                <CountUp
                  end={stat.end}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-white"
                />
                <p className="text-xs sm:text-sm text-white/50 mt-2">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Tag pills */}
        <ScrollReveal delay={0.7}>
          <div className="mt-12 flex justify-center gap-3 overflow-x-auto flex-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {pills.map((pill) => (
              <span
                key={pill}
                className="border border-white/10 rounded-full px-4 py-2 text-xs sm:text-sm text-white/60 backdrop-blur-sm whitespace-nowrap shrink-0"
              >
                {pill}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
