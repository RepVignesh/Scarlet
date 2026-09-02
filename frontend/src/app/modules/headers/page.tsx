"use client";

import { useState } from "react";
import InputBar from "@/app/components/Inputs/InputBar";
import PageHeader from "@/app/components/PageHeader";
import HTTPHeadersCard from "@/app/components/Cards/HTTPHeaders/HTTPHeadersCard";
import type { HTTPHeader } from "@/app/interfaces/domain";
import { fetchJson } from "@/app/lib/api";
import styles from "./page.module.css";

export default function HeadersPage() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<HTTPHeader>();
  const [error, setError] = useState("");
  const [domain, setDomain] = useState("");

  const getInformation = async (url: string) => {
    setLoading(true);
    setError("");
    setResponse(undefined);
    setDomain(url);
    try {
      setResponse(await fetchJson<HTTPHeader>("/domain/headers/", url));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to fetch HTTP headers.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <PageHeader title="HTTP Headers" description="Requests the target website and displays useful response headers such as Server, Content-Type, Cache-Control, HSTS, and X-Frame-Options." />
      <InputBar placeholder="Enter a website, e.g. https://example.com" onSubmit={getInformation} disabled={loading} />
      {loading && <p className={styles.state}>Fetching HTTP headers…</p>}
      {error && <p className={styles.error} role="alert">{error}</p>}
      {response && <div className={styles.card}><HTTPHeadersCard data={response} domain={domain} /></div>}
    </main>
  );
}
