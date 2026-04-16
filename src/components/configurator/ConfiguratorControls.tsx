"use client";

"use client";

import { useState } from "react";

import { FINISHES, QUALITIES, SIZES, type Finish, type Quality, type Shape, type Size } from "@/types/product";
import { finishHint, qualityLabels, shapeLabels, sizeLabels, woodTypeHints } from "@/content/site-content";
import { hasSizeOptions, isSizeAvailable } from "@/config/availability";
import { BASE_PRICES, STAIN_SURCHARGE } from "@/config/pricing";
import { cn } from "@/lib/format";
import { useRelativePricing } from "@/hooks/useRelativePricing";

import { AnimatedPill } from "./AnimatedPill";
import { AnimatedChip } from "./AnimatedChip";
import { AnimatedSwatch } from "./AnimatedSwatch";
import { InfoTooltip } from "./InfoTooltip";
import { DimensionsModal } from "./DimensionsModal";
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


/** Finish labels without price surcharge (prices handled by relative pricing hook) */
const finishDisplayLabels: Record<Finish, string> = {
  natural: "Без отделки",
  oak_stain: "Под дуб",
  rosewood_stain: "Под палисандр",
};

/** Short finish labels for desktop swatches */
const finishShortLabels: Record<Finish, string> = {
  natural: "Натуральная",
  oak_stain: "Дуб",
  rosewood_stain: "Палисандр",
};

/** Finish options with priceExtra for relative pricing calculation */
const finishOptions = FINISHES.map((id) => ({
  id,
  priceExtra: id === "natural" ? 0 : STAIN_SURCHARGE,
}));

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
  const [showDimensions, setShowDimensions] = useState(false);

  const noWheelsNote = shape === "narrow" && size === "s";

  // Calculate relative price badges for finish options
  const finishWithBadges = useRelativePricing(finishOptions, finish);

  // Size options: priceExtra = base price for this size with current shape+quality
  const sizeOptions = SIZES.map((id) => ({
    id,
    priceExtra: isSizeAvailable(shape, id) ? BASE_PRICES[shape][quality][id] : Infinity,
  }));
  const sizesWithBadges = useRelativePricing(sizeOptions, size);

  // Quality options: priceExtra = base price for this quality with current shape+size
  const qualityPricingOptions = QUALITIES.map((id) => ({
    id,
    priceExtra: BASE_PRICES[shape][id][size],
  }));
  const qualitiesWithBadges = useRelativePricing(qualityPricingOptions, quality);

  return (
    <div className={styles.selectors}>
      {/* Shape */}
      <section className={styles.optionGroup} aria-labelledby="config-shape-label">
        <p className={styles.optionLabel} id="config-shape-label">
          Форма
        </p>
        <div className={cn(styles.optionControls, styles.segmentedControls)}>
          {shapeOptions.map((item) => (
            <AnimatedPill
              key={item}
              isActive={shape === item}
              type="button"
              onClick={() => onShapeChange(item)}
            >
              <span
                aria-hidden="true"
                className={cn(styles.shapeIcon, shapeIcons[item], shape === item && styles.shapeIconActive)}
              />
              {shapeLabels[item]}
            </AnimatedPill>
          ))}
        </div>
      </section>

      {/* Size — hidden for single-size shapes, space reserved */}
      <section className={cn(styles.optionGroup, !showSizeSelector && styles.optionGroupHidden)} aria-labelledby="config-size-label">
        <p className={styles.optionLabel} id="config-size-label">
          Размер
        </p>
        <div className={cn(styles.optionControls, styles.segmentedControls)}>
          {sizesWithBadges.map(({ option, displayBadge }) => {
            const isAvailable = isSizeAvailable(shape, option.id as Size);

            return (
              <AnimatedPill
                key={option.id}
                isDisabled={!isAvailable}
                isActive={size === option.id}
                badge={displayBadge}
                type="button"
                onClick={() => onSizeChange(option.id as Size)}
              >
                {sizeLabels[option.id as Size]}
              </AnimatedPill>
            );
          })}
        </div>
      </section>

      {/* Dimensions button — opens modal with sizes & compatibility */}
      <button
        className={styles.dimensionsButton}
        type="button"
        onClick={() => setShowDimensions(true)}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M3 9h18M9 3v18" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
        Размеры и совместимость
      </button>

      {/* Finish (stain/color treatment) — SINGLE option with 3 choices */}
      <section className={styles.optionGroup} aria-labelledby="config-finish-label">
        <span className={styles.optionLabelWithHint}>
          <p className={styles.optionLabel} id="config-finish-label">
            Пропитка
          </p>
          <InfoTooltip text={finishHint} />
        </span>
        <div className={cn(styles.optionControls, styles.swatchControls)}>
          {finishWithBadges.map(({ option, displayBadge }) => {
            const parsed = displayBadge ? displayBadge.match(/^([+\-])\s*(.+)$/) : null;

            return (
              <AnimatedSwatch
                key={option.id}
                ariaLabel={finishDisplayLabels[option.id as Finish]}
                isActive={finish === option.id}
                type="button"
                onClick={() => onFinishChange(option.id as Finish)}
              >
                <span className={cn(styles.swatchButtonInner, styles[`swatchButtonInner_${option.id}`])}>
                  <span className={styles.swatchButtonDot} />
                  {parsed && <span className={styles.swatchButtonPrice}>{parsed[1]}{parsed[2]}</span>}
                </span>
                <span className={styles.swatchLabel}>
                  {finishShortLabels[option.id as Finish]}
                </span>
              </AnimatedSwatch>
            );
          })}
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
          {qualitiesWithBadges.map(({ option, displayBadge }) => (
            <AnimatedChip
              key={option.id}
              isActive={quality === option.id}
              badge={displayBadge}
              type="button"
              onClick={() => onQualityChange(option.id as Quality)}
            >
              {qualityLabels[option.id as Quality]}
            </AnimatedChip>
          ))}
        </div>
      </section>

      {/* Micro-note for narrow S: no wheels */}
      {noWheelsNote && (
        <p className={styles.noWheelsNote}>Узкое S поставляется без колёсиков</p>
      )}

      <DimensionsModal
        isOpen={showDimensions}
        shape={shape}
        size={size}
        onClose={() => setShowDimensions(false)}
      />
    </div>
  );
}
