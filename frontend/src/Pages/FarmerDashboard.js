// FarmerDashboard — Bootstrap green theme
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LanguageContext";
import api from "../utils/api";

const MOCK_CROPS = [
  { _id: "1", title: "गेहूं", description: "ताजा गेहूं", price: 25, quantity: 500, quantityUnit: "kg", category: "grains", location: "Punjab", isAvailable: true },
  { _id: "2", title: "टमाटर", description: "ताजे टमाटर", price: 18, quantity: 200, quantityUnit: "kg", category: "vegetables", location: "Punjab", isAvailable: true },
];

const FarmerDashboard = () => {
  const { user } = useAuth();
  const { lang } = useLang();
  const hi = lang === "hi";
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", titleHi: "", description: "", category: "vegetables", price: "", quantity: "", quantityUnit: "kg", location: "", isOrganic: false });

  const hour = new Date().getHours();
  const greeting = hour < 12 ? (hi ? "सुप्रभात" : "Good Morning") : hour < 17 ? (hi ? "नमस्कार" : "Good Afternoon") : (hi ? "शुभ संध्या" : "Good Evening");

  useEffect(() => {
    api.get("/crops/my").then(r => setCrops(r.data.crops)).catch(() => setCrops(MOCK_CROPS)).finally(() => setLoading(false));
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    // Demo mode — add to local state directly
    if (user?.id?.startsWith("demo")) {
      const newCrop = { ...form, _id: Date.now().toString(), price: Number(form.price), quantity: Number(form.quantity), isAvailable: true };
      setCrops(p => [newCrop, ...p]);
      toast.success(hi ? "फसल सूचीबद्ध हुई! (डेमो)" : "Crop listed! (Demo mode)");
      setShowModal(false);
      setForm({ title:"", titleHi:"", description:"", category:"vegetables", price:"", quantity:"", quantityUnit:"kg", location:"", isOrganic:false });
      return;
    }
    try {
      await api.post("/crops", { ...form, price: Number(form.price), quantity: Number(form.quantity) });
      toast.success(hi ? "फसल सूचीबद्ध हुई!" : "Crop listed!");
      setShowModal(false);
      api.get("/crops/my").then(r => setCrops(r.data.crops)).catch(() => {});
    } catch { toast.error(hi ? "विफल" : "Failed"); }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/crops/${id}`);
      toast.success(hi ? "हटाया गया" : "Removed");
      setCrops(p => p.filter(c => c._id !== id));
    } catch { toast.error("Error"); }
  };

  const tools = [
    { to: "/disease-detection", emoji: "🔬", label: hi ? "फसल रोग पहचान" : "Disease Detection", color: "#fff3cd" },
    { to: "/yield-prediction",  emoji: "📈", label: hi ? "उपज अनुमान"     : "Yield Prediction",  color: "#d1ecf1" },
    { to: "/marketplace",       emoji: "🏪", label: hi ? "मंडी"          : "Marketplace",        color: "#e2d9f3" },
    { to: "/chat",              emoji: "🤖", label: hi ? "AI चैट"        : "AI Chat",            color: "#d4edda" },
  ];

  return (
    <div className="krishi-page">
      <div className="container">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <p className="text-muted mb-0">{greeting},</p>
            <h2 style={{ color: "#1B5E20", fontWeight: 800 }}>{user?.name} 🌾</h2>
            <small className="text-muted">{hi ? "किसान" : "Farmer"} · {user?.farmLocation || "India"}</small>
          </div>
          <button onClick={() => setShowModal(true)} className="krishi-btn">
            + {hi ? "फसल जोड़ें" : "Add Crop"}
          </button>
        </div>

        {/* Stats */}
        <div className="row g-3 mb-4">
          {[
            { emoji: "📦", val: crops.length, label: hi ? "कुल सूचियां" : "Total Listings", bg: "#e8f5e9" },
            { emoji: "✅", val: crops.filter(c => c.isAvailable).length, label: hi ? "उपलब्ध" : "Available", bg: "#d4edda" },
            { emoji: "🌾", val: `${user?.farmSize || 0} acres`, label: hi ? "खेत का आकार" : "Farm Size", bg: "#fff3cd" },
            { emoji: "📍", val: user?.farmLocation || "—", label: hi ? "स्थान" : "Location", bg: "#d1ecf1" },
          ].map(s => (
            <div key={s.label} className="col-6 col-md-3">
              <div className="krishi-card text-center py-3" style={{ background: s.bg }}>
                <div style={{ fontSize: "2rem" }}>{s.emoji}</div>
                <div className="fw-bold fs-5" style={{ color: "#1B5E20" }}>{s.val}</div>
                <small className="text-muted">{s.label}</small>
              </div>
            </div>
          ))}
        </div>

        {/* AI Tools */}
        <h5 style={{ color: "#1B5E20" }} className="mb-3">🤖 AI {hi ? "सेवाएं" : "Tools"}</h5>
        <div className="row g-3 mb-4">
          {tools.map(t => (
            <div key={t.to} className="col-6 col-md-3">
              <Link to={t.to} className="text-decoration-none">
                <div className="krishi-card text-center" style={{ background: t.color, borderColor: "transparent" }}>
                  <div style={{ fontSize: "2rem" }}>{t.emoji}</div>
                  <div className="fw-semibold mt-1" style={{ color: "#1B5E20", fontSize: "0.9rem" }}>{t.label}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Crop Listings */}
        <h5 style={{ color: "#1B5E20" }} className="mb-3">
          {hi ? "मेरी फसलें" : "My Crop Listings"}
        </h5>
        {loading ? (
          <div className="text-center py-5"><div className="krishi-spinner mx-auto" /></div>
        ) : crops.length === 0 ? (
          <div className="krishi-card text-center py-5">
            <div style={{ fontSize: "3rem" }}>🌱</div>
            <p className="text-muted">{hi ? "अभी तक कोई फसल नहीं। पहली फसल जोड़ें!" : "No crops listed yet. Add your first crop!"}</p>
            <button onClick={() => setShowModal(true)} className="krishi-btn">{hi ? "फसल जोड़ें" : "Add Crop"}</button>
          </div>
        ) : (
          <div className="row g-3">
            {crops.map(c => (
              <div key={c._id} className="col-md-4">
                <div className="crop-card p-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="mb-1 fw-bold" style={{ color: "#1B5E20" }}>{c.titleHi || c.title}</h6>
                      <span className="krishi-badge badge-success-soft me-1">{c.category}</span>
                      {c.isOrganic && <span className="krishi-badge badge-success-soft">🌿 Organic</span>}
                    </div>
                    <button onClick={() => handleDelete(c._id)} className="btn btn-sm btn-outline-danger px-2 py-0">✕</button>
                  </div>
                  <div className="d-flex align-items-center gap-3 mt-2">
                    <span className="fw-bold fs-5" style={{ color: "#e65100" }}>₹{c.price}</span>
                    <small className="text-muted">{c.quantity} {c.quantityUnit}</small>
                    <small className="text-muted ms-auto">📍 {c.location}</small>
                  </div>
                  <small className={c.isAvailable ? "text-success" : "text-muted"}>
                    {c.isAvailable ? (hi ? "✅ उपलब्ध" : "✅ Available") : (hi ? "अनुपलब्ध" : "Unavailable")}
                  </small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Crop Modal */}
      {showModal && (
        <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header" style={{ background: "#1B5E20", color: "#fff" }}>
                <h5 className="modal-title">🌾 {hi ? "फसल जोड़ें" : "Add Crop Listing"}</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)} />
              </div>
              <form onSubmit={handleAdd}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ color: "#2E7D32" }}>Title (English)</label>
                      <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="krishi-input" placeholder="Wheat" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ color: "#2E7D32" }}>शीर्षक (हिंदी)</label>
                      <input value={form.titleHi} onChange={e => setForm(f => ({ ...f, titleHi: e.target.value }))} className="krishi-input" placeholder="गेहूं" />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-semibold" style={{ color: "#2E7D32" }}>{hi ? "विवरण" : "Description"}</label>
                      <textarea required value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="krishi-input" rows={2} placeholder="Fresh, organic..." />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ color: "#2E7D32" }}>{hi ? "श्रेणी" : "Category"}</label>
                      <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="form-select" style={{ borderColor: "#a5d6a7" }}>
                        {["vegetables", "fruits", "grains", "pulses", "spices", "others"].map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ color: "#2E7D32" }}>{hi ? "स्थान" : "Location"}</label>
                      <input required value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} className="krishi-input" placeholder="Punjab" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ color: "#2E7D32" }}>{hi ? "मूल्य (₹)" : "Price (₹)"}</label>
                      <input type="number" required value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} className="krishi-input" placeholder="25" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ color: "#2E7D32" }}>{hi ? "मात्रा (kg)" : "Quantity (kg)"}</label>
                      <input type="number" required value={form.quantity} onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))} className="krishi-input" placeholder="500" />
                    </div>
                    <div className="col-12">
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="organic" checked={form.isOrganic} onChange={e => setForm(f => ({ ...f, isOrganic: e.target.checked }))} />
                        <label className="form-check-label" htmlFor="organic">🌿 {hi ? "जैविक उत्पाद" : "Organic produce"}</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setShowModal(false)}>{hi ? "रद्द करें" : "Cancel"}</button>
                  <button type="submit" className="krishi-btn">{hi ? "सूचीबद्ध करें" : "List Crop"}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerDashboard;
