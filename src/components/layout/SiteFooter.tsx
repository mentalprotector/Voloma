import Image from "next/image";

import { siteContent } from "@/content/site-content";

import styles from "./site-footer.module.css";

export function SiteFooter() {
  const { description, email, phone, delivery, payment, guarantee, copyright } =
    siteContent.footer;

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.column}>
            <Image
              src="/voloma-logo.svg"
              alt="Voloma"
              width={220}
              height={80}
              className={styles.brandLogo}
            />
            <p className={styles.description}>{description}</p>
            <a
              className={styles.email}
              href={`mailto:${email}`}
            >
              {email}
            </a>
            <a
              className={styles.phone}
              href={`tel:${phone}`}
            >
              {phone}
            </a>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Доставка</h3>
            {delivery.map((line) => (
              <p className={styles.infoLine} key={line}>{line}</p>
            ))}

            <h3 className={styles.columnTitle}>Оплата</h3>
            {payment.map((line) => (
              <p className={styles.infoLine} key={line}>{line}</p>
            ))}
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Гарантии</h3>
            {guarantee.map((line) => (
              <p className={styles.infoLine} key={line}>{line}</p>
            ))}
            <p className={styles.infoLine}>
              Свяжитесь с нами:{" "}
              <a
                className={styles.emailInline}
                href={`tel:${phone}`}
              >
                {phone}
              </a>
            </p>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
