import { siteContent } from "@/content/site-content";

import { SectionContainer } from "../ui/SectionContainer";
import { FeatureItem } from "./FeatureItem";
import styles from "./features-section.module.css";

export function FeaturesSection() {
  return (
    <SectionContainer className={styles.section} id="details">
      <div className={styles.intro}>
        <p className={styles.eyebrow}>Преимущества Voloma</p>
        <h2 className={styles.title}>Качество видно по самому изделию</h2>
        <p className={styles.description}>
          Один продукт, показанный последовательно: материал, текстура, сборка, защита и
          варианты под ваш интерьер.
        </p>
        <div className={styles.editorialMeta} aria-label="Характер продукта">
          <span className={styles.metaChip}>Карельская сосна</span>
          <span className={styles.metaChip}>DUFA защита</span>
          <span className={styles.metaChip}>Тихая премиальность</span>
        </div>
      </div>

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
