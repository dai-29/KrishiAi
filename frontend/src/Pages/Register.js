// Register Page — Bootstrap green theme
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LanguageContext";
import api from "../utils/api";

const Register = () => {
  const { login } = useAuth();
  const { lang } = useLang();
  const navigate = useNavigate();
  const hi = lang === "hi";
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", password: "", confirmPassword: "",
    role: "farmer", farmLocation: "", farmSize: ""
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return toast.error(hi ? "पासवर्ड मेल नहीं खाते!" : "Passwords do not match!");
    if (form.password.length < 6) return toast.error(hi ? "पासवर्ड कम से कम 6 अक्षर का होना चाहिए" : "Password must be at least 6 characters.");
    setLoading(true);
    try {
      const res = await api.post("/auth/register", form);
      login(res.data.user, res.data.token);
      toast.success(hi ? "KrishiAI में आपका स्वागत है! 🌾" : "Welcome to KrishiAI! 🌾");
      navigate(form.role === "farmer" ? "/farmer-dashboard" : "/buyer-dashboard");
    } catch (err) {
      const msg = err.response?.data?.message || "";
      if (!err.response) {
        // Backend not running — show demo tip
        toast.error(hi ? "बैकएंड चालू नहीं है — डेमो क्रेडेंशियल से लॉगिन करें" : "Backend not running — use Demo credentials to login");
      } else {
        toast.error(msg || "Registration failed");
      }
    } finally { setLoading(false); }
  };

  return (
    <div className="krishi-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="text-center mb-4">
              <span style={{ fontSize: "3rem" }}>🌱</span>
              <h2 style={{ color: "#1B5E20", fontWeight: 800 }}>
                {hi ? "KrishiAI से जुड़ें" : "Join KrishiAI"}
              </h2>
              <p className="text-muted">{hi ? "अपना निःशुल्क खाता बनाएं" : "Create your free account"}</p>
            </div>

            {/* Role Selector */}
            <div className="row g-3 mb-4">
              {[
                { r: "farmer", emoji: "🚜", label: hi ? "किसान" : "Farmer", sub: hi ? "फसल उगाएं और बेचें" : "Grow & sell crops" },
                { r: "buyer", emoji: "🛒", label: hi ? "खरीदार" : "Buyer", sub: hi ? "ताजा उपज खरीदें" : "Buy fresh produce" }
              ].map(({ r, emoji, label, sub }) => (
                <div className="col-6" key={r}>
                  <div onClick={() => set("role", r)} className="krishi-card text-center"
                    style={{ cursor: "pointer", border: form.role === r ? "2px solid #1B5E20" : "2px solid #e0e0e0", background: form.role === r ? "#E8F5E9" : "#fff" }}>
                    <div style={{ fontSize: "2rem" }}>{emoji}</div>
                    <div className="fw-bold" style={{ color: form.role === r ? "#1B5E20" : "#555" }}>{label}</div>
                    <small className="text-muted">{sub}</small>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="krishi-card">
              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ color: "#2E7D32" }}>{hi ? "पूरा नाम" : "Full Name"}</label>
                <input required value={form.name} onChange={e => set("name", e.target.value)}
                  className="krishi-input" placeholder="Ramesh Kumar" />
              </div>
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold" style={{ color: "#2E7D32" }}>{hi ? "ईमेल" : "Email"}</label>
                  <input type="email" required value={form.email} onChange={e => set("email", e.target.value)}
                    className="krishi-input" placeholder="you@example.com" />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold" style={{ color: "#2E7D32" }}>{hi ? "फोन" : "Phone"}</label>
                  <input type="tel" required value={form.phone} onChange={e => set("phone", e.target.value)}
                    className="krishi-input" placeholder="9876543210" />
                </div>
              </div>
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold" style={{ color: "#2E7D32" }}>{hi ? "पासवर्ड" : "Password"}</label>
                  <div className="input-group">
                    <input type={showPw ? "text" : "password"} required value={form.password}
                      onChange={e => set("password", e.target.value)}
                      className="form-control" style={{ borderColor: "#a5d6a7" }} placeholder="••••••••" />
                    <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPw(!showPw)}>
                      {showPw ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold" style={{ color: "#2E7D32" }}>{hi ? "पासवर्ड दोबारा" : "Confirm Password"}</label>
                  <input type="password" required value={form.confirmPassword}
                    onChange={e => set("confirmPassword", e.target.value)}
                    className="krishi-input" placeholder="••••••••" />
                </div>
              </div>

              {form.role === "farmer" && (
                <div className="row g-3 mb-3 pt-3" style={{ borderTop: "1px solid #e8f5e9" }}>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold" style={{ color: "#2E7D32" }}>{hi ? "खेत का स्थान" : "Farm Location"}</label>
                    <input value={form.farmLocation} onChange={e => set("farmLocation", e.target.value)}
                      className="krishi-input" placeholder="e.g. Pune, Maharashtra" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold" style={{ color: "#2E7D32" }}>{hi ? "खेत का आकार (एकड़)" : "Farm Size (acres)"}</label>
                    <input type="number" min="0" value={form.farmSize} onChange={e => set("farmSize", e.target.value)}
                      className="krishi-input" placeholder="e.g. 5" />
                  </div>
                </div>
              )}

              <button type="submit" disabled={loading} className="krishi-btn w-100 mt-2">
                {loading ? <><span className="spinner-border spinner-border-sm me-2" />{hi ? "हो रहा है..." : "Creating..."}</> : (hi ? "खाता बनाएं 🌾" : "Create Account 🌾")}
              </button>

              <p className="text-center text-muted mt-3 mb-0">
                {hi ? "पहले से खाता है?" : "Already have an account?"}{" "}
                <Link to="/login" style={{ color: "#1B5E20", fontWeight: 600 }}>
                  {hi ? "साइन इन करें" : "Sign In"}
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
