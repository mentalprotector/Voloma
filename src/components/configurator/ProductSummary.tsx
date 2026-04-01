import {
  availabilityLabels,
  colorLabels,
  qualityLabels,
  shapeLabels,
  sizeLabels,
} from "@/content/site-content";
import type { MatchType, ProductVariant, VariantSelection } from "@/types/product";

import styles from "./product-summary.module.css";

const currencyFormatter = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  maximumFractionDigits: 0,
});

interface ProductSummaryProps {
  selection: VariantSelection;
  matchedVariant: ProductVariant | null;
  matchType: MatchType;
}

function formatDimensions(variant: ProductVariant | null) {
  if (!variant?.dimensions) {
    return null;
  }

  const { length, width, height } = variant.dimensions;
  return [length, width, height].filter(Boolean).join(" × ");
}

export function ProductSummary({
  selection,
  matchedVariant,
  matchType,
}: ProductSummaryProps) {
  const title =
    matchType === "exact" && matchedVariant
      ? matchedVariant.title
      : `${shapeLabels[selection.shape]} кашпо ${sizeLabels[selection.size]}, ${colorLabels[
          selection.color
        ].toLowerCase()}, ${qualityLabels[selection.quality].toLowerCase()}`;

  const dimensions = formatDimensions(matchedVariant);

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Ваш вариант</p>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <dl className={styles.grid}>
        <div>
          <dt>Форма</dt>
          <dd>{shapeLabels[selection.shape]}</dd>
        </div>
        <div>
          <dt>Размер</dt>
          <dd>{sizeLabels[selection.size]}</dd>
        </div>
        <div>
          <dt>Оттенок</dt>
          <dd>{colorLabels[selection.color]}</dd>
        </div>
        <div>
          <dt>Качество</dt>
          <dd>{qualityLabels[selection.quality]}</dd>
        </div>
        {dimensions ? (
          <div>
            <dt>Габариты</dt>
            <dd>{dimensions} см</dd>
          </div>
        ) : null}
        {typeof matchedVariant?.price === "number" ? (
          <div>
            <dt>Ориентир по цене</dt>
            <dd>{currencyFormatter.format(matchedVariant.price)}</dd>
          </div>
        ) : null}
        {matchedVariant?.availability ? (
          <div>
            <dt>Статус</dt>
            <dd>{availabilityLabels[matchedVariant.availability]}</dd>
          </div>
        ) : null}
      </dl>
      {matchType !== "exact" ? (
        <p className={styles.note}>
          Текущие параметры сохранены точно. Если рядом показан близкий вариант, его размеры и
          срок служат ориентиром.
        </p>
      ) : null}
    </section>
  );
}

