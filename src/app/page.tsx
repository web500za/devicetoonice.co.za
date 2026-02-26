import { product, formatPrice } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-transparent">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-sm font-semibold tracking-tight">
            Device Too Nice
          </span>
          <Button asChild variant="ghost" size="sm" className="text-sm">
            <Link href="/checkout">Buy</Link>
          </Button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-14">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
          Introducing
        </p>
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] text-center">
          OnePlus <span className="text-[var(--cta)]">1</span>5
        </h1>
        <p className="text-muted-foreground text-lg sm:text-xl mt-6 text-center max-w-md">
          The fastest Android ever made.<br />Now in South Africa.
        </p>
        <div className="mt-8 flex flex-col items-center">
          <Button asChild size="lg" className="rounded-full px-8 h-12 text-base bg-[var(--cta)] text-[var(--cta-foreground)] hover:bg-[var(--cta)]/90">
            <Link href="/checkout">
              Buy &mdash; From {formatPrice(product.startingPrice)}
            </Link>
          </Button>
          <p className="text-muted-foreground text-sm mt-3">
            Free shipping / no customs
          </p>
        </div>
        <div className="mt-16 mb-8">
          <img
            src={product.heroImage}
            alt={product.name}
            className="w-56 sm:w-64 md:w-72 lg:w-80 drop-shadow-2xl"
          />
        </div>
      </section>

      {/* ── Statement ── */}
      <section className="py-32 sm:py-40 px-6">
        <p className="max-w-3xl mx-auto text-2xl sm:text-3xl md:text-4xl font-medium leading-snug tracking-tight text-center">
          Snapdragon 8 Elite. A 7,300 mAh battery that lasts 3 days.
          Triple 50MP cameras. 120W charging.
          This is the phone that replaces everything.
        </p>
      </section>

      {/* ── Stats ── */}
      <section className="border-y border-border">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {[
            { value: "165Hz", sub: "AMOLED Display" },
            { value: "3nm", sub: "Snapdragon 8 Elite" },
            { value: "7,300", sub: "mAh Battery" },
            { value: "50MP", sub: "\u00d73 Camera System" },
          ].map((s, i) => (
            <div
              key={s.sub}
              className={`px-6 py-12 sm:py-16 text-center ${
                i < 3 ? "border-r border-border" : ""
              } ${i < 2 ? "border-b md:border-b-0 border-border" : i === 2 ? "border-b md:border-b-0 border-r-0 md:border-r border-border" : ""}`}
            >
              <p className="text-3xl sm:text-4xl font-bold tracking-tight">
                {s.value}
              </p>
              <p className="text-muted-foreground text-sm mt-2">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Feature Blocks ── */}
      <section className="py-32 sm:py-40 px-6 max-w-6xl mx-auto space-y-32 sm:space-y-40">
        {/* Display */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Display
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
              6.78&Prime; of pure clarity.
            </h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              1.5K resolution at 165Hz. 1,800 nits of peak brightness.
              10-bit LTPO AMOLED with 100% DCI-P3. Protected by Gorilla Glass Victus 2.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="https://www.giztop.com/media/catalog/product/cache/97cc1143d2e20f2b0c8ea91aaa12053c/o/n/oneplus_15_black_1.png"
              alt="OnePlus 15 Display"
              className="w-48 sm:w-56 drop-shadow-xl"
              loading="lazy"
            />
          </div>
        </div>

        {/* Performance */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="md:order-2">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Performance
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
              The fastest chip in any Android.
            </h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Snapdragon 8 Elite at 3nm. Oryon CPU at 4.6GHz. Up to 16GB LPDDR5X RAM.
              UFS 4.1 storage. Wi-Fi 7. Everything is instant.
            </p>
          </div>
          <div className="flex justify-center md:order-1">
            <div className="w-48 sm:w-56 aspect-square rounded-2xl bg-secondary flex items-center justify-center">
              <div className="text-center">
                <p className="text-5xl font-bold tracking-tighter">4.6</p>
                <p className="text-muted-foreground text-sm mt-1">GHz</p>
              </div>
            </div>
          </div>
        </div>

        {/* Battery */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Battery
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
              3 days on a single charge.
            </h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              7,300 mAh silicon-carbon battery. The largest ever in a flagship.
              120W wired charging — 0 to 50% in 15 minutes. 50W wireless.
              Charger included in the box.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-48 sm:w-56 aspect-square rounded-2xl bg-secondary flex items-center justify-center">
              <div className="text-center">
                <p className="text-5xl font-bold tracking-tighter">7,300</p>
                <p className="text-muted-foreground text-sm mt-1">mAh</p>
              </div>
            </div>
          </div>
        </div>

        {/* Camera */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="md:order-2">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Camera
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
              Triple 50MP. Every lens.
            </h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              50MP main with Sony IMX906 and OIS. 50MP periscope telephoto with 3.5&times; optical zoom.
              50MP ultra-wide at 116&deg;. 8K video. 4K120 Dolby Vision.
            </p>
          </div>
          <div className="flex justify-center md:order-1">
            <img
              src="https://www.giztop.com/media/catalog/product/cache/97cc1143d2e20f2b0c8ea91aaa12053c/o/n/oneplus_15_black_3.png"
              alt="OnePlus 15 Camera"
              className="w-48 sm:w-56 drop-shadow-xl"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ── Durability Bar ── */}
      <section className="border-y border-border bg-secondary">
        <div className="max-w-6xl mx-auto grid grid-cols-3 divide-x divide-border">
          {[
            { value: "IP69K", sub: "Water & Dust" },
            { value: "Nano-ceramic", sub: "Metal Frame" },
            { value: "8.2mm", sub: "215g" },
          ].map((s) => (
            <div key={s.sub} className="px-4 py-10 sm:py-14 text-center">
              <p className="text-lg sm:text-xl font-bold tracking-tight">
                {s.value}
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm mt-1">
                {s.sub}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Full Specs ── */}
      <section className="py-32 sm:py-40 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-16">
          Full Specifications
        </h2>
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-14">
          {product.specCategories.map((cat) => (
            <div key={cat.title}>
              <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground mb-5">
                {cat.title}
              </h3>
              {cat.specs.map((spec, i) => (
                <div key={spec.label}>
                  <div className="flex justify-between py-3">
                    <span className="text-muted-foreground text-sm">
                      {spec.label}
                    </span>
                    <span className="text-foreground text-sm font-medium text-right">
                      {spec.value}
                    </span>
                  </div>
                  {i < cat.specs.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-32 sm:py-40 px-6 text-center bg-secondary">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-tight">
          Ready?
        </h2>
        <p className="text-muted-foreground mt-4 text-lg">
          Free delivery. No customs. Charger included.
        </p>
        <Button asChild size="lg" className="mt-8 rounded-full px-8 h-12 text-base bg-[var(--cta)] text-[var(--cta-foreground)] hover:bg-[var(--cta)]/90">
          <Link href="/checkout">
            Buy &mdash; From {formatPrice(product.startingPrice)}
          </Link>
        </Button>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border px-6 py-10 text-center">
        <p className="text-muted-foreground text-xs">
          &copy; {new Date().getFullYear()} Device Too Nice. All prices in ZAR. Free delivery nationwide.
        </p>
      </footer>
    </div>
  );
}
