import type { Product } from "../types";

export const oneplus15: Product = {
  slug: "oneplus15",
  name: "OnePlus 15",
  brand: "OnePlus",
  tagline: "Power On. Limits Off.",
  heroImage:
    "https://www.giztop.com/media/catalog/product/cache/7273d816367fe28095c8d1187b15b971/o/n/oneplus_15.png",
  startingPrice: 15000,

  specCategories: [
    {
      title: "Display",
      specs: [
        { label: "Size", value: '6.78" LTPO AMOLED' },
        { label: "Resolution", value: "2772 \u00d7 1272 (450 PPI)" },
        { label: "Refresh Rate", value: "1\u2013120Hz / 165Hz gaming" },
        { label: "Brightness", value: "1,800 nits peak" },
        { label: "Color", value: "10-bit, 100% DCI-P3" },
      ],
    },
    {
      title: "Performance",
      specs: [
        { label: "Chipset", value: "Snapdragon 8 Elite (3nm)" },
        { label: "CPU", value: "Oryon \u00b7 2\u00d74.6GHz + 6\u00d73.6GHz" },
        { label: "RAM", value: "12 / 16 GB LPDDR5X" },
        { label: "Storage", value: "256 / 512GB / 1TB UFS 4.1" },
        { label: "OS", value: "Android 16 \u00b7 OxygenOS 16" },
      ],
    },
    {
      title: "Camera",
      specs: [
        { label: "Main", value: "50MP Sony IMX906 \u00b7 f/1.8 OIS" },
        { label: "Telephoto", value: "50MP \u00b7 3.5\u00d7 periscope \u00b7 OIS" },
        { label: "Ultra-Wide", value: "50MP \u00b7 116\u00b0 \u00b7 f/2.0 AF" },
        { label: "Front", value: "32MP Sony IMX709 \u00b7 AF" },
        { label: "Video", value: "8K30 / 4K120 Dolby Vision" },
      ],
    },
    {
      title: "Battery",
      specs: [
        { label: "Capacity", value: "7,300 mAh silicon-carbon" },
        { label: "Wired", value: "120W SUPERVOOC" },
        { label: "Wireless", value: "50W AIRVOOC" },
        { label: "Playback", value: "Up to 31 hours video" },
        { label: "In Box", value: "Charger included" },
      ],
    },
    {
      title: "Connectivity",
      specs: [
        { label: "5G", value: "Dual 5G, sub-6GHz" },
        { label: "Wi-Fi", value: "Wi-Fi 7 (802.11be)" },
        { label: "Bluetooth", value: "6.0 \u00b7 aptX HD \u00b7 LHDC 5" },
        { label: "USB", value: "Type-C 3.2 Gen 1" },
        { label: "NFC", value: "Yes \u00b7 eSIM supported" },
      ],
    },
    {
      title: "Durability",
      specs: [
        { label: "Rating", value: "IP66 / IP68 / IP69K" },
        { label: "Front Glass", value: "Gorilla Glass Victus 2" },
        { label: "Frame", value: "Nano-ceramic metal" },
        { label: "Biometrics", value: "Ultrasonic fingerprint" },
        { label: "Extras", value: "IR blaster \u00b7 Plus Key" },
      ],
    },
  ],

  ramOptions: ["12GB", "16GB"],
  storageOptions: ["256GB", "512GB", "1TB"],
  variants: [
    { ram: "12GB", storage: "256GB", price: 15000, colors: ["black", "sandstorm"] },
    { ram: "12GB", storage: "512GB", price: 17000, colors: ["black", "sandstorm"] },
    { ram: "16GB", storage: "256GB", price: 16000, colors: ["black", "sandstorm"] },
    { ram: "16GB", storage: "512GB", price: 18000, colors: ["black", "violet", "sandstorm"] },
    { ram: "16GB", storage: "1TB", price: 19000, colors: ["black", "violet", "sandstorm"] },
  ],
  colors: [
    {
      key: "sandstorm",
      name: "Sand Storm",
      hex: "#C8B89A",
      image:
        "https://www.giztop.com/media/catalog/product/cache/97cc1143d2e20f2b0c8ea91aaa12053c/o/n/oneplus_15_2.png",
    },
    {
      key: "black",
      name: "Infinite Black",
      hex: "#1a1a1a",
      image:
        "https://www.giztop.com/media/catalog/product/cache/97cc1143d2e20f2b0c8ea91aaa12053c/o/n/oneplus_15_black_2.png",
    },
    {
      key: "violet",
      name: "Ultra Violet",
      hex: "#7B4EAB",
      image:
        "https://www.giztop.com/media/catalog/product/cache/97cc1143d2e20f2b0c8ea91aaa12053c/o/n/oneplus_15_purple_2.png",
    },
  ],
};
