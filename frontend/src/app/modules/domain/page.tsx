"use client";

import { useState } from "react";
import InputBar from "@/app/components/Inputs/InputBar";
import PageHeader from "@/app/components/PageHeader";
import DomainInfoCard from "@/app/components/Cards/DomainInfo/DomainInfoCard";
import type { Domain } from "@/app/interfaces/domain";
import { fetchJson } from "@/app/lib/api";
import styles from "./page.module.css";

export default function DomainPage() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<Domain>();
  const [error, setError] = useState("");

  const getInformation = async (url: string) => {
    setLoading(true);
    setError("");
    setResponse(undefined);
    try {
      setResponse(await fetchJson<Domain>("/domain/", url));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to fetch domain information.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <PageHeader title="Domain Information" description="Looks up WHOIS registration details such as registrar, dates, name servers, status, DNSSEC, and available contact information." />
      <InputBar placeholder="Enter a domain, e.g. example.com" onSubmit={getInformation} disabled={loading} />
      {loading && <p className={styles.state}>Looking up domain information…</p>}
      {error && <p className={styles.error} role="alert">{error}</p>}
      {response && <div className={styles.card}><DomainInfoCard data={response} /></div>}
    </main>
  );
}
