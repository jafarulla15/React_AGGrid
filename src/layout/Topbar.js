import React, { useState } from "react";
import "./Layout.css";

export default function Topbar({ toggleSidebar }) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="topbar">
      <button className="menu-btn" onClick={toggleSidebar}>
        ☰
      </button>

      <div className="topbar-right">
        <div className="notification">
          🔔
          <span className="badge">5</span>
        </div>

        <div className="avatar" onClick={() => setProfileOpen(!profileOpen)}>
          <img
            src="https://i.pravatar.cc/40"
            alt="User"
            className="avatar-img"
          />
        </div>

        {profileOpen && (
          <div className="profile-menu">
            <a href="/profile">👤 Profile</a>
            <a href="/settings">⚙️ Settings</a>
            <a href="/logout">🚪 Logout</a>
          </div>
        )}
      </div>
    </div>
  );
}
