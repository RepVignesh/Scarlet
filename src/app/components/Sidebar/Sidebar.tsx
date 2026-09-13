"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { SidebarProps } from "./Sidebar.types";
import styles from "./Sidebar.module.css";
import { ChevronLeft, Menu, X } from "lucide-react";
import { NavItem } from "./Sidebar.types";

export default function Sidebar({
  sections,
  workspaceName,
  workspaceSubtitle,
  workspaceIcon,
  activePath,
  defaultCollapsed = false,
  onNavigate,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const currentPath = activePath ?? pathname ?? "";

  const flatItems = useMemo(() => sections.flatMap((s) => s.items), [sections]);

  const activeId = useMemo(() => {
    const match = flatItems.find((item) => item.href === currentPath);
    return match?.id ?? flatItems[0]?.id;
  }, [flatItems, currentPath]);

  // Close the mobile drawer on route change so it doesn't stay open
  // after navigating.
  useEffect(() => {
    setMobileOpen(false);
  }, [currentPath]);

  // Prevent background scroll while the mobile drawer is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileOpen]);

  const handleNavigate = (item: NavItem) => {
    onNavigate?.(item);
    setMobileOpen(false);
  };

  return (
    <>
      {mobileOpen && (
        <div
          className={styles.backdrop}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""} ${
          mobileOpen ? styles.mobileOpen : ""
        }`}
        data-collapsed={collapsed}
      >
        <div className={styles.header}>
          <button
            type="button"
            className={styles.mobileMenuButton}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X width={18} height={18} />
            ) : (
              <Menu width={18} height={18} />
            )}
          </button>

          <div className={styles.mark} aria-hidden="true">
            {workspaceIcon ?? workspaceName.slice(0, 1).toUpperCase()}
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

        {/*
          drawerBody wraps nav + footer in one flex column. On desktop
          this is a transparent passthrough (no layout change from
          before). On mobile it becomes the single positioned element
          for the off-canvas drawer, so nav/footer split the drawer's
          height via flex instead of two independent fixed elements
          guessing at each other's size.
        */}
        <div className={styles.drawerBody}>
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
                        onClick={() => handleNavigate(item)}
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

          <div className={styles.footer}>
            <button
              type="button"
              className={styles.collapseButton}
              onClick={() => setCollapsed((c) => !c)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <ChevronLeft
                width={16}
                height={16}
                style={{
                  transform: collapsed ? "rotate(180deg)" : "none",
                }}
              />

              {!collapsed && <span>Collapse</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export type { NavItem };
