"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { colorLabels, qualityLabels, shapeLabels, sizeLabels } from "@/content/site-content";
import { productVariants } from "@/data/product-variants";
import {
  getAvailableColors,
  getAvailableQualities,
  getAvailableShapes,
  getAvailableSizes,
  getInitialSelection,
  reconcileSelection,
} from "@/lib/product-options";
import { resolveVariantMatch } from "@/lib/product-matching";
import {
  COLORS,
  QUALITIES,
  SHAPES,
  SIZES,
  type Color,
  type ProductVariant,
  type Quality,
  type Shape,
  type Size,
} from "@/types/product";

import { ImageGallery } from "./ImageGallery";
import { StickyMobileCTA } from "./StickyMobileCTA";
import styles from "./configurator.module.css";

type WheelsOption = "with" | "without";
type MessengerKey = "telegram" | "vk" | "max";
type ConfigStep = "shape" | "size" | "color" | "quality" | "wheels";

const wheelsLabels: Record<WheelsOption, string> = {
  with: "С колёсиками",
  without: "Без колёсиков",
};

const colorSwatchStyles: Record<Color, string> = {
  oak: "linear-gradient(135deg, #d9bc8f 0%, #b98f5c 100%)",
  walnut: "linear-gradient(135deg, #8e643f 0%, #5c3a1f 100%)",
  charcoal: "linear-gradient(135deg, #66625d 0%, #343231 100%)",
};

const messengerTargets: Record<MessengerKey, string> = {
  telegram: "https://t.me/share/url?url=https%3A%2F%2Fvoloma.ru%2Fconfigurator",
  vk: "https://vk.com/share.php?url=https%3A%2F%2Fvoloma.ru%2Fconfigurator",
  max: "https://max.ru/",
};

function getSizeDimensions(variants: ProductVariant[], shape: Shape, size: Size) {
  const variant = variants.find((item) => item.shape === shape && item.size === size);

  if (!variant?.dimensions?.length || !variant.dimensions.width || !variant.dimensions.height) {
    return "Размер уточним";
  }

  return `${variant.dimensions.length}×${variant.dimensions.width}×${variant.dimensions.height} см`;
}

function buildMessage(selection: {
  shape: Shape;
  size: Size;
  color: Color;
  quality: Quality;
  wheels: WheelsOption;
}) {
  return `Здравствуйте!
Хочу кашпо:
${shapeLabels[selection.shape]}, ${sizeLabels[selection.size]}, ${colorLabels[
    selection.color
  ]}, ${qualityLabels[selection.quality]}, ${wheelsLabels[selection.wheels]}`;
}

