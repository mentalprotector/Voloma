import Link from "next/link";

import styles from "./why-voloma-new-section.module.css";

const facts = [
  "Готово за 3 рабочих дня",
  "Колёсики в комплекте",
  "Гидроизоляция в комплекте",
  "Доставка по всей России",
];

export function WhyVolomaNewSection() {
  return (
    <section className={styles.section}>
      <img
        src="/images/landing/plant.jpg"
        alt="Несколько кашпо Voloma с растениями — детали и фактура дерева"
        className={styles.image}
        loading="lazy"
      />
      <div className={styles.overlay} />
      <div className={styles.textBlock}>
        <h2 className={styles.heading}>
          Продумано<br />
          до мелочей
        </h2>
        <div className={styles.pills}>
          {facts.map((fact) => (
            <span className={styles.pill} key={fact}>
              {fact}
            </span>
          ))}
        </div>
        <Link className={styles.cta} href="/configurator">
          Собрать своё кашпо
        </Link>
      </div>
    </section>
  );
}
