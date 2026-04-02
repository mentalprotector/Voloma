"use client";

import { OverlayCard } from "./OverlayCard";
import styles from "./hero-section.module.css";

export function HeroSection() {
  return (
    <section className={styles.section}>
      <div className={styles.shell}>
        <div className={styles.hero}>
          <div className={styles.media}>
            <picture className={styles.picture}>
              <source
                media="(min-width: 768px)"
                srcSet="/images/hero/voloma-hero-desktop.webp"
                type="image/webp"
              />
              <source srcSet="/images/hero/voloma-hero-mobile.webp" type="image/webp" />
              <img
                alt="Деревянные кашпо Voloma разных размеров и оттенков крупным планом"
                className={styles.image}
                fetchPriority="high"
                src="/images/hero/voloma-hero-mobile.webp"
              />
            </picture>
          </div>

          <div className={styles.tone} aria-hidden="true" />

          <div className={styles.overlayCard}>
            <OverlayCard
              title="Соберите своё кашпо"
              subtitle="Выберите форму, размер и цвет"
              priceLabel="от 6900 ₽"
              ctaLabel="Собрать"
              ctaHref="/configurator"
            />
          </div>

          <a className={styles.scrollHint} href="#details">
            <span className={styles.scrollArrow} aria-hidden="true">
              ↓
            </span>
            <span>Подробнее</span>
          </a>
        </div>
      </div>
    </section>
  );
}
