"use client";

import { trackEvent } from "@/lib/analytics";

import { Button } from "../ui/Button";
import styles from "./custom-order-card.module.css";

interface CustomOrderCardProps {
  onCustomOrderClick: () => void;
}

export function CustomOrderCard({ onCustomOrderClick }: CustomOrderCardProps) {
  return (
    <section className={styles.card}>
      <div>
        <p className={styles.title}>Нужен свой размер или оттенок?</p>
        <p className={styles.description}>
          Оставьте запрос на индивидуальное изготовление или напишите напрямую, если нужно быстро
          обсудить проект.
        </p>
      </div>
      <div className={styles.actions}>
        <Button
          size="lg"
          variant="secondary"
          onClick={onCustomOrderClick}
        >
          Обсудить кастомный вариант
        </Button>
        <a
          className={styles.link}
          href="mailto:hello@voloma.ru?subject=Voloma%20custom%20order"
          onClick={() => trackEvent("contact_click", { source: "custom_order_card" })}
        >
          Написать на hello@voloma.ru
        </a>
      </div>
    </section>
  );
}
