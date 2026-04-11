import Link from "next/link";

import { siteContent } from "@/content/site-content";

import styles from "./cta-banner-section.module.css";

export function CTABannerSection() {
  const { title, subtitle, cta } = siteContent.ctaBanner;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
        <Link className={styles.ctaButton} href="/configurator">
          {cta}
        </Link>
      </div>
    </section>
  );
}
