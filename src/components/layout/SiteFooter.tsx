"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

import { trackEvent } from "@/lib/analytics";

import styles from "./site-footer.module.css";

export function SiteFooter() {
  const pathname = usePathname();

  if (pathname === "/configurator") {
    return null;
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <Image
            src="/voloma-logo.svg"
            alt="Voloma"
            width={220}
            height={80}
            className={styles.brandLogo}
          />
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
