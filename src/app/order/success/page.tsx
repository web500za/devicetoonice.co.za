"use client";

import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function SuccessContent() {
  return (
    <div className="light-theme min-h-screen flex items-center justify-center px-6 bg-white">
      <div className="max-w-md mx-auto text-center">
        <div className="w-16 h-16 rounded-full bg-foreground text-background flex items-center justify-center mx-auto mb-8">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          Payment Successful
        </h1>
        <p className="text-muted-foreground mt-4 leading-relaxed">
          Thank you for your order. You&apos;ll receive a confirmation email
          shortly with your order details.
        </p>
        <p className="text-muted-foreground text-sm mt-3">
          7&ndash;10 day delivery nationwide.
        </p>
        <Button asChild size="lg" className="mt-8 rounded-full px-8 h-12">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">Loading...</p>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
