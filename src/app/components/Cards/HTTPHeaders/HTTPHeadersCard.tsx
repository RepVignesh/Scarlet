import Panel from "../shared/Panel";
import FieldRow, { Empty } from "../shared/FieldRow";
import StatusBadge from "../shared/StatusBadge";
import type { HTTPHeader } from "@/app/interfaces/domain";

interface HTTPHeadersCardProps {
  data: HTTPHeader;
  domain?: string;
}

const HEADER_LABELS: Array<{ key: keyof HTTPHeader; label: string }> = [
  { key: "server", label: "Server" },
  { key: "date", label: "Date" },
  { key: "content_type", label: "Content-Type" },
  { key: "content_length", label: "Content-Length" },
  { key: "cache_control", label: "Cache-Control" },
  { key: "strict_transport_security", label: "Strict-Transport-Security" },
  { key: "x_frame_options", label: "X-Frame-Options" },
];

export default function HTTPHeadersCard({
  data,
  domain,
}: HTTPHeadersCardProps) {
  const present = HEADER_LABELS.filter(({ key }) => data[key]);
  const hsts = Boolean(data.strict_transport_security);

  return (
    <Panel
      title="HTTP headers"
      subtitle={domain}
      meta={
        <StatusBadge
          label={hsts ? "HSTS enabled" : "No HSTS"}
          tone={hsts ? "success" : "warning"}
        />
      }
    >
      {present.length === 0 ? (
        <Empty label="No headers returned" />
      ) : (
        present.map(({ key, label }) => (
          <FieldRow key={key} label={label}>
            {data[key]}
          </FieldRow>
        ))
      )}
    </Panel>
  );
}
