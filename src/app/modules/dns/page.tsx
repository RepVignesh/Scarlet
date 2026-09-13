"use client";

import { useState } from "react";
import InputBar from "@/app/components/Inputs/InputBar";
import PageHeader from "@/app/components/PageHeader";
import DNSRecordsCard from "@/app/components/Cards/DNSRecords/DNSRecordsCard";
import type { DNSRecords } from "@/app/interfaces/domain";
import { fetchJson } from "@/app/lib/api";
import styles from "./page.module.css";

export default function DNSPage() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<DNSRecords>();
  const [error, setError] = useState("");

  const getInformation = async (url: string) => {
    setLoading(true);
    setError("");
    setResponse(undefined);
    try {
      setResponse(await fetchJson<DNSRecords>("/dns/", url));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to resolve DNS records.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <PageHeader title="DNS Records" description="Resolves the domain's A, AAAA, MX, CNAME, NS, and TXT records so you can inspect its DNS configuration." />
      <InputBar placeholder="Enter a domain, e.g. example.com" onSubmit={getInformation} disabled={loading} />
      {loading && <p className={styles.state}>Resolving DNS records…</p>}
      {error && <p className={styles.error} role="alert">{error}</p>}
      {response && <div className={styles.card}><DNSRecordsCard data={response} /></div>}
    </main>
  );
}
