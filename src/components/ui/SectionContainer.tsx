import type { ReactNode } from "react";

import styles from "./section-container.module.css";

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function SectionContainer({ children, className, id }: SectionContainerProps) {
  return (
    <section className={[styles.section, className].filter(Boolean).join(" ")} id={id}>
      <div className={styles.inner}>{children}</div>
    </section>
  );
}

