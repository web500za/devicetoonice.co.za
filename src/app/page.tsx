import { getProduct, formatPrice } from "@/lib/products";
import type { Metadata } from "next";
import ProductPage from "./[slug]/ProductPage";

const product = getProduct("oneplus15")!;

export const metadata: Metadata = {
  title: `${product.name} — Device Too Nice | South Africa`,
  description: `Experience the ${product.name}. ${product.chipLabel}, ${product.batteryCapacity}mAh battery, ${product.cameraSubheadline}. From ${formatPrice(product.startingPrice)}. Free shipping across South Africa.`,
  openGraph: {
    title: `${product.name} — ${product.tagline}`,
    description: `The ultimate ${product.brand} flagship. Now available in South Africa from ${formatPrice(product.startingPrice)}.`,
    siteName: "Device Too Nice",
    type: "website",
    locale: "en_ZA",
  },
};

export default function Home() {
  return <ProductPage product={product} />;
}
