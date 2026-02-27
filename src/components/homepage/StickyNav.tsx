"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function StickyNav() {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY;

      if (currentY <= 100) {
        // Always show when near top
        setHidden(false);
      } else if (currentY > lastScrollY) {
        // Scrolling down
        setHidden(true);
      } else {
        // Scrolling up
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

        <Button variant="ghost" size="sm" asChild>
          <Link href="/checkout" className="text-white">
            Buy
          </Link>
        </Button>
      </div>
    </motion.nav>
  );
}
