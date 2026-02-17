import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Device Too Nice — Premium Smartphones | South Africa",
  description:
    "Premium smartphones delivered to your door. OnePlus 15, OPPO Find X9 Pro. No customs fees. Free delivery across South Africa.",
  keywords: [
    "buy smartphones South Africa",
    "OnePlus 15",
    "OPPO Find X9 Pro",
    "Device Too Nice",
    "flagship phone South Africa",
  ],
  openGraph: {
    title: "Device Too Nice — Premium Smartphones Delivered",
    description:
      "Premium smartphones imported directly. No customs. Free delivery across South Africa.",
    siteName: "Device Too Nice",
    type: "website",
    locale: "en_ZA",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
