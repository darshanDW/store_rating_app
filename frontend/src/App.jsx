import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import OwnerDashboard from "./components/Dashboard/OwnerDashboard";
import UserDashboard from "./components/Dashboard/UserDashboard";
import { getToken, api } from "./api/api";
import './App.css'
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      api.get("/users/me")
        .then(res => setUser(res.data))
        .catch(() => setUser(null));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  if (!user) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="*" element={<LoginForm setUser={setUser} />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <div>
        <button onClick={logout} style={{ float: "right" }}>Logout</button>
        <h3>Welcome, {user.name} ({user.role})</h3>
      </div>
      <Routes>
        {user.role === "admin" && <Route path="*" element={<AdminDashboard />} />}
        {user.role === "owner" && <Route path="*" element={<OwnerDashboard />} />}
        {user.role === "user" && <Route path="*" element={<UserDashboard />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;