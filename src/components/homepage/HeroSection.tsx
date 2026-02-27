"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLenis } from "@/components/providers/LenisProvider";

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const lenis = useLenis();

  useEffect(() => {
    if (prefersReduced) return;

    function update() {
      setScrollY(window.scrollY);
    }

    if (lenis) {
      lenis.on("scroll", update);
      return () => lenis.off("scroll", update);
    } else {
      window.addEventListener("scroll", update, { passive: true });
      return () => window.removeEventListener("scroll", update);
    }
  }, [lenis, prefersReduced]);

  const [vh, setVh] = useState(1000);
  useEffect(() => {
    setVh(window.innerHeight);
  }, []);
  const progress = Math.min(1, Math.max(0, scrollY / vh));
  const shouldAnimate = !prefersReduced;

  const contentOpacity = shouldAnimate ? Math.max(0, 1 - progress * 2.5) : 1;
  const contentY = shouldAnimate ? progress * 60 : 0;
  const imageY = shouldAnimate ? progress * -30 : 0;
  const imageScale = shouldAnimate ? 1 + progress * 0.05 : 1;

  function handleLearnMore() {
    if (lenis) {
      lenis.scrollTo(window.innerHeight, { duration: 1.2 });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-dvh overflow-hidden bg-black"
    >
      {/* Full-bleed hero — Infinite Black camera macro on pure black */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          transform: `translateY(${imageY}px) scale(${imageScale})`,
          willChange: shouldAnimate ? "transform" : undefined,
        }}
      >
        <Image
          src="/images/oneplus-15/hero/op15-closeup-black.jpg"
          alt="OnePlus 15 — Infinite Black"
          fill
          priority
          className="object-cover object-[50%_45%]"
          sizes="100vw"
        />
        {/* Subtle gradient to ensure text area is clean */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </motion.div>

      {/* Content — positioned in upper third */}
      <div
        className="relative z-10 flex h-full flex-col items-center justify-start pt-[14vh] sm:pt-[16vh] px-6"
        style={{
          transform: `translateY(${contentY}px)`,
          opacity: contentOpacity,
          willChange: shouldAnimate ? "transform, opacity" : undefined,
        }}
      >
        <div className="text-center">
          <motion.h1
            className="text-5xl font-bold tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            OnePlus 15
          </motion.h1>

          <motion.p
            className="mt-3 text-base text-white/50 sm:text-lg"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Power On. Limits Off.
          </motion.p>

          <motion.div
            className="mt-6 flex justify-center gap-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              asChild
              className="h-11 rounded-full bg-[var(--cta)] px-8 text-sm font-medium text-white hover:bg-[var(--cta)]/90"
            >
              <Link href="/checkout">Order Now</Link>
            </Button>

            <Button
              variant="ghost"
              onClick={handleLearnMore}
              className="h-11 rounded-full border border-white/20 px-8 text-sm text-white/70 hover:border-white/40 hover:bg-transparent hover:text-white"
            >
              Learn more
            </Button>
          </motion.div>

          <motion.p
            className="mt-4 text-xs text-white/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            From R15,000
          </motion.p>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        style={{ opacity: contentOpacity }}
      >
        <div className="flex animate-bounce flex-col items-center gap-1">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
            Scroll
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            className="text-white/30"
          >
            <path
              d="M8 2v10m0 0l4-4m-4 4L4 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
