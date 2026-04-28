import Image from "next/image";
import Link from "next/link";

import { publicPath } from "@/lib/public-path";

import styles from "./plant-section.module.css";

export function PlantSection() {
  return (
    <section className={styles.section}>
      <Image
        src={publicPath("/images/landing/с живым.jpg")}
        alt="Деревянное кашпо Волома с живым зелёным растением — натуральное дерево в интерьере"
        className={styles.image}
        loading="lazy"
        width={1200}
        height={800}
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
