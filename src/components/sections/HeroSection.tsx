"use client";

import { useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

import {
  heroStaggerContainer,
  heroChild,
  priceFadeScale,
} from "@/lib/animations";
import { ScrollCue } from "@/components/ui/ScrollCue";
import styles from "./hero-section.module.css";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useSyncExternalStore(
    (onStoreChange) => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      mediaQuery.addEventListener("change", onStoreChange);
      return () => mediaQuery.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Subtle parallax: background image moves at 30% scroll speed
  const heroImageY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["0%", "15%"],
  );
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.3]);

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.shell}>
        <div className={styles.hero}>
          <motion.div
            className={styles.media}
            style={{ y: heroImageY, opacity: heroOpacity }}
            initial={prefersReducedMotion ? false : { scale: 1.05, opacity: 0 }}
            animate={{ scale: prefersReducedMotion ? 1 : 1, opacity: prefersReducedMotion ? 1 : 1 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <picture className={styles.picture}>
              <source
                media="(min-width: 768px)"
                srcSet="/images/hero/voloma-hero-desktop.webp"
                type="image/webp"
              />
              <source srcSet="/images/hero/voloma-hero-mobile.webp" type="image/webp" />
              <img
                alt="Деревянные кашпо Волома из карельской сосны для интерьера — различные формы и размеры"
                className={styles.image}
                fetchPriority="high"
                src="/images/hero/voloma-hero-mobile.webp"
                width={800}
                height={600}
              />
            </picture>
          </motion.div>

          <motion.div variants={heroStaggerContainer} initial="hidden" animate="visible">
            <Link href="/configurator" className={styles.copy}>
            <motion.p className={styles.subtitle} variants={heroChild}>
              Для дома, террасы и сада.
            </motion.p>
            <motion.h1 className={styles.title} variants={heroChild}>
              Деревянные кашпо из карельской сосны
            </motion.h1>
            <motion.p className={styles.priceAnchor} variants={priceFadeScale}>
              от 1 900 ₽ · готово от 1 до 3х дней · сборка за 10 минут
            </motion.p>
            <motion.div variants={heroChild}>
              <span className={styles.ctaButton}>
                Собрать своё кашпо
              </span>
            </motion.div>
            </Link>
          </motion.div>

          <ScrollCue className={styles.scrollHint} variant="light" />
        </div>
      </div>
    </section>
  );
}
