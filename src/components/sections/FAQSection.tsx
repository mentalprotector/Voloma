"use client";

import { useState } from "react";

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
      <h2 className={styles.title}>Частые вопросы</h2>
      <div className={styles.list}>
        {siteContent.faq.map((item, index) => (
          <div
            className={[styles.item, openIndex === index ? styles.itemOpen : ""]
              .filter(Boolean)
              .join(" ")}
            key={item.question}
          >
            <button
              className={styles.trigger}
              onClick={() => toggle(index)}
              type="button"
            >
              <span className={styles.question}>{item.question}</span>
              <span className={styles.chevron}>
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            <div className={styles.answerWrapper}>
              <div className={styles.answerContent}>
                <p className={styles.answerText}>{item.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
