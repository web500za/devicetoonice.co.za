"use client";

import { useEffect, useState } from "react";

export default function StickyNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="nav-blur bg-black/80 border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-5 h-12 flex items-center justify-between">
          <a
            href="#hero"
            className="font-[family-name:var(--font-display)] font-bold text-white text-[15px] tracking-tight hover:opacity-80 transition-opacity"
          >
            Device Too Nice
          </a>

          <div className="flex items-center gap-5">
            <span className="text-[13px] text-apple-gray hidden sm:block tracking-wide">
              OnePlus 15
            </span>
            <a
              href="#order"
              className="bg-op-red text-white text-[13px] font-semibold px-4 py-1.5 rounded-full hover:bg-op-red-hover transition-colors"
            >
              Order Now
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
