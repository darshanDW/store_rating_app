import React, { useEffect, useState } from "react";
import { api } from "../../api/api";

export default function OwnerDashboard() {
  const [data, setData] = useState(null);
  const [newPass, setNewPass] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api.get("/stores/owner/dashboard").then(res => setData(res.data));
  }, []);

  const updatePassword = async e => {
    e.preventDefault();
    setMsg("");
    try {
      await api.put("/users/password", { password: newPass });
      setMsg("Password updated!");
      setNewPass("");
    } catch {
      setMsg("Error updating password");
    }
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h2>Owner Dashboard</h2>
      <div>
        <b>Store:</b> {data.store.name} <br />
        <b>Address:</b> {data.store.address} <br />
        <b>Average Rating:</b> {data.averageRating || "No ratings yet"}
      </div>
      <h3>Ratings</h3>
      <ul>
        {data.ratings.map(r => (
          <li key={r.id}>
            User: {r.user.name} | Rating: {r.value}
          </li>
        ))}
      </ul>
      <h3>Update Password</h3>
      <form onSubmit={updatePassword}>
        <input
          type="password"
          placeholder="New Password"
          value={newPass}
          onChange={e => setNewPass(e.target.value)}
        />
        <br/>
        <br/>
        {/* <button type="submit">Update</button> */}
        {msg && <span> {msg}</span>}
      </form>
    </div>
  );
}