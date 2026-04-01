import styles from "./quality-info-card.module.css";

export function QualityInfoCard() {
  return (
    <section className={styles.card}>
      <div className={styles.column}>
        <p className={styles.label}>Standard</p>
        <p className={styles.text}>
          Допускается живая природная фактура дерева, включая сучки и более выраженную
          естественную вариативность.
        </p>
      </div>
      <div className={styles.column}>
        <p className={styles.label}>Premium</p>
        <p className={styles.text}>
          Более однородный визуальный отбор, без сучков или с минимальными естественными
          особенностями.
        </p>
      </div>
    </section>
  );
}

