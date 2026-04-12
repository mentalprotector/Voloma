"use client";

import { motion } from "framer-motion";

import { fadeScale, staggerContainer, viewportOptions } from "@/lib/animations";
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
        <motion.h2
          className={styles.heading}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={fadeScale}
        >
          Кашпо в интерьере
        </motion.h2>
        <motion.p
          className={styles.subheading}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={fadeScale}
        >
          Реальные пространства
        </motion.p>
        <motion.div
          className={styles.masonry}
          variants={staggerContainer(0.08, 0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ ...viewportOptions, amount: 0.05 }}
        >
          {images.map((src, index) => (
            <motion.div
              className={styles.item}
              key={src}
              variants={{
                hidden: { opacity: 0, scale: 0.92 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.5,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: index * 0.06,
                  },
                },
              }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <img
                src={src}
                alt={`Кашпо Voloma в интерьере — фото ${src.split("/").pop()?.replace(".jpg", "")}`}
                loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
