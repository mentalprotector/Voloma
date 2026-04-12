"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { fadeSlideUp, viewportOptions } from "@/lib/animations";
import { siteContent } from "@/content/site-content";

import styles from "./cta-banner-section.module.css";

export function CTABannerSection() {
  const { title, subtitle, cta } = siteContent.ctaBanner;

  return (
    <section className={styles.section}>
      <motion.div
        className={styles.inner}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        variants={fadeSlideUp}
      >
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
        <Link className={styles.ctaButton} href="/configurator">
          {cta}
        </Link>
      </motion.div>
    </section>
  );
}
