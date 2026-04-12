"use client";

import { motion } from "framer-motion";

import { fadeSlideUp, fadeScale, viewportOptions } from "@/lib/animations";
import styles from "./interior-section.module.css";

export function InteriorSection() {
  return (
    <section className={styles.section}>
      <motion.img
        src="/images/landing/DSC_7853-редакт.jpg"
        alt="Кашпо Voloma в реальном интерьере — у стеклянной двери"
        className={styles.image}
        loading="lazy"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        variants={fadeScale}
      />
      <div className={styles.overlay} />
      <motion.div
        className={styles.textBlock}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        variants={fadeSlideUp}
      >
        <h2 className={styles.heading}>
          Выглядит дорого.<br />
          Стоит честно.
        </h2>
        <p className={styles.body}>
          От 1 900 ₽ за готовое изделие —<br />
          с доставкой по всей России.
        </p>
      </motion.div>
    </section>
  );
}
