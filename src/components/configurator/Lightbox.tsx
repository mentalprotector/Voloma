"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { ProductImage } from "@/types/product";

import styles from "./lightbox.module.css";

interface LightboxProps {
  images: ProductImage[];
  initialIndex: number;
  caption: string;
  onClose: () => void;
}

/** Minimum pinch / swipe distance to trigger a slide change */
const SWIPE_THRESHOLD = 50;

export function Lightbox({ images, initialIndex, caption, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isClosing, setIsClosing] = useState(false);

  // Touch / gesture state
  const touchRef = useRef<{ startX: number; startY: number; lastY: number } | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fade-in animation on mount
  useEffect(() => {
    requestAnimationFrame(() => setIsOpen(true));
  }, []);

  // Lock body scroll on iOS Safari and other browsers
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;

    // Store current scroll position
    html.style.scrollBehavior = "auto";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflowY = "scroll";

    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      body.style.overflowY = "";
      html.style.scrollBehavior = "";
      // Restore scroll position
      window.scrollTo(0, scrollY);
    };
  }, []);

  // Keyboard navigation
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => onClose(), 280);
  }, [onClose]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        navigate(1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        navigate(-1);
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [handleClose]);

  // Reset zoom/pan when changing slides
  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [currentIndex]);

  function navigate(dir: -1 | 1) {
    setCurrentIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return images.length - 1;
      if (next >= images.length) return 0;
      return next;
    });
  }

  // --- Mouse drag for panning when zoomed ---
  function handleMouseDown(e: React.MouseEvent) {
    if (zoom <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!isDragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  }

  function handleMouseUp() {
    setIsDragging(false);
  }

  // --- Wheel zoom ---
  function handleWheel(e: React.WheelEvent) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
    setZoom((z) => Math.min(Math.max(z + delta, 1), 4));
  }

  // --- Touch handlers ---
  function handleTouchStart(e: React.TouchEvent) {
    const touch = e.touches[0];
    touchRef.current = { startX: touch.clientX, startY: touch.clientY, lastY: touch.clientY };

    // Two-finch pinch detection handled via gesture events
    if (e.touches.length === 1 && zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: touch.clientX - pan.x, y: touch.clientY - pan.y });
    }
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (!touchRef.current) return;
    const touch = e.touches[0];

    // Drag when zoomed
    if (isDragging && e.touches.length === 1) {
      setPan({ x: touch.clientX - dragStart.x, y: touch.clientY - dragStart.y });
      return;
    }

    touchRef.current.lastY = touch.clientY;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (!touchRef.current) return;

    setIsDragging(false);

    if (zoom > 1) return; // Don't navigate when zoomed

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchRef.current.startX;
    const deltaY = touch.clientY - touchRef.current.startY;

    // Swipe down to close
    if (deltaY > SWIPE_THRESHOLD * 1.5 && Math.abs(deltaX) < deltaY * 0.6) {
      handleClose();
      touchRef.current = null;
      return;
    }

    // Swipe left/right to navigate
    if (Math.abs(deltaX) > SWIPE_THRESHOLD && Math.abs(deltaX) > Math.abs(deltaY)) {
      navigate(deltaX > 0 ? -1 : 1);
    }

    touchRef.current = null;
  }

  // --- Double-click zoom ---
  function handleDoubleClick() {
    setZoom((z) => (z > 1 ? 1 : 2.5));
    setPan({ x: 0, y: 0 });
  }

  const currentImage = images[currentIndex];

  return (
    <div
      ref={containerRef}
      className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""} ${isClosing ? styles.overlayClosing : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={`Просмотр фото ${currentIndex + 1} из ${images.length}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      {/* Close button */}
      <button
        className={styles.closeButton}
        type="button"
        aria-label="Закрыть"
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6 6L18 18M18 6L6 18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            className={`${styles.navButton} ${styles.navButtonPrev}`}
            type="button"
            aria-label="Предыдущее фото"
            onClick={() => navigate(-1)}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 6L9 12L15 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className={`${styles.navButton} ${styles.navButtonNext}`}
            type="button"
            aria-label="Следующее фото"
            onClick={() => navigate(1)}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 6L15 12L9 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      )}

      {/* Image area */}
      <div
        ref={imageRef}
        className={styles.imageContainer}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onDoubleClick={handleDoubleClick}
      >
        {currentImage && (
          <div
            className={styles.imageWrapper}
            style={{
              transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
              transition: isDragging ? "none" : "transform 0.2s ease",
            }}
          >
            <Image
              alt={currentImage.alt}
              className={styles.image}
              fill
              priority
              sizes="(max-width: 1023px) 95vw, 80vw"
              src={currentImage.url}
            />
          </div>
        )}
      </div>

      {/* Counter pill */}
      {images.length > 1 && (
        <div className={styles.counter} aria-live="polite">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Caption */}
      {caption && <div className={styles.caption}>{caption}</div>}

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className={styles.thumbStrip}>
          {images.map((img, idx) => (
            <button
              key={img.url}
              aria-label={`Перейти к фото ${idx + 1}`}
              aria-pressed={idx === currentIndex}
              className={`${styles.thumbBtn} ${idx === currentIndex ? styles.thumbActive : ""}`}
              type="button"
              onClick={() => {
                setCurrentIndex(idx);
                setZoom(1);
                setPan({ x: 0, y: 0 });
              }}
            >
              <Image
                alt={img.alt}
                height={56}
                loading="lazy"
                sizes="56px"
                src={img.url}
                width={56}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
