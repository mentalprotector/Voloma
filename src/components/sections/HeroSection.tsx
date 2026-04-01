"use client";

import Image from "next/image";

import { OverlayCard } from "./OverlayCard";
import styles from "./hero-section.module.css";

export function HeroSection() {
  return (
    <section className={styles.section}>
      <div className={styles.shell}>
        <div className={styles.hero}>
          <div className={styles.media}>
            <Image
              alt="Деревянные кашпо Voloma разных размеров и оттенков крупным планом"
              className={styles.image}
              fill
              priority
              sizes="100vw"
              src="/images/hero/voloma-hero-edge.jpg"
            />
          </div>

          <div className={styles.tone} aria-hidden="true" />
          <div className={styles.bottomGlow} aria-hidden="true" />

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
