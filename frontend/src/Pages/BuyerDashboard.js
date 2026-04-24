// BuyerDashboard — Bootstrap green theme
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LanguageContext";
import api from "../utils/api";

const MOCK = [
  { _id: "1", title: "ताजे टमाटर", price: 18, quantity: 200, quantityUnit: "kg", category: "vegetables", farmerName: "Ramesh Singh", location: "Nashik", isOrganic: true },
  { _id: "2", title: "बासमती चावल", price: 65, quantity: 1000, quantityUnit: "kg", category: "grains", farmerName: "Gurmeet Kaur", location: "Amritsar", isOrganic: false },
  { _id: "3", title: "लाल प्याज", price: 22, quantity: 500, quantityUnit: "kg", category: "vegetables", farmerName: "Suresh Patil", location: "Nashik", isOrganic: false },
];

const BuyerDashboard = () => {
  const { user } = useAuth();
  const { lang } = useLang();
  const hi = lang === "hi";
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? (hi ? "सुप्रभात" : "Good Morning") : hour < 17 ? (hi ? "नमस्कार" : "Good Afternoon") : (hi ? "शुभ संध्या" : "Good Evening");

  useEffect(() => {
    api.get("/crops?limit=6").then(r => setCrops(r.data.crops)).catch(() => setCrops(MOCK)).finally(() => setLoading(false));
  }, []);

  const quickLinks = [
    { to: "/marketplace", emoji: "🏪", label: hi ? "मंडी देखें" : "Browse Marketplace", bg: "#fff3cd" },
    { to: "/schemes", emoji: "📋", label: hi ? "सरकारी योजनाएं" : "Govt. Schemes", bg: "#d1ecf1" },
    { to: "/chat", emoji: "🤖", label: hi ? "KrishiBot से पूछें" : "Ask KrishiBot", bg: "#e2d9f3" },
    { to: "/marketplace", emoji: "🌿", label: hi ? "जैविक उपज" : "Organic Produce", bg: "#d4edda" },
  ];

  return (
    <div className="krishi-page">
      <div className="container">
        <div className="mb-4">
          <p className="text-muted mb-0">{greeting},</p>
          <h2 style={{ color: "#1B5E20", fontWeight: 800 }}>{user?.name} 🛒</h2>
          <small className="text-muted">{hi ? "खरीदार खाता" : "Buyer Account"}</small>
        </div>

        {/* Stats */}
        <div className="row g-3 mb-4">
          {[
            { emoji: "🛍️", val: hi ? "देखें" : "Explore", label: hi ? "मंडी" : "Marketplace", bg: "#fff3cd" },
            { emoji: "🌿", val: hi ? "जैविक" : "Organic", label: hi ? "ताजी उपज" : "Fresh Produce", bg: "#d4edda" },
            { emoji: "📋", val: "6+", label: hi ? "सरकारी योजनाएं" : "Gov. Schemes", bg: "#d1ecf1" },
            { emoji: "🤖", val: "24/7", label: hi ? "AI सहायता" : "AI Support", bg: "#e2d9f3" },
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

        {/* Quick Actions */}
        <h5 style={{ color: "#1B5E20" }} className="mb-3">{hi ? "त्वरित कार्य" : "Quick Actions"}</h5>
        <div className="row g-3 mb-4">
          {quickLinks.map(l => (
            <div key={l.to + l.label} className="col-6 col-md-3">
              <Link to={l.to} className="text-decoration-none">
                <div className="krishi-card text-center" style={{ background: l.bg, borderColor: "transparent" }}>
                  <div style={{ fontSize: "2rem" }}>{l.emoji}</div>
                  <div className="fw-semibold mt-1" style={{ color: "#1B5E20", fontSize: "0.9rem" }}>{l.label}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Latest Listings */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 style={{ color: "#1B5E20" }} className="mb-0">{hi ? "ताजी लिस्टिंग" : "Latest Listings"}</h5>
          <Link to="/marketplace" style={{ color: "#1B5E20" }}>{hi ? "सभी देखें →" : "View All →"}</Link>
        </div>
        {loading ? (
          <div className="text-center py-4"><div className="krishi-spinner mx-auto" /></div>
        ) : (
          <div className="row g-3">
            {crops.slice(0, 3).map(c => (
              <div key={c._id} className="col-md-4">
                <div className="crop-card p-3">
                  <h6 className="fw-bold mb-1" style={{ color: "#1B5E20" }}>{c.titleHi || c.title}</h6>
                  <span className="krishi-badge badge-success-soft me-1">{c.category}</span>
                  {c.isOrganic && <span className="krishi-badge badge-success-soft">🌿</span>}
                  <div className="d-flex align-items-center gap-3 mt-2">
                    <span className="fw-bold" style={{ color: "#e65100" }}>₹{c.price}</span>
                    <small className="text-muted">{c.quantity} {c.quantityUnit}</small>
                  </div>
                  <small className="text-muted">📍 {c.location}</small><br />
                  <small className="text-muted">👨‍🌾 {c.farmerName}</small>
                  {c.farmerPhone && (
                    <a href={`https://wa.me/91${c.farmerPhone}`} target="_blank" rel="noopener noreferrer"
                      className="btn btn-success btn-sm w-100 mt-2" style={{ background: "#25D366", border: "none" }}>
                      📱 WhatsApp
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerDashboard;
