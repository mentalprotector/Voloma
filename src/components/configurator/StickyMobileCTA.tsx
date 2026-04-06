"use client";

import { useEffect } from "react";

import styles from "./sticky-mobile-cta.module.css";

type MessengerKey = "telegram" | "vk" | "max";

interface StickyMobileCTAProps {
  isOpen: boolean;
  message: string;
  price: number;
  productName: string;
  selectionLine: string;
  copyStatus: string | null;
  onOpen: () => void;
  onClose: () => void;
  onMessengerClick: (target: MessengerKey) => void;
}

export function StickyMobileCTA({
  isOpen,
  message,
  price,
  productName,
  selectionLine,
  copyStatus,
  onOpen,
  onClose,
  onMessengerClick,
}: StickyMobileCTAProps) {
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <>
      <div className={styles.bar}>
        <div className={styles.barInner}>
          <div className={styles.summary}>
            <p className={styles.name}>{productName}</p>
            <p className={styles.selection}>{selectionLine}</p>
          </div>
          <p className={styles.price}>{price.toLocaleString("ru-RU")} ₽</p>
          <button className={styles.cta} type="button" onClick={onOpen}>
            {copyStatus ? "✓ Заявка отправлена" : "Обсудить заказ"}
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className={styles.overlay} role="presentation" onClick={onClose}>
          <section
            aria-label="Выбор мессенджера"
            className={styles.sheet}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.handle} aria-hidden="true" />
            <h2 className={styles.title}>Куда отправить запрос?</h2>
            <p className={styles.subtitle}>Сообщение уже подготовлено.</p>
            <div className={styles.actions}>
              <button className={styles.actionButton} type="button" onClick={() => onMessengerClick("telegram")}>
                Telegram
              </button>
              <button className={styles.actionButton} type="button" onClick={() => onMessengerClick("vk")}>
                VK
              </button>
              <button className={styles.actionButton} type="button" onClick={() => onMessengerClick("max")}>
                MAX
              </button>
            </div>
            <div className={styles.preview}>
              <p className={styles.previewLabel}>Текст сообщения</p>
              <pre className={styles.previewText}>{message}</pre>
            </div>
            {copyStatus ? (
              <p className={styles.copyStatus} aria-live="polite">
                {copyStatus}
              </p>
            ) : null}
            <button className={styles.closeButton} type="button" onClick={onClose}>
              Закрыть
            </button>
          </section>
        </div>
      ) : null}
    </>
  );
}
