import { colorLabels, qualityLabels, shapeLabels, sizeLabels } from "@/content/site-content";
import type { PlaceholderGalleryData } from "@/types/product";

import styles from "./placeholder-gallery.module.css";

interface PlaceholderGalleryProps {
  data: PlaceholderGalleryData;
  label?: string | null;
}

export function PlaceholderGallery({ data, label }: PlaceholderGalleryProps) {
  return (
    <section className={styles.gallery}>
      {label ? <div className={styles.notice}>{label}</div> : null}
      <div className={styles.stage}>
        <div className={styles.icon} aria-hidden="true">
          <span />
          <span />
        </div>
        <p className={styles.eyebrow}>Placeholder gallery</p>
        <h2 className={styles.title}>{data.title}</h2>
        <div className={styles.meta}>
          <span>{shapeLabels[data.shape]}</span>
          <span>{sizeLabels[data.size]}</span>
          <span>{colorLabels[data.color]}</span>
          <span>{qualityLabels[data.quality]}</span>
        </div>
        <div className={styles.pathCard}>
          <p>Добавьте фото в:</p>
          <code>{data.imagePath}</code>
        </div>
      </div>
    </section>
  );
}

