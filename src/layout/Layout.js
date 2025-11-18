import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./Layout.css";

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="layout-container">
      <Sidebar collapsed={collapsed} />

      <div className="main-content">
        <Topbar toggleSidebar={() => setCollapsed(!collapsed)} />
        <div className="content-area">{children}</div>
      </div>
    </div>
  );
}
