import styles from "./interior-section.module.css";

export function InteriorSection() {
  return (
    <section className={styles.section}>
      <img
        src="/images/landing/DSC_7853-редакт.jpg"
        alt="Кашпо Voloma в реальном интерьере — у стеклянной двери"
        className={styles.image}
        loading="lazy"
      />
      <div className={styles.overlay} />
      <div className={styles.textBlock}>
        <h2 className={styles.heading}>
          Выглядит дорого.<br />
          Стоит честно.
        </h2>
        <p className={styles.body}>
          От 1 900 ₽ за готовое изделие —<br />
          с доставкой по всей России.
        </p>
      </div>
    </section>
  );
}
