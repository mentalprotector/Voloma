import Image from "next/image";

import { publicPath } from "@/lib/public-path";

import styles from "./interior-section.module.css";

export function InteriorSection() {
  return (
    <section className={styles.section}>
      <Image
        src={publicPath("/images/landing/DSC_7853-редакт.jpg")}
        alt="Деревянное кашпо Волома в современном интерьере — у стеклянной двери, натуральное дерево"
        className={styles.image}
        loading="lazy"
        width={1200}
        height={800}
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
