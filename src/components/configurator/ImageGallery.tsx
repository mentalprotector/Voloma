"use client";

import Image from "next/image";
import { useState } from "react";

import type { GalleryState, ProductImage } from "@/types/product";

import styles from "./image-gallery.module.css";

interface ImageGalleryProps {
  images: ProductImage[];
  placeholderTitle?: string;
  placeholderSubtitle?: string;
  state: GalleryState;
  note: string | null;
  imageSrc?: string | null;
}

export function ImageGallery({
  images,
  placeholderTitle,
  placeholderSubtitle,
  state,
  note,
  imageSrc,
}: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const resolvedIndex = images[activeIndex] ? activeIndex : 0;
  const activeImage = images[resolvedIndex];
  const showGallery = images.length > 0 && (state === "exact" || state === "fallback");
  const hasDynamicImage = typeof imageSrc === "string" && imageSrc.length > 0;

  return (
    <section className={styles.gallery}>
      <div
        className={styles.stage}
        aria-live="polite"
        onTouchEnd={(event) => {
          if (touchStartX === null || images.length < 2 || !showGallery) {
            return;
          }

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
        {showGallery && activeImage ? (
          <>
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
            <div className={styles.counter} aria-hidden="true">
              {resolvedIndex + 1}/{images.length}
            </div>
          </>
        ) : hasDynamicImage ? (
          <>
            {!isLoaded ? <div className={styles.skeleton} aria-hidden="true" /> : null}
            <Image
              alt={placeholderTitle ?? "Ваше кашпо"}
              className={styles.image}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 52rem"
              src={imageSrc}
              onLoad={() => setIsLoaded(true)}
            />
          </>
        ) : (
          <div className={styles.placeholder}>
            <div className={styles.placeholderIcon} aria-hidden="true" />
            <p className={styles.placeholderTitle}>{placeholderTitle ?? "Ваше кашпо"}</p>
            {placeholderSubtitle && (
              <p className={styles.placeholderText}>{placeholderSubtitle}</p>
            )}
          </div>
        )}
      </div>
      {note ? <p className={styles.note}>{note}</p> : null}
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
                height={108}
                loading="lazy"
                sizes="96px"
                src={image.url}
                width={108}
              />
              <span className={styles.thumbLabel}>0{index + 1}</span>
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}
