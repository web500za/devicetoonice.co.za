"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Button } from "@/components/ui/button";

export function CTABand() {
  return (
    <section className="py-32 sm:py-40 px-6 text-center bg-black">
      <div className="max-w-2xl mx-auto">
        <ScrollReveal>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white">
            OnePlus 15
          </h2>
          <p className="text-xl sm:text-2xl text-white/60 mt-4">
            From R15,000
          </p>
          <p className="text-sm text-white/40 mt-4">
            Free delivery · No customs · 3 day battery
          </p>
          <div className="mt-8">
            <Button
              asChild
              className="bg-[var(--cta)] hover:bg-[var(--cta)]/90 text-white rounded-full px-10 h-14 text-base font-medium"
            >
              <Link href="/checkout">Order Now</Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
