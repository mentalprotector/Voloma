"use client";

import { useSyncExternalStore } from "react";

import {
  IS_YANDEX_METRIKA_CONFIGURED,
  TRACKING_CONSENT_STORAGE_KEY,
  YandexMetrika,
} from "@/lib/yandex-metrika";

import styles from "./tracking-consent.module.css";

type ConsentState = "accepted" | "declined" | "pending";

const consentChangeEvent = "voloma-tracking-consent-change";

function getConsentSnapshot(): ConsentState {
  const storedConsent = window.localStorage.getItem(TRACKING_CONSENT_STORAGE_KEY);

  return storedConsent === "accepted" || storedConsent === "declined" ? storedConsent : "pending";
}

function getServerConsentSnapshot(): ConsentState {
  return "pending";
}

function subscribeToConsentChanges(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(consentChangeEvent, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(consentChangeEvent, onStoreChange);
  };
}

export function TrackingConsent() {
  const consent = useSyncExternalStore(
    subscribeToConsentChanges,
    getConsentSnapshot,
    getServerConsentSnapshot,
  );

  const updateConsent = (nextConsent: Exclude<ConsentState, "pending">) => {
    window.localStorage.setItem(TRACKING_CONSENT_STORAGE_KEY, nextConsent);
    window.dispatchEvent(new Event(consentChangeEvent));
  };

  if (!IS_YANDEX_METRIKA_CONFIGURED) {
    return null;
  }

  return (
    <>
      <YandexMetrika enabled={consent === "accepted"} />
      {consent === "pending" ? (
        <section className={styles.banner} aria-label="Согласие на аналитику">
          <p className={styles.title}>Аналитика сайта</p>
          <p className={styles.text}>
            Яндекс.Метрика поможет понять, какие разделы полезны посетителям. Включим её только
            после вашего согласия.
          </p>
          <div className={styles.actions}>
            <button className={styles.acceptButton} type="button" onClick={() => updateConsent("accepted")}>
              Разрешить
            </button>
            <button className={styles.declineButton} type="button" onClick={() => updateConsent("declined")}>
              Только необходимые
            </button>
          </div>
        </section>
      ) : null}
    </>
  );
}
