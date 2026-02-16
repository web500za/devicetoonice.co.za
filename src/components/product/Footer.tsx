"use client";

import { products } from "@/lib/products";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/[0.06] px-6 py-12 md:py-16">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <a
              href="/"
              className="font-[family-name:var(--font-display)] font-bold text-white text-xl tracking-tight hover:opacity-80 transition-opacity"
            >
              Device Too Nice
            </a>
            <p className="text-apple-gray text-sm mt-2 font-[family-name:var(--font-body)] max-w-xs">
              Premium smartphones, delivered to your door across South Africa.
            </p>
          </div>

          <div className="flex gap-12 md:gap-16 text-sm font-[family-name:var(--font-body)]">
            <div>
              <h4 className="text-white font-medium mb-3">Shop</h4>
              <ul className="space-y-2 text-apple-gray">
                {products.map((p) => (
                  <li key={p.slug}>
                    <a href={`/${p.slug}`} className="hover:text-white transition-colors">
                      {p.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3">Support</h4>
              <ul className="space-y-2 text-apple-gray">
                <li>
                  <a href="/#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="/#" className="hover:text-white transition-colors">
                    Shipping Info
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-apple-gray-text text-xs font-[family-name:var(--font-body)]">
            &copy; {new Date().getFullYear()} Device Too Nice. All rights reserved.
          </p>
          <p className="text-apple-gray-text text-xs font-[family-name:var(--font-body)] text-center sm:text-right">
            All prices in ZAR. Free delivery nationwide. No customs fees. 7–10 day delivery.
          </p>
        </div>
      </div>
    </footer>
  );
}
