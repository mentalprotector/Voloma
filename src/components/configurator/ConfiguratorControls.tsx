"use client";

import { FINISHES, QUALITIES, SIZES, type Finish, type Quality, type Shape, type Size } from "@/types/product";
import { finishLabels, qualityLabels, shapeLabels, sizeLabels, woodTypeHints } from "@/content/site-content";
import { getDimensions, hasSizeOptions, isSizeAvailable } from "@/config/availability";
import { WHEELS_AVAILABLE } from "@/config/pricing";

import { InfoTooltip } from "./InfoTooltip";
import styles from "./configurator.module.css";

interface ConfiguratorControlsProps {
  shape: Shape;
  size: Size;
  finish: Finish;
  quality: Quality;
  wheels: boolean;
  onShapeChange: (shape: Shape) => void;
  onSizeChange: (size: Size) => void;
  onFinishChange: (finish: Finish) => void;
  onQualityChange: (quality: Quality) => void;
  onWheelsToggle: () => void;
}

const shapeIcons: Record<Shape, string> = {
  narrow: styles.shapeIconLong,
  square: styles.shapeIconSquare,
  rect: styles.shapeIconRect,
};

const finishSwatchStyles: Record<Finish, string> = {
  natural: "#e8d5b7",
  oak_stain: "#c4a265",
  rosewood_stain: "#6b3a2a",
};

/** Finish labels with optional price surcharge */
const finishDisplayLabels: Record<Finish, string> = {
  natural: "Без отделки",
  oak_stain: "Под дуб +800 ₽",
  rosewood_stain: "Под палисандр +800 ₽",
};

/** Short finish labels for desktop swatches */
const finishShortLabels: Record<Finish, string> = {
  natural: "Натуральная",
  oak_stain: "Дуб",
  rosewood_stain: "Палисандр",
};

/** Price surcharge for finish options */
const finishPrices: Record<Finish, string> = {
  natural: "",
  oak_stain: "+800 ₽",
  rosewood_stain: "+800 ₽",
};

const finishHints: Record<Finish, string> = {
  natural: "Натуральная сосна без дополнительной обработки",
  oak_stain: "Декоративная пропитка под дуб. Доплата 800 ₽.",
  rosewood_stain: "Декоративная пропитка под палисандр. Доплата 800 ₽.",
};

const wheelsHint = "Скрытые колёсики для удобного перемещения";

