import { product } from "@/lib/products";
import { StickyNav } from "@/components/homepage/StickyNav";
import { HeroSection } from "@/components/homepage/HeroSection";
import { DisplaySection } from "@/components/homepage/DisplaySection";
import { PerformanceSection } from "@/components/homepage/PerformanceSection";
import { BatterySection } from "@/components/homepage/BatterySection";
import { DesignSection } from "@/components/homepage/DesignSection";
import { CameraSection } from "@/components/homepage/CameraSection";
import { SpecsSection } from "@/components/homepage/SpecsSection";
import { CTABand } from "@/components/homepage/CTABand";
import { Footer } from "@/components/homepage/Footer";

export default function Home() {
  return (
    <>
      <StickyNav />
      <main>
        <HeroSection />
        <DisplaySection />
        <PerformanceSection />
        <BatterySection />
        <DesignSection colors={product.colors} />
        <CameraSection />
        <SpecsSection specCategories={product.specCategories} />
        <CTABand />
      </main>
      <Footer />
    </>
  );
}
