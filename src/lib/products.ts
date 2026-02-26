import type { Product, ProductVariant, ProductColor } from "./types";
import { oneplus15 } from "./products/oneplus15";

export const product = oneplus15;

export function getProduct(slug: string): Product | undefined {
  if (slug === "oneplus15") return oneplus15;
  return undefined;
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
