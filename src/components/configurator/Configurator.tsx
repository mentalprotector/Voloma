"use client";

import { useMemo, useState } from "react";

import { getInitialSize, hasSizeOptions, isSizeAvailable } from "@/config/availability";
import { calculateTotalPrice } from "@/config/pricing";
import { finishLabels, shapeLabels, sizeLabels } from "@/content/site-content";
import { productVariants } from "@/data/product-variants";
import { useCopyToClipboard, useDynamicScroll, usePriceAnimation, useVibration } from "@/hooks";
import { buildMessengerUrl } from "@/lib/messenger-links";
import { resolveVariantMatch } from "@/lib/product-matching";
import type { MessengerKey } from "@/types/messenger";
import type { Finish, Quality, Shape, Size } from "@/types/product";

import { ConfiguratorControls } from "./ConfiguratorControls";
import { ImageGallery } from "./ImageGallery";
import { StickyMobileCTA } from "./StickyMobileCTA";
import styles from "./configurator.module.css";

const qualityLabels: Record<Quality, string> = {
  standard: "Стандарт",
  premium: "Премиум",
};

export function Configurator() {
  const [shape, setShape] = useState<Shape>("narrow");
  const [size, setSize] = useState<Size>("m");
  const [finish, setFinish] = useState<Finish>("natural");
  const [quality, setQuality] = useState<Quality>("standard");
  const [sheetOpen, setSheetOpen] = useState(false);

  useDynamicScroll();

  const { vibrate } = useVibration();
  const { pulse, elementRef: topPriceRef } = usePriceAnimation();
  const {
    status: copyStatus,
    copy: copyMessage,
  } = useCopyToClipboard();

  const availableSizes = useMemo(() => {
    if (!isSizeAvailable(shape, size)) {
      return getInitialSize(shape);
    }
    return size;
  }, [shape, size]);

  const selection = useMemo(
    () => ({
      shape,
      size: availableSizes,
      color: "natural" as const,
      quality,
    }),
    [availableSizes, quality, shape],
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
  const leadTime = "7–10 дней";

  const finishLabel = finish === "natural" ? "Без отделки (натуральная сосна)" : finishLabels[finish];

  const orderMessage = `Здравствуйте!
Хочу заказать кашпо Voloma:
Модель: ${shapeLabels[shape]}${showSizeSelector ? " " + sizeLabels[availableSizes] : ""}
Тип дерева: ${qualityLabels[quality]}
Пропитка: ${finishLabel}
Ориентир по стоимости: ${total.toLocaleString("ru-RU")} ₽`;

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

  async function handleMessengerClick(target: MessengerKey) {
    await copyMessage(
      orderMessage,
      "Сообщение скопировано. Вставьте его в чат.",
      "Сообщение не скопировалось. Возьмите текст из превью ниже.",
    );

    const targetUrl = buildMessengerUrl(target, orderMessage);
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div className={styles.layout}>
      {/* Media */}
      <section className={styles.mediaColumn} aria-label="Фото кашпо">
        <div className={styles.mediaFrame}>
          <ImageGallery
            key={resolvedMatch.matchedVariant?.slug ?? `${shape}-${availableSizes}`}
            caption={summaryLine}
            images={resolvedMatch.images}
            note={resolvedMatch.galleryState === "fallback" ? "Показан близкий вариант из каталога" : null}
            placeholderTitle="Ваше кашпо"
            placeholderSubtitle={`${shapeLabels[shape]}${showSizeSelector ? " " + sizeLabels[availableSizes] : ""}`}
            state={resolvedMatch.galleryState}
          />
        </div>
      </section>

      {/* Controls */}
      <section className={styles.controlsColumn} aria-label="Параметры кашпо">
        <div className={styles.controls}>
          {/* Desktop top summary bar — hidden on mobile */}
          <div className={styles.topBar}>
            <p className={styles.topBarTitle}>Кашпо Voloma</p>
            <p className={styles.topBarPriceSecondary}>
              <span ref={topPriceRef}>{total.toLocaleString("ru-RU")} ₽</span>
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

          {/* Desktop sticky CTA */}
          <div className={styles.summaryBar}>
            <div className={styles.summaryBarLeft}>
              <p className={styles.summaryBarPrice}>
                {total.toLocaleString("ru-RU")} ₽
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

      {/* Sticky bottom CTA (mobile) */}
      <StickyMobileCTA
        copied={Boolean(copyStatus)}
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
