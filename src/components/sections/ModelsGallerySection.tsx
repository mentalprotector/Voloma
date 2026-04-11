import Link from "next/link";

import { siteContent } from "@/content/site-content";

import { SectionContainer } from "../ui/SectionContainer";
import styles from "./models-gallery-section.module.css";

export function ModelsGallerySection() {
  const { title, subtitle, items, cta } = siteContent.models;

  return (
    <SectionContainer>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle}>{subtitle}</p>
      <div className={styles.grid}>
        {items.map((item) => (
          <div className={styles.item} key={item.slug} data-model={item.slug}>
            <div className={styles.placeholder} />
            <div className={styles.overlay}>
              <span className={styles.modelName}>{item.name}</span>
              <span className={styles.modelPrice}>{item.price}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.ctaWrapper}>
        <Link className={styles.ctaButton} href="/configurator">
          {cta}
        </Link>
      </div>
    </SectionContainer>
  );
}
