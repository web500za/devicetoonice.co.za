"use client";

import StickyNav from "@/components/StickyNav";
import Hero from "@/components/product/Hero";
import DisplaySection from "@/components/product/DisplaySection";
import PerformanceSection from "@/components/product/PerformanceSection";
import CameraSection from "@/components/product/CameraSection";
import BatterySection from "@/components/product/BatterySection";
import DesignSection from "@/components/product/DesignSection";
import SpecsSection from "@/components/product/SpecsSection";
import OrderSection from "@/components/product/OrderSection";
import Footer from "@/components/product/Footer";
import type { Product } from "@/lib/types";

export default function ProductPage({ product }: { product: Product }) {
  return (
    <main>
      <StickyNav product={product} />
      <Hero product={product} />
      <DisplaySection product={product} />
      <PerformanceSection product={product} />
      <CameraSection product={product} />
      <BatterySection product={product} />
      <DesignSection product={product} />
      <SpecsSection product={product} />
      <OrderSection product={product} />
      <Footer />
    </main>
  );
}
