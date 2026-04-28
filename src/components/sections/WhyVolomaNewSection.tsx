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
import { publicPath } from "@/lib/public-path";
import styles from "./why-voloma-new-section.module.css";

const facts = [
  "Готово от 1 до 3х дней",
  "Сборка за 10 минут",
  "Колёсики в комплекте",
  "Гидроизоляция в комплекте",
];

export function WhyVolomaNewSection() {
  return (
    <section className={styles.section}>
      <motion.img
        src={publicPath("/images/landing/plant.jpg")}
        alt="Деревянные кашпо Волома с растениями — преимущества: быстрое изготовление, колёсики в комплекте, разборная конструкция"
        className={styles.image}
        loading="lazy"
        width={1200}
        height={800}
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
