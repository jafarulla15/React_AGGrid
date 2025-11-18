import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./TopNav.css";

export default function TopNav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="topnav">
      <div className="logo" onClick={() => navigate("/")}>
        React CRUD Demo
      </div>

      <nav className="menu">
        <Link to="/">Dashboard</Link>
        <Link to="/users">Users</Link>
        <Link to="/employees">Employees</Link>
        <Link to="/reports">Reports</Link>
      </nav>

      <div className="user-area">
        {user ? (
          <div className="avatar-wrapper">
            <img
              src={user.avatar || "https://i.pravatar.cc/40?img=3"}
              className="avatar"
              onClick={() => setOpen(!open)}
              alt="avatar"
            />

            <div className={`dropdown ${open ? "show" : ""}`}>
              <div
                className="dropdown-item"
                onClick={() => navigate("/profile")}
              >
                Profile
              </div>
              <div className="dropdown-item" onClick={logout}>
                Logout
              </div>
            </div>
          </div>
        ) : (
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>
    </header>
  );
}