async function copyToClipboard(text: string) {
  if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function Configurator() {
  const [selection, setSelection] = useState(() => getInitialSelection(productVariants));
  const [wheels, setWheels] = useState<WheelsOption>("without");
  const [activeStep, setActiveStep] = useState<ConfigStep>("shape");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const hasMountedRef = useRef(false);
  const stepRefs = useRef<Record<ConfigStep, HTMLDivElement | null>>({
    shape: null,
    size: null,
    color: null,
    quality: null,
    wheels: null,
  });

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

  const selectionWithWheels = useMemo(
    () => ({
      ...selection,
      wheels,
    }),
    [selection, wheels],
  );

  const orderMessage = buildMessage(selectionWithWheels);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" as ScrollBehavior,
    });
  }, []);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    const element = stepRefs.current[activeStep];

    if (!element) {
      return;
    }

    window.setTimeout(() => {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);
  }, [activeStep]);

  function advanceToStep(step: ConfigStep) {
    setActiveStep(step);
  }

  function getStepValue(step: ConfigStep) {
    if (step === "shape") {
      return shapeLabels[selection.shape];
    }

    if (step === "size") {
      return sizeLabels[selection.size];
    }

    if (step === "color") {
      return colorLabels[selection.color];
    }

    if (step === "quality") {
      return qualityLabels[selection.quality];
    }

    return wheelsLabels[wheels];
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
    setSelection((current) =>
      reconcileSelection(productVariants, {
        ...current,
        [key]: value,
      }),
    );

    if (key === "shape") {
      advanceToStep("size");
    } else if (key === "size") {
      advanceToStep("color");
    } else if (key === "color") {
      advanceToStep("quality");
    } else {
      advanceToStep("wheels");
    }
  }

  async function openMessenger(target: MessengerKey) {
    const copied = await copyToClipboard(orderMessage);
    const textParam = encodeURIComponent(orderMessage);
    const targetUrl =
      target === "telegram"
        ? `${messengerTargets.telegram}&text=${textParam}`
        : target === "vk"
          ? `${messengerTargets.vk}&comment=${textParam}`
          : messengerTargets.max;

    window.open(targetUrl, "_blank", "noopener,noreferrer");
    setCopyStatus(copied ? "Сообщение скопировано. Вставьте его в чат." : "Скопируйте текст вручную.");
  }

  return (
    <>
      <div className={styles.layout}>
        <div className={styles.mediaColumn}>
          <ImageGallery
            key={resolvedMatch.matchedVariant?.slug ?? resolvedMatch.placeholder.slug}
            images={resolvedMatch.images}
            placeholderTitle={resolvedMatch.placeholder.title}
            state={resolvedMatch.galleryState}
            note={resolvedMatch.galleryState === "fallback" ? "Показан близкий вариант" : null}
          />
        </div>
        <div className={styles.controlsColumn}>
          <section className={styles.selectors} aria-label="Выбор параметров кашпо">
            <div
              className={[styles.group, activeStep === "shape" ? styles.groupOpen : ""].filter(Boolean).join(" ")}
              ref={(element) => {
                stepRefs.current.shape = element;
              }}
            >
              <button
                aria-controls="config-step-shape"
                aria-expanded={activeStep === "shape"}
                className={styles.groupToggle}
                type="button"
                onClick={() => advanceToStep("shape")}
              >
                <span className={styles.groupTitle}>1. Форма</span>
                <span className={styles.groupValue}>{getStepValue("shape")}</span>
              </button>
              <div className={styles.groupPanel} id="config-step-shape">
                <div className={styles.shapeGrid}>
                  {SHAPES.map((shape) => (
                    <button
                      key={shape}
                      aria-pressed={selection.shape === shape}
                      disabled={!availableShapes.includes(shape)}
                      className={[
                        styles.shapeButton,
                        selection.shape === shape ? styles.shapeButtonActive : "",
                        !availableShapes.includes(shape) ? styles.optionDisabled : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      type="button"
                      onClick={() => updateSelection("shape", shape)}
                    >
                      <span
                        className={[
                          styles.shapeIcon,
                          shape === "square"
                            ? styles.square
                            : shape === "rect"
                              ? styles.rect
                              : styles.long,
                        ].join(" ")}
                        aria-hidden="true"
                      />
                      <span className={styles.shapeLabel}>{shapeLabels[shape]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div
              className={[styles.group, activeStep === "size" ? styles.groupOpen : ""].filter(Boolean).join(" ")}
              ref={(element) => {
                stepRefs.current.size = element;
              }}
            >
              <button
                aria-controls="config-step-size"
                aria-expanded={activeStep === "size"}
                className={styles.groupToggle}
                type="button"
                onClick={() => advanceToStep("size")}
              >
                <span className={styles.groupTitle}>2. Размер</span>
                <span className={styles.groupValue}>{getStepValue("size")}</span>
              </button>
              <div className={styles.groupPanel} id="config-step-size">
                <div className={styles.sizeGrid}>
                  {SIZES.map((size) => {
                    const isAvailable = availableSizes.includes(size);

                    return (
                      <button
                        key={size}
                        aria-pressed={selection.size === size}
                        className={[
                          styles.sizeChip,
                          selection.size === size ? styles.sizeChipActive : "",
                          !isAvailable ? styles.optionDisabled : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        disabled={!isAvailable}
                        type="button"
                        onClick={() => updateSelection("size", size)}
                      >
                        <span className={styles.sizeLabel}>{sizeLabels[size]}</span>
                        <span className={styles.sizeMeta}>
                          {isAvailable
                            ? getSizeDimensions(productVariants, selection.shape, size)
                            : "Нет в этой форме"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div
              className={[styles.group, activeStep === "color" ? styles.groupOpen : ""].filter(Boolean).join(" ")}
              ref={(element) => {
                stepRefs.current.color = element;
              }}
            >
              <button
                aria-controls="config-step-color"
                aria-expanded={activeStep === "color"}
                className={styles.groupToggle}
                type="button"
                onClick={() => advanceToStep("color")}
              >
                <span className={styles.groupTitle}>3. Цвет</span>
                <span className={styles.groupValue}>{getStepValue("color")}</span>
              </button>
              <div className={styles.groupPanel} id="config-step-color">
                <div className={styles.colorGrid}>
                  {COLORS.map((color) => (
                    <button
                      key={color}
                      aria-label={`Цвет: ${colorLabels[color]}`}
                      aria-pressed={selection.color === color}
                      className={[
                        styles.colorButton,
                        selection.color === color ? styles.colorButtonActive : "",
                        !availableColors.includes(color) ? styles.optionDisabled : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      disabled={!availableColors.includes(color)}
                      type="button"
                      onClick={() => updateSelection("color", color)}
                    >
                      <span
                        className={styles.swatch}
                        style={{ background: colorSwatchStyles[color] }}
                        aria-hidden="true"
                      />
                      <span className={styles.colorName}>{colorLabels[color]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div
              className={[styles.group, activeStep === "quality" ? styles.groupOpen : ""].filter(Boolean).join(" ")}
              ref={(element) => {
                stepRefs.current.quality = element;
              }}
            >
              <button
                aria-controls="config-step-quality"
                aria-expanded={activeStep === "quality"}
                className={styles.groupToggle}
                type="button"
                onClick={() => advanceToStep("quality")}
              >
                <span className={styles.groupTitle}>4. Качество</span>
                <span className={styles.groupValue}>{getStepValue("quality")}</span>
              </button>
              <div className={styles.groupPanel} id="config-step-quality">
                <div className={styles.qualityGrid}>
                  {QUALITIES.map((quality) => (
                    <button
                      key={quality}
                      aria-pressed={selection.quality === quality}
                      className={[
                        styles.qualityCard,
                        selection.quality === quality ? styles.qualityCardActive : "",
                        !availableQualities.includes(quality) ? styles.optionDisabled : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      disabled={!availableQualities.includes(quality)}
                      type="button"
                      onClick={() => updateSelection("quality", quality)}
                    >
                      <span className={styles.qualityTitle}>{qualityLabels[quality]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div
              className={[styles.group, activeStep === "wheels" ? styles.groupOpen : ""].filter(Boolean).join(" ")}
              ref={(element) => {
                stepRefs.current.wheels = element;
              }}
            >
              <button
                aria-controls="config-step-wheels"
                aria-expanded={activeStep === "wheels"}
                className={styles.groupToggle}
                type="button"
                onClick={() => advanceToStep("wheels")}
              >
                <span className={styles.groupTitle}>5. Колёсики</span>
                <span className={styles.groupValue}>{getStepValue("wheels")}</span>
              </button>
              <div className={styles.groupPanel} id="config-step-wheels">
                <div className={styles.radioGrid} role="radiogroup" aria-label="Колёсики">
                  {(["without", "with"] as const).map((value) => (
                    <button
                      key={value}
                      aria-checked={wheels === value}
                      className={[styles.radioButton, wheels === value ? styles.radioButtonActive : ""]
                        .filter(Boolean)
                        .join(" ")}
                      role="radio"
                      type="button"
                      onClick={() => {
                        setWheels(value);
                      }}
                    >
                      <span className={styles.radioDot} aria-hidden="true" />
                      <span>{wheelsLabels[value]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <StickyMobileCTA
        copyStatus={copyStatus}
        isOpen={sheetOpen}
        message={orderMessage}
        onClose={() => setSheetOpen(false)}
        onMessengerClick={openMessenger}
        onOpen={() => setSheetOpen(true)}
      />
    </>
  );
}
