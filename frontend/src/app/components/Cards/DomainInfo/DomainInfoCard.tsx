import Panel from "../shared/Panel";
import FieldRow, { Section, Empty } from "../shared/FieldRow";
import StatusBadge, { toneForStatus } from "../shared/StatusBadge";
import type { Domain } from "@/app/interfaces/domain";
import styles from "./DomainInfoCard.module.css";

interface DomainInfoCardProps {
  data: Domain;
}

function formatDate(value?: string | null): string | null {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function daysUntil(value?: string | null): number | null {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return Math.ceil((d.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

function asList(value: string[] | string): string[] {
  return Array.isArray(value) ? value : value ? [value] : [];
}

export default function DomainInfoCard({ data }: DomainInfoCardProps) {
  const statusList = asList(data.status);
  const emailList = asList(data.emails);
  const expiresIn = daysUntil(data.expiration_date);
  const expiringSoon = expiresIn !== null && expiresIn <= 30;

  return (
    <Panel
      title="Domain information"
      subtitle={data.domain_name}
      meta={
        data.dnssec && (
          <StatusBadge
            label={`DNSSEC: ${data.dnssec}`}
            tone={toneForStatus(data.dnssec)}
          />
        )
      }
    >
      <Section title="Registration">
        <FieldRow label="Registrar" mono={false}>
          {data.registrar_url ? (
            <a
              href={data.registrar_url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {data.registrar}
            </a>
          ) : (
            data.registrar
          )}
        </FieldRow>
        {data.registrar_iana && (
          <FieldRow label="IANA ID">{data.registrar_iana}</FieldRow>
        )}
        {data.organization && (
          <FieldRow label="Organization" mono={false}>
            {data.organization}
          </FieldRow>
        )}
        {(data.state || data.country) && (
          <FieldRow label="Location" mono={false}>
            {[data.state, data.country].filter(Boolean).join(", ")}
          </FieldRow>
        )}
      </Section>

      <Section title="Lifecycle">
        {data.creation_date && (
          <FieldRow label="Created">{formatDate(data.creation_date)}</FieldRow>
        )}
        {data.updated_date && (
          <FieldRow label="Last updated">
            {formatDate(data.updated_date)}
          </FieldRow>
        )}
        {data.expiration_date && (
          <FieldRow label="Expires">
            <span className={expiringSoon ? styles.warningText : undefined}>
              {formatDate(data.expiration_date)}
              {expiresIn !== null && (
                <span className={styles.daysHint}>
                  {" "}
                  ({expiresIn >= 0 ? `${expiresIn} days left` : "expired"})
                </span>
              )}
            </span>
          </FieldRow>
        )}
      </Section>

      <Section title="Name servers" count={data.name_servers.length}>
        {data.name_servers.length === 0 ? (
          <Empty />
        ) : (
          <div className={styles.tagList}>
            {data.name_servers.map((ns) => (
              <span key={ns} className={styles.tag}>
                {ns}
              </span>
            ))}
          </div>
        )}
      </Section>

      <Section title="Status codes" count={statusList.length}>
        {statusList.length === 0 ? (
          <Empty />
        ) : (
          <div className={styles.badgeList}>
            {statusList.map((s) => (
              <StatusBadge key={s} label={s} tone={toneForStatus(s)} />
            ))}
          </div>
        )}
      </Section>

      {emailList.length > 0 && (
        <Section title="Contact emails" count={emailList.length}>
          <div className={styles.tagList}>
            {emailList.map((e) => (
              <span key={e} className={styles.tag}>
                {e}
              </span>
            ))}
          </div>
        </Section>
      )}
    </Panel>
  );
}
