import React, { useState } from "react";
import "./Layout.css";

export default function Sidebar({ collapsed }) {
  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">{!collapsed && <h2>EARN</h2>}</div>

      <ul className="sidebar-menu">
        <li>
          <a href="/">📊 {!collapsed && "Dashboard"}</a>
        </li>
        <li>
          <a href="/users">👥 {!collapsed && "Users"}</a>
        </li>
        <li>
          <a href="/employees">👨‍💼 {!collapsed && "Employee"}</a>
        </li>
        <li>
          <a href="/training">🏫 {!collapsed && "Training"}</a>
        </li>
        <li>
          <a href="/beneficiaries">👥 {!collapsed && "Beneficiaries"}</a>
        </li>
        <li>
          <a href="/login">👥 {!collapsed && "Login"}</a>
        </li>
      </ul>
    </div>
  );
}
