import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const doLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/auth");
      if(!res.ok) throw new Error('Cannot reach mock API. Start json-server (npm run server).');
      const data = await res.json();

      if (data.username === username && data.password === password) {
        navigate("/users");
      } else {
        alert("Invalid login");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ width: "320px", margin: "80px auto" }}>
      <h2>Login</h2>
      <form onSubmit={doLogin}>
        <label>Username</label><br />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br/><br/>
        <label>Password</label><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br/><br/>
        <button type="submit">Login</button>
      </form>
      <p style={{marginTop:12}}>Demo cred - <b>admin / 123456</b></p>
    </div>
  );
}

export default Login;
