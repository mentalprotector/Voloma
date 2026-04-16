"use client";

import { AnimatePresence, motion } from "framer-motion";

import { getDimensions } from "@/config/availability";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { overlayFade, sheetSpring } from "@/lib/animations";
import type { Shape, Size } from "@/types/product";

import styles from "./dimensions-modal.module.css";

interface DimensionsModalProps {
  isOpen: boolean;
  shape: Shape;
  size: Size;
  onClose: () => void;
}

export function DimensionsModal({ isOpen, shape, size, onClose }: DimensionsModalProps) {
  const focusTrapRef = useFocusTrap<HTMLDivElement>(isOpen);
  const dims = getDimensions(shape, size);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          role="presentation"
          onClick={onClose}
          variants={overlayFade}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.section
            ref={focusTrapRef}
            role="dialog"
            aria-modal="true"
            aria-label="Размеры и совместимость"
            className={styles.sheet}
            onClick={(event) => event.stopPropagation()}
            variants={sheetSpring}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className={styles.handle} aria-hidden="true" />

            <div className={styles.header}>
              <h2 className={styles.title}>Размеры и совместимость</h2>
              <button className={styles.closeBtn} type="button" onClick={onClose} aria-label="Закрыть">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* External dimensions */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Внешние габариты</h3>
              <div className={styles.specGrid}>
                <div className={styles.specRow}>
                  <span className={styles.specLabel}>Длина</span>
                  <span className={styles.specValue}>{dims.external.l} мм</span>
                </div>
                <div className={styles.specRow}>
                  <span className={styles.specLabel}>Ширина</span>
                  <span className={styles.specValue}>{dims.external.w} мм</span>
                </div>
                <div className={styles.specRow}>
                  <span className={styles.specLabel}>Высота</span>
                  <span className={styles.specValue}>{dims.external.h} мм</span>
                </div>
              </div>
            </div>

            {/* Internal dimensions */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Внутренние габариты</h3>
              <div className={styles.specGrid}>
                <div className={styles.specRow}>
                  <span className={styles.specLabel}>Длина</span>
                  <span className={styles.specValue}>{dims.internal.l} мм</span>
                </div>
                <div className={styles.specRow}>
                  <span className={styles.specLabel}>Ширина</span>
                  <span className={styles.specValue}>{dims.internal.w} мм</span>
                </div>
                <div className={styles.specRow}>
                  <span className={styles.specLabel}>Глубина</span>
                  <span className={styles.specValue}>{dims.internal.h} мм</span>
                </div>
              </div>
            </div>

            {/* Compatibility */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Совместимость</h3>
              <div className={styles.compatibilityNote}>
                {dims.external.w <= 300
                  ? "Подходит для кашпо и горшков шириной до 170 мм"
                  : dims.external.w <= 500
                    ? "Подходит для кашпо и горшков диаметром до 340 мм"
                    : "Подходит для кашпо и горшков диаметром до 365 мм"}
              </div>
              {/* ТУТ будут данные о совместимости с горшками — точные диаметры и глубина */}
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
