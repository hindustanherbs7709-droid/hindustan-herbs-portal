
import React, { useEffect, useState } from "react";
import { supabase } from "./supabase";
import {
  Leaf, LogOut, PlusCircle, ClipboardList,
  Package, Clock, CheckCircle, X
} from "lucide-react";

export default function Dashboard({ user, onLogout }) {
  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    material: "",
    quantity: "",
    location: "",
    quality: "",
    details: ""
  });

  const loadRequirements = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("requirements")
      .select("*")
      .eq("customer_id", user.id)
      .order("created_at", { ascending: false });

    if (error) setError(error.message);
    else setRequirements(data || []);

    setLoading(false);
  };

  useEffect(() => {
    loadRequirements();
  }, [user.id]);

  const submitRequirement = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const { error } = await supabase
      .from("requirements")
      .insert({
        customer_id: user.id,
        material: form.material,
        quantity: form.quantity,
        location: form.location,
        quality: form.quality,
        details: form.details,
        status: "Pending"
      });

    setSaving(false);

    if (error) {
      setError(error.message);
      return;
    }

    setForm({
      material: "",
      quantity: "",
      location: "",
      quality: "",
      details: ""
    });

    setShowForm(false);
    loadRequirements();
  };

  const card = {
    background: "#fff",
    padding: 22,
    borderRadius: 10,
    border: "1px solid #e5ebdf"
  };

  const field = {
    width: "100%",
    padding: 12,
    border: "1px solid #dce3d8",
    borderRadius: 6,
    marginTop: 6,
    boxSizing: "border-box"
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f5f7f1",
      fontFamily: "Arial, sans-serif",
      color: "#244e35"
    }}>
      <header style={{
        background: "#244e35",
        color: "white",
        padding: "18px 5%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12
      }}>
        <h2><Leaf size={22} /> HINDUSTAN HERBS</h2>
        <button onClick={onLogout} style={{
          padding: "10px 16px",
          background: "white",
          color: "#244e35",
          border: 0,
          borderRadius: 6,
          cursor: "pointer"
        }}>
          <LogOut size={15} /> Logout
        </button>
      </header>

      <main style={{
        maxWidth: 1100,
        margin: "auto",
        padding: "35px 18px"
      }}>
        <h1>Welcome to Your Dashboard</h1>
        <p>Manage your herbal material requirements in one place.</p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: 16,
          margin: "28px 0"
        }}>
          <div style={card}>
            <ClipboardList />
            <h2>{requirements.length}</h2>
            <p>Total Requirements</p>
          </div>

          <div style={card}>
            <Clock />
            <h2>{requirements.filter(r => r.status === "Pending").length}</h2>
            <p>Pending Requirements</p>
          </div>

          <div style={card}>
            <CheckCircle />
            <h2>{requirements.filter(r => r.status === "Completed").length}</h2>
            <p>Completed Orders</p>
          </div>
        </div>

        <button onClick={() => setShowForm(!showForm)} style={{
          padding: 14,
          background: "#527a40",
          color: "white",
          border: 0,
          borderRadius: 6,
          cursor: "pointer",
          fontWeight: "bold",
          marginBottom: 25
        }}>
          <PlusCircle size={17} /> Submit New Requirement
        </button>

        {error && (
          <p style={{ color: "#b42318", background: "#fff0ed", padding: 12 }}>
            {error}
          </p>
        )}

        {showForm && (
          <form onSubmit={submitRequirement} style={{
            ...card,
            marginBottom: 25,
            display: "grid",
            gap: 14
          }}>
            <h2>New Herbal Requirement</h2>

            <label>Material Required
              <input required style={field}
                placeholder="e.g. Kalmegh"
                value={form.material}
                onChange={e => setForm({...form, material: e.target.value})}
              />
            </label>

            <label>Quantity Required
              <input required style={field}
                placeholder="e.g. 500 kg"
                value={form.quantity}
                onChange={e => setForm({...form, quantity: e.target.value})}
              />
            </label>

            <label>Delivery Location
              <input required style={field}
                placeholder="City, State"
                value={form.location}
                onChange={e => setForm({...form, location: e.target.value})}
              />
            </label>

            <label>Quality / Grade
              <input style={field}
                placeholder="Premium, cleaned, whole, etc."
                value={form.quality}
                onChange={e => setForm({...form, quality: e.target.value})}
              />
            </label>

            <label>Additional Details
              <textarea style={field} rows="3"
                value={form.details}
                onChange={e => setForm({...form, details: e.target.value})}
              />
            </label>

            <button disabled={saving} style={{
              padding: 14,
              background: "#244e35",
              color: "white",
              border: 0,
              borderRadius: 6,
              cursor: "pointer"
            }}>
              {saving ? "Submitting..." : "Submit Requirement"}
            </button>
          </form>
        )}

        <section style={card}>
          <h2><Package size={20} /> My Requirements</h2>

          {loading ? (
            <p>Loading your requirements...</p>
          ) : requirements.length === 0 ? (
            <p>You have not submitted any requirements yet.</p>
          ) : (
            requirements.map(item => (
              <div key={item.id} style={{
                padding: 16,
                borderBottom: "1px solid #e5ebdf"
              }}>
                <h3>{item.material}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Location: {item.location}</p>
                <p>Quality: {item.quality || "Not specified"}</p>
                <b>Status: {item.status}</b>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
}
