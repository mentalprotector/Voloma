"use client";

import { siteContent } from "@/content/site-content";

import { Button } from "../ui/Button";
import { SectionContainer } from "../ui/SectionContainer";
import styles from "./final-cta-section.module.css";

export function FinalCTASection() {
  return (
    <SectionContainer>
      <div className={styles.panel}>
        <div>
          <p className={styles.eyebrow}>Следующий шаг</p>
          <h2 className={styles.title}>{siteContent.finalCta.title}</h2>
          <p className={styles.description}>{siteContent.finalCta.description}</p>
        </div>
        <Button href="/configurator" size="lg">
          {siteContent.finalCta.cta}
        </Button>
      </div>
    </SectionContainer>
  );
}

