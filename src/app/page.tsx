import { CTABannerSection } from "@/components/sections/CTABannerSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ModelsGallerySection } from "@/components/sections/ModelsGallerySection";
import { WhyVolomaSection } from "@/components/sections/WhyVolomaSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <WhyVolomaSection />
      <ModelsGallerySection />
      <CTABannerSection />
      <FAQSection />
    </>
  );
}
