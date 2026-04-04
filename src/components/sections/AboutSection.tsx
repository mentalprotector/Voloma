import Image from "next/image";

import { siteContent } from "@/content/site-content";

import { SectionContainer } from "../ui/SectionContainer";
import styles from "./about-section.module.css";

export function AboutSection() {
  return (
    <SectionContainer id="about">
      <div className={styles.grid}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>О нас</p>
          <h2 className={styles.title}>{siteContent.about.title}</h2>
          <p className={styles.description}>{siteContent.about.description}</p>
          <div className={styles.facts} aria-label="Факты о Voloma">
            <div className={styles.factCard}>
              <span className={styles.factValue}>2</span>
              <span className={styles.factLabel}>уровня отбора</span>
            </div>
            <div className={styles.factCard}>
              <span className={styles.factValue}>3</span>
              <span className={styles.factLabel}>базовых оттенка</span>
            </div>
            <div className={styles.factCard}>
              <span className={styles.factValue}>1</span>
              <span className={styles.factLabel}>спокойный стиль</span>
            </div>
          </div>
          <div className={styles.list}>
            {siteContent.about.points.map((point) => (
              <p className={styles.point} key={point}>
                {point}
              </p>
            ))}
          </div>
        </div>
        <div className={styles.visuals}>
          <div className={styles.imageCard}>
            <Image
              alt="Деревянное кашпо Voloma с живыми растениями"
              className={styles.image}
              height={4928}
              sizes="(max-width: 767px) 100vw, 30rem"
              src="/images/features/voloma-feature.jpg"
              loading="lazy"
              width={3264}
            />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
