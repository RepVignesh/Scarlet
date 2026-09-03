export interface MXRecord {
  priority: number;
  server: string;
}

export interface DNSRecords {
  A: string[];
  AAAA: string[];
  MX: MXRecord[];
  CNAME: string[];
  NS: string[];
  TXT: string[];
}

export interface Domain {
  domain_name: string;
  registrar: string;
  registrar_url?: string | null;
  registrar_iana?: string | null;
  creation_date?: string | null;
  updated_date?: string | null;
  expiration_date?: string | null;
  name_servers: string[];
  organization?: string | null;
  state?: string | null;
  country?: string | null;
  status: string[] | string;
  emails: string[] | string;
  dnssec?: string | null;
}

export interface HTTPHeader {
  server?: string | null;
  date?: string | null;
  content_type?: string | null;
  content_length?: string | null;
  cache_control?: string | null;
  strict_transport_security?: string | null;
  x_frame_options?: string | null;
}
