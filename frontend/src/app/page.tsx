import Sidebar from "@/app/components/Sidebar";
import { sections } from "@/app/configs/Sections"

export default function Page() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f7f7f5" }}>
      
      <main style={{ flex: 1, padding: "40px 48px" }}>
        <h1 style={{ font: "600 22px/1.3 var(--sidebar-display-font)", margin: 0 }}>
          Overview
        </h1>
        <p style={{ color: "#706c65", marginTop: 8, maxWidth: 480 }}>
          This is a placeholder page to preview the sidebar. Swap the
          <code> sections</code> array and props with your own routes and data.
        </p>
      </main>
    </div>
  );
}