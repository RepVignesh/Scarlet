import {
  Globe,
  Network,
  FileCode,
  FileOutput,
  History,
  Settings,
  House,
} from "lucide-react";
import type { NavSection } from "@/app/components/Sidebar/Sidebar.types";

export const sections: NavSection[] = [
  {
    title: "Main",
    items: [
      {
        id: "home",
        label: "Home",
        href: "/",
        icon: <House size={20} />,
      },
      {
        id: "full-scan",
        label: "Full Scan",
        href: "/modules/full",
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
        href: "/modules/reports/new",
        icon: <FileOutput size={20} />,
      },
      {
        id: "report-history",
        label: "Report History",
        href: "/modules/reports",
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
