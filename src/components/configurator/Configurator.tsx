"use client";

import { useEffect, useState } from "react";

import { colorLabels, qualityLabels, shapeLabels, sizeLabels } from "@/content/site-content";
import { productVariants } from "@/data/product-variants";
import { trackEvent } from "@/lib/analytics";
import {
  getAvailableColors,
  getAvailableQualities,
  getAvailableShapes,
  getAvailableSizes,
  getInitialSelection,
  reconcileSelection,
} from "@/lib/product-options";
import { resolveVariantMatch, selectionToSlug } from "@/lib/product-matching";
import { COLORS, QUALITIES, SHAPES, SIZES, type Color, type Quality, type Shape, type Size } from "@/types/product";

import { CustomOrderCard } from "./CustomOrderCard";
import { ImageGallery } from "./ImageGallery";
import { OptionSelector } from "./OptionSelector";
import { PlaceholderGallery } from "./PlaceholderGallery";
import { ProductSummary } from "./ProductSummary";
import { QualityInfoCard } from "./QualityInfoCard";
import { RequestForm } from "./RequestForm";
import { StickyMobileCTA } from "./StickyMobileCTA";
import styles from "./configurator.module.css";

type FormMode = "standard" | "custom";

export function Configurator() {
  const [selection, setSelection] = useState(() => getInitialSelection(productVariants));
  const [formMode, setFormMode] = useState<FormMode>("standard");

  const resolvedMatch = resolveVariantMatch(productVariants, selection);
  const availableShapes = getAvailableShapes(productVariants);
  const availableSizes = getAvailableSizes(productVariants, selection.shape);
  const availableColors = getAvailableColors(productVariants, selection.shape, selection.size);
  const availableQualities = getAvailableQualities(
    productVariants,
    selection.shape,
    selection.size,
    selection.color,
  );

  useEffect(() => {
    trackEvent("configurator_open", {
      initialSlug: selectionToSlug(selection),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function scrollToForm() {
    document.getElementById("request-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function startCustomOrder(source: string) {
    trackEvent("custom_order_click", { source, slug: selectionToSlug(selection) });
    setFormMode("custom");
    scrollToForm();
  }

  function updateSelection<K extends "shape" | "size" | "color" | "quality">(
    key: K,
    value: K extends "shape"
      ? Shape
      : K extends "size"
        ? Size
        : K extends "color"
          ? Color
          : Quality,
  ) {
    const nextSelection = reconcileSelection(productVariants, {
      ...selection,
      [key]: value,
    });

    setSelection(nextSelection);
    setFormMode("standard");

    const eventMap = {
      shape: "option_shape_select",
      size: "option_size_select",
      color: "option_color_select",
      quality: "option_quality_select",
    } as const;

    trackEvent(eventMap[key], {
      selected: String(value),
      slug: selectionToSlug(nextSelection),
    });
  }

  return (
    <>
      <div className={styles.layout}>
        <div className={styles.mediaColumn}>
          {resolvedMatch.images.length > 0 ? (
            <ImageGallery
              key={resolvedMatch.matchedVariant?.slug ?? resolvedMatch.placeholder.slug}
              images={resolvedMatch.images}
              label={resolvedMatch.label}
              title={resolvedMatch.matchedVariant?.title ?? resolvedMatch.placeholder.title}
            />
          ) : (
            <PlaceholderGallery data={resolvedMatch.placeholder} label={resolvedMatch.label} />
          )}
        </div>
        <div className={styles.controlsColumn}>
          <ProductSummary
            matchedVariant={resolvedMatch.matchedVariant}
            matchType={resolvedMatch.matchType}
            selection={selection}
          />
          <div className={styles.selectors}>
            <OptionSelector
              description="Сначала выберите общий характер изделия."
              options={SHAPES.map((shape) => ({
                value: shape,
                label: shapeLabels[shape],
                disabled: !availableShapes.includes(shape),
              }))}
              selectedValue={selection.shape}
              title="Форма"
              onChange={(value) => updateSelection("shape", value as Shape)}
            />
            <OptionSelector
              description="Доступные размеры зависят от выбранной формы."
              options={SIZES.map((size) => ({
                value: size,
                label: sizeLabels[size],
                disabled: !availableSizes.includes(size),
              }))}
              selectedValue={selection.size}
              title="Размер"
              onChange={(value) => updateSelection("size", value as Size)}
            />
            <OptionSelector
              description="Только реальные оттенки из локального источника данных."
              options={COLORS.map((color) => ({
                value: color,
                label: colorLabels[color],
                disabled: !availableColors.includes(color),
              }))}
              selectedValue={selection.color}
              title="Оттенок"
              onChange={(value) => updateSelection("color", value as Color)}
            />
            <OptionSelector
              description="Разница в степени визуального отбора древесины."
              options={QUALITIES.map((quality) => ({
                value: quality,
                label: qualityLabels[quality],
                disabled: !availableQualities.includes(quality),
              }))}
              selectedValue={selection.quality}
              title="Качество"
              onChange={(value) => updateSelection("quality", value as Quality)}
            />
          </div>
          <QualityInfoCard />
          <CustomOrderCard onCustomOrderClick={() => startCustomOrder("custom_order_card")} />
        </div>
      </div>
      <RequestForm matchType={resolvedMatch.matchType} mode={formMode} selection={selection} />
      <StickyMobileCTA
        onPrimaryClick={scrollToForm}
        onSecondaryClick={() => startCustomOrder("sticky_mobile_cta")}
      />
    </>
  );
}
