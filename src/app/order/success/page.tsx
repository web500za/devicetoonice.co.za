"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();

  const product = searchParams.get("product");
  const ram = searchParams.get("ram");
  const storage = searchParams.get("storage");
  const color = searchParams.get("color");
  const price = searchParams.get("price");
  const name = searchParams.get("name");
  const city = searchParams.get("city");
  const province = searchParams.get("province");

  const hasOrderDetails = product && ram && storage && price;

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-black">
      <div className="max-w-lg mx-auto w-full">
        {/* Checkmark */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#e31937]/15 flex items-center justify-center">
            <svg className="w-8 h-8 text-[#e31937]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-white text-center">
          Payment Successful
        </h1>
        <p className="text-white/40 mt-3 text-center text-sm">
          Thank you{name ? `, ${name}` : ""}! Your order is confirmed.
        </p>

        {/* Order details */}
        {hasOrderDetails && (
          <div className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
            <h2 className="text-xs uppercase tracking-widest text-[#e31937] font-semibold mb-4">
              Order Summary
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-white/40">Product</span>
                <span className="text-white font-medium">{product}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Configuration</span>
                <span className="text-white font-medium">{ram} / {storage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Colour</span>
                <span className="text-white font-medium">{color}</span>
              </div>
              {(city || province) && (
                <div className="flex justify-between">
                  <span className="text-white/40">Delivering to</span>
                  <span className="text-white font-medium">{[city, province].filter(Boolean).join(", ")}</span>
                </div>
              )}
              <div className="h-px bg-white/[0.08] my-1" />
              <div className="flex justify-between">
                <span className="text-white font-semibold">Total</span>
                <span className="text-[#e31937] font-bold text-lg">
                  R{Number(price).toLocaleString("en-ZA")}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* What happens next */}
        <div className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
          <h2 className="text-xs uppercase tracking-widest text-white/60 font-semibold mb-4">
            What Happens Next
          </h2>
          <ol className="space-y-3">
            {[
              { step: "1", text: "You\u2019ll receive a confirmation email with your order details" },
              { step: "2", text: "We order your phone from our supplier" },
              { step: "3", text: "We\u2019ll keep you updated via email as it ships" },
              { step: "4", text: "Delivered to your door in 7\u201310 working days" },
            ].map((item) => (
              <li key={item.step} className="flex gap-3 text-sm">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/[0.08] text-white/50 text-xs font-medium flex items-center justify-center">
                  {item.step}
                </span>
                <span className="text-white/50 pt-0.5">{item.text}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Contact & CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full h-12 px-8 text-sm font-medium bg-[#e31937] text-white hover:bg-[#c91530] transition-colors"
          >
            Back to Home
          </Link>
          <p className="text-white/25 text-xs mt-6">
            Questions about your order?{" "}
            <a href="mailto:web500za@gmail.com" className="text-white/40 hover:text-white/60 underline">
              web500za@gmail.com
            </a>
            {" "}&middot;{" "}
            <a href="https://wa.me/27832540891" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white/60 underline">
              WhatsApp
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-white/60 animate-spin" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
