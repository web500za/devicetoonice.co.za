"use client";

import { useRef } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useReducedMotion } from "framer-motion";

interface CountUpProps {
  end: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  separator?: string;
}

export function CountUp({
  end,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
  separator = ",",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const progress = useScrollProgress(ref);
  const prefersReduced = useReducedMotion();

  const eased = prefersReduced
    ? 1
    : progress < 0.3
      ? 0
      : Math.min(1, (progress - 0.3) / 0.4);

  const current = eased * end;
  const formatted = current.toFixed(decimals);
  const parts = formatted.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  const display = parts.join(".");

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
