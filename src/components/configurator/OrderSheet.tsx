"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import type { MessengerKey } from "@/types/messenger";

import { useFocusTrap } from "@/hooks/useFocusTrap";
import { overlayFade, sheetSpring } from "@/lib/animations";
import { MaxIcon, TelegramIcon } from "./MessengerIcons";
import styles from "./order-sheet.module.css";

interface OrderSheetProps {
  isOpen: boolean;
  message: string;
  copyStatus: string | null;
  onClose: () => void;
  onCopyMessage: () => void;
  onMessengerClick: (target: MessengerKey) => void;
}

const copyButtonAnimation = {
  idle: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.92 },
  success: {
    scale: [0.92, 1.05, 1],
    transition: {
      duration: 0.3,
      ease: "easeOut" as const,
    },
  },
};

export function OrderSheet({
  isOpen,
  message,
  copyStatus,
  onClose,
  onCopyMessage,
  onMessengerClick,
}: OrderSheetProps) {
  const focusTrapRef = useFocusTrap<HTMLDivElement>(isOpen);

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

  if (!isOpen) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          role="presentation"
          onClick={onClose}
          variants={overlayFade}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.section
            ref={focusTrapRef}
            role="dialog"
            aria-modal="true"
            aria-label="Отправить запрос"
            className={styles.sheet}
            onClick={(event) => event.stopPropagation()}
            variants={sheetSpring}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className={styles.handle} aria-hidden="true" />
            <h2 className={styles.title}>Выберите мессенджер или скопируйте текст заказа.</h2>

            {/* Primary CTA: Telegram */}
            <button
              className={styles.telegramButton}
              type="button"
              onClick={() => onMessengerClick("telegram")}
            >
              <span className={styles.ctaIcon} aria-hidden="true">
                <TelegramIcon />
              </span>
              Написать менеджеру в Telegram
            </button>

            {/* Secondary messenger options */}
            <div className={styles.messengers}>
              <button className={styles.messengerButton} type="button" onClick={() => onMessengerClick("vk")}>
                <span className={styles.messengerIconVk} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4.92 7.88c.12 5.73 2.88 9.18 7.73 9.18h.28v-3.27c1.83.18 3.21 1.52 3.77 3.27h2.59c-.72-2.62-2.61-4.06-3.79-4.62 1.18-.68 2.83-2.33 3.22-4.56h-2.36c-.5 1.81-2.03 3.46-3.43 3.61V7.88h-2.36v6.32c-1.42-.36-3.22-2.13-3.3-6.32H4.92Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                ВК
              </button>
              <button className={styles.messengerButton} type="button" onClick={() => onMessengerClick("max")}>
                <span className={styles.messengerIconMax} aria-hidden="true">
                  <MaxIcon />
                </span>
                Макс
              </button>
            </div>

            {/* Preview with copy button inside */}
            <div className={styles.preview}>
              <p className={styles.previewLabel}>Текст заказа</p>
              <div className={styles.previewContent}>
                <pre className={styles.previewText}>{message}</pre>
                <motion.button
                  className={[styles.copyButton, copyStatus ? styles.copyButtonSuccess : ""].filter(Boolean).join(" ")}
                  type="button"
                  onClick={onCopyMessage}
                  aria-label="Скопировать текст заказа"
                  variants={copyButtonAnimation}
                  initial="idle"
                  whileHover="hover"
                  whileTap="tap"
                  animate={copyStatus ? "success" : "idle"}
                >
                  <motion.span
                    className={styles.copyIcon}
                    aria-hidden="true"
                    animate={copyStatus ? { scale: [0, 1.2, 1] } : { scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {copyStatus ? (
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    )}
                  </motion.span>
                </motion.button>
              </div>
            </div>

            <button className={styles.closeButton} type="button" onClick={onClose}>
              Закрыть
            </button>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
