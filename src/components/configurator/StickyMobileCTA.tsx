"use client";

import type { MessengerKey } from "@/types/messenger";

import { cn, formatPrice } from "@/lib/format";
import { usePriceAnimation } from "@/hooks/usePriceAnimation";
import { OrderSheet } from "./OrderSheet";
import styles from "./sticky-mobile-cta.module.css";

interface StickyMobileCTAProps {
  copied: boolean;
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
  copied,
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
      <div className={styles.bar}>
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
          <button
            className={cn(styles.cta, copied && styles.ctaCopied)}
            type="button"
            onClick={onOpen}
          >
            <span className={styles.icon} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21.2 4.8 18 19.9c-.2.9-.7 1.1-1.5.7L11.6 17l-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.1 9.2-8.3c.4-.4-.1-.6-.6-.2L5.8 13.4.9 11.9c-1-.3-1-.9.2-1.4L20 3.2c.9-.3 1.6.2 1.2 1.6Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            Написать менеджеру
          </button>
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
