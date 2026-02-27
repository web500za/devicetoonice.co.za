export interface ProductVariant {
  ram: string;
  storage: string;
  price: number;
  colors: string[];
}

export interface ProductColor {
  key: string;
  name: string;
  hex: string;
  image: string;
}

export interface SpecCategory {
  title: string;
  specs: { label: string; value: string }[];
}

export interface Product {
  slug: string;
  name: string;
  brand: string;
  tagline: string;
  heroImage: string;
  startingPrice: number;
  specCategories: SpecCategory[];
  variants: ProductVariant[];
  colors: ProductColor[];
  ramOptions: string[];
  storageOptions: string[];
}

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  province: string;
  postalCode: string;
}

export interface CheckoutRequest {
  productSlug: string;
  ram: string;
  storage: string;
  color: string;
  amountInCents: number;
  customer: CheckoutFormData;
}

export interface CheckoutResponse {
  redirectUrl: string;
}

export interface StockData {
  remaining: number;
  total: number;
}
