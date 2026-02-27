import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-6 py-16 bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left column */}
          <div>
            <p className="text-sm font-semibold text-white tracking-tight">
              Device Too Nice
            </p>
            <p className="text-sm text-white/40 mt-2">
              Premium devices, no compromises.
            </p>
          </div>

          {/* Right column */}
          <div className="md:text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-white/30 font-medium mb-3">
              Shop
            </p>
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                OnePlus 15
              </Link>
              <Link
                href="/checkout"
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                Checkout
              </Link>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/[0.06]">
          <p className="text-xs text-white/25 text-center">
            &copy; 2026 Device Too Nice. Free delivery &amp; customs included.
            No hidden fees.
          </p>
        </div>
      </div>
    </footer>
  );
}
