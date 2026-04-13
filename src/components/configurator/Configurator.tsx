"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

import { getInitialSize, hasSizeOptions, isSizeAvailable } from "@/config/availability";
import { calculateTotalPrice } from "@/config/pricing";
import { finishLabels, shapeLabels, sizeLabels } from "@/content/site-content";
import { productVariants } from "@/data/product-variants";
import { useCopyToClipboard, useDynamicScroll, usePriceAnimation, useVibration } from "@/hooks";
import { useIsMobile } from "@/hooks/useIsMobile";
import { buildMessengerUrl } from "@/lib/messenger-links";
import { formatPrice } from "@/lib/format";
import { buildOrderMessage } from "@/lib/order-message";
import { resolveVariantMatch } from "@/lib/product-matching";
import { getImageCropStyleRequired } from "@/lib/image-crop";
import { subtleSpring } from "@/lib/animations";
import type { MessengerKey } from "@/types/messenger";
import type { Finish, Quality, Shape, Size } from "@/types/product";

import { ConfiguratorControls } from "./ConfiguratorControls";
import { ImageGallery } from "./ImageGallery";
import { SpecsModal } from "./SpecsModal";
import { StickyMobileCTA } from "./StickyMobileCTA";
import styles from "./configurator.module.css";

const qualityLabels: Record<Quality, string> = {
  standard: "Стандарт",
  premium: "Премиум",
};

