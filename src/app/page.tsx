import { CTABannerSection } from "@/components/sections/CTABannerSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { InteriorSection } from "@/components/sections/InteriorSection";
import { MasonryGallerySection } from "@/components/sections/MasonryGallerySection";
import { MaterialSection } from "@/components/sections/MaterialSection";
import { PlantSection } from "@/components/sections/PlantSection";
import { WhyVolomaNewSection } from "@/components/sections/WhyVolomaNewSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MaterialSection />
      <InteriorSection />
      <WhyVolomaNewSection />
      <PlantSection />
      <MasonryGallerySection />
      <CTABannerSection />
      <FAQSection />
    </>
  );
}
