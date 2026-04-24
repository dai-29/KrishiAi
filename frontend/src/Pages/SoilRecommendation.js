// SoilRecommendation — Bootstrap green theme
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLang } from "../context/LanguageContext";
import api from "../utils/api";

const SoilRecommendation = () => {
  const { lang } = useLang();
  const hi = lang === "hi";
  const [form, setForm] = useState({ nitrogen:80, phosphorus:40, potassium:40, ph:6.5, moisture:60, temperature:25, rainfall:800 });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/ai/soil", { ...form, nitrogen:+form.nitrogen, phosphorus:+form.phosphorus, potassium:+form.potassium, ph:+form.ph, moisture:+form.moisture });
      setResult(res.data);
    } catch {
      toast.error(hi ? "डेमो डेटा दिखाया जा रहा है" : "Showing demo data.");
      setResult({ success:true, recommended_crops:[{crop:"Wheat",cropHi:"गेहूं",score:9},{crop:"Maize",cropHi:"मक्का",score:7},{crop:"Soybean",cropHi:"सोयाबीन",score:5}], fertilizer_advice:["Soil nutrients are well-balanced.","Add organic compost for improved texture.","Maintain pH between 6.0–7.0 for best results."], fertilizer_advice_hi:["मिट्टी के पोषक तत्व संतुलित हैं।","मिट्टी की बनावट सुधारने के लिए जैविक खाद डालें।","सर्वोत्तम परिणाम के लिए pH 6.0–7.0 रखें।"], soil_summary:{ nitrogen_status:"Medium", ph_status:"Neutral", ph_statusHi:"तटस्थ", moisture_status:"Optimal" } });
    } finally { setLoading(false); }
  };

  const sliders = [
    { key:"nitrogen",   label:hi?"नाइट्रोजन (N)":"Nitrogen (N)",   min:0,  max:200, unit:"kg/ha", color:"#1565C0" },
    { key:"phosphorus", label:hi?"फास्फोरस (P)":"Phosphorus (P)",  min:0,  max:150, unit:"kg/ha", color:"#E65100" },
    { key:"potassium",  label:hi?"पोटेशियम (K)":"Potassium (K)",   min:0,  max:200, unit:"kg/ha", color:"#6A1B9A" },
    { key:"ph",         label:hi?"मिट्टी pH":"Soil pH",            min:3,  max:10,  unit:"",      step:0.1, color:"#F57F17" },
    { key:"moisture",   label:hi?"नमी":"Moisture",                  min:0,  max:100, unit:"%",     color:"#00695C" },
  ];

  const cropEmojis = { Wheat:"🌾", Rice:"🍚", Maize:"🌽", Cotton:"☁️", Soybean:"🫘", Groundnut:"🥜", Sugarcane:"🎋", Tomato:"🍅", Potato:"🥔", Mustard:"🌼" };

  const statusColor = (v) => {
    const low = ["Low","Acidic","Dry"];
    const high = ["High","Alkaline","Wet"];
    if (low.includes(v)) return "danger";
    if (high.includes(v)) return "warning";
    return "success";
  };

  return (
    <div className="krishi-page">
      <div className="container">
        <div className="text-center mb-5">
          <h6 className="section-label">{hi ? "AI आधारित" : "AI POWERED"}</h6>
          <h2 style={{ color:"#1B5E20", fontWeight:800 }}>🌱 {hi ? "मृदा सुझाव" : "Soil Recommendation"}</h2>
          <p className="text-muted">{hi ? "अपनी मिट्टी की जानकारी दें और सर्वोत्तम फसल व उर्वरक जानें" : "Enter your soil data and get the best crop & fertilizer advice"}</p>
        </div>

        <div className="row g-4">
          {/* Sliders */}
          <div className="col-md-6">
            <form onSubmit={handleSubmit} className="krishi-card">
              <h6 style={{ color:"#1B5E20" }} className="mb-3">🧪 {hi ? "मिट्टी के पैरामीटर" : "Soil Parameters"}</h6>
              {sliders.map(s => (
                <div key={s.key} className="mb-4">
                  <div className="d-flex justify-content-between mb-1">
                    <label className="fw-semibold" style={{ color:"#2E7D32", fontSize:"0.9rem" }}>{s.label}</label>
                    <span className="fw-bold" style={{ color:s.color }}>{form[s.key]}{s.unit}</span>
                  </div>
                  <input type="range" min={s.min} max={s.max} step={s.step||1}
                    value={form[s.key]} onChange={e=>set(s.key,e.target.value)}
                    className="form-range w-100" style={{ accentColor:s.color }} />
                  <div className="d-flex justify-content-between">
                    <small className="text-muted">{s.min}{s.unit}</small>
                    <small className="text-muted">{s.max}{s.unit}</small>
                  </div>
                </div>
              ))}

              <div className="row g-3 pt-3" style={{ borderTop:"1px solid #e8f5e9" }}>
                <div className="col-6">
                  <label className="form-label fw-semibold" style={{ color:"#2E7D32", fontSize:"0.85rem" }}>{hi ? "तापमान (°C)" : "Temperature (°C)"}</label>
                  <input type="number" value={form.temperature} onChange={e=>set("temperature",e.target.value)} className="krishi-input" min="0" max="50" />
                </div>
                <div className="col-6">
                  <label className="form-label fw-semibold" style={{ color:"#2E7D32", fontSize:"0.85rem" }}>{hi ? "वर्षा (mm)" : "Rainfall (mm)"}</label>
                  <input type="number" value={form.rainfall} onChange={e=>set("rainfall",e.target.value)} className="krishi-input" min="0" />
                </div>
              </div>

              <button type="submit" disabled={loading} className="krishi-btn w-100 mt-3">
                {loading ? <><span className="spinner-border spinner-border-sm me-2" />{hi?"विश्लेषण...":"Analyzing..."}</> : (hi ? "🌱 मिट्टी का विश्लेषण करें" : "🌱 Analyze Soil")}
              </button>
            </form>
          </div>

          {/* Results */}
          <div className="col-md-6">
            {!result ? (
              <div className="krishi-card text-center py-5 h-100 d-flex flex-column align-items-center justify-content-center">
                <div style={{ fontSize:"4rem" }}>🌱</div>
                <p className="fw-semibold mt-3" style={{ color:"#2E7D32" }}>{hi ? "स्लाइडर समायोजित करें और विश्लेषण करें" : "Adjust sliders and analyze your soil"}</p>
              </div>
            ) : (
              <div>
                {/* Summary */}
                <div className="krishi-card mb-3">
                  <h6 style={{ color:"#1B5E20" }}>🧪 {hi ? "मिट्टी सारांश" : "Soil Summary"}</h6>
                  <div className="row g-2 mt-1">
                    {[
                      { label:hi?"नाइट्रोजन":"Nitrogen", val:result.soil_summary.nitrogen_status },
                      { label:"pH", val:hi?result.soil_summary.ph_statusHi:result.soil_summary.ph_status },
                      { label:hi?"नमी":"Moisture", val:result.soil_summary.moisture_status },
                    ].map(s=>(
                      <div key={s.label} className="col-4 text-center">
                        <div className="p-2 rounded" style={{ background:"#f9fdf9", border:"1px solid #e8f5e9" }}>
                          <small className="text-muted d-block">{s.label}</small>
                          <span className={`badge bg-${statusColor(s.val)} mt-1`}>{s.val}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Crops */}
                <div className="krishi-card mb-3">
                  <h6 style={{ color:"#1B5E20" }}>🌾 {hi ? "अनुशंसित फसलें" : "Recommended Crops"}</h6>
                  {result.recommended_crops.map((c,i)=>(
                    <div key={c.crop} className="d-flex align-items-center gap-3 mb-2 p-2 rounded" style={{ background:"#f9fdf9" }}>
                      <span style={{ fontSize:"1.5rem" }}>{cropEmojis[c.crop]||"🌿"}</span>
                      <div className="flex-fill">
                        <div className="d-flex justify-content-between mb-1">
                          <span className="fw-semibold" style={{ color:"#1B5E20" }}>
                            {i===0?"🥇":i===1?"🥈":"🥉"} {hi?c.cropHi:c.crop}
                          </span>
                          <small className="fw-bold" style={{ color:"#1B5E20" }}>{c.score}/10</small>
                        </div>
                        <div className="progress" style={{ height:"6px" }}>
                          <div className="progress-bar" style={{ width:`${(c.score/10)*100}%`, background:"#1B5E20" }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Fertilizer Advice */}
                <div className="krishi-card" style={{ borderLeft:"4px solid #f77f00" }}>
                  <h6 style={{ color:"#e65100" }}>💊 {hi ? "उर्वरक सलाह" : "Fertilizer Advice"}</h6>
                  <ul className="mb-0 ps-3">
                    {(hi?result.fertilizer_advice_hi:result.fertilizer_advice).map((a,i)=>(
                      <li key={i} className="text-muted small mb-1">{a}</li>
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

export default SoilRecommendation;