export function ConfiguratorControls({
  shape,
  size,
  finish,
  quality,
  wheels,
  onShapeChange,
  onSizeChange,
  onFinishChange,
  onQualityChange,
  onWheelsToggle,
}: ConfiguratorControlsProps) {
  const shapeOptions: Shape[] = ["narrow", "square", "rect"];
  const showSizeSelector = hasSizeOptions(shape);
  const wheelsAvailable = WHEELS_AVAILABLE(shape, size);

  return (
    <div className={styles.selectors}>
      {/* Shape */}
      <section className={styles.optionGroup} aria-labelledby="config-shape-label">
        <p className={styles.optionLabel} id="config-shape-label">
          Форма
        </p>
        <div className={[styles.optionControls, styles.segmentedControls].join(" ")}>
          {shapeOptions.map((item) => (
            <button
              key={item}
              aria-pressed={shape === item}
              className={[styles.pill, shape === item ? styles.pillActive : ""].filter(Boolean).join(" ")}
              type="button"
              onClick={() => onShapeChange(item)}
            >
              <span
                aria-hidden="true"
                className={[styles.shapeIcon, shapeIcons[item], shape === item ? styles.shapeIconActive : ""]
                  .filter(Boolean)
                  .join(" ")}
              />
              {shapeLabels[item]}
            </button>
          ))}
        </div>
      </section>

      {/* Size — only shown for shapes that have multiple sizes (narrow: S/M/L) */}
      {showSizeSelector && (
        <section className={styles.optionGroup} aria-labelledby="config-size-label">
          <p className={styles.optionLabel} id="config-size-label">
            Размер
          </p>
          <div className={[styles.optionControls, styles.segmentedControls].join(" ")}>
            {SIZES.map((item) => {
              const isAvailable = isSizeAvailable(shape, item);

              return (
                <button
                  key={item}
                  aria-disabled={!isAvailable}
                  aria-pressed={size === item}
                  className={[
                    styles.pill,
                    size === item ? styles.pillActive : "",
                    !isAvailable ? styles.pillDisabled : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  disabled={!isAvailable}
                  type="button"
                  onClick={() => onSizeChange(item)}
                >
                  {sizeLabels[item]}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Dimensions info block */}
      <section className={styles.dimensionsBlock} aria-label="Габариты">
        <div className={styles.dimensionsGrid}>
          <div className={styles.dimensionCard}>
            <p className={styles.dimensionCardTitle}>Внешние габариты</p>
            <p className={styles.dimensionCardValue}>
              {getDimensions(shape, size).external.l} × {getDimensions(shape, size).external.w} × {getDimensions(shape, size).external.h} мм
            </p>
          </div>
          <div className={styles.dimensionCard}>
            <span className={styles.dimensionCardHint}>для подбора горшка</span>
            <p className={styles.dimensionCardTitle}>Внутренние размеры</p>
            <p className={styles.dimensionCardValue}>
              {getDimensions(shape, size).internal.l} × {getDimensions(shape, size).internal.w} × {getDimensions(shape, size).internal.h} мм
            </p>
          </div>
        </div>
      </section>

      {/* Finish (stain/color treatment) — SINGLE option with 3 choices */}
      <section className={styles.optionGroup} aria-labelledby="config-finish-label">
        <span className={styles.optionLabelWithHint}>
          <p className={styles.optionLabel} id="config-finish-label">
            Пропитка
          </p>
          <InfoTooltip text={finishHints[finish]} />
        </span>
        <div className={[styles.optionControls, styles.swatchControls].join(" ")}>
          {FINISHES.map((item) => (
            <button
              key={item}
              aria-label={finishDisplayLabels[item]}
              aria-pressed={finish === item}
              className={styles.swatchButton}
              type="button"
              onClick={() => onFinishChange(item)}
            >
              <span
                className={[styles.swatch, finish === item ? styles.swatchActive : ""].filter(Boolean).join(" ")}
                style={{ background: finishSwatchStyles[item] }}
              />
              <span className={styles.swatchLabel}>
                {finishShortLabels[item]}
                {finishPrices[item] ? <span className={styles.swatchPrice}>{finishPrices[item]}</span> : null}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Quality — Standard / Premium */}
      <section className={styles.optionGroup} aria-labelledby="config-quality-label">
        <span className={styles.optionLabelWithHint}>
          <p className={styles.optionLabel} id="config-quality-label">
            Тип дерева
          </p>
          <InfoTooltip text={woodTypeHints[quality]} />
        </span>
        <div className={[styles.optionControls, styles.chipControls].join(" ")}>
          {QUALITIES.map((item) => (
            <button
              key={item}
              aria-pressed={quality === item}
              className={[styles.chip, quality === item ? styles.chipActive : ""].filter(Boolean).join(" ")}
              type="button"
              onClick={() => onQualityChange(item)}
            >
              {qualityLabels[item]}
            </button>
          ))}
        </div>
      </section>

      {/* Wheels — hidden for narrow S */}
      {wheelsAvailable && (
        <section className={styles.optionGroup} aria-labelledby="config-wheels-label">
          <span className={styles.optionLabelWithHint}>
            <p className={styles.optionLabel} id="config-wheels-label">
              Колёсики
            </p>
            <InfoTooltip text={wheelsHint} />
          </span>
          <div className={[styles.optionControls, styles.chipControls].join(" ")}>
            <button
              aria-pressed={!wheels}
              className={[styles.chip, !wheels ? styles.chipActive : ""].filter(Boolean).join(" ")}
              type="button"
              onClick={() => {
                if (wheels) onWheelsToggle();
              }}
            >
              Нет
            </button>
            <button
              aria-pressed={wheels}
              className={[styles.chip, wheels ? styles.chipActive : ""].filter(Boolean).join(" ")}
              type="button"
              onClick={() => {
                if (!wheels) onWheelsToggle();
              }}
            >
              Есть
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
