"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import {
  fadeSlideUp,
  fadeScale,
  staggerContainer,
  staggerChild,
  viewportOptions,
} from "@/lib/animations";
import styles from "./why-voloma-new-section.module.css";

const facts = [
  "Готово за 3 рабочих дня",
  "Колёсики в комплекте",
  "Гидроизоляция в комплекте",
  "Доставка по всей России",
];

export function WhyVolomaNewSection() {
  return (
    <section className={styles.section}>
      <motion.img
        src="/images/landing/plant.jpg"
        alt="Несколько кашпо Voloma с растениями — детали и фактура дерева"
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
          Продумано<br />
          до мелочей
        </h2>
        <motion.div
          className={styles.pills}
          variants={staggerContainer(0.08, 0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          {facts.map((fact) => (
            <motion.span className={styles.pill} key={fact} variants={staggerChild}>
              {fact}
            </motion.span>
          ))}
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={fadeSlideUp}
          custom={0.5}
        >
          <Link className={styles.cta} href="/configurator">
            Собрать своё кашпо
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
