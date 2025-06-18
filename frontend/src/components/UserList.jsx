import React, { useEffect, useState } from "react";
import { api } from "../api/api";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ name: "", email: "", address: "", role: "" });

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  const fetchUsers = async () => {
    const params = {};
    Object.keys(filters).forEach(k => {
      if (filters[k]) params[k] = filters[k];
    });
    const res = await api.get("/users", { params });
    setUsers(res.data);
  };

  return (
    <div>
      <div>
        <input placeholder="Name" value={filters.name} onChange={e => setFilters({ ...filters, name: e.target.value })} />
        <input placeholder="Email" value={filters.email} onChange={e => setFilters({ ...filters, email: e.target.value })} />
        <input placeholder="Address" value={filters.address} onChange={e => setFilters({ ...filters, address: e.target.value })} />
        <select value={filters.role} onChange={e => setFilters({ ...filters, role: e.target.value })}>
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="owner">Owner</option>
        </select>
        <button onClick={fetchUsers}>Filter</button>
      </div>
      <table border="1" cellPadding="4">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Address</th><th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.address}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}