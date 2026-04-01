"use client";

import { trackEvent } from "@/lib/analytics";

import styles from "./site-footer.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <p className={styles.brand}>Voloma</p>
          <p className={styles.caption}>Деревянные кашпо для спокойных интерьеров.</p>
        </div>
        <a
          className={styles.contact}
          href="mailto:hello@voloma.ru"
          onClick={() => trackEvent("contact_click", { source: "footer_email" })}
        >
          hello@voloma.ru
        </a>
      </div>
    </footer>
  );
}

