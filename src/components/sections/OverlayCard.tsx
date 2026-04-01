import { trackEvent } from "@/lib/analytics";

import { Button } from "../ui/Button";
import styles from "./overlay-card.module.css";

type OverlayCardProps = {
  title: string;
  subtitle: string;
  priceLabel: string;
  ctaLabel: string;
  ctaHref: "/configurator";
};

export function OverlayCard({
  title,
  subtitle,
  priceLabel,
  ctaLabel,
  ctaHref,
}: OverlayCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.copy}>
        <p className={styles.price}>{priceLabel}</p>
        <div className={styles.text}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </div>

      <Button
        href={ctaHref}
        size="lg"
        className={styles.cta}
        onClick={() => trackEvent("hero_cta_click", { source: "hero_overlay" })}
      >
        {ctaLabel}
      </Button>
    </div>
  );
}
