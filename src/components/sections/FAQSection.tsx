"use client";

import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { fadeSlideUp, staggerContainer, staggerChild, viewportOptions, subtleSpring } from "@/lib/animations";
import { siteContent } from "@/content/site-content";

import { SectionContainer } from "../ui/SectionContainer";
import styles from "./faq-section.module.css";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <SectionContainer>
      <div className={styles.list}>
        <motion.h2
          className={styles.title}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={fadeSlideUp}
        >
          Частые вопросы
        </motion.h2>
        <motion.div
          variants={staggerContainer(0.06, 0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          {siteContent.faq.map((item, index) => (
            <motion.div
              variants={staggerChild}
              className={styles.item}
              key={item.question}
            >
              <motion.button
                className={styles.trigger}
                type="button"
                onClick={() => toggle(index)}
                whileTap={{ scale: 0.98 }}
                transition={subtleSpring}
              >
                <span className={styles.question}>{item.question}</span>
                <motion.span
                  className={styles.chevron}
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  +
                </motion.span>
              </motion.button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    className={styles.answerWrapper}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
                      opacity: { duration: 0.2, ease: "linear" },
                    }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className={styles.answerContent}>
                      <motion.p
                        className={styles.answerText}
                        initial={{ y: -8, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1], delay: 0.05 }}
                      >
                        {item.answer}
                      </motion.p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionContainer>
  );
}
