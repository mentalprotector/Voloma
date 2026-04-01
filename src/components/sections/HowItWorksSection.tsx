import { siteContent } from "@/content/site-content";

import { SectionContainer } from "../ui/SectionContainer";
import styles from "./how-it-works-section.module.css";

export function HowItWorksSection() {
  return (
    <SectionContainer>
      <div className={styles.wrapper}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Как это работает</p>
          <h2 className={styles.title}>Три спокойных шага вместо сложного калькулятора</h2>
          <p className={styles.text}>
            Конфигуратор помогает быстро понять, какой вариант нужен. Без перегруженного UI и
            без иллюзии сложной интерактивности.
          </p>
        </div>
        <ol className={styles.list}>
          {siteContent.howItWorks.map((step, index) => (
            <li className={styles.item} key={step}>
              <span className={styles.index}>0{index + 1}</span>
              <span className={styles.step}>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </SectionContainer>
  );
}

