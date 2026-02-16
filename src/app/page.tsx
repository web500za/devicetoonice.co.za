"use client";

import StickyNav from "@/components/StickyNav";
import AnimateIn from "@/components/AnimateIn";
import CountUp from "@/components/CountUp";
import { useState } from "react";

/* ═══════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 glow-red pointer-events-none" />

      <AnimateIn delay={100} className="text-center relative z-10">
        <p className="text-apple-gray text-xs md:text-sm uppercase tracking-[0.35em] mb-5 font-[family-name:var(--font-body)]">
          Device Too Nice
        </p>
      </AnimateIn>

      <AnimateIn delay={250} className="text-center relative z-10">
        <h1 className="font-[family-name:var(--font-display)] font-extrabold text-[clamp(3.5rem,10vw,7.5rem)] text-white tracking-[-0.04em] leading-[0.9]">
          OnePlus 15
        </h1>
      </AnimateIn>

      <AnimateIn delay={450} className="text-center relative z-10">
        <p className="font-[family-name:var(--font-display)] text-[clamp(1.1rem,2.5vw,1.75rem)] text-apple-gray mt-3 tracking-[-0.01em] font-medium">
          Power On. Limits Off.
        </p>
      </AnimateIn>

      <AnimateIn delay={650} className="relative z-10 mt-10 md:mt-14">
        <img
          src="https://www.giztop.com/media/catalog/product/cache/7273d816367fe28095c8d1187b15b971/o/n/oneplus_15.png"
          alt="OnePlus 15"
          width={384}
          height={480}
          className="w-56 sm:w-64 md:w-72 lg:w-80 animate-float drop-shadow-[0_20px_60px_rgba(227,25,55,0.15)]"
        />
      </AnimateIn>

      <AnimateIn delay={850} className="text-center relative z-10 mt-8">
        <p className="text-apple-gray text-base md:text-lg font-[family-name:var(--font-body)]">
          <span className="text-white font-semibold">R15,000</span>
          <span className="text-apple-gray-text text-sm ml-2">delivered · customs included</span>
        </p>
      </AnimateIn>

      <AnimateIn
        delay={1000}
        className="flex items-center gap-5 mt-5 relative z-10"
      >
        <a
          href="#display"
          className="text-op-red hover:text-red-400 transition-colors text-base font-[family-name:var(--font-body)] font-medium group"
        >
          Learn more{" "}
          <span className="inline-block transition-transform group-hover:translate-y-0.5">
            ↓
          </span>
        </a>
        <a
          href="#order"
          className="bg-op-red text-white px-7 py-2.5 rounded-full font-semibold hover:bg-op-red-hover transition-colors text-base font-[family-name:var(--font-body)]"
        >
          Order Now
        </a>
      </AnimateIn>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-40">
        <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 bg-white/60 rounded-full animate-scroll-hint" />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   DISPLAY
   ═══════════════════════════════════════════════════════ */
