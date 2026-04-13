import type { Metadata } from "next";

import { Configurator } from "@/components/configurator/Configurator";
import { getBreadcrumbSchema } from "@/lib/structured-data";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Конфигуратор кашпо",
  description:
    "Простой конфигуратор Волома: выбрать форму, размер, пропитку, качество и отправить запрос в мессенджер.",
  openGraph: {
    title: "Конфигуратор Волома",
    description:
      "Выберите готовый вариант кашпо и сразу отправьте запрос в мессенджер.",
  },
  alternates: {
    canonical: "/configurator",
  },
};

export default function ConfiguratorPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Главная", url: "/" },
    { name: "Конфигуратор", url: "/configurator" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className={styles.section}>
        <div className={styles.inner}>
          <Configurator />
        </div>
      </section>
    </>
  );
}
