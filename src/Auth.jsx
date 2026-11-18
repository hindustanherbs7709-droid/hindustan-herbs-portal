
import React, { useState } from "react";
import { supabase } from "./supabase";

export default function Auth({ onSuccess, onClose }) {
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");

  const getEmail = (number) => {
    const digits = number.replace(/\D/g, "").replace(/^91/, "");
    return `${digits}@login.hindustanherbs.in`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const digits = mobile.replace(/\D/g, "").replace(/^91/, "");

    if (!/^[6-9]\d{9}$/.test(digits)) {
      setError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const email = getEmail(digits);

      if (mode === "register") {
        if (!name.trim()) throw new Error("Please enter your full name.");

        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name.trim(),
              mobile: digits,
              company_name: company.trim()
            }
          }
        });

        if (signUpError) throw signUpError;

        if (!data.session || !data.user) {
          setMessage("Account created. Please contact support if you cannot sign in.");
          return;
        }

        const { error: profileError } = await supabase
          .from("profiles")
          .insert({
            id: data.user.id,
            full_name: name.trim(),
            mobile: digits,
            company_name: company.trim(),
            role: "customer"
          });

        if (profileError) throw profileError;

        onSuccess?.(data.user);
      } else {
        const { data, error: loginError } =
          await supabase.auth.signInWithPassword({
            email,
            password
          });

        if (loginError) throw loginError;
        onSuccess?.(data.user);
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(10,30,18,.78)",
      display: "grid", placeItems: "center",
      padding: 16, overflowY: "auto"
    }}>
      <div style={{
        background: "#fff", width: "100%", maxWidth: 440,
        padding: 30, borderRadius: 8, position: "relative"
      }}>
        <button onClick={onClose} style={{
          position: "absolute", right: 16, top: 12,
          border: 0, background: "none", fontSize: 25,
          cursor: "pointer", color: "#456"
        }}>×</button>

        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ color: "#527a40", fontSize: 30 }}>🌿</div>
          <h2 style={{ color: "#244e35", margin: "8px 0" }}>
            HINDUSTAN HERBS
          </h2>
          <p style={{ color: "#778174", fontSize: 13 }}>
            {mode === "login" ? "Welcome Back" : "Create Your Customer Account"}
          </p>
        </div>

        <div style={{ display: "flex", marginBottom: 22 }}>
          <button onClick={() => { setMode("login"); setError(""); setMessage(""); }}
            style={{
              flex: 1, padding: 12, border: 0, cursor: "pointer",
              background: mode === "login" ? "#244e35" : "#edf1e9",
              color: mode === "login" ? "#fff" : "#244e35"
            }}>Login</button>
          <button onClick={() => { setMode("register"); setError(""); setMessage(""); }}
            style={{
              flex: 1, padding: 12, border: 0, cursor: "pointer",
              background: mode === "register" ? "#244e35" : "#edf1e9",
              color: mode === "register" ? "#fff" : "#244e35"
            }}>Register</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
          {mode === "register" && <>
            <label style={{ display: "grid", gap: 6, fontSize: 13 }}>
              Full Name
              <input required value={name} onChange={e => setName(e.target.value)}
                placeholder="Your full name" style={fieldStyle} />
            </label>
            <label style={{ display: "grid", gap: 6, fontSize: 13 }}>
              Company Name
              <input value={company} onChange={e => setCompany(e.target.value)}
                placeholder="Your company (optional)" style={fieldStyle} />
            </label>
          </>}

          <label style={{ display: "grid", gap: 6, fontSize: 13 }}>
            Mobile Number
            <input required type="tel" value={mobile}
              onChange={e => setMobile(e.target.value)}
              placeholder="10-digit mobile number" style={fieldStyle} />
          </label>

          <label style={{ display: "grid", gap: 6, fontSize: 13 }}>
            Password
            <input required type="password" value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="At least 6 characters" style={fieldStyle} />
          </label>

          {error && <p style={{ color: "#b42318", fontSize: 12 }}>{error}</p>}
          {message && <p style={{ color: "#527a40", fontSize: 12 }}>{message}</p>}

          <button disabled={loading} type="submit" style={{
            background: "#244e35", color: "white", border: 0,
            padding: 14, fontWeight: 700, cursor: "pointer",
            opacity: loading ? .6 : 1
          }}>
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Create Account"}
          </button>
        </form>

        <p style={{ fontSize: 11, color: "#899084", textAlign: "center", marginTop: 18 }}>
          Your mobile number is used as your login ID. No OTP is required.
        </p>
      </div>
    </div>
  );
}

const fieldStyle = {
  width: "100%", padding: 12, border: "1px solid #dce3d8",
  borderRadius: 3, outlineColor: "#789453", fontSize: 14
};
