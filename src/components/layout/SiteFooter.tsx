import Image from "next/image";

import { MaxIcon, TelegramIcon } from "@/components/configurator/MessengerIcons";
import { siteContent } from "@/content/site-content";
import { buildMessengerUrl } from "@/lib/messenger-links";

import styles from "./site-footer.module.css";

export function SiteFooter() {
  const {
    description,
    phone,
    phoneHref,
    delivery,
    payment,
    guarantee,
    legal,
    copyright,
  } =
    siteContent.footer;
  const contactMessage = "Здравствуйте! Хочу уточнить детали по кашпо Волома.";
  const messengerUrls = {
    telegram: buildMessengerUrl("telegram", contactMessage),
    max: buildMessengerUrl("max", contactMessage),
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.column}>
            <div className={styles.brandLogo} aria-label="Voloma">
              <Image
                src="/voloma-symbol.svg"
                alt=""
                width={386}
                height={411}
                className={styles.brandSymbol}
              />
              <Image
                src="/voloma-wordmark.svg"
                alt=""
                width={802}
                height={132}
                className={styles.brandWordmark}
              />
            </div>
            <p className={styles.description}>{description}</p>
            <div className={styles.contacts}>
              <a
                className={styles.phone}
                href={`tel:${phoneHref}`}
              >
                {phone}
              </a>
              <div className={styles.messengers} aria-label="Мессенджеры">
                <a
                  className={styles.messengerLink}
                  href={messengerUrls.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                >
                  <TelegramIcon className={styles.messengerIcon} />
                </a>
                <a
                  className={styles.messengerLink}
                  href={messengerUrls.max}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="MAX"
                >
                  <MaxIcon className={styles.messengerIcon} />
                </a>
              </div>
            </div>
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
                href={`tel:${phoneHref}`}
              >
                {phone}
              </a>
            </p>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.legal}>
            {legal.map((line) => (
              <p className={styles.legalLine} key={line}>{line}</p>
            ))}
          </div>
          <p className={styles.copyright}>{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
