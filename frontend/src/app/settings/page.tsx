import PageHeader from "@/app/components/PageHeader";
import styles from "./page.module.css";

export default function Page() {
  return (
    <main className={styles.page}>
      <PageHeader title="Settings" description="Manage application preferences and review the API endpoint used by the Scarlet frontend." />
      <div className={styles.card}>This page is ready for the next feature integration.</div>
    </main>
  );
}
