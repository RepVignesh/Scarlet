"use client";

import { useState } from "react";
import InputBar from "./components/Inputs/InputBar";
import PageHeader from "./components/PageHeader";
import DomainInfoCard from "./components/Cards/DomainInfo/DomainInfoCard";
import DNSRecordsCard from "./components/Cards/DNSRecords/DNSRecordsCard";
import HTTPHeadersCard from "./components/Cards/HTTPHeaders/HTTPHeadersCard";
import type { Domain, DNSRecords, HTTPHeader } from "./interfaces/domain";
import { fetchJson } from "./lib/api";
import styles from "./page.module.css";
import { saveReport, type ScanReport } from "./lib/report";
import Link from "next/link";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [domain, setDomain] = useState<Domain>();
  const [dns, setDns] = useState<DNSRecords>();
  const [headers, setHeaders] = useState<HTTPHeader>();
  const [target, setTarget] = useState("");
  const [error, setError] = useState("");

  const fullScan = async (url: string) => {
    setLoading(true);
    setError("");
    setDomain(undefined);
    setDns(undefined);
    setHeaders(undefined);
    setTarget(url);

    const results = await Promise.allSettled([
      fetchJson<Domain>("/domain/", url),
      fetchJson<DNSRecords>("/dns/", url),
      fetchJson<HTTPHeader>("/domain/headers/", url),
    ]);

    const [domainResult, dnsResult, headerResult] = results;
    if (domainResult.status === "fulfilled") setDomain(domainResult.value);
    if (dnsResult.status === "fulfilled") setDns(dnsResult.value);
    if (headerResult.status === "fulfilled") setHeaders(headerResult.value);

    const failures = results.filter((result) => result.status === "rejected");
    if (failures.length > 0) {
      setError(
        `${failures.length} scan module${failures.length > 1 ? "s" : ""} failed. Check the API connection or target.`,
      );
    }
    if (
      domainResult.status === "fulfilled" ||
      dnsResult.status === "fulfilled" ||
      headerResult.status === "fulfilled"
    ) {
      const report: ScanReport = {
        id: `${Date.now()}`,
        target: url,
        scannedAt: new Date().toISOString(),
        domain:
          domainResult.status === "fulfilled" ? domainResult.value : undefined,
        dns: dnsResult.status === "fulfilled" ? dnsResult.value : undefined,
        headers:
          headerResult.status === "fulfilled" ? headerResult.value : undefined,
      };
      saveReport(report);
    }
    setLoading(false);
  };

  return (
    <main className={styles.page}>
      <PageHeader
        title="Full Scan"
        description="Runs the Domain, DNS, and HTTP Header modules together and presents the results in one place."
      />
      <InputBar
        placeholder="Enter a domain, e.g. example.com"
        onSubmit={fullScan}
        disabled={loading}
      />
      {loading && <p className={styles.state}>Running full scan…</p>}
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
      {!loading && (domain || dns || headers) && (
        <div className={styles.reportLink}>
          <Link href="/reports/new">Generate Report from this Scan →</Link>
        </div>
      )}
      <div className={styles.results}>
        {domain && <DomainInfoCard data={domain} />}
        {dns && <DNSRecordsCard data={dns} domain={target} />}
        {headers && <HTTPHeadersCard data={headers} domain={target} />}
      </div>
    </main>
  );
}
