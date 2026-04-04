"use client";

import Image from "next/image";

import type { FeatureImageTone, SiteFeature } from "@/content/site-content";

import styles from "./feature-item.module.css";

interface FeatureItemProps {
  description: string;
  image?: SiteFeature["image"];
  index: number;
  title: string;
}

const toneClassNames: Record<FeatureImageTone, string> = {
  sand: styles.toneSand,
  linen: styles.toneLinen,
  clay: styles.toneClay,
  mist: styles.toneMist,
  forest: styles.toneForest,
};

export function FeatureItem({ description, image, index, title }: FeatureItemProps) {
  const toneClassName = toneClassNames[image?.tone ?? "sand"];
  const isReversed = index % 2 === 1;

  return (
    <article
      className={[styles.item, isReversed ? styles.reversed : ""].filter(Boolean).join(" ")}
    >
      <div className={[styles.visual, toneClassName].join(" ")}>
        {image?.src ? (
          <Image
            alt={image.alt}
            className={styles.image}
            fill
            loading="lazy"
            sizes="(max-width: 1023px) 100vw, 56vw"
            src={image.src}
            style={{ objectPosition: image.position ?? "center" }}
          />
        ) : (
          <div aria-label={image?.alt} className={styles.placeholder} role="img">
            <div className={styles.placeholderLarge} />
            <div className={styles.placeholderTall} />
            <div className={styles.placeholderSmall} />
          </div>
        )}
      </div>

      <div className={styles.copy}>
        <span className={styles.kicker}>0{index + 1}</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </article>
  );
}
