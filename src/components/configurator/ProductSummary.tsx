import styles from "./product-summary.module.css";

interface ProductSummaryProps {
  selectionLine: string;
}

export function ProductSummary({ selectionLine }: ProductSummaryProps) {
  return (
    <section className={styles.card} aria-label="Выбранная конфигурация">
      <p className={styles.selection}>{selectionLine}</p>
    </section>
  );
}
