"use client";

import { useMemo, useState } from "react";

import { getInitialSize, isSizeAvailable } from "@/config/availability";
import { calculateTotalPrice } from "@/config/pricing";
import { colorLabels, shapeLabels, sizeLabels } from "@/content/site-content";
import { productVariants } from "@/data/product-variants";
import { useCopyToClipboard, usePriceAnimation, useVibration } from "@/hooks";
import { buildMessengerUrl } from "@/lib/messenger-links";
import { resolveVariantMatch } from "@/lib/product-matching";
import type { MessengerKey } from "@/types/messenger";
import type { Color, Quality, Shape, Size } from "@/types/product";

import { ConfiguratorControls } from "./ConfiguratorControls";
import { ImageGallery } from "./ImageGallery";
import { StickyMobileCTA } from "./StickyMobileCTA";
import styles from "./configurator.module.css";

const woodTypeLabels: Record<Quality, string> = {
  standard: "Стандарт",
  premium: "Без сучков +800 ₽",
};

export function Configurator() {
  const [shape, setShape] = useState<Shape>("rect");
  const [size, setSize] = useState<Size>("m");
  const [color, setColor] = useState<Color>("oak");
  const [woodType, setWoodType] = useState<Quality>("standard");
  const [wheels, setWheels] = useState(false);
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
      color,
      quality: woodType,
    }),
    [availableSizes, color, shape, woodType],
  );

  const resolvedMatch = resolveVariantMatch(productVariants, selection);
  const total = calculateTotalPrice(shape, availableSizes, {
    isPremiumWood: woodType === "premium",
    hasWheels: wheels,
  });

  const summaryLine = `${shapeLabels[shape]} · ${sizeLabels[availableSizes]} · ${colorLabels[color]}`;
  const leadTime = "7–10 дней";
  const wheelsLabel = wheels ? "+ колёсики" : null;
  const summaryMeta = [wheelsLabel, leadTime].filter(Boolean).join(" · ");
  const placeholderSubtitle = `${shapeLabels[shape]} · ${sizeLabels[availableSizes]} · ${colorLabels[color]}`;

  const orderMessage = `Здравствуйте!
Хочу заказать кашпо Voloma:
Форма: ${shapeLabels[shape]}
Размер: ${sizeLabels[availableSizes]}
Цвет: ${colorLabels[color]}
Тип дерева: ${woodTypeLabels[woodType]}
Колёсики: ${wheels ? "Да" : "Нет"}
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

  function handleColorChange(nextColor: Color) {
    vibrate();
    setColor(nextColor);
  }

  function handleWoodTypeChange(nextWoodType: Quality) {
    vibrate();
    setWoodType(nextWoodType);
    pulse();
  }

  function handleWheelsToggle() {
    vibrate();
    setWheels((current) => !current);
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
            key={resolvedMatch.matchedVariant?.slug ?? `${shape}-${availableSizes}-${color}-${woodType}`}
            images={resolvedMatch.images}
            note={resolvedMatch.galleryState === "fallback" ? "Показан близкий вариант из каталога" : null}
            placeholderTitle="Ваше кашпо"
            placeholderSubtitle={placeholderSubtitle}
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
            color={color}
            onColorChange={handleColorChange}
            onShapeChange={handleShapeChange}
            onSizeChange={handleSizeChange}
            onWoodTypeChange={handleWoodTypeChange}
            onWheelsToggle={handleWheelsToggle}
            shape={shape}
            size={availableSizes}
            wheels={wheels}
            woodType={woodType}
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
        summaryMeta={summaryMeta}
        onClose={() => setSheetOpen(false)}
        onCopyMessage={handleCopyMessage}
        onMessengerClick={handleMessengerClick}
        onOpen={() => setSheetOpen(true)}
      />
    </div>
  );
}
