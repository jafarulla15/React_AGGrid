import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/users/${id}`)
        .then((res) => res.json())
        .then((data) => setForm({ name: data.name, email: data.email }))
        .catch(()=> alert('Cannot reach mock API. Start json-server (npm run server).'));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = id ? "PUT" : "POST";
    const url = id
      ? `http://localhost:5000/users/${id}`
      : "http://localhost:5000/users";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Save failed');
        navigate("/users");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div style={{ width: "420px", margin: "30px auto" }}>
      <h2>{id ? "Edit User" : "Add User"}</h2>

      <form onSubmit={handleSubmit}>
        <label>Name</label><br/>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        /><br/><br/>

        <label>Email</label><br/>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        /><br/><br/>

        <button type="submit">Save</button>
        &nbsp;
        <button type="button" onClick={() => navigate("/users")}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default UserForm;
