import React, { useState } from "react";
import { api } from "../../api/api";

export default function RegisterForm() {
  const [form, setForm] = useState({ name: "", email: "", address: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validate = () => {
    if (form.name.length < 20 || form.name.length > 60) return "Name must be 20-60 chars";
    if (!/\S+@\S+\.\S+/.test(form.email)) return "Invalid email";
    if (form.address.length > 400) return "Address max 400 chars";
    if (
      form.password.length < 8 ||
      form.password.length > 16 ||
      !/[A-Z]/.test(form.password) ||
      !/[!@#$%^&*]/.test(form.password)
    ) return "Password: 8-16 chars, 1 uppercase, 1 special char";
    return "";
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const err = validate();
    if (err) return setError(err);
    try {
      await api.post("/auth/register", form);
      setSuccess("Registration successful! You can now login.");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
        <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        {error && <div style={{ color: "red" }}>{error}</div>}
        {success && <div style={{ color: "green" }}>{success}</div>}
        <button type="submit">Register</button>
      </form>
      <a href="/">Back to Login</a>
    </div>
  );
}