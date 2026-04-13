"use client";

import { AnimatePresence, motion } from "framer-motion";

import { getKomplektatsiyaItems, getPackagingSpecs } from "@/config/specs";
import { overlayFade, sheetSpring } from "@/lib/animations";
import type { Shape, Size } from "@/types/product";

import styles from "./specs-modal.module.css";

interface SpecsModalProps {
  isOpen: boolean;
  shape: Shape;
  size: Size;
  onClose: () => void;
}

export function SpecsModal({ isOpen, shape, size, onClose }: SpecsModalProps) {
  const specs = getPackagingSpecs(shape, size);
  const komplektatsiya = getKomplektatsiyaItems(shape, size);

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
            aria-label="Упаковка и комплектация"
            className={styles.sheet}
            onClick={(event) => event.stopPropagation()}
            variants={sheetSpring}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className={styles.handle} aria-hidden="true" />

            <div className={styles.header}>
              <h2 className={styles.title}>Упаковка и комплектация</h2>
              <button className={styles.closeBtn} type="button" onClick={onClose} aria-label="Закрыть">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Packaging dimensions */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <svg className={styles.sectionIcon} width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M6 7V5a2 2 0 012-2h8a2 2 0 012 2v2" stroke="currentColor" strokeWidth="1.5"/>
                  <line x1="12" y1="11" x2="12" y2="17" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                Параметры упаковки
              </h3>
              <div className={styles.specGrid}>
                <div className={styles.specRow}>
                  <span className={styles.specLabel}>Коробка (Д × Ш × В)</span>
                  <span className={styles.specValue}>
                    {specs.packageLength} × {specs.packageWidth} × {specs.packageHeight} мм
                  </span>
                </div>
                <div className={styles.specRow}>
                  <span className={styles.specLabel}>Вес</span>
                  <span className={styles.specValue}>{specs.weight} кг</span>
                </div>
              </div>
            </div>

            {/* Комплектация */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <svg className={styles.sectionIcon} width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                Комплектация
              </h3>
              <ul className={styles.komplektatsiyaList}>
                {komplektatsiya.map((item) => (
                  <li key={item} className={styles.komplektatsiyaItem}>
                    <svg className={styles.checkIcon} width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              {specs.комплектация === "no_wheels" && (
                <p className={styles.note}>
                  Данная модель поставляется без колёс.
                </p>
              )}
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
