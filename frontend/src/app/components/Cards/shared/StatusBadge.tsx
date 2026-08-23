import styles from "./StatusBadge.module.css";

type Tone = "success" | "warning" | "error" | "neutral";

interface StatusBadgeProps {
  label: string;
  tone?: Tone;
}

export default function StatusBadge({ label, tone = "neutral" }: StatusBadgeProps) {
  return (
    <span className={styles.badge} data-tone={tone}>
      <span className={styles.dot} />
      {label}
    </span>
  );
}

/** Derives a tone from common WHOIS/DNSSEC status strings. */
export function toneForStatus(status: string): Tone {
  const s = status.toLowerCase();
  if (s.includes("prohibited") || s.includes("hold") || s.includes("expired")) {
    return "warning";
  }
  if (s.includes("unsigned") || s.includes("inactive") || s === "no") {
    return "neutral";
  }
  if (s.includes("signed") || s.includes("active") || s === "yes") {
    return "success";
  }
  return "neutral";
}
