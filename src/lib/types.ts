export type ProductSlug =
  | "oneplus15"
  | "oppo-find-x9-pro";

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

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
  separator?: string;
}

export interface CameraDetail {
  name: string;
  sensor: string;
  detail: string;
}

export interface SpecCategory {
  title: string;
  specs: { label: string; value: string }[];
}

export interface Product {
  slug: ProductSlug;
  name: string;
  brand: string;
  tagline: string;
  accentColor: string;
  accentHover: string;

  // Hero
  heroImage: string;
  heroSubtitle: string;
  startingPrice: number;

  // Display section
  displayHeadline: string;
  displaySubheadline: string;
  displayStats: Stat[];
  displayImage: string;
  displayFootnote: string;

  // Performance section
  chipLabel: string;
  performanceHeadline: string;
  performanceSubheadline: string;
  performanceStats: Stat[];
  performanceTags: string[];

  // Camera section
  cameraHeadline: string;
  cameraSubheadline: string;
  cameraStats: Stat[];
  cameraImage: string;
  cameraDetails: CameraDetail[];

  // Battery section
  batteryHeadline: string;
  batteryCapacity: number;
  batteryCapacityNote: string;
  batteryStats: Stat[];
  batteryHighlight: string;
  batteryFootnote: string;

  // Design section
  designHeadline: string;
  designSubheadline: string;
  designStats: { value: string; label: string }[];
  designFootnote: string;

  // Specs
  specCategories: SpecCategory[];

  // Variants & Colors
  variants: ProductVariant[];
  colors: ProductColor[];

  // RAM/storage option labels
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
  productSlug: ProductSlug;
  ram: string;
  storage: string;
  color: string;
  amountInCents: number;
  customer: CheckoutFormData;
}

export interface CheckoutResponse {
  redirectUrl: string;
}
