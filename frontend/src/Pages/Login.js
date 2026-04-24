// Login Page — Bootstrap green theme matching original site
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LanguageContext";
import api from "../utils/api";

const Login = () => {
  const { login } = useAuth();
  const { lang } = useLang();
  const navigate = useNavigate();
  const hi = lang === "hi";

  const [tab, setTab] = useState("email");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [devOtp, setDevOtp] = useState("");
  const [emailForm, setEmailForm] = useState({ email: "", password: "" });
  const [otpForm, setOtpForm] = useState({ phone: "", otp: "" });

  const DEMO_USERS = [
    { email:"demo@krishiai.in",  password:"demo123", user:{ id:"demo1", name:"Demo Farmer",  role:"farmer", email:"demo@krishiai.in",  phone:"9999999991", farmLocation:"Punjab", farmSize:5 } },
    { email:"buyer@krishiai.in", password:"demo123", user:{ id:"demo2", name:"Demo Buyer",   role:"buyer",  email:"buyer@krishiai.in", phone:"9999999992" } },
  ];

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    // Demo mode — works without backend
    const demo = DEMO_USERS.find(d => d.email===emailForm.email && d.password===emailForm.password);
    if (demo) {
      login(demo.user, "demo-token-" + demo.user.role);
      toast.success(hi ? "डेमो लॉगिन सफल! 🌾" : "Demo login successful! 🌾");
      navigate(demo.user.role==="farmer" ? "/farmer-dashboard" : "/buyer-dashboard");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/auth/login", emailForm);
      login(res.data.user, res.data.token);
      toast.success(hi ? "लॉगिन सफल! 🌾" : "Login successful! 🌾");
      navigate(res.data.user.role === "farmer" ? "/farmer-dashboard" : "/buyer-dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || (hi ? "गलत जानकारी" : "Invalid credentials"));
    } finally { setLoading(false); }
  };

  const handleSendOtp = async () => {
    if (!otpForm.phone) return toast.error(hi ? "फोन नंबर दर्ज करें" : "Enter phone number");
    setLoading(true);
    try {
      const res = await api.post("/auth/send-otp", { phone: otpForm.phone });
      setOtpSent(true);
      if (res.data.devOtp) setDevOtp(res.data.devOtp);
      toast.success(hi ? "OTP भेजा गया!" : "OTP sent!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    } finally { setLoading(false); }
  };

  const handleOtpLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/verify-otp", otpForm);
      login(res.data.user, res.data.token);
      toast.success(hi ? "सफलतापूर्वक लॉगिन!" : "Logged in successfully!");
      navigate(res.data.user.role === "farmer" ? "/farmer-dashboard" : "/buyer-dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally { setLoading(false); }
  };

  return (
    <div className="krishi-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            {/* Header */}
            <div className="text-center mb-4">
              <div className="mb-3">
                <span style={{ fontSize: "3rem" }}>🌾</span>
              </div>
              <h2 style={{ color: "#1B5E20", fontWeight: 800 }}>
                {hi ? "वापस स्वागत है" : "Welcome Back"}
              </h2>
              <p className="text-muted">{hi ? "अपने KrishiAI खाते में साइन इन करें" : "Sign in to your KrishiAI account"}</p>
            </div>

            {/* Demo Banner */}
            <div className="alert py-2 mb-3 text-center" style={{ background:"#E8F5E9", border:"1px solid #a5d6a7", borderRadius:"8px" }}>
              <small className="fw-semibold" style={{ color:"#1B5E20" }}>🔐 Demo Credentials:</small><br/>
              <small className="text-muted">Farmer: <strong>demo@krishiai.in</strong> / <strong>demo123</strong></small><br/>
              <small className="text-muted">Buyer: <strong>buyer@krishiai.in</strong> / <strong>demo123</strong></small>
            </div>

            {/* Tab Switch */}
            <div className="d-flex mb-4 border rounded-3 overflow-hidden">
              {[["email", hi ? "✉️ ईमेल" : "✉️ Email"], ["otp", "📱 WhatsApp OTP"]].map(([k, l]) => (
                <button key={k} onClick={() => setTab(k)} type="button"
                  className="flex-fill py-2 border-0 fw-semibold"
                  style={{ background: tab === k ? "#1B5E20" : "#f8f9fa", color: tab === k ? "#fff" : "#555", transition: "all 0.2s" }}>
                  {l}
                </button>
              ))}
            </div>

            <div className="krishi-card">
              {/* Email Form */}
              {tab === "email" && (
                <form onSubmit={handleEmailLogin}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ color: "#2E7D32" }}>
                      {hi ? "ईमेल पता" : "Email Address"}
                    </label>
                    <input type="email" required value={emailForm.email}
                      onChange={e => setEmailForm({ ...emailForm, email: e.target.value })}
                      className="krishi-input" placeholder="farmer@example.com" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ color: "#2E7D32" }}>
                      {hi ? "पासवर्ड" : "Password"}
                    </label>
                    <div className="input-group">
                      <input type={showPw ? "text" : "password"} required value={emailForm.password}
                        onChange={e => setEmailForm({ ...emailForm, password: e.target.value })}
                        className="form-control" style={{ borderColor: "#a5d6a7" }} placeholder="••••••••" />
                      <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPw(!showPw)}>
                        {showPw ? "🙈" : "👁️"}
                      </button>
                    </div>
                  </div>
                  <button type="submit" disabled={loading} className="krishi-btn w-100">
                    {loading ? <><span className="spinner-border spinner-border-sm me-2" />लोड...</> : (hi ? "साइन इन करें" : "Sign In")}
                  </button>
                </form>
              )}

              {/* OTP Form */}
              {tab === "otp" && (
                <form onSubmit={handleOtpLogin}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ color: "#2E7D32" }}>
                      {hi ? "फोन नंबर" : "Phone Number"}
                    </label>
                    <div className="d-flex gap-2">
                      <input type="tel" value={otpForm.phone}
                        onChange={e => setOtpForm({ ...otpForm, phone: e.target.value })}
                        className="krishi-input" placeholder="9876543210" disabled={otpSent} />
                      <button type="button" onClick={handleSendOtp} disabled={loading || otpSent}
                        className="krishi-btn text-nowrap px-3">
                        {otpSent ? "✓ " + (hi ? "भेजा" : "Sent") : (hi ? "OTP भेजें" : "Send OTP")}
                      </button>
                    </div>
                  </div>
                  {otpSent && (
                    <>
                      <div className="mb-3">
                        <label className="form-label fw-semibold" style={{ color: "#2E7D32" }}>OTP</label>
                        <input type="text" maxLength={6} value={otpForm.otp}
                          onChange={e => setOtpForm({ ...otpForm, otp: e.target.value })}
                          className="krishi-input text-center fw-bold fs-5 tracking-widest" placeholder="------" />
                      </div>
                      {devOtp && (
                        <div className="alert alert-warning py-2 text-center">
                          🔧 Dev OTP: <strong>{devOtp}</strong>
                        </div>
                      )}
                      <button type="submit" disabled={loading || otpForm.otp.length < 6} className="krishi-btn w-100">
                        {loading ? <span className="spinner-border spinner-border-sm me-2" /> : null}
                        {hi ? "सत्यापित करें और लॉगिन करें" : "Verify & Login"}
                      </button>
                    </>
                  )}
                  <div className="alert alert-success mt-3 py-2 d-flex align-items-center gap-2 mb-0">
                    📱 <small>{hi ? "OTP आपके WhatsApp पर भेजा जाएगा" : "OTP will be sent to your WhatsApp"}</small>
                  </div>
                </form>
              )}

              <p className="text-center text-muted mt-3 mb-0">
                {hi ? "खाता नहीं है?" : "Don't have an account?"}{" "}
                <Link to="/register" style={{ color: "#1B5E20", fontWeight: 600 }}>
                  {hi ? "साइन अप करें" : "Sign Up"}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
