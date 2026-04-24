// Marketplace — Bootstrap green theme
import React, { useState, useEffect } from "react";
import { useLang } from "../context/LanguageContext";
import api from "../utils/api";

const CATEGORIES = ["all", "vegetables", "fruits", "grains", "pulses", "spices", "others"];
const MOCK = [
  { _id: "1", title: "Fresh Tomatoes", titleHi: "ताजे टमाटर", price: 18, quantity: 200, quantityUnit: "kg", category: "vegetables", farmerName: "Ramesh Singh", farmerPhone: "9876543210", location: "Nashik, Maharashtra", isOrganic: true, isAvailable: true },
  { _id: "2", title: "Basmati Rice", titleHi: "बासमती चावल", price: 65, quantity: 1000, quantityUnit: "kg", category: "grains", farmerName: "Gurmeet Kaur", farmerPhone: "9876543211", location: "Amritsar, Punjab", isOrganic: false, isAvailable: true },
  { _id: "3", title: "Red Onion", titleHi: "लाल प्याज", price: 22, quantity: 500, quantityUnit: "kg", category: "vegetables", farmerName: "Suresh Patil", farmerPhone: "9876543212", location: "Lasalgaon, Maharashtra", isOrganic: false, isAvailable: true },
  { _id: "4", title: "Alphonso Mango", titleHi: "अल्फांसो आम", price: 120, quantity: 300, quantityUnit: "kg", category: "fruits", farmerName: "Vijay Khandare", farmerPhone: "9876543213", location: "Ratnagiri, Maharashtra", isOrganic: true, isAvailable: true },
  { _id: "5", title: "Turmeric", titleHi: "हल्दी", price: 85, quantity: 150, quantityUnit: "kg", category: "spices", farmerName: "Lakshmi Devi", farmerPhone: "9876543214", location: "Erode, Tamil Nadu", isOrganic: true, isAvailable: true },
  { _id: "6", title: "Wheat (Sharbati)", titleHi: "गेहूं (शरबती)", price: 30, quantity: 2000, quantityUnit: "kg", category: "grains", farmerName: "Mohan Sharma", farmerPhone: "9876543215", location: "Sehore, MP", isOrganic: false, isAvailable: true },
  { _id: "7", title: "Green Chilli", titleHi: "हरी मिर्च", price: 40, quantity: 100, quantityUnit: "kg", category: "vegetables", farmerName: "Raju Verma", farmerPhone: "9876543216", location: "Guntur, AP", isOrganic: false, isAvailable: true },
  { _id: "8", title: "Toor Dal", titleHi: "तुअर दाल", price: 110, quantity: 400, quantityUnit: "kg", category: "pulses", farmerName: "Gita Bai", farmerPhone: "9876543217", location: "Akola, Maharashtra", isOrganic: false, isAvailable: true },
];

const Marketplace = () => {
  const { lang } = useLang();
  const hi = lang === "hi";
  const [crops, setCrops] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [organicOnly, setOrganicOnly] = useState(false);

  useEffect(() => {
    api.get("/crops?limit=20").then(r => { setCrops(r.data.crops); setFiltered(r.data.crops); })
      .catch(() => { setCrops(MOCK); setFiltered(MOCK); }).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let r = crops;
    if (category !== "all") r = r.filter(c => c.category === category);
    if (organicOnly) r = r.filter(c => c.isOrganic);
    if (search) r = r.filter(c => (c.titleHi || c.title).toLowerCase().includes(search.toLowerCase()) || c.location.toLowerCase().includes(search.toLowerCase()));
    setFiltered(r);
  }, [crops, category, organicOnly, search]);

  const catLabel = { all: hi ? "सभी" : "All", vegetables: hi ? "सब्जियां" : "Vegetables", fruits: hi ? "फल" : "Fruits", grains: hi ? "अनाज" : "Grains", pulses: hi ? "दाल" : "Pulses", spices: hi ? "मसाले" : "Spices", others: hi ? "अन्य" : "Others" };

  return (
    <div className="krishi-page">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h6 className="section-label">{hi ? "ताजी उपज" : "FRESH PRODUCE"}</h6>
          <h2 style={{ color: "#1B5E20", fontWeight: 800 }}>{hi ? "किसान बाज़ार" : "Farmer Marketplace"}</h2>
          <p className="text-muted">{hi ? "किसानों से सीधे खरीदें — बिना बिचौलियों के" : "Buy directly from farmers — no middlemen"}</p>
        </div>

        {/* Filters */}
        <div className="krishi-card mb-4">
          <div className="row g-3 align-items-center">
            <div className="col-md-5">
              <input value={search} onChange={e => setSearch(e.target.value)} className="krishi-input"
                placeholder={hi ? "🔍 फसल या स्थान खोजें..." : "🔍 Search crop or location..."} />
            </div>
            <div className="col-md-5">
              <div className="d-flex flex-wrap gap-1">
                {CATEGORIES.map(c => (
                  <button key={c} onClick={() => setCategory(c)}
                    className="btn btn-sm rounded-pill" style={{ background: category === c ? "#1B5E20" : "#e8f5e9", color: category === c ? "#fff" : "#1B5E20", border: "1px solid #a5d6a7" }}>
                    {catLabel[c]}
                  </button>
                ))}
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="organic" checked={organicOnly} onChange={e => setOrganicOnly(e.target.checked)} />
                <label className="form-check-label" htmlFor="organic">🌿 {hi ? "जैविक" : "Organic"}</label>
              </div>
            </div>
          </div>
        </div>

        <p className="text-muted small mb-3">{filtered.length} {hi ? "उत्पाद मिले" : "products found"}</p>

        {/* Grid */}
        {loading ? (
          <div className="text-center py-5"><div className="krishi-spinner mx-auto" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-5">
            <div style={{ fontSize: "3rem" }}>🌾</div>
            <p className="text-muted">{hi ? "कोई उत्पाद नहीं मिला" : "No products found"}</p>
          </div>
        ) : (
          <div className="row g-4">
            {filtered.map(c => (
              <div key={c._id} className="col-sm-6 col-lg-4 col-xl-3">
                <div className="crop-card h-100">
                  <div className="p-3">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h6 className="mb-1 fw-bold" style={{ color: "#1B5E20" }}>{hi && c.titleHi ? c.titleHi : c.title}</h6>
                        <span className="krishi-badge badge-success-soft">{c.category}</span>
                        {c.isOrganic && <span className="krishi-badge badge-success-soft ms-1">🌿 Organic</span>}
                      </div>
                      <span className="fw-bold fs-5" style={{ color: "#e65100" }}>₹{c.price}</span>
                    </div>
                    <div className="text-muted small mb-2">
                      <div>📦 {c.quantity} {c.quantityUnit} {hi ? "उपलब्ध" : "available"}</div>
                      <div>📍 {c.location}</div>
                      <div>👨‍🌾 {c.farmerName}</div>
                    </div>
                    {c.farmerPhone && (
                      <a href={`https://wa.me/91${c.farmerPhone}?text=Hi, I'm interested in your ${c.title} listed on KrishiAI`}
                        target="_blank" rel="noopener noreferrer"
                        className="btn btn-sm w-100 fw-semibold" style={{ background: "#25D366", color: "#fff", border: "none" }}>
                        📱 WhatsApp {hi ? "किसान" : "Farmer"}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
