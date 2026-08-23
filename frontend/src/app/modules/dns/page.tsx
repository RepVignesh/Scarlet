"use client";

import InputBar from "@/app/components/Inputs/InputBar";
import { useState } from "react";
import { DNSRecords } from "@/app/interfaces/domain";
import DNSRecordsCard from "@/app/components/Cards/DNSRecords/DNSRecordsCard";

export default function DNS() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<DNSRecords>();

  const getInformation = async (url: string) => {
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ENDPOINT}/dns/?url=${encodeURIComponent(url)}`,
      );

      const data = await res.json();

      setResponse(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          paddingTop: "4rem",
          height: "100%",
        }}
      >
        <InputBar placeholder="Enter an URL" onSubmit={getInformation} />
      </div>

      {loading && <p>Loading...</p>}

      {response && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <DNSRecordsCard data={response} />
        </div>
      )}
    </div>
  );
}
