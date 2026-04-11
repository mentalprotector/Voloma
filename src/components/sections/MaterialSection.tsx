import styles from "./material-section.module.css";

export function MaterialSection() {
  return (
    <section className={styles.section}>
      <img
        src="/images/landing/Фактура.jpg"
        alt="Фактура карельской сосны крупным планом"
        className={styles.image}
        loading="eager"
      />
      <div className={styles.overlay} />
      <div className={styles.textBlock}>
        <h2 className={styles.heading}>
          Сделано из<br />
          карельской сосны.
        </h2>
        <p className={styles.body}>
          Сырьё высшего качества
          с благородным рисунком.
        </p>
      </div>
    </section>
  );
}
