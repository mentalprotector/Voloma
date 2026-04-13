import { CTABannerSection } from "@/components/sections/CTABannerSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { InteriorSection } from "@/components/sections/InteriorSection";
import { MasonryGallerySection } from "@/components/sections/MasonryGallerySection";
import { MaterialSection } from "@/components/sections/MaterialSection";
import { PlantSection } from "@/components/sections/PlantSection";
import { WhyVolomaNewSection } from "@/components/sections/WhyVolomaNewSection";
import { siteContent } from "@/content/site-content";
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/structured-data";

export const metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  const faqSchema = getFAQSchema(siteContent.faq);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Главная", url: "/" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
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
