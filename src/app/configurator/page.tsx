import type { Metadata } from "next";

import { Configurator } from "@/components/configurator/Configurator";
import { SectionContainer } from "@/components/ui/SectionContainer";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Конфигуратор кашпо",
  description:
    "Конфигуратор Voloma: подбор формы, размера, оттенка и уровня качества деревянного кашпо.",
  openGraph: {
    title: "Конфигуратор Voloma",
    description:
      "Подберите деревянное кашпо по форме, размеру, оттенку и уровню качества.",
  },
};

export default function ConfiguratorPage() {
  return (
    <SectionContainer className={styles.section}>
      <div className={styles.hero}>
        <p className={styles.eyebrow}>Конфигуратор Voloma</p>
        <h1 className={styles.title}>Подбор изделия без сложного калькулятора</h1>
        <p className={styles.description}>
          Выберите форму, размер, оттенок и качество. Если изображений конкретного варианта ещё
          нет, интерфейс покажет placeholder и точный путь, куда их нужно добавить в проект.
        </p>
      </div>
      <Configurator />
    </SectionContainer>
  );
}

