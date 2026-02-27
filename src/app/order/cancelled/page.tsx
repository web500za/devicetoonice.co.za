"use client";

import { Suspense } from "react";
import Link from "next/link";

function CancelledContent() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-black">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Payment Cancelled
        </h1>
        <p className="text-white/40 mt-4 leading-relaxed text-sm">
          No charges have been made. Your configuration is still available.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Link
            href="/checkout"
            className="inline-flex items-center justify-center rounded-full h-12 px-8 text-sm font-medium bg-[#e31937] text-white hover:bg-[#c91530] transition-colors"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="text-white/40 hover:text-white transition-colors text-sm"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderCancelledPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-white/60 animate-spin" />
        </div>
      }
    >
      <CancelledContent />
    </Suspense>
  );
}
