"use client";

import type { MessengerKey } from "@/types/messenger";

import { formatPrice } from "@/lib/format";
import { usePriceAnimation } from "@/hooks/usePriceAnimation";
import { OrderSheet } from "./OrderSheet";
import styles from "./sticky-mobile-cta.module.css";

interface StickyMobileCTAProps {
  copyStatus: string | null;
  isOpen: boolean;
  message: string;
  price: number;
  pricePulseKey: number;
  selectionLine: string;
  onClose: () => void;
  onCopyMessage: () => void;
  onMessengerClick: (target: MessengerKey) => void;
  onOpen: () => void;
}

export function StickyMobileCTA({
  copyStatus,
  isOpen,
  message,
  price,
  selectionLine,
  onClose,
  onCopyMessage,
  onMessengerClick,
  onOpen,
}: StickyMobileCTAProps) {
  const { elementRef: priceRef } = usePriceAnimation();

  return (
    <>
      <div className={styles.bar} data-cta>
        <div className={styles.barInner}>
          <div className={styles.infoRow}>
            <div className={styles.infoLeft}>
              <p className={styles.selection}>{selectionLine}</p>
            </div>
            <div className={styles.priceColumn}>
              <p className={styles.price}>
                <span ref={priceRef}>{formatPrice(price)}</span>
              </p>
            </div>
          </div>
          <div className={styles.buttonRow}>
            <button
              className={styles.cta}
              type="button"
              onClick={onOpen}
            >
              <span className={styles.icon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0Z"
                    fill="currentColor"
                    opacity="0.16"
                  />
                  <path
                    d="m8.62 12.16 7.24-2.8c.34-.12.64.08.53.58l-1.23 5.8c-.08.41-.31.51-.64.32l-1.87-1.38-.9.87c-.1.1-.18.18-.39.18l.14-1.95 3.56-3.22c.15-.14-.03-.21-.24-.14l-4.4 2.77-1.9-.59c-.42-.13-.43-.42.1-.64Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              Написать менеджеру
            </button>
          </div>
        </div>
      </div>

      <OrderSheet
        isOpen={isOpen}
        message={message}
        copyStatus={copyStatus}
        onClose={onClose}
        onCopyMessage={onCopyMessage}
        onMessengerClick={onMessengerClick}
      />
    </>
  );
}
