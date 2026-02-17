import { products } from "@/lib/products";
import DeviceCard from "@/components/home/DeviceCard";
import Footer from "@/components/product/Footer";

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-black min-h-[70vh] flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 800px 500px at 50% 60%, rgba(255,255,255,0.03) 0%, transparent 70%)",
        }} />

        <div className="text-center relative z-10">
          <p className="text-apple-gray text-xs md:text-sm uppercase tracking-[0.35em] mb-5 font-[family-name:var(--font-body)]">
            Device Too Nice
          </p>
          <h1 className="font-[family-name:var(--font-display)] font-extrabold text-[clamp(1.85rem,7vw,5rem)] text-white tracking-[-0.04em] leading-[0.95]">
            Premium Smartphones.
            <br />
            <span className="text-apple-gray">Delivered to Your Door.</span>
          </h1>
          <p className="text-apple-gray text-base md:text-lg mt-5 max-w-lg mx-auto leading-relaxed font-[family-name:var(--font-body)]">
            Imported directly. No customs. Free delivery across South Africa.
          </p>
        </div>
      </section>

      {/* Device Grid */}
      <section className="bg-black px-6 pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.map((product) => (
              <DeviceCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-black border-t border-white/[0.06] px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-8 md:gap-14 text-apple-gray text-xs md:text-sm font-[family-name:var(--font-body)]">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.747L15.47 4.397A2.25 2.25 0 0 0 13.643 3.5H9.75v10.75h10.5" />
              </svg>
              Free Delivery Nationwide
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
              No Customs Fees
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              7–10 Day Delivery
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
              </svg>
              Warranty Included
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
