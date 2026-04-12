"use client";

import { motion } from "framer-motion";

import { fadeSlideUp, fadeScale, viewportOptions } from "@/lib/animations";
import styles from "./material-section.module.css";

export function MaterialSection() {
  return (
    <section className={styles.section}>
      <motion.img
        src="/images/landing/Фактура.jpg"
        alt="Фактура карельской сосны крупным планом"
        className={styles.image}
        loading="eager"
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
          Сделано из<br />
          карельской сосны.
        </h2>
        <p className={styles.body}>
          Сырьё высшего качества
          с благородным рисунком.
        </p>
      </motion.div>
    </section>
  );
}
