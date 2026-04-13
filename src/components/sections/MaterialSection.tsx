import Image from "next/image";

import styles from "./material-section.module.css";

export function MaterialSection() {
  return (
    <section className={styles.section}>
      <Image
        src="/images/landing/Фактура.jpg"
        alt="Фактура карельской сосны крупным планом — натуральная древесина для кашпо Волома"
        className={styles.image}
        loading="eager"
        width={1200}
        height={800}
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
