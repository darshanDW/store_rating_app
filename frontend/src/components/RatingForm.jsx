import React, { useEffect, useState } from "react";
import { api } from "../api/api";

export default function RatingForm({ storeId }) {
  const [myRating, setMyRating] = useState(null);
  const [value, setValue] = useState(1);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    // Fetch user's rating for this store
    api.get("/ratings")
      .then(res => {
        const found = res.data.find(r => r.store.id === storeId);
        // console.log(foucnd)
        if (found) {
          setMyRating(found.value);
          setValue(found.value);
        }
      });
    // eslint-disable-next-line
  }, []);

  const submit = async e => {
    e.preventDefault();
    setMsg("");
    try {
      await api.post("/ratings", { storeId, value });
      setMyRating(value);
      setMsg("Rating submitted!");
    } catch (err) {
        console.log(err)
      setMsg("Error submitting rating");
    }
  };

  return (
    <form onSubmit={submit}>
      <select value={value} onChange={e => setValue(Number(e.target.value))}>
        {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
      </select>
      <button type="submit">{myRating ? "Update" : "Submit"}</button>
      {msg && <span> {msg}</span>}
    </form>
  );
}