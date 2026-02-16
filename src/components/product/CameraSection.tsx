"use client";

import AnimateIn from "@/components/AnimateIn";
import CountUp from "@/components/CountUp";
import type { Product } from "@/lib/types";

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

export default function CameraSection({ product }: { product: Product }) {
  const { r, g, b } = hexToRgb(product.accentColor);

  return (
    <section className="relative bg-black section-padding px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <AnimateIn>
            <h2 className="font-[family-name:var(--font-display)] font-bold text-[clamp(2rem,5vw,3.5rem)] text-white tracking-[-0.03em] leading-[1.05]">
              {product.cameraHeadline.split("\n").map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </h2>
          </AnimateIn>

          <AnimateIn delay={150}>
            <p className="text-apple-gray text-base md:text-lg mt-5 font-[family-name:var(--font-body)]">
              {product.cameraSubheadline}
            </p>
          </AnimateIn>
        </div>

        <AnimateIn delay={250}>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-14 md:mt-20">
            {product.cameraStats.map((stat, i) => (
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

        <div className="mt-16 md:mt-24 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <AnimateIn direction="left" className="order-2 md:order-1">
            <img
              src={product.cameraImage}
              alt={`${product.name} camera system`}
              className="w-full max-w-sm mx-auto"
              style={{ filter: `drop-shadow(0 0 60px rgba(${r}, ${g}, ${b}, 0.06))` }}
              loading="lazy"
            />
          </AnimateIn>

          <div className="order-1 md:order-2 space-y-8">
            {product.cameraDetails.map((cam, i) => (
              <AnimateIn key={cam.name} delay={200 + i * 150}>
                <div
                  className="pl-5"
                  style={{ borderLeft: `2px solid rgba(${r}, ${g}, ${b}, 0.4)` }}
                >
                  <h3 className="font-[family-name:var(--font-display)] font-semibold text-white text-lg md:text-xl tracking-tight">
                    {cam.name}
                  </h3>
                  <p
                    className="text-sm mt-0.5 font-[family-name:var(--font-body)] font-medium"
                    style={{ color: product.accentColor }}
                  >
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
