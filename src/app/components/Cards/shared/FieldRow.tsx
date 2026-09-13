import { ReactNode } from "react";
import styles from "./FieldRow.module.css";

interface FieldRowProps {
  label: string;
  children: ReactNode;
  mono?: boolean;
}

export default function FieldRow({ label, children, mono = true }: FieldRowProps) {
  return (
    <div className={styles.row}>
      <span className={styles.label}>{label}</span>
      <span className={`${styles.value} ${mono ? styles.mono : ""}`}>
        {children}
      </span>
    </div>
  );
}

interface SectionProps {
  title: string;
  count?: number;
  children: ReactNode;
}

export function Section({ title, count, children }: SectionProps) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionTitle}>{title}</span>
        {typeof count === "number" && (
          <span className={styles.sectionCount}>{count}</span>
        )}
      </div>
      <div className={styles.sectionBody}>{children}</div>
    </div>
  );
}

export function Empty({ label = "None found" }: { label?: string }) {
  return <p className={styles.empty}>{label}</p>;
}
