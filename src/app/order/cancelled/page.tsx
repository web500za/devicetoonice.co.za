"use client";

import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function CancelledContent() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Payment Cancelled
        </h1>
        <p className="text-muted-foreground mt-4 leading-relaxed">
          No charges have been made. Your configuration is still available.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Button asChild size="lg" className="rounded-full px-8 h-12">
            <Link href="/checkout">Try Again</Link>
          </Button>
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground transition-colors text-sm"
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
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">Loading...</p>
        </div>
      }
    >
      <CancelledContent />
    </Suspense>
  );
}
