"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { fadeSlideUp, fadeScale, viewportOptions } from "@/lib/animations";
import styles from "./plant-section.module.css";

export function PlantSection() {
  return (
    <section className={styles.section}>
      <motion.img
        src="/images/landing/с живым.jpg"
        alt="Кашпо Voloma с живым растением"
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
          Под любое растение —<br />
          от балконного ящика до напольного
        </h2>
        <Link className={styles.link} href="/configurator">
          Смотреть все модели →
        </Link>
      </motion.div>
    </section>
  );
}
