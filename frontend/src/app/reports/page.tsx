"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/app/components/PageHeader";
import { downloadReport, getReports, type ScanReport } from "@/app/lib/report";
import styles from "./page.module.css";

export default function Page() {
  const [reports, setReports] = useState<ScanReport[]>([]);

  useEffect(() => setReports(getReports()), []);

  return (
    <main className={styles.page}>
      <PageHeader
        title="Report History"
        description="Review previous scans and download their fetched information as clean PDF reports."
      />
      <div className={styles.card}>
        {reports.length === 0 ? (
          <p>No reports yet. Complete a Full Scan to create one.</p>
        ) : (
          reports.map((r) => (
            <div className={styles.item} key={r.id}>
              <div>
                <strong>{r.target}</strong>
                <p>{new Date(r.scannedAt).toLocaleString()}</p>
              </div>
              <button onClick={() => downloadReport(r)}>PDF</button>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
