import styles from "./PageHeader.module.css";

interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className={styles.header}>
      <p className={styles.eyebrow}>SCARLET / MODULE</p>
      <h1>{title}</h1>
      <p className={styles.description}>{description}</p>
    </header>
  );
}
