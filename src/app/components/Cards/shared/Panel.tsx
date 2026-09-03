import { ReactNode } from "react";
import styles from "./Panel.module.css";

interface PanelProps {
  title: string;
  subtitle?: string;
  meta?: ReactNode;
  children: ReactNode;
}

export default function Panel({ title, subtitle, meta, children }: PanelProps) {
  return (
    <section className={styles.panel}>
      <header className={styles.header}>
        <div className={styles.headerText}>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        {meta && <div className={styles.meta}>{meta}</div>}
      </header>
      <div className={styles.body}>{children}</div>
    </section>
  );
}
