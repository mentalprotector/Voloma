"use client";

import { COLORS, QUALITIES, SIZES, type Color, type Quality, type Shape, type Size } from "@/types/product";
import { colorLabels, shapeLabels, sizeLabels, woodTypeHints } from "@/content/site-content";
import { isSizeAvailable } from "@/config/availability";

import { InfoTooltip } from "./InfoTooltip";
import styles from "./configurator.module.css";

interface ConfiguratorControlsProps {
  shape: Shape;
  size: Size;
  color: Color;
  woodType: Quality;
  wheels: boolean;
  onShapeChange: (shape: Shape) => void;
  onSizeChange: (size: Size) => void;
  onColorChange: (color: Color) => void;
  onWoodTypeChange: (woodType: Quality) => void;
  onWheelsToggle: () => void;
}

const shapeIcons: Record<Shape, string> = {
  square: styles.shapeIconSquare,
  rect: styles.shapeIconRect,
  long: styles.shapeIconLong,
};

const colorSwatchStyles: Record<Color, string> = {
  oak: "#d4a96a",
  walnut: "#7a4f2e",
  charcoal: "#3a3a3a",
};

const woodTypeLabels: Record<Quality, string> = {
  standard: "Стандарт",
  premium: "Без сучков +800 ₽",
};

const wheelsHint = "Скрытые колёсики для удобного перемещения";
const sizeHint = "Подбирается автоматически в зависимости от формы";

export function ConfiguratorControls({
  shape,
  size,
  color,
  woodType,
  wheels,
  onShapeChange,
  onSizeChange,
  onColorChange,
  onWoodTypeChange,
  onWheelsToggle,
}: ConfiguratorControlsProps) {
  const shapeOptions: Shape[] = ["square", "rect", "long"];

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

      {/* Size */}
      <section className={styles.optionGroup} aria-labelledby="config-size-label">
        <span className={styles.optionLabelWithHint}>
          <p className={styles.optionLabel} id="config-size-label">
            Размер
          </p>
          <InfoTooltip text={sizeHint} />
        </span>
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

      {/* Color */}
      <section className={styles.optionGroup} aria-labelledby="config-color-label">
        <p className={styles.optionLabel} id="config-color-label">
          Цвет
        </p>
        <div className={[styles.optionControls, styles.swatchControls].join(" ")}>
          {COLORS.map((item) => (
            <button
              key={item}
              aria-label={colorLabels[item]}
              aria-pressed={color === item}
              className={styles.swatchButton}
              type="button"
              onClick={() => onColorChange(item)}
            >
              <span
                className={[styles.swatch, color === item ? styles.swatchActive : ""].filter(Boolean).join(" ")}
                style={{ background: colorSwatchStyles[item] }}
              />
              <span className={styles.swatchLabel}>{colorLabels[item]}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Quality — compact chips */}
      <section className={styles.optionGroup} aria-labelledby="config-quality-label">
        <span className={styles.optionLabelWithHint}>
          <p className={styles.optionLabel} id="config-quality-label">
            Тип дерева
          </p>
          <InfoTooltip text={woodTypeHints[woodType]} />
        </span>
        <div className={[styles.optionControls, styles.chipControls].join(" ")}>
          {QUALITIES.map((item) => (
            <button
              key={item}
              aria-pressed={woodType === item}
              className={[styles.chip, woodType === item ? styles.chipActive : ""].filter(Boolean).join(" ")}
              type="button"
              onClick={() => onWoodTypeChange(item)}
            >
              {woodTypeLabels[item]}
            </button>
          ))}
        </div>
      </section>

      {/* Wheels — compact chip */}
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
            Есть +500 ₽
          </button>
        </div>
      </section>
    </div>
  );
}
