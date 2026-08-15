"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { SidebarProps } from "./Sidebar.types";
import styles from "./Sidebar.module.css";
import { ChevronsLeftIcon } from "./icons";
import { NavItem } from "./Sidebar.types";

export default function Sidebar({
  sections,
  workspaceName,
  workspaceSubtitle,
  activePath,
  defaultCollapsed = false,
  onNavigate,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const pathname = usePathname();
  const currentPath = activePath ?? pathname ?? "";

  const flatItems = useMemo(() => sections.flatMap((s) => s.items), [sections]);

  const activeId = useMemo(() => {
    const match = flatItems.find((item) => item.href === currentPath);
    return match?.id ?? flatItems[0]?.id;
  }, [flatItems, currentPath]);

  return (
    <aside
      className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}
      data-collapsed={collapsed}
    >
      <div className={styles.header}>
        <div className={styles.mark} aria-hidden="true">
          {workspaceName.slice(0, 1).toUpperCase()}
        </div>

        {!collapsed && (
          <div className={styles.workspace}>
            <span className={styles.workspaceName}>{workspaceName}</span>

            {workspaceSubtitle && (
              <span className={styles.workspaceSubtitle}>
                {workspaceSubtitle}
              </span>
            )}
          </div>
        )}
      </div>

      <nav className={styles.nav} aria-label="Primary">
        {sections.map((section, i) => (
          <div className={styles.section} key={section.title ?? i}>
            {section.title && !collapsed && (
              <span className={styles.sectionTitle}>{section.title}</span>
            )}

            <ul className={styles.list}>
              {section.items.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className={styles.item}
                    data-active={item.id === activeId}
                    title={collapsed ? item.label : undefined}
                    onClick={() => onNavigate?.(item)}
                  >
                    <span className={styles.icon}>{item.icon}</span>

                    {!collapsed && (
                      <span className={styles.label}>{item.label}</span>
                    )}

                    {!collapsed && item.badge !== undefined && (
                      <span className={styles.badge}>{item.badge}</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Collapse */}
      <div className={styles.footer}>
        <button
          type="button"
          className={styles.collapseButton}
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronsLeftIcon
            width={16}
            height={16}
            style={{
              transform: collapsed ? "rotate(180deg)" : "none",
            }}
          />

          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}

export type { NavItem };
