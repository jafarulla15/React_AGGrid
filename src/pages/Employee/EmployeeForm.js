import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_BASE = "http://localhost:5000";

function renderInputForKey(key, value, onChange) {
  const type = typeof value;
  if (type === "number") {
    return <input type="number" value={value===null? "": value} onChange={e => onChange(key, e.target.value === "" ? null : Number(e.target.value))} />;
  }
  if (type === "boolean") {
    return (
      <select value={value ? "true" : "false"} onChange={(e) => onChange(key, e.target.value === "true")}>
        <option value="true">true</option>
        <option value="false">false</option>
      </select>
    );
  }
  // date-like detection
  if (String(value).match(/^\d{4}-\d{2}-\d{2}/)) {
    return <input type="date" value={value || ""} onChange={e => onChange(key, e.target.value)} />;
  }
  // default to text
  return <input type="text" value={value || ""} onChange={e => onChange(key, e.target.value)} />;
}

export default function EmployeeForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null); // null => loading
  const [loadingSample, setLoadingSample] = useState(false);

  useEffect(() => {
    // If edit, fetch record
    if (id) {
      fetch(`${API_BASE}/employees/${id}`)
        .then(r => r.json())
        .then(data => setForm(data))
        .catch(() => alert('Could not load employee'));
    } else {
      // if add, try fetch one sample to learn keys; fall back to default template
      setLoadingSample(true);
      fetch(`${API_BASE}/employees?_limit=1`)
        .then(r => r.json())
        .then(arr => {
          if (arr && arr.length > 0) {
            const sample = arr[0];
            // clear id for new
            delete sample.id;
            // set sensible defaults for new record
            const template = { ...sample };
            Object.keys(template).forEach(k => {
              if (typeof template[k] === "number") template[k] = 0;
              else if (typeof template[k] === "boolean") template[k] = false;
              else template[k] = "";
            });
            setForm(template);
          } else {
            // fallback: simple template
            setForm({
              firstName: "", lastName: "", email: "", phone: "", age: 25, gender: "Male", city: "", country: "", department: "", position: "", salary: 30000, isActive: true
            });
          }
        })
        .catch(() => {
          setForm({
            firstName: "", lastName: "", email: "", phone: "", age: 25, gender: "Male", city: "", country: "", department: "", position: "", salary: 30000, isActive: true
          });
        })
        .finally(() => setLoadingSample(false));
    }
  }, [id]);

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = id ? "PUT" : "POST";
    const url = id ? `${API_BASE}/employees/${id}` : `${API_BASE}/employees`;
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(res => {
        if (!res.ok) throw new Error("Save failed");
        navigate("/employees");
      })
      .catch(err => alert(err.message));
  };

  if (form === null) return <div style={{padding:20}}>Loading...</div>;

  return (
    <div style={{ maxWidth: 900, margin: "20px auto" }}>
      <h2>{id ? "Edit Employee" : "Add Employee"}</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {Object.keys(form).map((key) => (
            <div key={key}>
              <label style={{ textTransform: "capitalize" }}>{key}</label><br/>
              {renderInputForKey(key, form[key], handleChange)}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 16 }}>
          <button type="submit">Save</button>
          &nbsp;
          <button type="button" onClick={() => navigate("/employees")}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
