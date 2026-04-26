"use client";

import type { MessengerKey } from "@/types/messenger";

import { formatPrice } from "@/lib/format";
import { usePriceAnimation } from "@/hooks/usePriceAnimation";
import { TelegramIcon } from "./MessengerIcons";
import { OrderSheet } from "./OrderSheet";
import styles from "./sticky-mobile-cta.module.css";

interface StickyMobileCTAProps {
  copyStatus: string | null;
  isOpen: boolean;
  message: string;
  messengerUrls: Record<MessengerKey, string>;
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
  messengerUrls,
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
                <TelegramIcon />
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
        messengerUrls={messengerUrls}
        onClose={onClose}
        onCopyMessage={onCopyMessage}
        onMessengerClick={onMessengerClick}
      />
    </>
  );
}
