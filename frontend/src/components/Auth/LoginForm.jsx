import React, { useState } from "react";
import { api } from "../../api/api";

export default function LoginForm({ setUser }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button type="submit">Login</button>
      </form>
      <a href="/register">Register</a>
    </div>
  );
}