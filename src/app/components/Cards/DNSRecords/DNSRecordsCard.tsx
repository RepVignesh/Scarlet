import Panel from "../shared/Panel";
import { Section, Empty } from "../shared/FieldRow";
import { DNSRecords } from "@/app/interfaces/domain";
import styles from "./DNSRecordsCard.module.css";

interface DNSRecordsCardProps {
  data: DNSRecords;
  domain?: string;
}

const RECORD_LABELS: Record<keyof DNSRecords, string> = {
  A: "A — IPv4 address",
  AAAA: "AAAA — IPv6 address",
  MX: "MX — Mail servers",
  CNAME: "CNAME — Alias",
  NS: "NS — Name servers",
  TXT: "TXT — Text records",
};

export default function DNSRecordsCard({ data, domain }: DNSRecordsCardProps) {
  const totalRecords =
    data.A.length +
    data.AAAA.length +
    data.MX.length +
    data.CNAME.length +
    data.NS.length +
    data.TXT.length;

  return (
    <Panel
      title="DNS records"
      subtitle={domain}
      meta={<span className={styles.total}>{totalRecords} total</span>}
    >
      <Section title={RECORD_LABELS.A} count={data.A.length}>
        {data.A.length === 0 ? (
          <Empty />
        ) : (
          <ul className={styles.simpleList}>
            {data.A.map((ip) => (
              <li key={ip} className={styles.mono}>
                {ip}
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section title={RECORD_LABELS.AAAA} count={data.AAAA.length}>
        {data.AAAA.length === 0 ? (
          <Empty />
        ) : (
          <ul className={styles.simpleList}>
            {data.AAAA.map((ip) => (
              <li key={ip} className={styles.mono}>
                {ip}
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section title={RECORD_LABELS.MX} count={data.MX.length}>
        {data.MX.length === 0 ? (
          <Empty />
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thPriority}>Priority</th>
                <th>Server</th>
              </tr>
            </thead>
            <tbody>
              {[...data.MX]
                .sort((a, b) => a.priority - b.priority)
                .map((mx) => (
                  <tr key={`${mx.priority}-${mx.server}`}>
                    <td className={styles.mono}>{mx.priority}</td>
                    <td className={styles.mono}>{mx.server}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </Section>

      <Section title={RECORD_LABELS.CNAME} count={data.CNAME.length}>
        {data.CNAME.length === 0 ? (
          <Empty />
        ) : (
          <ul className={styles.simpleList}>
            {data.CNAME.map((c) => (
              <li key={c} className={styles.mono}>
                {c}
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section title={RECORD_LABELS.NS} count={data.NS.length}>
        {data.NS.length === 0 ? (
          <Empty />
        ) : (
          <ul className={styles.simpleList}>
            {data.NS.map((ns) => (
              <li key={ns} className={styles.mono}>
                {ns}
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section title={RECORD_LABELS.TXT} count={data.TXT.length}>
        {data.TXT.length === 0 ? (
          <Empty />
        ) : (
          <ul className={styles.simpleList}>
            {data.TXT.map((txt) => (
              <li key={txt} className={`${styles.mono} ${styles.txtValue}`}>
                {txt}
              </li>
            ))}
          </ul>
        )}
      </Section>
    </Panel>
  );
}
