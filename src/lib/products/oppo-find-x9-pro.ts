import type { Product } from "../types";

export const oppoFindX9Pro: Product = {
  slug: "oppo-find-x9-pro",
  name: "OPPO Find X9 Pro",
  brand: "OPPO",
  tagline: "See Further. Shoot Better.",
  accentColor: "#1BA784",
  accentHover: "#178e70",

  heroImage:
    "https://www.giztop.com/media/catalog/product/cache/97cc1143d2e20f2b0c8ea91aaa12053c/f/i/findx9pro-01.jpg",
  heroSubtitle: "See Further. Shoot Better.",
  startingPrice: 19500,

  // Display
  displayHeadline: "Immerse Yourself.\nIn Every Pixel.",
  displaySubheadline:
    "6.78\u2033 2K LTPO AMOLED with 120Hz ProMotion-class smoothness.\nDolby Vision. 4,500 nits peak brightness. Simply stunning.",
  displayStats: [
    { value: 6.78, decimals: 2, suffix: "\u2033", label: "Display" },
    { value: 120, suffix: "Hz", label: "Refresh Rate" },
    { value: 4500, separator: ",", suffix: " nits", label: "Peak Brightness" },
  ],
  displayImage:
    "https://www.giztop.com/media/catalog/product/cache/97cc1143d2e20f2b0c8ea91aaa12053c/o/p/oppo_find_x9_pro-_1.jpg",
  displayFootnote: "100% DCI-P3 \u00b7 Dolby Vision \u00b7 HDR10+ \u00b7 LTPO 2K+",

  // Performance
  chipLabel: "Dimensity 9500",
  performanceHeadline: "MediaTek\u2019s Finest.\nYour Advantage.",
  performanceSubheadline:
    "The Dimensity 9500 \u2014 3nm, all-big-core architecture.\nSilk-smooth performance with class-leading efficiency.",
  performanceStats: [
    { value: 3, suffix: "nm", label: "Process" },
    { value: 4.5, decimals: 1, suffix: "GHz", label: "Clock Speed" },
    { value: 16, suffix: "GB", label: "LPDDR5X" },
  ],
  performanceTags: ["Dimensity 9500", "Immortalis-G925 GPU", "UFS 4.0 Storage", "Wi-Fi 7"],

  // Camera
  cameraHeadline: "200 Million\nReasons to Zoom.",
  cameraSubheadline: "Hasselblad-tuned triple camera. 200MP periscope telephoto that defies distance.",
  cameraStats: [
    { value: 50, suffix: "MP", label: "Main Sensor" },
    { value: 200, suffix: "MP", label: "Periscope" },
    { value: 6, suffix: "\u00d7", label: "Optical Zoom" },
    { value: 4, suffix: "K", label: "Dolby Vision" },
  ],
  cameraImage:
    "https://www.giztop.com/media/catalog/product/cache/97cc1143d2e20f2b0c8ea91aaa12053c/o/p/oppo_find_x9_pro-_3.jpg",
  cameraDetails: [
    { name: "Main Camera", sensor: "Sony LYT-808", detail: "50MP \u00b7 f/1.6 \u00b7 OIS \u00b7 23mm" },
    { name: "Periscope Telephoto", sensor: "200MP Samsung HP9", detail: "200MP \u00b7 f/2.7 \u00b7 6\u00d7 optical \u00b7 OIS" },
    { name: "Ultra-Wide", sensor: "120\u00b0 FOV", detail: "50MP \u00b7 f/2.0 \u00b7 Autofocus" },
  ],

  // Battery
  batteryHeadline: "Power That Lasts.",
  batteryCapacity: 6000,
  batteryCapacityNote: "6,000 mAh with intelligent power management.",
  batteryStats: [
    { value: 80, suffix: "W", label: "Wired Charging" },
    { value: 50, suffix: "W", label: "Wireless" },
    { value: 22, suffix: "hrs", label: "Video Playback" },
  ],
  batteryHighlight: "0 to 50% in 18 minutes.",
  batteryFootnote: "Charger included in the box.",

  // Design
  designHeadline: "Refined.\nRelentless.",
  designSubheadline:
    "Hasselblad-branded camera island. Ceramic-feel back.\nA phone that looks as premium as it shoots.",
  designStats: [
    { value: "IP69", label: "Water & Dust" },
    { value: "7.9mm", label: "Thickness" },
    { value: "208g", label: "Weight" },
  ],
  designFootnote: "7.9mm thin \u00b7 208g \u00b7 Gorilla Glass Victus 2",

  // Specs
  specCategories: [
    {
      title: "Display",
      specs: [
        { label: "Size", value: '6.78" LTPO AMOLED' },
        { label: "Resolution", value: "3168 \u00d7 1440 (2K+)" },
        { label: "Refresh Rate", value: "1\u2013120Hz LTPO" },
        { label: "Brightness", value: "4,500 nits peak" },
        { label: "Color", value: "10-bit, 100% DCI-P3" },
      ],
    },
    {
      title: "Performance",
      specs: [
        { label: "Chipset", value: "Dimensity 9500 (3nm)" },
        { label: "CPU", value: "1\u00d74.5GHz + 3\u00d73.5GHz + 4\u00d72.5GHz" },
        { label: "RAM", value: "12 / 16 GB LPDDR5X" },
        { label: "Storage", value: "256 / 512GB / 1TB UFS 4.0" },
        { label: "OS", value: "Android 16 \u00b7 ColorOS 16" },
      ],
    },
    {
      title: "Camera",
      specs: [
        { label: "Main", value: "50MP Sony LYT-808 \u00b7 f/1.6 OIS" },
        { label: "Telephoto", value: "200MP \u00b7 6\u00d7 periscope \u00b7 OIS" },
        { label: "Ultra-Wide", value: "50MP \u00b7 120\u00b0 \u00b7 f/2.0 AF" },
        { label: "Front", value: "32MP \u00b7 AF" },
        { label: "Video", value: "4K60 Dolby Vision \u00b7 Log" },
      ],
    },
    {
      title: "Battery",
      specs: [
        { label: "Capacity", value: "6,000 mAh silicon-carbon" },
        { label: "Wired", value: "80W SUPERVOOC" },
        { label: "Wireless", value: "50W AIRVOOC" },
        { label: "Playback", value: "Up to 22 hours video" },
        { label: "In Box", value: "Charger included" },
      ],
    },
    {
      title: "Connectivity",
      specs: [
        { label: "5G", value: "Dual 5G, sub-6GHz" },
        { label: "Wi-Fi", value: "Wi-Fi 7 (802.11be)" },
        { label: "Bluetooth", value: "5.4 \u00b7 aptX HD \u00b7 LDAC" },
        { label: "USB", value: "Type-C 3.2" },
        { label: "NFC", value: "Yes" },
      ],
    },
    {
      title: "Durability",
      specs: [
        { label: "Rating", value: "IP68 / IP69" },
        { label: "Front Glass", value: "Gorilla Glass Victus 2" },
        { label: "Frame", value: "Aluminium alloy" },
        { label: "Biometrics", value: "Ultrasonic fingerprint" },
        { label: "Extras", value: "Alert slider \u00b7 Stereo speakers" },
      ],
    },
  ],

  // Variants (matching Giztop stock)
  ramOptions: ["12GB", "16GB"],
  storageOptions: ["256GB", "512GB", "1TB"],
  variants: [
    { ram: "12GB", storage: "256GB", price: 19500, colors: ["titanium", "white"] },
    { ram: "12GB", storage: "512GB", price: 21000, colors: ["titanium", "white", "red"] },
    { ram: "16GB", storage: "512GB", price: 22000, colors: ["titanium", "white", "red"] },
    { ram: "16GB", storage: "1TB", price: 23500, colors: ["titanium", "white", "red"] },
  ],
  colors: [
    {
      key: "titanium",
      name: "Space Titanium",
      hex: "#6B6B6B",
      image:
        "https://www.giztop.com/media/catalog/product/cache/97cc1143d2e20f2b0c8ea91aaa12053c/o/p/oppo_find_x9_pro-_2.jpg",
    },
    {
      key: "white",
      name: "Pearl White",
      hex: "#E8E4DF",
      image:
        "https://www.giztop.com/media/catalog/product/cache/97cc1143d2e20f2b0c8ea91aaa12053c/o/p/oppo_find_x9_pro-1_2.jpg",
    },
    {
      key: "red",
      name: "Crimson Red",
      hex: "#8B2020",
      image:
        "https://www.giztop.com/media/catalog/product/cache/97cc1143d2e20f2b0c8ea91aaa12053c/o/p/oppo_find_x9_pro_1_2.jpg",
    },
  ],
};
