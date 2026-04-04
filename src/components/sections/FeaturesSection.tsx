import { siteContent } from "@/content/site-content";

import { SectionContainer } from "../ui/SectionContainer";
import { FeatureItem } from "./FeatureItem";
import styles from "./features-section.module.css";

export function FeaturesSection() {
  return (
    <SectionContainer className={styles.section} id="details">
      <div className={styles.story}>
        {siteContent.features.map((feature, index) => (
          <FeatureItem
            description={feature.description}
            image={feature.image}
            index={index}
            key={feature.title}
            title={feature.title}
          />
        ))}
      </div>
    </SectionContainer>
  );
}
