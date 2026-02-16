import { notFound } from "next/navigation";
import { products, getProduct, formatPrice } from "@/lib/products";
import type { Metadata } from "next";
import ProductPage from "./ProductPage";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  return {
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
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return <ProductPage product={product} />;
}
