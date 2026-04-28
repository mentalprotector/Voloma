import { publicPath } from "@/lib/public-path";

import styles from "./masonry-gallery-section.module.css";

const galleryImages = [
  { src: "/images/gallery/gallery-01.jpg" },
  { src: "/images/gallery/gallery-02.jpg" },
  { src: "/images/gallery/gallery-03.jpg" },
  { src: "/images/gallery/gallery-04.jpg" },
  { src: "/images/gallery/gallery-05.jpg" },
  { src: "/images/gallery/gallery-06.jpg" },
  { src: "/images/gallery/gallery-07.jpg" },
  { src: "/images/gallery/gallery-08.jpg" },
  { src: "/images/gallery/gallery-09.jpg" },
];

export function MasonryGallerySection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Кашпо в интерьере</h2>
        <p className={styles.subheading}>Реальные пространства</p>
        <div className={styles.masonry}>
          {galleryImages.map(({ src }) => (
            <div
              className={styles.item}
              key={src}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={publicPath(src)}
                alt={`Деревянное кашпо Волома в интерьере — вариант ${src.split("/").pop()?.replace(".jpg", "")}, карельская сосна`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
