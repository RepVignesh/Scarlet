import type { ReactNode } from "react";

export interface NavItem {
  /** Stable identifier, also used as the React key */
  id: string;
  /** Visible label */
  label: string;
  /** Route the item links to */
  href: string;
  /** 20x20 icon element, see icons.tsx for the bundled set */
  icon: ReactNode;
  /** Optional trailing count/status badge, e.g. "3" or "New" */
  badge?: string | number;
}

export interface NavSection {
  /** Optional small-caps heading shown above the group */
  title?: string;
  items: NavItem[];
}

export interface SidebarUser {
  name: string;
  role: string;
  /** 1-2 letter initials shown in the avatar */
  initials: string;
}

export interface SidebarProps {
  sections: NavSection[];
  workspaceName: string;
  workspaceSubtitle?: string;
  user?: SidebarUser;
  /** Overrides automatic route matching from usePathname() */
  activePath?: string;
  defaultCollapsed?: boolean;
  onNavigate?: (item: NavItem) => void;
}