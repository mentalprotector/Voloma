"use client";

import Image from "next/image";
import { useState } from "react";

import type { GalleryState, ProductImage } from "@/types/product";

import { Lightbox } from "./Lightbox";
import styles from "./image-gallery.module.css";

interface ImageGalleryProps {
  images: ProductImage[];
  placeholderTitle?: string;
  placeholderSubtitle?: string;
  state: GalleryState;
  note: string | null;
  imageSrc?: string | null;
  /** Human-readable config caption for the lightbox, e.g. "Квадратное • Стандарт • Натуральная" */
  caption?: string;
}

export function ImageGallery({
  images,
  placeholderTitle,
  placeholderSubtitle,
  state,
  note,
  imageSrc,
  caption,
}: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const resolvedIndex = images[activeIndex] ? activeIndex : 0;
  const activeImage = images[resolvedIndex];
  const showGallery = images.length > 0 && (state === "exact" || state === "fallback");
  const hasDynamicImage = typeof imageSrc === "string" && imageSrc.length > 0;

  // Main grid: show up to 4 medium photos
  const gridImages = images.slice(0, 4);

  return (
    <section className={styles.gallery}>
      {/* Primary hero — clickable to open lightbox */}
      {showGallery && activeImage ? (
        <div className={styles.heroSection}>
          <div className={styles.heroStage}>
            <button
              className={styles.heroButton}
              type="button"
              aria-label={`Открыть фото ${resolvedIndex + 1} на весь экран`}
              onClick={() => setLightboxIndex(resolvedIndex)}
              onTouchEnd={(event) => {
                if (touchStartX === null || images.length < 2) return;
                const delta = touchStartX - event.changedTouches[0].clientX;
                if (Math.abs(delta) < 40) {
                  setTouchStartX(null);
                  return;
                }
                if (delta > 0) {
                  setActiveIndex((current) => (current + 1) % images.length);
                } else {
                  setActiveIndex((current) => (current - 1 + images.length) % images.length);
                }
                setIsLoaded(false);
                setTouchStartX(null);
              }}
              onTouchStart={(event) => setTouchStartX(event.touches[0].clientX)}
            >
              {!isLoaded ? <div className={styles.skeleton} aria-hidden="true" /> : null}
              <Image
                alt={activeImage.alt}
                className={styles.heroImage}
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 52rem"
                src={activeImage.url}
                onLoad={() => setIsLoaded(true)}
              />
              <div className={styles.heroOverlay} aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 4h6M4 4v6M4 4L9 9M20 4h-6M20 4v6M20 4L15 9M4 20h6M4 20v-6M4 20L9 15M20 20h-6M20 20v-6M20 20L15 15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className={styles.counter} aria-hidden="true">
                {resolvedIndex + 1}/{images.length}
              </div>
            </button>
          </div>
        </div>
      ) : hasDynamicImage ? (
        <div className={styles.heroSection}>
          <div className={styles.heroStage}>
            {!isLoaded ? <div className={styles.skeleton} aria-hidden="true" /> : null}
            <Image
              alt={placeholderTitle ?? "Ваше кашпо"}
              className={styles.heroImage}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 52rem"
              src={imageSrc}
              onLoad={() => setIsLoaded(true)}
            />
          </div>
        </div>
      ) : (
        <div className={styles.placeholder}>
          <div className={styles.placeholderIcon} aria-hidden="true" />
          <p className={styles.placeholderTitle}>{placeholderTitle ?? "Ваше кашпо"}</p>
          {placeholderSubtitle && (
            <p className={styles.placeholderText}>{placeholderSubtitle}</p>
          )}
        </div>
      )}

      {note ? <p className={styles.note}>{note}</p> : null}

      {/* Grid of medium photos — click to open lightbox */}
      {showGallery && gridImages.length > 1 && (
        <div className={styles.grid}>
          {gridImages.map((image, index) => (
            <button
              key={image.url}
              aria-label={`Открыть фото ${index + 1} на весь экран`}
              className={`${styles.gridCard} ${index === activeIndex ? styles.gridCardActive : ""}`}
              type="button"
              onClick={() => setLightboxIndex(index)}
            >
              <div className={styles.gridCardInner}>
                <Image
                  alt={image.alt}
                  className={styles.gridImage}
                  fill
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
                  src={image.url}
                />
              </div>
              <div className={styles.gridLabel} aria-hidden="true">
                Ракурс {index + 1}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Legacy thumbnail strip — kept for compatibility but hidden on desktop */}
      {showGallery && images.length > 1 ? (
        <div className={styles.thumbs}>
          {images.map((image, index) => (
            <button
              key={image.url}
              aria-label={`Показать изображение ${index + 1}`}
              aria-pressed={index === resolvedIndex}
              className={[styles.thumb, index === resolvedIndex ? styles.thumbActive : ""]
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
                height={72}
                loading="lazy"
                sizes="72px"
                src={image.url}
                width={72}
              />
            </button>
          ))}
        </div>
      ) : null}

      {/* Lightbox */}
      {lightboxIndex !== null && showGallery && (
        <Lightbox
          caption={caption ?? ""}
          images={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
}
