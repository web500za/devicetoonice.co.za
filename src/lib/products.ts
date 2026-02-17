import type { Product, ProductSlug, ProductVariant, ProductColor } from "./types";
import { oneplus15 } from "./products/oneplus15";
import { oppoFindX9Pro } from "./products/oppo-find-x9-pro";

export const products: Product[] = [
  oneplus15,
  oppoFindX9Pro,
];

export const productMap: Record<ProductSlug, Product> = {
  oneplus15,
  "oppo-find-x9-pro": oppoFindX9Pro,
};

export function getProduct(slug: string): Product | undefined {
  return productMap[slug as ProductSlug];
}

export function findVariant(
  product: Product,
  ram: string,
  storage: string
): ProductVariant | undefined {
  return product.variants.find((v) => v.ram === ram && v.storage === storage);
}

export function findColor(product: Product, key: string): ProductColor | undefined {
  return product.colors.find((c) => c.key === key);
}

export function formatPrice(price: number): string {
  return `R${price.toLocaleString("en-ZA")}`;
}
