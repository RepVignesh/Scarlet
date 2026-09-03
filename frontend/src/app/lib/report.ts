import type { DNSRecords, Domain, HTTPHeader } from "../interfaces/domain";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export interface ScanReport {
  id: string;
  target: string;
  scannedAt: string;
  domain?: Domain;
  dns?: DNSRecords;
  headers?: HTTPHeader;
}

const STORAGE_KEY = "scarlet-scan-reports";

export function saveReport(report: ScanReport) {
  if (typeof window === "undefined") return;
  const existing = getReports();
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([report, ...existing.filter(r => r.id !== report.id)].slice(0, 20))
  );
}

export function getReports(): ScanReport[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

const clean = (value: unknown): string => {
  if (value === undefined || value === null || value === "") return "—";
  if (Array.isArray(value)) return value.length ? value.join(", ") : "—";
  return String(value);
};

const dateOnly = (value?: string | null): string => {
  if (!value) return "—";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? value : d.toLocaleDateString();
};

function addTitle(doc: jsPDF, title: string) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text(title, 14, 18);
  doc.setDrawColor(180);
  doc.line(14, 21, 196, 21);
}

function addSection(doc: jsPDF, title: string, startY: number): number {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(title, 14, startY);
  return startY + 5;
}

function addKeyValueTable(
  doc: jsPDF,
  rows: Array<[string, string]>,
  startY: number
): number {
  autoTable(doc, {
    startY,
    head: [["Field", "Value"]],
    body: rows.filter(([, value]) => value !== "—"),
    theme: "grid",
    styles: {
      font: "helvetica",
      fontSize: 8.5,
      cellPadding: 3,
      overflow: "linebreak",
      valign: "top",
    },
    headStyles: {
      fontStyle: "bold",
    },
    columnStyles: {
      0: { cellWidth: 52 },
      1: { cellWidth: 126 },
    },
    margin: { left: 14, right: 14 },
  });
  return (doc as any).lastAutoTable.finalY + 9;
}

function addSimpleTable(
  doc: jsPDF,
  head: string[],
  body: string[][],
  startY: number
): number {
  if (!body.length) return startY;
  autoTable(doc, {
    startY,
    head: [head],
    body,
    theme: "grid",
    styles: {
      font: "helvetica",
      fontSize: 8.5,
      cellPadding: 3,
      overflow: "linebreak",
      valign: "top",
    },
    headStyles: { fontStyle: "bold" },
    margin: { left: 14, right: 14 },
  });
  return (doc as any).lastAutoTable.finalY + 8;
}

function ensureSpace(doc: jsPDF, y: number, needed = 25): number {
  if (y + needed > 275) {
    doc.addPage();
    addTitle(doc, "Scarlet Security Scan Report");
    return 28;
  }
  return y;
}

export function generatePdfReport(report: ScanReport) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  addTitle(doc, "SCARLET SECURITY SCAN REPORT");

  let y = 29;
  y = addKeyValueTable(
    doc,
    [
      ["Target", clean(report.target)],
      ["Scanned", new Date(report.scannedAt).toLocaleString()],
    ],
    y
  );

  if (report.domain) {
    y = ensureSpace(doc, y, 30);
    y = addSection(doc, "1. DOMAIN INFORMATION", y);
    y = addKeyValueTable(
      doc,
      [
        ["Domain", clean(report.domain.domain_name)],
        ["Registrar", clean(report.domain.registrar)],
        ["Creation Date", dateOnly(report.domain.creation_date)],
        ["Updated Date", dateOnly(report.domain.updated_date)],
        ["Expiration Date", dateOnly(report.domain.expiration_date)],
        ["Organization", clean(report.domain.organization)],
        ["State", clean(report.domain.state)],
        ["Country", clean(report.domain.country)],
        ["Status", clean(report.domain.status)],
        ["Emails", clean(report.domain.emails)],
        ["DNSSEC", clean(report.domain.dnssec)],
      ],
      y
    );

    if (report.domain.name_servers?.length) {
      y = ensureSpace(doc, y, 20);
      y = addSection(doc, "Name Servers", y);
      y = addSimpleTable(
        doc,
        ["#", "Name Server"],
        report.domain.name_servers.map((server, i) => [String(i + 1), server]),
        y
      );
    }
  }

  if (report.dns) {
    y = ensureSpace(doc, y, 30);
    y = addSection(doc, "2. DNS RECORDS", y);

    const groups: Array<[string, string[][], string[]]> = [
      ["A", (report.dns.A || []).map(v => [v]), ["Address"]],
      ["AAAA", (report.dns.AAAA || []).map(v => [v]), ["Address"]],
      ["CNAME", (report.dns.CNAME || []).map(v => [v]), ["Canonical Name"]],
      ["NS", (report.dns.NS || []).map(v => [v]), ["Name Server"]],
      ["TXT", (report.dns.TXT || []).map(v => [v]), ["TXT Value"]],
      [
        "MX",
        (report.dns.MX || []).map(v => [clean(v.priority), clean(v.server)]),
        ["Priority", "Mail Server"],
      ],
    ];

    for (const [name, body, head] of groups) {
      if (!body.length) continue;
      y = ensureSpace(doc, y, 24);
      y = addSection(doc, `${name} RECORDS`, y);
      y = addSimpleTable(doc, head, body, y);
    }
  }

  if (report.headers) {
    y = ensureSpace(doc, y, 30);
    y = addSection(doc, "3. HTTP RESPONSE HEADERS", y);

    const headerRows: Array<[string, string]> = [
      ["Server", clean(report.headers.server)],
      ["Date", clean(report.headers.date)],
      ["Content-Type", clean(report.headers.content_type)],
      ["Content-Length", clean(report.headers.content_length)],
      ["Cache-Control", clean(report.headers.cache_control)],
      ["Strict-Transport-Security", clean(report.headers.strict_transport_security)],
      ["X-Frame-Options", clean(report.headers.x_frame_options)],
    ];

    y = addSimpleTable(
      doc,
      ["Header", "Value"],
      headerRows.filter(([, value]) => value !== "—"),
      y
    );
  }

  // Simple footer on every page; no application UI is rendered into the PDF.
  const pages = doc.getNumberOfPages();
  for (let page = 1; page <= pages; page++) {
    doc.setPage(page);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(100);
    doc.text(`Scarlet Security Scan Report  |  Page ${page} of ${pages}`, 14, 289);
    doc.setTextColor(0);
  }

  const safeTarget = report.target.replace(/[^a-z0-9.-]/gi, "_");
  doc.save(`scarlet-report-${safeTarget}.pdf`);
}

export function downloadReport(report: ScanReport) {
  generatePdfReport(report);
}
