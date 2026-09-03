import type { ReactNode } from "react";

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: ReactNode;
  badge?: string | number;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

export interface SidebarProps {
  sections: NavSection[];
  workspaceName: string;
  workspaceSubtitle?: string;
  workspaceIcon?: React.ReactNode;
  activePath?: string;
  defaultCollapsed?: boolean;
  onNavigate?: (item: NavItem) => void;
}