export function Configurator() {
  // Read initial state from URL (client-side only)
  const getInitialState = <T,>(key: string, fallback: T): T => {
    if (typeof window === "undefined") return fallback;
    const params = new URLSearchParams(window.location.search);
    return (params.get(key) as T) || fallback;
  };

  const initialShape = getInitialState<Shape>("shape", "narrow");
  const initialQuality = getInitialState<Quality>("quality", "standard");
  const initialFinish = getInitialState<Finish>("finish", "natural");
  const initialSizeFromUrl = getInitialState<Size | null>("size", null);
  const initialSize = initialSizeFromUrl && isSizeAvailable(initialShape, initialSizeFromUrl)
    ? initialSizeFromUrl
    : getInitialSize(initialShape);

  const [shape, setShape] = useState<Shape>(initialShape);
  const [size, setSize] = useState<Size>(initialSize);
  const [finish, setFinish] = useState<Finish>(initialFinish);
  const [quality, setQuality] = useState<Quality>(initialQuality);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [specsOpen, setSpecsOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const controlsRef = useRef<HTMLDivElement>(null);
  useDynamicScroll(controlsRef);
  const isMobile = useIsMobile();

  const availableSizes = useMemo(() => {
    if (!isSizeAvailable(shape, size)) {
      return getInitialSize(shape);
    }
    return size;
  }, [shape, size]);

  // Update URL when selection changes
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("shape", shape);
    params.set("size", availableSizes);
    params.set("finish", finish);
    params.set("quality", quality);
    window.history.replaceState({}, "", `?${params.toString()}`);
  }, [shape, availableSizes, finish, quality]);

  const { vibrate } = useVibration();
  const { pulse, elementRef: topPriceRef } = usePriceAnimation();
  const {
    status: copyStatus,
    copy: copyMessage,
  } = useCopyToClipboard();

  const selection = useMemo(
    () => ({
      shape,
      size: availableSizes,
      finish,
      quality,
    }),
    [availableSizes, finish, quality, shape],
  );

  const resolvedMatch = resolveVariantMatch(productVariants, selection);
  const total = calculateTotalPrice(shape, availableSizes, {
    quality,
    finish,
    hasWheels: false,
  });

  const showSizeSelector = hasSizeOptions(shape);

  // Build summary line — only join non-empty values
  const summaryParts = [
    shapeLabels[shape],
    showSizeSelector ? sizeLabels[availableSizes] : "",
    qualityLabels[quality],
    finishLabels[finish],
  ].filter(Boolean);

  const summaryLine = summaryParts.join(" • ");
  const leadTime = "от 3 дней";

  const orderMessage = buildOrderMessage({
    shape,
    size: availableSizes,
    finish,
    quality,
    showSize: showSizeSelector,
  });

  function handleShapeChange(nextShape: Shape) {
    vibrate();
    setShape(nextShape);
    pulse();

    if (!isSizeAvailable(nextShape, availableSizes)) {
      setSize(getInitialSize(nextShape));
    }
  }

  function handleSizeChange(nextSize: Size) {
    if (!isSizeAvailable(shape, nextSize)) {
      return;
    }

    vibrate();
    setSize(nextSize);
    pulse();
  }

  function handleFinishChange(nextFinish: Finish) {
    vibrate();
    setFinish(nextFinish);
    pulse();
  }

  function handleQualityChange(nextQuality: Quality) {
    vibrate();
    setQuality(nextQuality);
    pulse();
  }

  async function handleCopyMessage() {
    await copyMessage(
      orderMessage,
      "Сообщение скопировано. Вставьте его в чат.",
      "Не удалось скопировать. Текст можно выделить вручную.",
    );
  }

  function handleMessengerClick(target: MessengerKey) {
    // Open messenger URL synchronously (within user gesture to avoid popup blocking)
    // The URL already contains the pre-filled message — no need to copy
    const targetUrl = buildMessengerUrl(target, orderMessage);
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  }

  const showGallery = resolvedMatch.images.length > 0 && (resolvedMatch.galleryState === "exact" || resolvedMatch.galleryState === "fallback");

  return (
    <div className={`${styles.layout} ${!(showGallery && resolvedMatch.images.length > 1) ? styles.layoutNoThumbs : ""}`}>
      {/* Left column: thumbnail strip (desktop only, hidden on mobile via CSS) */}
      <div className={styles.thumbnailStripCol} aria-label="Миниатюры">
        <div className={styles.thumbnailStripInner}>
          {showGallery && resolvedMatch.images.length > 1 && resolvedMatch.images.slice(0, 17).map((image, index) => (
            <motion.button
              key={image.url}
              aria-label={`Показать изображение ${index + 1}`}
              aria-pressed={index === activeImageIndex}
              className={`${styles.stripThumb} ${index === activeImageIndex ? styles.stripThumbActive : ""}`}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={subtleSpring}
              onClick={() => setActiveImageIndex(index)}
            >
              <Image
                alt={image.alt}
                className={styles.stripThumbImage}
                height={80}
                width={80}
                loading="lazy"
                sizes="80px"
                src={image.url}
                style={getImageCropStyleRequired(image, isMobile)}
                unoptimized
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Center column: main photo */}
      <section className={styles.mediaColumn} aria-label="Фото кашпо">
        <div className={styles.mediaFrame}>
          <ImageGallery
            activeIndex={activeImageIndex}
            caption={summaryLine}
            images={resolvedMatch.images}
            note={
              resolvedMatch.galleryState === "fallback" && resolvedMatch.matchType !== "shape_size_color"
                ? "Показан близкий вариант из каталога"
                : null
            }
            onActiveIndexChange={setActiveImageIndex}
            placeholderTitle="Ваше кашпо"
            placeholderSubtitle={`${shapeLabels[shape]}${showSizeSelector ? " " + sizeLabels[availableSizes] : ""}`}
            state={resolvedMatch.galleryState}
          />
        </div>
      </section>

      {/* Right column: options + order card */}
      <section className={styles.controlsColumn} aria-label="Параметры кашпо" ref={controlsRef}>
        <div className={styles.controls}>
          {/* Desktop top summary bar — hidden on mobile */}
          <div className={styles.topBar}>
            <p className={styles.topBarTitle}>Кашпо Волома</p>
            <p className={styles.topBarPriceSecondary}>
              <span ref={topPriceRef}>{formatPrice(total)}</span>
            </p>
          </div>

          <ConfiguratorControls
            finish={finish}
            onFinishChange={handleFinishChange}
            onQualityChange={handleQualityChange}
            onShapeChange={handleShapeChange}
            onSizeChange={handleSizeChange}
            quality={quality}
            shape={shape}
            size={availableSizes}
          />

          {/* Desktop specs button — above order card */}
          <button
            className={styles.specsButton}
            type="button"
            onClick={() => setSpecsOpen(true)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M6 7V5a2 2 0 012-2h8a2 2 0 012 2v2" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            Упаковка и комплектация
          </button>

          {/* Desktop order card */}
          <div className={styles.summaryBar}>
            <div className={styles.summaryBarLeft}>
              <p className={styles.summaryBarPrice}>
                {formatPrice(total)}
              </p>
              <p className={styles.summaryBarConfig}>{summaryLine}</p>
              <p className={styles.summaryBarDelivery}>Изготовим за {leadTime}</p>
            </div>
            <div className={styles.summaryBarRight}>
              <button
                className={styles.summaryBarButton}
                type="button"
                onClick={() => setSheetOpen(true)}
              >
                <span className={styles.desktopCtaButtonIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M21.2 4.8 18 19.9c-.2.9-.7 1.1-1.5.7L11.6 17l-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.1 9.2-8.3c.4-.4-.1-.6-.6-.2L5.8 13.4.9 11.9c-1-.3-1-.9.2-1.4L20 3.2c.9-.3 1.6.2 1.2 1.6Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                Написать менеджеру
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Specs modal (desktop + mobile) */}
      <SpecsModal
        isOpen={specsOpen}
        shape={shape}
        size={availableSizes}
        onClose={() => setSpecsOpen(false)}
      />

      {/* Sticky bottom CTA (mobile) */}
      <StickyMobileCTA
        copyStatus={copyStatus}
        isOpen={sheetOpen}
        message={orderMessage}
        price={total}
        pricePulseKey={0}
        selectionLine={summaryLine}
        onClose={() => setSheetOpen(false)}
        onCopyMessage={handleCopyMessage}
        onMessengerClick={handleMessengerClick}
        onOpen={() => setSheetOpen(true)}
      />
    </div>
  );
}
