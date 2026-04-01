"use client";

import { Button } from "../ui/Button";
import styles from "./sticky-mobile-cta.module.css";

interface StickyMobileCTAProps {
  onPrimaryClick: () => void;
  onSecondaryClick: () => void;
}

export function StickyMobileCTA({
  onPrimaryClick,
  onSecondaryClick,
}: StickyMobileCTAProps) {
  return (
    <div className={styles.bar}>
      <Button className={styles.primary} size="lg" onClick={onPrimaryClick}>
        Оставить заявку
      </Button>
      <Button size="lg" variant="secondary" onClick={onSecondaryClick}>
        Свой вариант
      </Button>
    </div>
  );
}

