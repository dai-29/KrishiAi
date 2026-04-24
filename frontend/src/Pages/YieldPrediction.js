// Yield Prediction — Bootstrap green theme
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLang } from "../context/LanguageContext";
import api from "../utils/api";

const CROPS = ["wheat","rice","maize","sugarcane","cotton","soybean","tomato","potato","onion","mustard","groundnut","bajra"];
const SOILS = ["loamy","clay","sandy","alluvial","black","red"];
const IRRIGATIONS = ["canal","drip","sprinkler","rainfed"];

const YieldPrediction = () => {
  const { lang } = useLang();
  const hi = lang === "hi";
  const [form, setForm] = useState({ crop:"wheat", soil_type:"loamy", rainfall:800, temperature:25, area:1, nitrogen:80, phosphorus:40, potassium:40, irrigation:"canal" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/ai/yield", { ...form, rainfall:+form.rainfall, temperature:+form.temperature, area:+form.area, nitrogen:+form.nitrogen, phosphorus:+form.phosphorus, potassium:+form.potassium });
      setResult(res.data);
    } catch {
      toast.error(hi ? "डेमो डेटा दिखाया जा रहा है" : "Showing demo result.");
      setResult({ success:true, crop:form.crop, cropHi:"गेहूं", predicted_yield_per_hectare:3.8, total_predicted_yield:(3.8*form.area).toFixed(1), area:form.area, unit:"tonnes", tips:["Maintain regular watering schedule.","Monitor for pest activity.","Apply potassium fertilizer at tillering stage."], tipsHi:["नियमित सिंचाई बनाए रखें।","कीट गतिविधि की निगरानी करें।","कल्ले निकलते समय पोटेशियम उर्वरक डालें।"] });
    } finally { setLoading(false); }
  };

  const labels = { crop: hi?"फसल":"Crop", soil_type: hi?"मिट्टी का प्रकार":"Soil Type", rainfall: hi?"वर्षा (mm)":"Rainfall (mm)", temperature: hi?"तापमान (°C)":"Temperature (°C)", area: hi?"क्षेत्रफल (हेक्टेयर)":"Area (ha)", nitrogen: hi?"नाइट्रोजन (kg/ha)":"Nitrogen (kg/ha)", phosphorus: hi?"फास्फोरस (kg/ha)":"Phosphorus (kg/ha)", potassium: hi?"पोटेशियम (kg/ha)":"Potassium (kg/ha)", irrigation: hi?"सिंचाई":"Irrigation" };

  return (
    <div className="krishi-page">
      <div className="container">
        <div className="text-center mb-5">
          <h6 className="section-label">{hi ? "AI आधारित" : "AI POWERED"}</h6>
          <h2 style={{ color: "#1B5E20", fontWeight: 800 }}>📈 {hi ? "उपज अनुमान" : "Yield Prediction"}</h2>
          <p className="text-muted">{hi ? "अपनी खेती की जानकारी दें और अनुमानित उपज जानें" : "Enter your farm details and predict your expected yield"}</p>
        </div>

        <div className="row g-4">
          {/* Form */}
          <div className="col-md-6">
            <form onSubmit={handleSubmit} className="krishi-card">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold" style={{ color: "#2E7D32" }}>{labels.crop}</label>
                  <select value={form.crop} onChange={e => set("crop", e.target.value)} className="form-select" style={{ borderColor: "#a5d6a7" }}>
                    {CROPS.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase()+c.slice(1)}</option>)}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold" style={{ color: "#2E7D32" }}>{labels.soil_type}</label>
                  <select value={form.soil_type} onChange={e => set("soil_type", e.target.value)} className="form-select" style={{ borderColor: "#a5d6a7" }}>
                    {SOILS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
                  </select>
                </div>
                {[["rainfall","number",0,3000],["temperature","number",0,50],["area","number",0.1,100]].map(([k,t,mn,mx]) => (
                  <div className="col-md-4" key={k}>
                    <label className="form-label fw-semibold" style={{ color: "#2E7D32", fontSize: "0.85rem" }}>{labels[k]}</label>
                    <input type={t} value={form[k]} onChange={e => set(k, e.target.value)} className="krishi-input" min={mn} max={mx} step={k==="area"?0.1:1} />
                  </div>
                ))}
                <div className="col-md-6">
                  <label className="form-label fw-semibold" style={{ color: "#2E7D32" }}>{labels.irrigation}</label>
                  <select value={form.irrigation} onChange={e => set("irrigation", e.target.value)} className="form-select" style={{ borderColor: "#a5d6a7" }}>
                    {IRRIGATIONS.map(i => <option key={i} value={i}>{i.charAt(0).toUpperCase()+i.slice(1)}</option>)}
                  </select>
                </div>
              </div>

              <div className="mt-3 pt-3" style={{ borderTop: "1px solid #e8f5e9" }}>
                <p className="fw-semibold text-muted small mb-2">{hi ? "मिट्टी के पोषक तत्व (kg/ha)" : "Soil Nutrients (kg/ha)"}</p>
                <div className="row g-3">
                  {["nitrogen","phosphorus","potassium"].map(k => (
                    <div className="col-4" key={k}>
                      <label className="form-label fw-semibold" style={{ color: "#2E7D32", fontSize: "0.8rem" }}>{k === "nitrogen" ? "N" : k === "phosphorus" ? "P" : "K"} — {labels[k].split(" ")[0]}</label>
                      <input type="number" value={form[k]} onChange={e => set(k, e.target.value)} className="krishi-input" min="0" />
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" disabled={loading} className="krishi-btn w-100 mt-3">
                {loading ? <><span className="spinner-border spinner-border-sm me-2" />{hi ? "अनुमान लगाया जा रहा है..." : "Predicting..."}</> : (hi ? "📊 उपज का अनुमान करें" : "📊 Predict Yield")}
              </button>
            </form>
          </div>

          {/* Results */}
          <div className="col-md-6">
            {!result ? (
              <div className="krishi-card text-center py-5 h-100 d-flex flex-column align-items-center justify-content-center">
                <div style={{ fontSize: "4rem" }}>📊</div>
                <p className="fw-semibold mt-3" style={{ color: "#2E7D32" }}>{hi ? "फॉर्म भरें और उपज अनुमान करें" : "Fill the form and predict your yield"}</p>
              </div>
            ) : (
              <div>
                {/* Result highlight */}
                <div className="result-highlight mb-3 text-center">
                  <p className="mb-1 opacity-75">{hi ? "प्रति हेक्टेयर अनुमानित उपज" : "Predicted Yield per Hectare"}</p>
                  <div style={{ fontSize: "3.5rem", fontWeight: 900, letterSpacing: "-2px" }}>{result.predicted_yield_per_hectare}</div>
                  <div style={{ fontSize: "1rem", opacity: 0.75 }}>{hi ? "टन/हेक्टेयर" : "tonnes/ha"}</div>
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", marginTop: "1rem", paddingTop: "0.75rem" }}>
                    <span style={{ opacity: 0.75, fontSize: "0.9rem" }}>{hi ? "कुल उपज:" : "Total Yield:"} </span>
                    <strong>{result.total_predicted_yield} {result.unit}</strong>
                    <span style={{ opacity: 0.75, fontSize: "0.9rem" }}> {hi ? "के लिए" : "for"} {result.area} ha</span>
                  </div>
                </div>

                {/* Comparison */}
                <div className="krishi-card mb-3">
                  <h6 style={{ color: "#1B5E20" }}>📊 {hi ? "तुलनात्मक विश्लेषण" : "Yield Comparison"}</h6>
                  {[
                    { label: hi?"आपकी उपज":"Your Yield", val: result.predicted_yield_per_hectare, max: 6, color: "#1B5E20" },
                    { label: hi?"राष्ट्रीय औसत":"Avg National", val: 2.8, max: 6, color: "#f77f00" },
                    { label: hi?"इष्टतम":"Optimal", val: 4.5, max: 6, color: "#2196F3" },
                  ].map(r => (
                    <div key={r.label} className="mb-2">
                      <div className="d-flex justify-content-between mb-1">
                        <small className="fw-semibold">{r.label}</small>
                        <small className="fw-bold" style={{ color: r.color }}>{r.val} t/ha</small>
                      </div>
                      <div className="progress" style={{ height: "10px" }}>
                        <div className="progress-bar" style={{ width: `${(r.val / r.max) * 100}%`, background: r.color }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tips */}
                <div className="krishi-card">
                  <h6 style={{ color: "#1B5E20" }}>💡 {hi ? "सुझाव" : "Tips"}</h6>
                  <ul className="mb-0 ps-3">
                    {(hi ? result.tipsHi : result.tips).map((tip, i) => (
                      <li key={i} className="text-muted small mb-1">{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YieldPrediction;
