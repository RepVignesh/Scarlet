"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";
import { ChevronsLeftIcon, LogOutIcon, SearchIcon } from "./icons";
import type { NavItem, SidebarProps } from "./Sidebar.types";

export default function Sidebar({
  sections,
  workspaceName,
  workspaceSubtitle,
  user,
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

  // Sliding rail indicator: measure the active item's position and
  // translate a single absolutely-positioned marker to it.
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const railRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ top: 0, height: 0, ready: false });

  const measure = () => {
    const el = activeId ? itemRefs.current.get(activeId) : undefined;
    const rail = railRef.current;
    if (!el || !rail) return;
    const railBox = rail.getBoundingClientRect();
    const itemBox = el.getBoundingClientRect();
    setIndicator({
      top: itemBox.top - railBox.top,
      height: itemBox.height,
      ready: true,
    });
  };

  useLayoutEffect(() => {
    measure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, collapsed, sections]);

  useEffect(() => {
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

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
              <span className={styles.workspaceSubtitle}>{workspaceSubtitle}</span>
            )}
          </div>
        )}
      </div>

      {!collapsed && (
        <button type="button" className={styles.search}>
          <SearchIcon width={16} height={16} />
          <span>Search</span>
          <kbd className={styles.kbd}>⌘K</kbd>
        </button>
      )}

      <nav className={styles.nav} aria-label="Primary">
        <div className={styles.rail} ref={railRef}>
          <span
            className={styles.railIndicator}
            style={{
              transform: `translateY(${indicator.top}px)`,
              height: indicator.height || 32,
              opacity: indicator.ready ? 1 : 0,
            }}
          />
        </div>

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
                    ref={(el) => {
                      if (el) itemRefs.current.set(item.id, el);
                      else itemRefs.current.delete(item.id);
                    }}
                    className={styles.item}
                    data-active={item.id === activeId}
                    title={collapsed ? item.label : undefined}
                    onClick={() => onNavigate?.(item)}
                  >
                    <span className={styles.icon}>{item.icon}</span>
                    {!collapsed && <span className={styles.label}>{item.label}</span>}
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
        {user && (
          <div className={styles.user}>
            <span className={styles.avatar} aria-hidden="true">
              {user.initials}
            </span>
            {!collapsed && (
              <div className={styles.userMeta}>
                <span className={styles.userName}>{user.name}</span>
                <span className={styles.userRole}>{user.role}</span>
              </div>
            )}
            {!collapsed && (
              <button type="button" className={styles.iconButton} aria-label="Log out">
                <LogOutIcon width={16} height={16} />
              </button>
            )}
          </div>
        )}

        <button
          type="button"
          className={styles.collapseButton}
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronsLeftIcon
            width={16}
            height={16}
            style={{ transform: collapsed ? "rotate(180deg)" : "none" }}
          />
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}

export type { NavItem };