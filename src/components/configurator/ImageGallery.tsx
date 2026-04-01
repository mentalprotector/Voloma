"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { trackEvent } from "@/lib/analytics";
import type { ProductImage } from "@/types/product";

import styles from "./image-gallery.module.css";

interface ImageGalleryProps {
  title: string;
  images: ProductImage[];
  label?: string | null;
}

export function ImageGallery({ title, images, label }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const resolvedIndex = images[activeIndex] ? activeIndex : 0;

  useEffect(() => {
    const activeImage = images[resolvedIndex];

    if (!activeImage) {
      return;
    }

    trackEvent("gallery_image_view", {
      image: activeImage.url,
      title,
      index: resolvedIndex + 1,
    });
  }, [images, resolvedIndex, title]);

  const activeImage = images[resolvedIndex];

  if (!activeImage) {
    return null;
  }

  return (
    <section className={styles.gallery}>
      {label ? <div className={styles.notice}>{label}</div> : null}
      <div className={styles.stage}>
        {!isLoaded ? <div className={styles.skeleton} aria-hidden="true" /> : null}
        <Image
          alt={activeImage.alt}
          className={styles.image}
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 52rem"
          src={activeImage.url}
          onLoad={() => setIsLoaded(true)}
        />
      </div>
      {images.length > 1 ? (
        <div className={styles.thumbs}>
          {images.map((image, index) => (
            <button
              key={image.url}
              aria-label={`Показать изображение ${index + 1}`}
                className={[
                styles.thumb,
                index === resolvedIndex ? styles.thumbActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              type="button"
              onClick={() => {
                setActiveIndex(index);
                setIsLoaded(false);
              }}
            >
              <Image
                alt={image.alt}
                className={styles.thumbImage}
                height={108}
                loading="lazy"
                sizes="96px"
                src={image.url}
                width={108}
              />
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}
