"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import type { MessengerKey } from "@/types/messenger";

import { overlayFade, sheetSpring } from "@/lib/animations";
import styles from "./order-sheet.module.css";

interface OrderSheetProps {
  isOpen: boolean;
  message: string;
  copyStatus: string | null;
  onClose: () => void;
  onCopyMessage: () => void;
  onMessengerClick: (target: MessengerKey) => void;
}

const toastAnimation = {
  hidden: {
    opacity: 0,
    y: -20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
};

const copyButtonAnimation = {
  idle: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.92 },
  success: {
    scale: [0.92, 1.05, 1],
    transition: {
      duration: 0.3,
      ease: "easeOut",
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
  const prevStatusRef = useRef<string | null>(null);

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

  useEffect(() => {
    prevStatusRef.current = copyStatus;
  }, [copyStatus]);

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
            aria-label="Отправить запрос"
            className={styles.sheet}
            onClick={(event) => event.stopPropagation()}
            variants={sheetSpring}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Toast notification overlay */}
            <AnimatePresence>
              {copyStatus && (
                <motion.div
                  className={styles.toast}
                  variants={toastAnimation}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <span className={styles.toastIcon} aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {copyStatus}
                </motion.div>
              )}
            </AnimatePresence>

            <div className={styles.handle} aria-hidden="true" />
            <h2 className={styles.title}>Отправить запрос</h2>
            <p className={styles.subtitle}>Выберите мессенджер или скопируйте текст заказа.</p>

            {/* Primary CTA: Telegram */}
            <button
              className={styles.telegramButton}
              type="button"
              onClick={() => onMessengerClick("telegram")}
            >
              <span className={styles.ctaIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M21.2 4.8 18 19.9c-.2.9-.7 1.1-1.5.7L11.6 17l-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.1 9.2-8.3c.4-.4-.1-.6-.6-.2L5.8 13.4.9 11.9c-1-.3-1-.9.2-1.4L20 3.2c.9-.3 1.6.2 1.2 1.6Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              Написать менеджеру в Telegram
            </button>

            {/* Secondary messenger options */}
            <div className={styles.messengers}>
              <button className={styles.messengerButton} type="button" onClick={() => onMessengerClick("vk")}>
                <span className={styles.messengerIconVk} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.755 21.58c-6.84 0-10.173-4.637-10.313-11.76h3.22c.093 4.824 2.044 6.884 3.64 7.28V7.02h2.8v5.073c1.576-.167 3.186-1.97 3.67-4.073h2.8A7.773 7.773 0 0116.1 11.32c1.473 1.547 3.633 3.073 5.46 3.26h3.22c-.187 5.06-3.02 7.1-3.02 7.1h-2.8s-.627-.667-1.547-1.667c-.96-1.04-1.813-1.96-2.587-2.16V21.58h-2.066Z" fill="#0077FF"/>
                  </svg>
                </span>
                VK
              </button>
              <button className={styles.messengerButton} type="button" onClick={() => onMessengerClick("max")}>
                <span className={styles.messengerIconMax} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#7B61FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                MAX
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
