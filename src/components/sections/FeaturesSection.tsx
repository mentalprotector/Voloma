import Image from "next/image";

import { siteContent } from "@/content/site-content";

import { SectionContainer } from "../ui/SectionContainer";
import styles from "./features-section.module.css";

export function FeaturesSection() {
  return (
    <SectionContainer id="details">
      <div className={styles.layout}>
        <div className={styles.lead}>
          <p className={styles.eyebrow}>Фичи</p>
          <h2 className={styles.title}>Натуральный материал, защита и кастомизация</h2>
          <p className={styles.description}>
            Только то, что действительно важно для выбора.
          </p>
        </div>

        <div className={styles.visual}>
          <div className={styles.visualFrame}>
            <Image
              alt="Кашпо Voloma с живыми растениями в процессе наполнения"
              className={styles.visualImage}
              height={4928}
              loading="lazy"
              sizes="(max-width: 1023px) 100vw, 38rem"
              src="/images/features/voloma-feature.jpg"
              width={3264}
            />
          </div>
        </div>

        <div className={styles.list}>
          {siteContent.features.map((feature, index) => (
            <article className={styles.item} key={feature.title}>
              <span className={styles.index}>0{index + 1}</span>
              <div className={styles.itemCopy}>
                <h3 className={styles.itemTitle}>{feature.title}</h3>
                <p className={styles.itemDescription}>{feature.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
