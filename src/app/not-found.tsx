import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-black">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white/10">404</h1>
        <h2 className="text-lg font-semibold text-white mt-4">Page not found</h2>
        <p className="text-sm text-white/40 mt-2">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="inline-block text-sm text-[#e31937] hover:underline mt-6">
          Back to Home
        </Link>
        <p className="text-xs text-white/25 mt-8">
          Need help? Contact us at web500za@gmail.com
        </p>
      </div>
    </div>
  );
}
