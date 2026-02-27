"use client";

import { useEffect, useState, type RefObject } from "react";
import { useLenis } from "@/components/providers/LenisProvider";

export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);
  const lenis = useLenis();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function update() {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const start = rect.top + window.scrollY - windowHeight;
      const end = rect.top + window.scrollY + rect.height;
      const scrollY = window.scrollY;
      const raw = (scrollY - start) / (end - start);
      setProgress(Math.max(0, Math.min(1, raw)));
    }

    if (lenis) {
      lenis.on("scroll", update);
      update();
      return () => {
        lenis.off("scroll", update);
      };
    } else {
      window.addEventListener("scroll", update, { passive: true });
      update();
      return () => {
        window.removeEventListener("scroll", update);
      };
    }
  }, [ref, lenis]);

  return progress;
}
