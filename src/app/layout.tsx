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
  title: "OnePlus 15 — Device Too Nice | South Africa",
  description:
    "Experience the OnePlus 15. Snapdragon 8 Elite, 7300mAh battery, triple 50MP cameras, 165Hz display. From R15,000. Free shipping across South Africa.",
  keywords: [
    "OnePlus 15",
    "buy OnePlus 15 South Africa",
    "OnePlus 15 price ZAR",
    "Device Too Nice",
    "flagship phone South Africa",
  ],
  openGraph: {
    title: "OnePlus 15 — Power On. Limits Off.",
    description:
      "The ultimate flagship smartphone. Now available in South Africa from R15,000.",
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
