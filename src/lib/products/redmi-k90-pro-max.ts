import type { Product } from "../types";

export const redmiK90ProMax: Product = {
  slug: "redmi-k90-pro-max",
  name: "Redmi K90 Pro Max",
  brand: "Redmi",
  tagline: "Flagship Killer. Maximum Edition.",
  accentColor: "#FF4A3D",
  accentHover: "#e0342a",

  heroImage:
    "https://www.giztop.com/media/catalog/product/cache/7273d816367fe28095c8d1187b15b971/r/e/redmi_k90_pro_max-20.jpg",
  heroSubtitle: "Flagship Killer. Maximum Edition.",
  startingPrice: 14000,

  // Display
  displayHeadline: "Feast Your Eyes.\nAll 6.78 Inches.",
  displaySubheadline:
    "6.78\u2033 2K LTPO AMOLED. 3,200 nits peak.\nThe display that makes flagships twice the price jealous.",
  displayStats: [
    { value: 6.78, decimals: 2, suffix: "\u2033", label: "Display" },
    { value: 120, suffix: "Hz", label: "Refresh Rate" },
    { value: 3200, separator: ",", suffix: " nits", label: "Peak Brightness" },
  ],
  displayImage:
    "https://www.giztop.com/media/catalog/product/cache/97cc1143d2e20f2b0c8ea91aaa12053c/r/e/redmi_k90_pro_max_1.jpg",
  displayFootnote: "100% DCI-P3 \u00b7 Dolby Vision \u00b7 HDR10+ \u00b7 2K+ LTPO",

  // Performance
  chipLabel: "Snapdragon 8 Elite",
  performanceHeadline: "Full Flagship.\nHalf the Price.",
  performanceSubheadline:
    "Snapdragon 8 Elite. The exact same chip as phones costing double.\nZero compromises on raw power.",
  performanceStats: [
    { value: 3, suffix: "nm", label: "Process" },
    { value: 4.6, decimals: 1, suffix: "GHz", label: "Clock Speed" },
    { value: 16, suffix: "GB", label: "LPDDR5X" },
  ],
  performanceTags: ["Snapdragon 8 Elite", "Adreno 840 GPU", "UFS 4.0 Storage", "Wi-Fi 7"],

  // Camera
  cameraHeadline: "Pro Cameras.\nPro Max Price.",
  cameraSubheadline: "50MP triple camera system with OIS. Leica-tuned colour processing.",
  cameraStats: [
    { value: 50, suffix: "MP", label: "Main Sensor" },
    { value: 50, suffix: "MP", label: "Telephoto" },
    { value: 3, suffix: "\u00d7", label: "Optical Zoom" },
    { value: 8, suffix: "K", label: "Video" },
  ],
  cameraImage:
    "https://www.giztop.com/media/catalog/product/cache/97cc1143d2e20f2b0c8ea91aaa12053c/r/e/redmi_k90_pro_max_3.jpg",
  cameraDetails: [
    { name: "Main Camera", sensor: "Sony IMX906", detail: "50MP \u00b7 f/1.6 \u00b7 OIS \u00b7 24mm" },
    { name: "Telephoto", sensor: "3\u00d7 Periscope", detail: "50MP \u00b7 f/2.5 \u00b7 OIS \u00b7 75mm" },
    { name: "Ultra-Wide", sensor: "120\u00b0 FOV", detail: "32MP \u00b7 f/2.2 \u00b7 Autofocus" },
  ],

  // Battery
  batteryHeadline: "Unstoppable Energy.",
  batteryCapacity: 7500,
  batteryCapacityNote: "A monster 7,500 mAh battery. More than any flagship.",
  batteryStats: [
    { value: 120, suffix: "W", label: "Wired Charging" },
    { value: 50, suffix: "W", label: "Wireless" },
    { value: 28, suffix: "hrs", label: "Video Playback" },
  ],
  batteryHighlight: "0 to 50% in 14 minutes.",
  batteryFootnote: "Charger included in the box.",

  // Design
  designHeadline: "Looks Premium.\nCosts Less.",
  designSubheadline:
    "Metal frame. Corning glass front and back.\nBose-tuned stereo speakers. The value king.",
  designStats: [
    { value: "IP68", label: "Water & Dust" },
    { value: "Bose", label: "Stereo Audio" },
    { value: "213g", label: "Weight" },
  ],
  designFootnote: "8.4mm thin \u00b7 213g \u00b7 Gorilla Glass Victus 2",

  // Specs
  specCategories: [
    {
      title: "Display",
      specs: [
        { label: "Size", value: '6.78" LTPO AMOLED' },
        { label: "Resolution", value: "3200 \u00d7 1440 (2K+)" },
        { label: "Refresh Rate", value: "1\u2013120Hz LTPO" },
        { label: "Brightness", value: "3,200 nits peak" },
        { label: "Color", value: "12-bit, 100% DCI-P3" },
      ],
    },
    {
      title: "Performance",
      specs: [
        { label: "Chipset", value: "Snapdragon 8 Elite (3nm)" },
        { label: "CPU", value: "Oryon \u00b7 2\u00d74.6GHz + 6\u00d73.6GHz" },
        { label: "RAM", value: "12 / 16 GB LPDDR5X" },
        { label: "Storage", value: "256 / 512GB / 1TB UFS 4.0" },
        { label: "OS", value: "Android 16 \u00b7 HyperOS 3" },
      ],
    },
    {
      title: "Camera",
      specs: [
        { label: "Main", value: "50MP Sony IMX906 \u00b7 f/1.6 OIS" },
        { label: "Telephoto", value: "50MP \u00b7 3\u00d7 periscope \u00b7 OIS" },
        { label: "Ultra-Wide", value: "32MP \u00b7 120\u00b0 \u00b7 f/2.2 AF" },
        { label: "Front", value: "20MP \u00b7 AF" },
        { label: "Video", value: "8K24 / 4K60 Dolby Vision" },
      ],
    },
    {
      title: "Battery",
      specs: [
        { label: "Capacity", value: "7,500 mAh silicon-carbon" },
        { label: "Wired", value: "120W HyperCharge" },
        { label: "Wireless", value: "50W wireless" },
        { label: "Playback", value: "Up to 28 hours video" },
        { label: "In Box", value: "Charger included" },
      ],
    },
    {
      title: "Connectivity",
      specs: [
        { label: "5G", value: "Dual 5G, sub-6GHz" },
        { label: "Wi-Fi", value: "Wi-Fi 7 (802.11be)" },
        { label: "Bluetooth", value: "5.4 \u00b7 aptX Adaptive" },
        { label: "USB", value: "Type-C 3.2" },
        { label: "NFC", value: "Yes \u00b7 IR blaster" },
      ],
    },
    {
      title: "Durability",
      specs: [
        { label: "Rating", value: "IP68" },
        { label: "Front Glass", value: "Gorilla Glass Victus 2" },
        { label: "Frame", value: "Aluminium alloy" },
        { label: "Biometrics", value: "Ultrasonic fingerprint" },
        { label: "Extras", value: "IR blaster \u00b7 Bose speakers" },
      ],
    },
  ],

  // Variants
  ramOptions: ["12GB", "16GB"],
  storageOptions: ["256GB", "512GB", "1TB"],
  variants: [
    { ram: "12GB", storage: "256GB", price: 14000, colors: ["black", "blue"] },
    { ram: "12GB", storage: "512GB", price: 16000, colors: ["black", "blue", "white"] },
    { ram: "16GB", storage: "256GB", price: 16000, colors: ["black", "blue"] },
    { ram: "16GB", storage: "512GB", price: 18000, colors: ["black", "blue", "white"] },
    { ram: "16GB", storage: "1TB", price: 20000, colors: ["black", "blue", "white"] },
  ],
  colors: [
    {
      key: "black",
      name: "Midnight Black",
      hex: "#1a1a1a",
      image:
        "https://www.giztop.com/media/catalog/product/cache/97cc1143d2e20f2b0c8ea91aaa12053c/r/e/redmi_k90_pro_max_black_2.png",
    },
    {
      key: "blue",
      name: "Frost Blue",
      hex: "#5B8FB9",
      image:
        "https://www.giztop.com/media/catalog/product/cache/97cc1143d2e20f2b0c8ea91aaa12053c/r/e/redmi_k90_pro_max_blue_2.png",
    },
    {
      key: "white",
      name: "Glacier White",
      hex: "#E8E4DF",
      image:
        "https://www.giztop.com/media/catalog/product/cache/97cc1143d2e20f2b0c8ea91aaa12053c/r/e/redmi_k90_pro_max_white_2.png",
    },
  ],
};
