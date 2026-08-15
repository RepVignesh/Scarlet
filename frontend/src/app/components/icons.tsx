import type { SVGProps } from "react";

/**
 * A small, consistent icon set: 20x20 viewBox, 1.6px stroke, rounded caps.
 * Kept local so the sidebar has zero external icon-library dependency.
 */
const base: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 20 20",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function HomeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M3 8.5 10 3l7 5.5" />
      <path d="M5 7.5V16a1 1 0 0 0 1 1h3v-4.5h2V17h3a1 1 0 0 0 1-1V7.5" />
    </svg>
  );
}

export function ProjectsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4" width="6" height="6" rx="1.2" />
      <rect x="11" y="4" width="6" height="6" rx="1.2" />
      <rect x="3" y="12" width="6" height="4" rx="1.2" />
      <rect x="11" y="12" width="6" height="4" rx="1.2" />
    </svg>
  );
}

export function AnalyticsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 16V9" />
      <path d="M10 16V4" />
      <path d="M16 16v-6" />
      <path d="M3 16.5h14" />
    </svg>
  );
}

export function TeamIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="7.2" cy="7" r="2.4" />
      <path d="M2.6 16c.4-2.6 2.3-4.2 4.6-4.2s4.2 1.6 4.6 4.2" />
      <circle cx="14.5" cy="6.2" r="1.9" />
      <path d="M12.6 11.4c1.8-.3 3.6.9 4.1 3.3" />
    </svg>
  );
}

export function InboxIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M3 11.5 5.3 4h9.4l2.3 7.5" />
      <path d="M3 11.5h4.2c.3 1 1.2 1.7 2.3 1.7s2-.7 2.3-1.7H17V15a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3.5Z" />
    </svg>
  );
}

export function SettingsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="10" cy="10" r="2.4" />
      <path d="M10 3.3v1.6M10 15.1v1.6M16.7 10h-1.6M4.9 10H3.3M14.7 5.3l-1.1 1.1M6.4 13.6l-1.1 1.1M14.7 14.7l-1.1-1.1M6.4 6.4 5.3 5.3" />
    </svg>
  );
}

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="8.8" cy="8.8" r="5" />
      <path d="M16.5 16.5 13 13" />
    </svg>
  );
}

export function ChevronsLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M11.5 4.5 6 10l5.5 5.5" />
      <path d="M15.5 4.5 10 10l5.5 5.5" opacity={0.001} />
    </svg>
  );
}

export function LogOutIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M8 3.5H5a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h3" />
      <path d="M13 13.5 17 10l-4-3.5" />
      <path d="M17 10H7.5" />
    </svg>
  );
}