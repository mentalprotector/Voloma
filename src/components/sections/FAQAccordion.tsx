"use client";

import { useState } from "react";

import { motion } from "framer-motion";

import { fadeSlideUp, staggerContainer, staggerChild, viewportOptions, subtleSpring } from "@/lib/animations";

import styles from "./faq-section.module.css";

function renderAnswer(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }

    return part;
  });
}

export function FAQAccordion({ items }: { items: Array<{ question: string; answer: string }> }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
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
        {items.map((item, index) => (
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
            <motion.div
              className={styles.answerWrapper}
              aria-hidden={openIndex !== index}
              initial={false}
              animate={{ gridTemplateRows: openIndex === index ? "1fr" : "0fr" }}
              transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className={styles.answerContent}>
                <motion.p
                  className={styles.answerText}
                  initial={false}
                  animate={{
                    opacity: openIndex === index ? 1 : 0,
                    y: openIndex === index ? 0 : -4,
                  }}
                  transition={{
                    opacity: { duration: openIndex === index ? 0.18 : 0.08, ease: "linear" },
                    y: { duration: 0.22, ease: [0.25, 0.1, 0.25, 1] },
                  }}
                >
                  {renderAnswer(item.answer)}
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
