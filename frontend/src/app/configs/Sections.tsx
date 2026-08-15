import {
  AnalyticsIcon,
  HomeIcon,
  InboxIcon,
  ProjectsIcon,
  SettingsIcon,
  TeamIcon,
} from "@/app/components/icons";
import type { NavSection } from "@/app/components/Sidebar.types";

export const sections: NavSection[] = [
  {
    items: [
      { id: "home", label: "Home", href: "/", icon: <HomeIcon width={20} height={20} /> },
      {
        id: "inbox",
        label: "Inbox",
        href: "/inbox",
        icon: <InboxIcon width={20} height={20} />,
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
        icon: <ProjectsIcon width={20} height={20} />,
      },
      {
        id: "analytics",
        label: "Analytics",
        href: "/analytics",
        icon: <AnalyticsIcon width={20} height={20} />,
      },
      {
        id: "team",
        label: "Team",
        href: "/team",
        icon: <TeamIcon width={20} height={20} />,
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
        icon: <SettingsIcon width={20} height={20} />,
      },
    ],
  },
];