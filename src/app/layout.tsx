"use client";

import { DM_Sans, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import Sidebar from "@/app/components/Sidebar/Sidebar";
import { sections } from "@/app/configs/Sections";

const display = Manrope({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--sidebar-display-font",
});

const body = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--sidebar-body-font",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <div className="appShell">
          <Sidebar
            sections={sections}
            workspaceName="Scarlet"
            workspaceSubtitle="An Automatic Footprinting Tool"
            workspaceIcon={
              <img
                src="/Icon.jpg"
                alt="Scarlet"
                width={32}
                height={32}
                style={{ borderRadius: 6 }}
              />
            }
          />
          <main className="mainContent">{children}</main>
        </div>
      </body>
    </html>
  );
}
