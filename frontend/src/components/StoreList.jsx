import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import RatingForm from "./RatingForm";

export default function StoreList() {
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({ name: "", address: "" });

  useEffect(() => {
    fetchStores();
    // eslint-disable-next-line
  }, []);

  const fetchStores = async () => {
    const params = {};
    Object.keys(filters).forEach(k => {
      if (filters[k]) params[k] = filters[k];
    });
    const res = await api.get("/stores", { params });
    setStores(res.data);
  };

  return (
    <div>
      <div>
        <input placeholder="Store Name" value={filters.name} onChange={e => setFilters({ ...filters, name: e.target.value })} />
        <input placeholder="Address" value={filters.address} onChange={e => setFilters({ ...filters, address: e.target.value })} />
        <button onClick={fetchStores}>Filter</button>
      </div>
      <table border="1" cellPadding="4">
        <thead>
          <tr>
            <th>Name</th><th>Address</th><th>Average Rating</th><th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {stores.map(store => (
            <tr key={store.id}>
              <td>{store.name}</td>
              <td>{store.address}</td>
              <td>{store.averageRating || "No ratings"}</td>
              <td><RatingForm storeId={store.id} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}