import styles from "./masonry-gallery-section.module.css";

const galleryImages = [
  { src: "/images/gallery/gallery-01.jpg", className: `${styles.itemTall} ${styles.slotOne}` },
  { src: "/images/gallery/gallery-02.jpg", className: `${styles.itemTall} ${styles.slotTwo}` },
  { src: "/images/gallery/gallery-03.jpg", className: `${styles.itemLandscape} ${styles.slotThree}` },
  { src: "/images/gallery/gallery-04.jpg", className: `${styles.itemLandscape} ${styles.slotFour}` },
  { src: "/images/gallery/gallery-05.jpg", className: `${styles.itemTall} ${styles.slotFive}` },
  { src: "/images/gallery/gallery-06.jpg", className: `${styles.itemWide} ${styles.slotSix}` },
  { src: "/images/gallery/gallery-07.jpg", className: `${styles.itemTall} ${styles.slotSeven}` },
  { src: "/images/gallery/gallery-08.jpg", className: `${styles.itemTall} ${styles.slotEight}` },
  { src: "/images/gallery/gallery-09.jpg", className: `${styles.itemLandscape} ${styles.slotNine}` },
];

export function MasonryGallerySection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Кашпо в интерьере</h2>
        <p className={styles.subheading}>Реальные пространства</p>
        <div className={styles.masonry}>
          {galleryImages.map(({ src, className }) => (
            <div
              className={`${styles.item} ${className}`}
              key={src}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
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
