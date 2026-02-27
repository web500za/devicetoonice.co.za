"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-dvh flex items-center justify-center bg-black">
      <div className="text-center">
        <h1 className="text-lg font-semibold text-white">Something went wrong</h1>
        <p className="text-sm text-white/40 mt-2">
          We&apos;re sorry, an unexpected error occurred.
        </p>
        <button
          onClick={reset}
          className="mt-6 px-6 py-2.5 rounded-full bg-[#e31937] text-white text-sm font-medium hover:bg-[#c91530] transition-colors"
        >
          Try Again
        </button>
        <div className="mt-3">
          <a href="/" className="text-sm text-white/40 hover:text-white">
            Back to Home
          </a>
        </div>
        <p className="text-xs text-white/25 mt-8">
          Need help? web500za@gmail.com
        </p>
      </div>
    </div>
  );
}
