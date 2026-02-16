import type { Product, ProductSlug, ProductVariant, ProductColor } from "./types";
import { oneplus15 } from "./products/oneplus15";
import { xiaomi17Pro } from "./products/xiaomi-17-pro";
import { oppoFindX9Pro } from "./products/oppo-find-x9-pro";
import { redmiK90ProMax } from "./products/redmi-k90-pro-max";
import { vivoX200Ultra } from "./products/vivo-x200-ultra";

export const products: Product[] = [
  oneplus15,
  xiaomi17Pro,
  oppoFindX9Pro,
  redmiK90ProMax,
  vivoX200Ultra,
];

export const productMap: Record<ProductSlug, Product> = {
  oneplus15,
  "xiaomi-17-pro": xiaomi17Pro,
  "oppo-find-x9-pro": oppoFindX9Pro,
  "redmi-k90-pro-max": redmiK90ProMax,
  "vivo-x200-ultra": vivoX200Ultra,
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
