import type { Metadata } from "next";

import { Configurator } from "@/components/configurator/Configurator";
import { SectionContainer } from "@/components/ui/SectionContainer";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Конфигуратор кашпо",
  description:
    "Простой конфигуратор Voloma: выбрать форму, размер, цвет, качество и отправить запрос в мессенджер.",
  openGraph: {
    title: "Конфигуратор Voloma",
    description:
      "Выберите готовый вариант кашпо и сразу отправьте запрос в мессенджер.",
  },
};

export default function ConfiguratorPage() {
  return (
    <SectionContainer className={styles.section}>
      <Configurator />
    </SectionContainer>
  );
}
