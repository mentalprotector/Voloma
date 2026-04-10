"use client";

import { FINISHES, QUALITIES, SIZES, type Finish, type Quality, type Shape, type Size } from "@/types/product";
import { finishHint, qualityLabels, shapeLabels, sizeLabels, woodTypeHints } from "@/content/site-content";
import { getDimensions, hasSizeOptions, isSizeAvailable } from "@/config/availability";
import { STAIN_SURCHARGE } from "@/config/pricing";
import { cn, formatPrice } from "@/lib/format";

import { InfoTooltip } from "./InfoTooltip";
import styles from "./configurator.module.css";

interface ConfiguratorControlsProps {
  shape: Shape;
  size: Size;
  finish: Finish;
  quality: Quality;
  onShapeChange: (shape: Shape) => void;
  onSizeChange: (size: Size) => void;
  onFinishChange: (finish: Finish) => void;
  onQualityChange: (quality: Quality) => void;
}

const shapeIcons: Record<Shape, string> = {
  narrow: styles.shapeIconLong,
  square: styles.shapeIconSquare,
  rect: styles.shapeIconRect,
};


/** Finish labels with optional price surcharge */
const surchargeLabel = `+${formatPrice(STAIN_SURCHARGE)}`;
const finishDisplayLabels: Record<Finish, string> = {
  natural: "Без отделки",
  oak_stain: `Под дуб ${surchargeLabel}`,
  rosewood_stain: `Под палисандр ${surchargeLabel}`,
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
  oak_stain: `+${formatPrice(STAIN_SURCHARGE)}`,
  rosewood_stain: `+${formatPrice(STAIN_SURCHARGE)}`,
};

export function ConfiguratorControls({
  shape,
  size,
  finish,
  quality,
  onShapeChange,
  onSizeChange,
  onFinishChange,
  onQualityChange,
}: ConfiguratorControlsProps) {
  const shapeOptions: Shape[] = ["narrow", "square", "rect"];
  const showSizeSelector = hasSizeOptions(shape);

  const noWheelsNote = shape === "narrow" && size === "s";

  return (
    <div className={styles.selectors}>
      {/* Shape */}
      <section className={styles.optionGroup} aria-labelledby="config-shape-label">
        <p className={styles.optionLabel} id="config-shape-label">
          Форма
        </p>
        <div className={cn(styles.optionControls, styles.segmentedControls)}>
          {shapeOptions.map((item) => (
            <button
              key={item}
              aria-pressed={shape === item}
              className={cn(styles.pill, shape === item && styles.pillActive)}
              type="button"
              onClick={() => onShapeChange(item)}
            >
              <span
                aria-hidden="true"
                className={cn(styles.shapeIcon, shapeIcons[item], shape === item && styles.shapeIconActive)}
              />
              {shapeLabels[item]}
            </button>
          ))}
        </div>
      </section>

      {/* Size — hidden for single-size shapes, space reserved */}
      <section className={cn(styles.optionGroup, !showSizeSelector && styles.optionGroupHidden)} aria-labelledby="config-size-label">
        <p className={styles.optionLabel} id="config-size-label">
          Размер
        </p>
        <div className={cn(styles.optionControls, styles.segmentedControls)}>
          {SIZES.map((item) => {
            const isAvailable = isSizeAvailable(shape, item);

            return (
              <button
                key={item}
                aria-disabled={!isAvailable}
                aria-pressed={size === item}
                className={cn(styles.pill, size === item && styles.pillActive, !isAvailable && styles.pillDisabled)}
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

      {/* Dimensions info — compact inline row */}
      <section className={styles.dimensionsRow} aria-label="Размеры (габариты)">
        <span className={styles.dimItem}>
          <span className={styles.dimLabel}>Внешние</span>
          <span className={styles.dimValue}>{getDimensions(shape, size).external.l} × {getDimensions(shape, size).external.w} × {getDimensions(shape, size).external.h} мм</span>
        </span>
        <span className={styles.dimSep}>·</span>
        <span className={styles.dimItem}>
          <span className={styles.dimLabel}>Внутри</span>
          <span className={styles.dimValue}>{getDimensions(shape, size).internal.l} × {getDimensions(shape, size).internal.w} × {getDimensions(shape, size).internal.h} мм</span>
        </span>
      </section>

      {/* Finish (stain/color treatment) — SINGLE option with 3 choices */}
      <section className={styles.optionGroup} aria-labelledby="config-finish-label">
        <span className={styles.optionLabelWithHint}>
          <p className={styles.optionLabel} id="config-finish-label">
            Пропитка
          </p>
          <InfoTooltip text={finishHint} />
        </span>
        <div className={cn(styles.optionControls, styles.swatchControls)}>
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
                className={cn(styles.swatch, styles[`swatch_${item}`], finish === item && styles.swatchActive)}
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
        <div className={cn(styles.optionControls, styles.chipControls)}>
          {QUALITIES.map((item) => (
            <button
              key={item}
              aria-pressed={quality === item}
              className={cn(styles.chip, quality === item && styles.chipActive)}
              type="button"
              onClick={() => onQualityChange(item)}
            >
              {qualityLabels[item]}
            </button>
          ))}
        </div>
      </section>

      {/* Micro-note for narrow S: no wheels */}
      {noWheelsNote && (
        <p className={styles.noWheelsNote}>Узкое S поставляется без колёсиков</p>
      )}
    </div>
  );
}
