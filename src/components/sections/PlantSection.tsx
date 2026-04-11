import Link from "next/link";

import styles from "./plant-section.module.css";

export function PlantSection() {
  return (
    <section className={styles.section}>
      <img
        src="/images/landing/с живым.jpg"
        alt="Кашпо Voloma с живым растением"
        className={styles.image}
        loading="lazy"
      />
      <div className={styles.overlay} />
      <div className={styles.textBlock}>
        <h2 className={styles.heading}>
          Под любое растение —<br />
          от балконного ящика до напольного
        </h2>
        <Link className={styles.link} href="/configurator">
          Смотреть все модели →
        </Link>
      </div>
    </section>
  );
}
