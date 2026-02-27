interface StockIndicatorProps {
  remaining: number;
  total: number;
  className?: string;
}

export function StockIndicator({
  remaining,
  total,
  className = "",
}: StockIndicatorProps) {
  if (remaining <= 0) {
    return (
      <span className={`text-xs font-medium text-[var(--cta)] ${className}`}>
        Sold out
      </span>
    );
  }

  if (remaining <= 2) {
    return (
      <span className={`text-xs font-medium text-amber-400 ${className}`}>
        Only {remaining} left this month
      </span>
    );
  }

  return (
    <span className={`text-xs text-white/50 ${className}`}>
      {remaining} of {total} available
    </span>
  );
}
