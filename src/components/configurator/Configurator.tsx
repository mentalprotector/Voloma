"use client";

import { useMemo, useState } from "react";

import { getInitialSize, hasSizeOptions, isSizeAvailable } from "@/config/availability";
import { calculateTotalPrice, WHEELS_AVAILABLE } from "@/config/pricing";
import { finishLabels, shapeLabels, sizeLabels } from "@/content/site-content";
import { productVariants } from "@/data/product-variants";
import { useCopyToClipboard, usePriceAnimation, useVibration } from "@/hooks";
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

const finishLabelsShort: Record<Finish, string> = {
  natural: "Без цветной обработки",
  oak_stain: "Под дуб",
  rosewood_stain: "Под палисандр",
};

export function Configurator() {
  const [shape, setShape] = useState<Shape>("narrow");
  const [size, setSize] = useState<Size>("m");
  const [finish, setFinish] = useState<Finish>("natural");
  const [quality, setQuality] = useState<Quality>("standard");
  const [wheels, setWheels] = useState(false);
  const [hasFinishTreatment, setHasFinishTreatment] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);

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
      color: "oak" as const, // legacy field kept for matching
      quality,
    }),
    [availableSizes, quality, shape],
  );

  const resolvedMatch = resolveVariantMatch(productVariants, selection);
  const total = calculateTotalPrice(shape, availableSizes, {
    quality,
    hasFinish: hasFinishTreatment,
    hasWheels: wheels,
  });

  const showSizeSelector = hasSizeOptions(shape);
  const wheelsAvailable = WHEELS_AVAILABLE(shape, availableSizes);

  // Build summary line
  const parts = [`${shapeLabels[shape]}`];
  if (showSizeSelector) {
    parts.push(sizeLabels[availableSizes]);
  }
  parts.push(qualityLabels[quality]);
  parts.push(finishLabelsShort[finish]);
  parts.push(hasFinishTreatment ? "С отделкой" : "Без отделки");
  if (wheelsAvailable && wheels) {
    parts.push("Колёсики");
  }

  const summaryLine = parts.join(" • ");
  const leadTime = "7–10 дней";

  const orderMessage = `Здравствуйте!
Хочу заказать кашпо Voloma:
Модель: ${shapeLabels[shape]}${showSizeSelector ? " " + sizeLabels[availableSizes] : ""}
Тип дерева: ${qualityLabels[quality]}
Пропитка: ${finishLabels[finish]}
Отделка: ${hasFinishTreatment ? "С отделкой" : "Без отделки (натуральная сосна)"}${wheelsAvailable && wheels ? "\nКолёсики: Да" : ""}
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
  }

  function handleQualityChange(nextQuality: Quality) {
    vibrate();
    setQuality(nextQuality);
    pulse();
  }

  function handleWheelsToggle() {
    vibrate();
    setWheels((current) => !current);
    pulse();
  }

  function handleHasFinishToggle() {
    vibrate();
    setHasFinishTreatment((current) => !current);
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
            key={resolvedMatch.matchedVariant?.slug ?? `${shape}-${availableSizes}-${finish}-${quality}`}
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
          {/* Top summary bar */}
          <div className={styles.topBar}>
            <p className={styles.topBarTitle}>Кашпо Voloma</p>
            <p className={styles.topBarPriceSecondary}>
              <span ref={topPriceRef}>{total.toLocaleString("ru-RU")} ₽</span>
            </p>
          </div>

          <ConfiguratorControls
            finish={finish}
            hasFinishOption={hasFinishTreatment}
            onWheelsToggle={handleWheelsToggle}
            onFinishChange={handleFinishChange}
            onHasFinishToggle={handleHasFinishToggle}
            onQualityChange={handleQualityChange}
            onShapeChange={handleShapeChange}
            onSizeChange={handleSizeChange}
            quality={quality}
            shape={shape}
            size={availableSizes}
            wheels={wheels}
          />

          {/* Desktop sticky CTA */}
          <div className={styles.desktopCta}>
            <div className={styles.desktopCtaInfo}>
              <p className={styles.desktopCtaPrice}>
                {total.toLocaleString("ru-RU")} ₽
              </p>
              <p className={styles.desktopCtaSummary}>{summaryLine}</p>
              <p className={styles.desktopCtaMeta}>Изготовим за {leadTime}</p>
            </div>
            <button
              className={styles.desktopCtaPrimary}
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
      </section>

      {/* Sticky bottom CTA (mobile) */}
      <StickyMobileCTA
        copied={Boolean(copyStatus)}
        copyStatus={copyStatus}
        isOpen={sheetOpen}
        leadTime={leadTime}
        message={orderMessage}
        price={total}
        pricePulseKey={0}
        productName="Кашпо Voloma"
        selectionLine={summaryLine}
        summaryMeta={leadTime}
        onClose={() => setSheetOpen(false)}
        onCopyMessage={handleCopyMessage}
        onMessengerClick={handleMessengerClick}
        onOpen={() => setSheetOpen(true)}
      />
    </div>
  );
}
