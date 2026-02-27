"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { CountUp } from "@/components/ui/count-up";

const chargingStats = [
  { value: "120W", label: "Wired", delay: 0.3 },
  { value: "50W", label: "Wireless", delay: 0.4 },
  { value: "31hrs", label: "Video Playback", delay: 0.5 },
] as const;

const bullets = [
  "3 day battery with regular use",
  "0 to 50% in 15 minutes",
  "Charger included in the box",
];

export function BatterySection() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a]">
      {/* Cinematic background — battery x-ray blue glow */}
      <div className="absolute inset-0">
        <Image
          src="/images/oneplus-15/cdn/backgrounds/section-bg-2.jpg"
          alt=""
          fill
          className="object-cover object-center opacity-35"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
      </div>

      {/* Battery cover render — subtle behind the number */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[600px] sm:w-[500px] sm:h-[700px] pointer-events-none">
        <Image
          src="/images/oneplus-15/cdn/battery/cover-d7111-a20023.png.webp"
          alt=""
          fill
          className="object-contain opacity-10"
          sizes="500px"
        />
      </div>

      <div className="relative py-32 sm:py-40 px-6 max-w-4xl mx-auto text-center">
        {/* Headline */}
        <ScrollReveal>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Outlast Everything.
          </h2>
        </ScrollReveal>

        {/* Massive number */}
        <ScrollReveal delay={0.15}>
          <div className="mt-8">
            <CountUp
              end={7300}
              separator=","
              className="text-[clamp(5rem,15vw,12rem)] font-bold tracking-tighter text-white leading-none"
            />
            <p className="text-xl sm:text-2xl text-white/50 font-medium mt-2">
              mAh
            </p>
          </div>
        </ScrollReveal>

        {/* Subheadline */}
        <ScrollReveal delay={0.25}>
          <p className="mt-6 text-base sm:text-lg text-white/50">
            The largest battery ever in a flagship.
          </p>
        </ScrollReveal>

        {/* Charging stats row */}
        <div className="mt-16 flex justify-center gap-8 sm:gap-16">
          {chargingStats.map((stat) => (
            <ScrollReveal key={stat.label} delay={stat.delay}>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-white">
                  {stat.value}
                </p>
                <p className="text-xs text-white/50 mt-1">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bullet points */}
        <ScrollReveal delay={0.6}>
          <div className="mt-12 flex flex-col items-center gap-3">
            {bullets.map((text) => (
              <p key={text} className="text-sm text-white/60 flex items-center">
                <span
                  aria-hidden="true"
                  className="w-1.5 h-1.5 rounded-full bg-[var(--cta)] inline-block mr-3 shrink-0"
                />
                {text}
              </p>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
