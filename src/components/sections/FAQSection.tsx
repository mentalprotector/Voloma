import { FAQAccordion } from "./FAQAccordion";
import { siteContent } from "@/content/site-content";
import { SectionContainer } from "../ui/SectionContainer";

export function FAQSection() {
  return (
    <SectionContainer>
      <FAQAccordion items={siteContent.faq} />
    </SectionContainer>
  );
}
