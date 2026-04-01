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
          <ul className={styles.list}>
            {siteContent.about.points.map((point) => (
              <li className={styles.point} key={point}>
                {point}
              </li>
            ))}
          </ul>
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
