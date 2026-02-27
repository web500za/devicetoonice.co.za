"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function StickyNav({ isSoldOut }: { isSoldOut: boolean }) {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY;

      if (currentY <= 100) {
        setHidden(false);
      } else if (currentY > lastScrollY) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScrollY(currentY);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 h-12 bg-black/70 backdrop-blur-xl border-b border-white/[0.06]"
      animate={prefersReduced ? undefined : { y: hidden ? -48 : 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-white"
        >
          Device Too Nice
        </Link>

        {isSoldOut ? (
          <Button
            size="sm"
            disabled
            className="bg-white/10 text-white/40 rounded-full px-5 cursor-not-allowed"
          >
            Sold Out
          </Button>
        ) : (
          <Button size="sm" asChild className="bg-[var(--cta)] hover:bg-[var(--cta)]/90 text-white rounded-full px-5">
            <Link href="/checkout">
              Buy
            </Link>
          </Button>
        )}
      </div>
    </motion.nav>
  );
}
