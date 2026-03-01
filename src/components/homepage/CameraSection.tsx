"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const cameras = [
  {
    title: "Main Camera",
    sensor: "Sony IMX906",
    specs: ["50MP · f/1.8", "OIS · 24mm", "Hasselblad color"],
    delay: 0.1,
  },
  {
    title: "Telephoto",
    sensor: "Periscope",
    specs: ["50MP · f/2.8", "3.5× optical zoom", "120× digital zoom"],
    delay: 0.2,
  },
  {
    title: "Ultra-Wide",
    sensor: "116° FoV",
    specs: ["50MP · f/2.0", "Autofocus", "Macro mode"],
    delay: 0.3,
  },
];

const samplePhotos = [
  {
    src: "/images/oneplus-15/cdn/camera/photo-0-d7111-8c4bba.jpg.webp",
    alt: "Macro detail — shot on OnePlus 15",
  },
  {
    src: "/images/oneplus-15/cdn/camera/photo-1-d7111-fbf1af.jpg.webp",
    alt: "Portrait — shot on OnePlus 15",
  },
];

export function CameraSection() {
  return (
    <section className="relative overflow-hidden bg-[#050505]">
      {/* Cinematic background — exploded lens stack */}
      <div className="absolute inset-0">
        <Image
          src="/images/oneplus-15/cdn/backgrounds/section-bg-5.jpg"
          alt=""
          fill
          className="object-cover object-center opacity-25"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/70 to-[#050505]" />
      </div>

      <div className="relative py-16 sm:py-32 md:py-40 px-6 max-w-5xl mx-auto">
        <ScrollReveal className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Every Shot. A Masterpiece.
          </h2>
          <p className="text-base sm:text-lg text-white/50 mt-4">
            Triple 50MP camera system.
          </p>
        </ScrollReveal>

        {/* Sample photos — full-width cinematic strip */}
        <ScrollReveal delay={0.15}>
          <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4">
            {samplePhotos.map((photo) => (
              <div
                key={photo.src}
                className="relative aspect-[4/3] rounded-xl overflow-hidden"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 560px"
                />
              </div>
            ))}
          </div>
          <p className="text-[10px] text-white/20 text-center mt-3">
            Shot on OnePlus 15. Unedited.
          </p>
        </ScrollReveal>

        {/* Mobile camera summary */}
        <p className="md:hidden text-sm text-white/40 mt-6 text-center">
          50MP Main · 50MP Telephoto · 50MP Ultra-Wide
        </p>

        {/* Camera spec cards — hidden on mobile, 3-col grid on desktop */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 mt-14">
          {cameras.map((camera) => (
            <ScrollReveal key={camera.title} delay={camera.delay}>
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-sm before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-[var(--cta)]">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--cta)] font-medium">
                  {camera.title}
                </p>
                <p className="text-xl sm:text-2xl font-bold text-white mt-3">
                  {camera.sensor}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-white/50">
                  {camera.specs.map((spec) => (
                    <li key={spec}>{spec}</li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.5} className="mt-10 text-center">
          <p className="text-xs sm:text-sm text-white/30">
            8K30 · 4K120 Dolby Vision · HDR10+
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
