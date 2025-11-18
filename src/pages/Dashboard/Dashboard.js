import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const stats = [
  { title: "Total Beneficiaries", value: "48,920", change: "+12%" },
  { title: "Active Trainings", value: "129", change: "+8%" },
  { title: "Monthly Expense", value: "৳ 3,92,40,000", change: "-2%" },
  { title: "District Coverage", value: "64 Districts", change: "100%" },
];

const lineData = [
  { month: "Jan", beneficiaries: 4000 },
  { month: "Feb", beneficiaries: 4600 },
  { month: "Mar", beneficiaries: 5100 },
  { month: "Apr", beneficiaries: 5800 },
  { month: "May", beneficiaries: 6800 },
  { month: "Jun", beneficiaries: 7500 },
  { month: "Jul", beneficiaries: 8500 },
];

const pieData = [
  { name: "Agriculture", value: 240 },
  { name: "ICT", value: 180 },
  { name: "Skills", value: 300 },
  { name: "Women Empowerment", value: 150 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Dashboard() {
  return (
    <div className="dashboard-container" style={{ padding: "20px" }}>
      {/* ======= PAGE TITLE ======= */}
      <h2 style={{ marginBottom: "20px" }}>
        EARN Project – Executive Dashboard
      </h2>

      {/* ======= TOP METRICS ======= */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
        }}
      >
        {stats.map((s, index) => (
          <div
            key={index}
            style={{
              padding: "20px",
              borderRadius: "10px",
              background: "#ffffff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <p style={{ fontSize: "14px", color: "#555" }}>{s.title}</p>
            <h2 style={{ margin: "5px 0" }}>{s.value}</h2>
            <span
              style={{
                color: s.change.includes("-") ? "red" : "green",
                fontWeight: "bold",
              }}
            >
              {s.change}
            </span>
          </div>
        ))}
      </div>

      {/* ======= CHARTS SECTION ======= */}
      <div
        style={{
          marginTop: "30px",
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
        }}
      >
        {/* ===== Beneficiaries Growth Chart ===== */}
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h3>Beneficiary Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={lineData}>
              <defs>
                <linearGradient id="colorB" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="30%" stopColor="#8884d8" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="beneficiaries"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorB)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* ===== Training Distribution Pie ===== */}
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h3>Training Sector Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ======= TODO + NOTIFICATIONS ======= */}
      <div
        style={{
          marginTop: "30px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        {/* ===== TODO LIST ===== */}
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h3>To-Do Task List</h3>
          <ul>
            <li>✔ Upload monthly district report</li>
            <li>✔ Approve training center allocation</li>
            <li>⬜ Review beneficiary verification issues</li>
            <li>⬜ Update expense configuration</li>
            <li>⬜ Schedule central monitoring visit</li>
          </ul>
        </div>

        {/* ===== NOTIFICATIONS ===== */}
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h3>Notifications</h3>
          <ul>
            <li>🔔 12 new beneficiaries registered today</li>
            <li>🔔 5 new monthly reports submitted</li>
            <li>⚠️ Training center audit needed in Rajshahi</li>
            <li>📢 New fund request pending approval</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
