import {
  BarChart3,
  FolderKanban,
  Home,
  Inbox,
  Settings,
  Users,
} from "lucide-react";
import type { NavSection } from "@/app/components/Sidebar.types";

export const sections: NavSection[] = [
  {
    items: [
      { id: "home", label: "Home", href: "/", icon: <Home size={20} /> },
      {
        id: "inbox",
        label: "Inbox",
        href: "/inbox",
        icon: <Inbox size={20} />,
        badge: 4,
      },
    ],
  },
  {
    title: "Workspace",
    items: [
      {
        id: "projects",
        label: "Projects",
        href: "/projects",
        icon: <FolderKanban size={20} />,
      },
      {
        id: "analytics",
        label: "Analytics",
        href: "/analytics",
        icon: <BarChart3 size={20} />,
      },
      {
        id: "team",
        label: "Team",
        href: "/team",
        icon: <Users size={20} />,
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