function DisplaySection() {
  return (
    <section
      id="display"
      className="relative bg-black section-padding px-6 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto text-center">
        <AnimateIn>
          <h2 className="font-[family-name:var(--font-display)] font-bold text-[clamp(2rem,5vw,3.5rem)] text-white tracking-[-0.03em] leading-[1.05]">
            See Everything.
            <br />
            Miss Nothing.
          </h2>
        </AnimateIn>

        <AnimateIn delay={150}>
          <p className="text-apple-gray text-base md:text-lg mt-5 max-w-xl mx-auto leading-relaxed font-[family-name:var(--font-body)]">
            The world&apos;s first 165Hz display at 1.5K resolution.
            <br className="hidden md:block" />
            10-bit LTPO AMOLED. 1,800 nits of searing brightness.
          </p>
        </AnimateIn>

        {/* Stats row */}
        <AnimateIn delay={300}>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-14 md:mt-20">
            <div className="text-center">
              <div className="stat-number text-[clamp(2.5rem,6vw,4.5rem)] text-white">
                <CountUp end={6.78} decimals={2} suffix="″" />
              </div>
              <p className="text-apple-gray text-xs md:text-sm mt-1 uppercase tracking-widest font-[family-name:var(--font-body)]">
                Display
              </p>
            </div>
            <div className="text-center">
              <div className="stat-number text-[clamp(2.5rem,6vw,4.5rem)] text-white">
                <CountUp end={165} suffix="Hz" />
              </div>
              <p className="text-apple-gray text-xs md:text-sm mt-1 uppercase tracking-widest font-[family-name:var(--font-body)]">
                Refresh Rate
              </p>
            </div>
            <div className="text-center">
              <div className="stat-number text-[clamp(2.5rem,6vw,4.5rem)] text-white">
                <CountUp end={1800} separator="," suffix=" nits" />
              </div>
              <p className="text-apple-gray text-xs md:text-sm mt-1 uppercase tracking-widest font-[family-name:var(--font-body)]">
                Peak Brightness
              </p>
            </div>
          </div>
        </AnimateIn>

        {/* Product image */}
        <AnimateIn delay={200} className="mt-16 md:mt-24">
          <img
            src="https://www.giztop.com/media/catalog/product/cache/97cc1143d2e20f2b0c8ea91aaa12053c/o/n/oneplus_15_black_1.png"
            alt="OnePlus 15 display"
            className="w-full max-w-md mx-auto drop-shadow-[0_0_80px_rgba(227,25,55,0.08)]"
            loading="lazy"
          />
        </AnimateIn>

        <AnimateIn delay={100} className="mt-8">
          <p className="text-apple-gray-text text-sm font-[family-name:var(--font-body)]">
            100% DCI-P3 · HDR10+ · Dolby Vision · Gorilla Glass Victus 2
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   PERFORMANCE
   ═══════════════════════════════════════════════════════ */
function PerformanceSection() {
  return (
    <section className="relative bg-op-black section-padding px-6 overflow-hidden">
      {/* Subtle gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <AnimateIn>
          <p className="text-op-red text-xs md:text-sm uppercase tracking-[0.3em] mb-4 font-[family-name:var(--font-body)] font-semibold">
            Snapdragon 8 Elite
          </p>
        </AnimateIn>

        <AnimateIn delay={150}>
          <h2 className="font-[family-name:var(--font-display)] font-bold text-[clamp(2rem,5vw,3.5rem)] text-white tracking-[-0.03em] leading-[1.05]">
            Raw. Unmatched.
            <br />
            Power.
          </h2>
        </AnimateIn>

        <AnimateIn delay={300}>
          <p className="text-apple-gray text-base md:text-lg mt-5 max-w-lg mx-auto leading-relaxed font-[family-name:var(--font-body)]">
            The fastest mobile chipset ever built.
            <br className="hidden md:block" />
            Everything you do, instantly.
          </p>
        </AnimateIn>

        {/* Stats */}
        <AnimateIn delay={400}>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-14 md:mt-20">
            <div className="text-center">
              <div className="stat-number text-[clamp(2.5rem,6vw,4.5rem)] text-white">
                <CountUp end={3} suffix="nm" />
              </div>
              <p className="text-apple-gray text-xs md:text-sm mt-1 uppercase tracking-widest font-[family-name:var(--font-body)]">
                Process
              </p>
            </div>
            <div className="text-center">
              <div className="stat-number text-[clamp(2.5rem,6vw,4.5rem)] text-white">
                <CountUp end={4.6} decimals={1} suffix="GHz" />
              </div>
              <p className="text-apple-gray text-xs md:text-sm mt-1 uppercase tracking-widest font-[family-name:var(--font-body)]">
                Clock Speed
              </p>
            </div>
            <div className="text-center">
              <div className="stat-number text-[clamp(2.5rem,6vw,4.5rem)] text-white">
                <CountUp end={16} suffix="GB" />
              </div>
              <p className="text-apple-gray text-xs md:text-sm mt-1 uppercase tracking-widest font-[family-name:var(--font-body)]">
                LPDDR5X
              </p>
            </div>
          </div>
        </AnimateIn>

        <AnimateIn delay={200} className="mt-14">
          <div className="inline-flex flex-wrap justify-center gap-3">
            {["Qualcomm Oryon CPU", "Adreno 840 GPU", "UFS 4.1 Storage", "Wi-Fi 7"].map(
              (tag) => (
                <span
                  key={tag}
                  className="text-apple-gray text-xs md:text-sm border border-white/10 rounded-full px-4 py-1.5 font-[family-name:var(--font-body)]"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   CAMERA
   ═══════════════════════════════════════════════════════ */
function CameraSection() {
  return (
    <section className="relative bg-black section-padding px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <AnimateIn>
            <h2 className="font-[family-name:var(--font-display)] font-bold text-[clamp(2rem,5vw,3.5rem)] text-white tracking-[-0.03em] leading-[1.05]">
              Every Shot.
              <br />
              A Masterpiece.
            </h2>
          </AnimateIn>

          <AnimateIn delay={150}>
            <p className="text-apple-gray text-base md:text-lg mt-5 font-[family-name:var(--font-body)]">
              Triple 50MP camera system. Powered by DetailMax Engine.
            </p>
          </AnimateIn>
        </div>

        {/* Stats */}
        <AnimateIn delay={250}>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-14 md:mt-20">
            {[
              { value: 50, suffix: "MP", label: "Main Sensor" },
              { value: 3.5, suffix: "×", label: "Optical Zoom", decimals: 1 },
              { value: 4, suffix: "K120fps", label: "Dolby Vision" },
              { value: 8, suffix: "K", label: "Video" },
            ].map((stat, i) => (
              <div key={stat.label} className="text-center">
                <AnimateIn delay={300 + i * 100}>
                  <div className="stat-number text-[clamp(2rem,5vw,3.5rem)] text-white">
                    <CountUp
                      end={stat.value}
                      suffix={stat.suffix}
                      decimals={stat.decimals || 0}
                    />
                  </div>
                  <p className="text-apple-gray text-xs md:text-sm mt-1 uppercase tracking-widest font-[family-name:var(--font-body)]">
                    {stat.label}
                  </p>
                </AnimateIn>
              </div>
            ))}
          </div>
        </AnimateIn>

        {/* Camera image + details */}
        <div className="mt-16 md:mt-24 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <AnimateIn direction="left" className="order-2 md:order-1">
            <img
              src="https://www.giztop.com/media/catalog/product/cache/97cc1143d2e20f2b0c8ea91aaa12053c/o/n/oneplus_15_black_3.png"
              alt="OnePlus 15 camera system"
              className="w-full max-w-sm mx-auto drop-shadow-[0_0_60px_rgba(227,25,55,0.06)]"
              loading="lazy"
            />
          </AnimateIn>

          <div className="order-1 md:order-2 space-y-8">
            {[
              {
                name: "Main Camera",
                sensor: "Sony IMX906",
                detail: "50MP · f/1.8 · OIS · 24mm",
              },
              {
                name: "Telephoto",
                sensor: "Periscope Lens",
                detail: "50MP · f/2.8 · 3.5× optical · 120× digital",
              },
              {
                name: "Ultra-Wide",
                sensor: "116° Field of View",
                detail: "50MP · f/2.0 · Autofocus",
              },
            ].map((cam, i) => (
              <AnimateIn key={cam.name} delay={200 + i * 150}>
                <div className="border-l-2 border-op-red/40 pl-5">
                  <h3 className="font-[family-name:var(--font-display)] font-semibold text-white text-lg md:text-xl tracking-tight">
                    {cam.name}
                  </h3>
                  <p className="text-op-red text-sm mt-0.5 font-[family-name:var(--font-body)] font-medium">
                    {cam.sensor}
                  </p>
                  <p className="text-apple-gray text-sm mt-1 font-[family-name:var(--font-body)]">
                    {cam.detail}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   BATTERY
   ═══════════════════════════════════════════════════════ */
function BatterySection() {
  return (
    <section className="relative bg-op-black section-padding px-6 overflow-hidden">
      <div className="absolute inset-0 glow-red-strong pointer-events-none opacity-40" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <AnimateIn>
          <h2 className="font-[family-name:var(--font-display)] font-bold text-[clamp(2rem,5vw,3.5rem)] text-white tracking-[-0.03em] leading-[1.05]">
            Outlast Everything.
          </h2>
        </AnimateIn>

        {/* Giant battery stat */}
        <AnimateIn delay={200}>
          <div className="mt-12 md:mt-16">
            <div className="stat-number text-[clamp(3.5rem,10vw,7rem)] text-white">
              <CountUp end={7300} separator="," />
              <span className="text-[0.4em] text-apple-gray ml-2 font-[family-name:var(--font-body)] tracking-normal">
                mAh
              </span>
            </div>
            <p className="text-apple-gray text-base md:text-lg mt-3 font-[family-name:var(--font-body)]">
              The largest battery ever in a flagship smartphone.
            </p>
          </div>
        </AnimateIn>

        {/* Charging stats */}
        <AnimateIn delay={350}>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16 md:mt-20">
            <div className="text-center">
              <div className="stat-number text-[clamp(2rem,5vw,3.5rem)] text-white">
                <CountUp end={120} suffix="W" />
              </div>
              <p className="text-apple-gray text-xs md:text-sm mt-1 uppercase tracking-widest font-[family-name:var(--font-body)]">
                Wired Charging
              </p>
            </div>
            <div className="text-center">
              <div className="stat-number text-[clamp(2rem,5vw,3.5rem)] text-white">
                <CountUp end={50} suffix="W" />
              </div>
              <p className="text-apple-gray text-xs md:text-sm mt-1 uppercase tracking-widest font-[family-name:var(--font-body)]">
                Wireless
              </p>
            </div>
            <div className="text-center">
              <div className="stat-number text-[clamp(2rem,5vw,3.5rem)] text-white">
                <CountUp end={31} suffix="hrs" />
              </div>
              <p className="text-apple-gray text-xs md:text-sm mt-1 uppercase tracking-widest font-[family-name:var(--font-body)]">
                Video Playback
              </p>
            </div>
          </div>
        </AnimateIn>

        <AnimateIn delay={200} className="mt-12">
          <p className="text-white/80 text-lg md:text-xl font-[family-name:var(--font-display)] font-medium tracking-tight">
            0 to 50% in 15 minutes.
          </p>
          <p className="text-apple-gray-text text-sm mt-2 font-[family-name:var(--font-body)]">
            Charger included in the box.
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   DESIGN & DURABILITY
   ═══════════════════════════════════════════════════════ */
const colorVariants = [
  {
    name: "Infinite Black",
    color: "#1a1a1a",
    image:
      "https://www.giztop.com/media/catalog/product/cache/97cc1143d2e20f2b0c8ea91aaa12053c/o/n/oneplus_15_black_2.png",
  },
  {
    name: "Ultra Violet",
    color: "#7B4EAB",
    image:
      "https://www.giztop.com/media/catalog/product/cache/97cc1143d2e20f2b0c8ea91aaa12053c/o/n/oneplus_15_purple_2.png",
  },
  {
    name: "Sand Storm",
    color: "#C8B89A",
    image:
      "https://www.giztop.com/media/catalog/product/cache/97cc1143d2e20f2b0c8ea91aaa12053c/o/n/oneplus_15_2.png",
  },
];

function DesignSection() {
  const [activeColor, setActiveColor] = useState(0);

  return (
    <section className="relative bg-[#0d0d0d] section-padding px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <AnimateIn>
            <h2 className="font-[family-name:var(--font-display)] font-bold text-[clamp(2rem,5vw,3.5rem)] text-white tracking-[-0.03em] leading-[1.05]">
              Built Different.
              <br />
              Literally.
            </h2>
          </AnimateIn>

          <AnimateIn delay={150}>
            <p className="text-apple-gray text-base md:text-lg mt-5 max-w-lg mx-auto leading-relaxed font-[family-name:var(--font-body)]">
              Nano-ceramic metal frame. Tougher than titanium.
              <br className="hidden md:block" />
              The most durable flagship ever made.
            </p>
          </AnimateIn>
        </div>

        {/* Durability stats */}
        <AnimateIn delay={250}>
          <div className="flex flex-wrap justify-center gap-6 md:gap-14 mt-14 md:mt-20">
            <div className="text-center">
              <div className="stat-number text-[clamp(2rem,4.5vw,3rem)] text-white">
                IP69K
              </div>
              <p className="text-apple-gray text-xs md:text-sm mt-1 uppercase tracking-widest font-[family-name:var(--font-body)]">
                Water & Dust
              </p>
            </div>
            <div className="text-center">
              <div className="stat-number text-[clamp(2rem,4.5vw,3rem)] text-white">
                <CountUp end={26.3} decimals={1} suffix="%" />
              </div>
              <p className="text-apple-gray text-xs md:text-sm mt-1 uppercase tracking-widest font-[family-name:var(--font-body)]">
                Lighter Than Ti
              </p>
            </div>
            <div className="text-center">
              <div className="stat-number text-[clamp(2rem,4.5vw,3rem)] text-white">
                <CountUp end={134} suffix="%" />
              </div>
              <p className="text-apple-gray text-xs md:text-sm mt-1 uppercase tracking-widest font-[family-name:var(--font-body)]">
                More Wear Resistant
              </p>
            </div>
          </div>
        </AnimateIn>

        {/* Color picker + image */}
        <AnimateIn delay={200} className="mt-16 md:mt-24">
          <div className="flex flex-col items-center">
            {/* Phone image */}
            <div className="relative w-full max-w-xs mx-auto mb-10">
              <img
                src={colorVariants[activeColor].image}
                alt={`OnePlus 15 in ${colorVariants[activeColor].name}`}
                className="w-full transition-opacity duration-500 drop-shadow-[0_0_40px_rgba(255,255,255,0.04)]"
                loading="lazy"
              />
            </div>

            {/* Color swatches */}
            <div className="flex items-center gap-4">
              {colorVariants.map((variant, i) => (
                <button
                  key={variant.name}
                  onClick={() => setActiveColor(i)}
                  className={`w-7 h-7 rounded-full transition-all duration-300 ${
                    activeColor === i ? "swatch-ring-active scale-110" : "swatch-ring hover:scale-105"
                  }`}
                  style={{ backgroundColor: variant.color }}
                  aria-label={variant.name}
                />
              ))}
            </div>
            <p className="text-apple-gray text-sm mt-3 font-[family-name:var(--font-body)]">
              {colorVariants[activeColor].name}
            </p>

            {/* Dimensions */}
            <p className="text-apple-gray-text text-sm mt-6 font-[family-name:var(--font-body)]">
              8.2mm thin · 215g · Gorilla Glass Victus 2
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SPECS GRID
   ═══════════════════════════════════════════════════════ */
const specCategories = [
  {
    title: "Display",
    specs: [
      { label: "Size", value: '6.78" LTPO AMOLED' },
      { label: "Resolution", value: "2772 × 1272 (450 PPI)" },
      { label: "Refresh Rate", value: "1–120Hz / 165Hz gaming" },
      { label: "Brightness", value: "1,800 nits peak" },
      { label: "Color", value: "10-bit, 100% DCI-P3" },
    ],
  },
  {
    title: "Performance",
    specs: [
      { label: "Chipset", value: "Snapdragon 8 Elite (3nm)" },
      { label: "CPU", value: "Oryon · 2×4.6GHz + 6×3.6GHz" },
      { label: "RAM", value: "12 / 16 GB LPDDR5X" },
      { label: "Storage", value: "256 / 512GB / 1TB UFS 4.1" },
      { label: "OS", value: "Android 16 · OxygenOS 16" },
    ],
  },
  {
    title: "Camera",
    specs: [
      { label: "Main", value: "50MP Sony IMX906 · f/1.8 OIS" },
      { label: "Telephoto", value: "50MP · 3.5× periscope · OIS" },
      { label: "Ultra-Wide", value: "50MP · 116° · f/2.0 AF" },
      { label: "Front", value: "32MP Sony IMX709 · AF" },
      { label: "Video", value: "8K30 / 4K120 Dolby Vision" },
    ],
  },
  {
    title: "Battery",
    specs: [
      { label: "Capacity", value: "7,300 mAh silicon-carbon" },
      { label: "Wired", value: "120W SUPERVOOC" },
      { label: "Wireless", value: "50W AIRVOOC" },
      { label: "Playback", value: "Up to 31 hours video" },
      { label: "In Box", value: "Charger included" },
    ],
  },
  {
    title: "Connectivity",
    specs: [
      { label: "5G", value: "Dual 5G, sub-6GHz" },
      { label: "Wi-Fi", value: "Wi-Fi 7 (802.11be)" },
      { label: "Bluetooth", value: "6.0 · aptX HD · LHDC 5" },
      { label: "USB", value: "Type-C 3.2 Gen 1" },
      { label: "NFC", value: "Yes · eSIM supported" },
    ],
  },
  {
    title: "Durability",
    specs: [
      { label: "Rating", value: "IP66 / IP68 / IP69K" },
      { label: "Front Glass", value: "Gorilla Glass Victus 2" },
      { label: "Frame", value: "Nano-ceramic metal" },
      { label: "Biometrics", value: "Ultrasonic fingerprint" },
      { label: "Extras", value: "IR blaster · Plus Key" },
    ],
  },
];

function SpecsSection() {
  return (
    <section className="bg-apple-light section-padding px-6">
      <div className="max-w-6xl mx-auto">
        <AnimateIn>
          <h2 className="font-[family-name:var(--font-display)] font-bold text-[clamp(2rem,5vw,3rem)] text-apple-dark tracking-[-0.03em] leading-[1.05] text-center">
            Tech Specs
          </h2>
        </AnimateIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mt-12 md:mt-16">
          {specCategories.map((cat, i) => (
            <AnimateIn key={cat.title} delay={i * 80}>
              <div className="bg-white rounded-2xl p-6 md:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                <h3 className="font-[family-name:var(--font-display)] font-semibold text-apple-dark text-lg tracking-tight mb-4">
                  {cat.title}
                </h3>
                <div className="space-y-3">
                  {cat.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex justify-between items-start gap-3 text-sm font-[family-name:var(--font-body)]"
                    >
                      <span className="text-apple-gray-text shrink-0">
                        {spec.label}
                      </span>
                      <span className="text-apple-dark text-right font-medium">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   ORDER CTA
   ═══════════════════════════════════════════════════════ */
function OrderSection() {
  const [selectedColor, setSelectedColor] = useState(0);

  return (
    <section
      id="order"
      className="relative bg-black section-padding px-6 overflow-hidden"
    >
      <div className="absolute inset-0 glow-red pointer-events-none opacity-60" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <AnimateIn>
          <h2 className="font-[family-name:var(--font-display)] font-bold text-[clamp(2rem,5vw,3.5rem)] text-white tracking-[-0.03em] leading-[1.05]">
            Get Yours Today.
          </h2>
        </AnimateIn>

        <AnimateIn delay={150}>
          <div className="mt-8">
            <div className="stat-number text-[clamp(2.5rem,6vw,4rem)] text-white">
              R15,000
            </div>
            <p className="text-apple-gray text-sm mt-2 font-[family-name:var(--font-body)]">
              12GB RAM · 256GB Storage · Delivered to your door
            </p>
          </div>
        </AnimateIn>

        {/* Product image */}
        <AnimateIn delay={200} className="mt-10">
          <img
            src={colorVariants[selectedColor].image}
            alt={`OnePlus 15 ${colorVariants[selectedColor].name}`}
            className="w-48 md:w-56 mx-auto drop-shadow-[0_20px_60px_rgba(227,25,55,0.12)] transition-opacity duration-500"
            loading="lazy"
          />
        </AnimateIn>

        {/* Color picker */}
        <AnimateIn delay={300} className="mt-8">
          <p className="text-apple-gray text-xs uppercase tracking-widest mb-3 font-[family-name:var(--font-body)]">
            Choose your colour
          </p>
          <div className="flex items-center justify-center gap-4">
            {colorVariants.map((variant, i) => (
              <button
                key={variant.name}
                onClick={() => setSelectedColor(i)}
                className={`w-8 h-8 rounded-full transition-all duration-300 ${
                  selectedColor === i
                    ? "swatch-ring-active scale-110"
                    : "swatch-ring hover:scale-105"
                }`}
                style={{ backgroundColor: variant.color }}
                aria-label={variant.name}
              />
            ))}
          </div>
          <p className="text-apple-gray text-sm mt-2 font-[family-name:var(--font-body)]">
            {colorVariants[selectedColor].name}
          </p>
        </AnimateIn>

        {/* CTA */}
        <AnimateIn delay={400} className="mt-10">
          <a
            href="https://wa.me/27000000000?text=Hi%2C%20I%27d%20like%20to%20order%20the%20OnePlus%2015"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-op-red text-white px-10 py-3.5 rounded-full font-semibold text-lg hover:bg-op-red-hover transition-all duration-300 hover:shadow-[0_0_30px_rgba(227,25,55,0.3)] font-[family-name:var(--font-body)]"
          >
            Order Now
          </a>
        </AnimateIn>

        {/* Trust signals */}
        <AnimateIn delay={500} className="mt-10">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-apple-gray text-xs md:text-sm font-[family-name:var(--font-body)]">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.747L15.47 4.397A2.25 2.25 0 0 0 13.643 3.5H9.75v10.75h10.5" />
              </svg>
              Free Delivery
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
              Customs Included
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

/* ═══════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/[0.06] px-6 py-12 md:py-16">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-[family-name:var(--font-display)] font-bold text-white text-xl tracking-tight">
              Device Too Nice
            </h3>
            <p className="text-apple-gray text-sm mt-2 font-[family-name:var(--font-body)] max-w-xs">
              Premium smartphones, delivered to your door across South Africa.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12 md:gap-16 text-sm font-[family-name:var(--font-body)]">
            <div>
              <h4 className="text-white font-medium mb-3">Shop</h4>
              <ul className="space-y-2 text-apple-gray">
                <li>
                  <a href="#hero" className="hover:text-white transition-colors">
                    OnePlus 15
                  </a>
                </li>
                <li>
                  <a href="#order" className="hover:text-white transition-colors">
                    Order Now
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3">Support</h4>
              <ul className="space-y-2 text-apple-gray">
                <li>
                  <a href="#order" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Shipping Info
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-apple-gray-text text-xs font-[family-name:var(--font-body)]">
            &copy; {new Date().getFullYear()} Device Too Nice. All rights reserved.
          </p>
          <p className="text-apple-gray-text text-xs font-[family-name:var(--font-body)] text-center sm:text-right">
            All prices in ZAR. Includes delivery &amp; customs duties. No hidden fees.
            <br className="sm:hidden" /> OnePlus is a registered trademark of
            OnePlus Technology.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <main>
      <StickyNav />
      <Hero />
      <DisplaySection />
      <PerformanceSection />
      <CameraSection />
      <BatterySection />
      <DesignSection />
      <SpecsSection />
      <OrderSection />
      <Footer />
    </main>
  );
}
