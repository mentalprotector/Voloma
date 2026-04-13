import styles from "./masonry-gallery-section.module.css";

// Define the range of gallery images to render (gallery-01 through gallery-09)
const galleryImageCount = 9;

function getGalleryImages(): string[] {
  const images: string[] = [];
  for (let i = 1; i <= galleryImageCount; i++) {
    const padded = i.toString().padStart(2, "0");
    images.push(`/images/gallery/gallery-${padded}.jpg`);
  }
  return images;
}

export function MasonryGallerySection() {
  const images = getGalleryImages();

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Кашпо в интерьере</h2>
        <p className={styles.subheading}>Реальные пространства</p>
        <div className={styles.masonry}>
          {images.map((src) => (
            <div
              className={styles.item}
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
