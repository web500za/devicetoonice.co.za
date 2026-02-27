import type { Metadata } from "next";
import LenisProvider from "@/components/providers/LenisProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Device Too Nice — OnePlus 15 | South Africa",
  description:
    "OnePlus 15. Snapdragon 8 Elite. 7,300 mAh. From R15,000. Free delivery across South Africa.",
  keywords: [
    "OnePlus 15",
    "buy OnePlus South Africa",
    "Device Too Nice",
    "flagship phone South Africa",
  ],
  openGraph: {
    title: "Device Too Nice — OnePlus 15",
    description:
      "OnePlus 15. From R15,000. Free delivery across South Africa.",
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
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
