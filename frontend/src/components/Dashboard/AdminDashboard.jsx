import React, { useEffect, useState } from "react";
import { api } from "../../api/api";
import UserList from "../UserList";
import StoreList from "../StoreList";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, stores: 0, ratings: 0 });

  useEffect(() => {
    async function fetchStats() {
      const users = await api.get("/users");
      const stores = await api.get("/stores");
      const ratings = await api.get("/ratings");
      setStats({ users: users.data.length, stores: stores.data.length, ratings: ratings.data.length });
    }
    fetchStats();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <b>Total Users:</b> {stats.users} &nbsp;
        <b>Total Stores:</b> {stats.stores} &nbsp;
        <b>Total Ratings:</b> {stats.ratings}
      </div>
      <h3>Users</h3>
      <UserList />
      <h3>Stores</h3>
      <StoreList />
    </div>
  );
}