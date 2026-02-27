import Link from "next/link";

export function Footer({ isSoldOut }: { isSoldOut: boolean }) {
  return (
    <footer className="border-t border-white/[0.06] px-6 py-16 bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <p className="text-sm font-semibold text-white tracking-tight">
              Device Too Nice
            </p>
            <p className="text-sm text-white/40 mt-2">
              Premium devices, no compromises.
            </p>
          </div>

          <div>
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
              {isSoldOut ? (
                <span className="text-sm text-white/25">Sold Out</span>
              ) : (
                <Link
                  href="/checkout"
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  Checkout
                </Link>
              )}
            </nav>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/30 font-medium mb-3">
              Info
            </p>
            <nav className="flex flex-col gap-2">
              <Link
                href="/faq"
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                FAQ
              </Link>
              <Link
                href="/terms"
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                Terms &amp; Conditions
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/returns"
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                Returns &amp; Refunds
              </Link>
            </nav>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/30 font-medium mb-3">
              Contact
            </p>
            <nav className="flex flex-col gap-2">
              <a
                href="mailto:web500za@gmail.com"
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                web500za@gmail.com
              </a>
              <a
                href="https://wa.me/27832540891"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                WhatsApp
              </a>
            </nav>
          </div>
        </div>

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
