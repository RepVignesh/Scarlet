"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/app/components/PageHeader";
import { downloadReport, getReports, type ScanReport } from "@/app/lib/report";
import styles from "./page.module.css";

export default function Page() {
  const [report, setReport] = useState<ScanReport | null>(null);

  useEffect(() => {
    setReport(getReports()[0] ?? null);
  }, []);

  return (
    <main className={styles.page}>
      <PageHeader
        title="Generate Report"
        description="Create a clean PDF containing only the important information returned by the latest scan."
      />

      {!report ? (
        <div className={styles.card}>
          <p>Run a Full Scan first. The fetched results will appear here automatically.</p>
        </div>
      ) : (
        <div className={styles.card}>
          <h2>Scan Report</h2>
          <div className={styles.meta}>
            <div><strong>Target:</strong> {report.target}</div>
            <div><strong>Scanned:</strong> {new Date(report.scannedAt).toLocaleString()}</div>
          </div>

          <button className={styles.download} onClick={() => downloadReport(report)}>
            Download PDF Report
          </button>

          <p className={styles.note}>
            The PDF contains text and tables only. No website screenshots, cards, or UI elements are included.
          </p>
        </div>
      )}
    </main>
  );
}
