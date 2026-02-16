import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Device Too Nice — Premium Smartphones | South Africa",
  description:
    "Premium smartphones delivered to your door. OnePlus, Xiaomi, OPPO, Redmi, Vivo. No customs fees. Free delivery across South Africa.",
  keywords: [
    "buy smartphones South Africa",
    "OnePlus 15",
    "Xiaomi 17 Pro",
    "OPPO Find X9 Pro",
    "Redmi K90 Pro Max",
    "Vivo X200 Ultra",
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
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
