import {
  Globe,
  Search,
  Network,
  FileCode,
  FileOutput,
  History,
  Settings,
} from "lucide-react";
import type { NavSection } from "@/app/components/Sidebar/Sidebar.types";

export const sections: NavSection[] = [
  {
    items: [
      {
        id: "full-scan",
        label: "Full Scan",
        href: "/",
        icon: <Globe size={20} />,
      },
    ],
  },
  {
    title: "Modules",
    items: [
      {
        id: "domain",
        label: "Domain Info",
        href: "/modules/domain",
        icon: <Globe size={20} />,
      },
      {
        id: "whois",
        label: "WHOIS Lookup",
        href: "/modules/whois",
        icon: <Search size={20} />,
      },
      {
        id: "dns",
        label: "DNS Records",
        href: "/modules/dns",
        icon: <Network size={20} />,
        badge: "incl. IP",
      },
      {
        id: "http-headers",
        label: "HTTP Headers",
        href: "/modules/headers",
        icon: <FileCode size={20} />,
      },
    ],
  },
  {
    title: "Reports",
    items: [
      {
        id: "generate-report",
        label: "Generate Report",
        href: "/reports/new",
        icon: <FileOutput size={20} />,
      },
      {
        id: "report-history",
        label: "Report History",
        href: "/reports",
        icon: <History size={20} />,
      },
    ],
  },
  {
    title: "Preferences",
    items: [
      {
        id: "settings",
        label: "Settings",
        href: "/settings",
        icon: <Settings size={20} />,
      },
    ],
  },
];
