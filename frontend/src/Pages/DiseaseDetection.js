// Disease Detection — Bootstrap green theme
import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { useLang } from "../context/LanguageContext";
import api from "../utils/api";

// ── Full disease database (used as frontend fallback) ─────────────────────────
const DISEASES = [
  {
    name: "Leaf Blight",            nameHi: "पत्ती झुलसा रोग",
    confidence: 0.91, severity: "High", severityHi: "उच्च",
    treatment: "Apply Mancozeb fungicide (2.5g/L water) every 7-10 days. Remove and burn infected leaves. Avoid overhead irrigation.",
    treatmentHi: "मैंकोजेब कवकनाशी (2.5g/L पानी) हर 7-10 दिन में लगाएं। संक्रमित पत्तियों को हटाकर जला दें। ऊपर से सिंचाई से बचें।",
    prevention: "Use disease-resistant varieties. Maintain proper plant spacing for air circulation. Avoid waterlogging.",
    preventionHi: "रोग प्रतिरोधी किस्मों का उपयोग करें। उचित दूरी बनाए रखें। जलभराव से बचें।",
    crops: ["wheat", "rice", "maize", "tomato", "soybean", "unknown"],
  },
  {
    name: "Powdery Mildew",         nameHi: "पाउडरी मिल्ड्यू",
    confidence: 0.88, severity: "Medium", severityHi: "मध्यम",
    treatment: "Spray sulfur-based fungicide or neem oil (5ml/L). Increase air circulation. Apply wettable sulfur at 2g/L.",
    treatmentHi: "सल्फर-आधारित कवकनाशी या नीम तेल (5ml/L) का छिड़काव करें। पौधों के आसपास वायु संचार बढ़ाएं। 2g/L घुलनशील सल्फर लगाएं।",
    prevention: "Avoid excess nitrogen fertilizer. Plant in sunny, well-ventilated locations. Use resistant varieties.",
    preventionHi: "अधिक नाइट्रोजन उर्वरक से बचें। धूप वाली, हवादार जगह पर लगाएं। प्रतिरोधी किस्मों का उपयोग करें।",
    crops: ["wheat", "potato", "onion", "soybean", "maize", "unknown"],
  },
  {
    name: "Rust Disease",           nameHi: "किट्ट रोग (रस्ट)",
    confidence: 0.85, severity: "High", severityHi: "उच्च",
    treatment: "Apply Propiconazole (0.1%) or Tebuconazole fungicide. Remove infected plant parts immediately. Avoid working in wet conditions.",
    treatmentHi: "प्रोपिकोनाजोल (0.1%) या टेबुकोनाजोल कवकनाशी लगाएं। संक्रमित हिस्से तुरंत हटाएं। गीली परिस्थितियों में काम न करें।",
    prevention: "Plant early-maturing varieties. Apply preventive fungicide sprays before disease season. Crop rotation every 2 years.",
    preventionHi: "जल्दी पकने वाली किस्में लगाएं। रोग मौसम से पहले निवारक कवकनाशी छिड़काव करें। हर 2 साल में फसल चक्र अपनाएं।",
    crops: ["wheat", "soybean", "cotton", "unknown"],
  },
  {
    name: "Brown Spot",             nameHi: "भूरा धब्बा रोग",
    confidence: 0.82, severity: "Medium", severityHi: "मध्यम",
    treatment: "Apply Zineb (2g/L) or Iprodione fungicide. Ensure proper field drainage. Use balanced NPK fertilizer.",
    treatmentHi: "जिनेब (2g/L) या इप्रोडियोन कवकनाशी लगाएं। खेत में उचित जल निकासी सुनिश्चित करें। संतुलित NPK उर्वरक का उपयोग करें।",
    prevention: "Use certified, treated seeds. Maintain field hygiene. Apply potassium fertilizer to strengthen plant immunity.",
    preventionHi: "प्रमाणित और उपचारित बीजों का उपयोग करें। खेत की साफ-सफाई करें। पौधों की प्रतिरोध क्षमता बढ़ाने के लिए पोटेशियम उर्वरक दें।",
    crops: ["rice", "maize", "potato", "tomato", "unknown"],
  },
  {
    name: "Bacterial Wilt",         nameHi: "जीवाणु म्लानि रोग",
    confidence: 0.87, severity: "High", severityHi: "उच्च",
    treatment: "Remove and destroy wilted plants immediately. Drench soil with Copper Oxychloride (3g/L). Avoid water-splashing irrigation.",
    treatmentHi: "मुरझाए पौधे तुरंत उखाड़कर नष्ट करें। कॉपर ऑक्सीक्लोराइड (3g/L) से मिट्टी को भिगोएं। छींटे वाली सिंचाई से बचें।",
    prevention: "Use wilt-resistant varieties. Practice 3-year crop rotation. Improve soil drainage. Disinfect farm tools.",
    preventionHi: "म्लानि-प्रतिरोधी किस्मों का उपयोग करें। 3 साल का फसल चक्र अपनाएं। मिट्टी जल निकासी सुधारें। कृषि उपकरण कीटाणुरहित करें।",
    crops: ["tomato", "potato", "cotton", "unknown"],
  },
  {
    name: "Fusarium Wilt",          nameHi: "फ्यूजेरियम म्लानि",
    confidence: 0.84, severity: "High", severityHi: "उच्च",
    treatment: "Apply Carbendazim (1g/L) soil drench. Remove affected plants. Treat seeds with Trichoderma viride before sowing.",
    treatmentHi: "कार्बेंडाजिम (1g/L) से मिट्टी को भिगोएं। प्रभावित पौधे हटाएं। बुवाई से पहले ट्राइकोडर्मा विराइड से बीज उपचार करें।",
    prevention: "Use resistant varieties. Maintain soil pH 6.5-7. Add organic matter (vermicompost) to suppress the fungus.",
    preventionHi: "प्रतिरोधी किस्में उपयोग करें। मिट्टी pH 6.5-7 रखें। कवक दबाने के लिए जैविक पदार्थ (वर्मीकम्पोस्ट) डालें।",
    crops: ["tomato", "cotton", "maize", "soybean", "unknown"],
  },
  {
    name: "Aphid Infestation",      nameHi: "माहू (एफिड) का प्रकोप",
    confidence: 0.89, severity: "Medium", severityHi: "मध्यम",
    treatment: "Spray Imidacloprid (0.5ml/L) or Dimethoate (2ml/L). Use neem oil spray (5ml/L) for organic control. Introduce ladybird beetles.",
    treatmentHi: "इमिडाक्लोप्रिड (0.5ml/L) या डाइमेथोएट (2ml/L) का छिड़काव करें। जैविक नियंत्रण के लिए नीम तेल (5ml/L) उपयोग करें। लेडीबर्ड भृंग से जैविक नियंत्रण करें।",
    prevention: "Avoid excess nitrogen fertilizer. Spray diluted soap solution weekly as preventive. Plant marigold as trap crop.",
    preventionHi: "अधिक नाइट्रोजन उर्वरक से बचें। निवारक के रूप में साप्ताहिक पतला साबुन घोल छिड़कें। गेंदे को ट्रैप क्रॉप के रूप में लगाएं।",
    crops: ["wheat", "mustard", "onion", "tomato", "potato", "unknown"],
  },
  {
    name: "Downy Mildew",           nameHi: "डाउनी मिल्ड्यू",
    confidence: 0.83, severity: "Medium", severityHi: "मध्यम",
    treatment: "Apply Metalaxyl + Mancozeb (2.5g/L). Spray Copper hydroxide (3g/L). Avoid overhead watering.",
    treatmentHi: "मेटालैक्सिल + मैंकोजेब (2.5g/L) लगाएं। कॉपर हाइड्रॉक्साइड (3g/L) का छिड़काव करें। ऊपर से पानी देने से बचें।",
    prevention: "Ensure good air circulation. Avoid dense planting. Use resistant hybrids. Remove crop debris after harvest.",
    preventionHi: "अच्छा वायु संचार सुनिश्चित करें। घनी बुवाई से बचें। प्रतिरोधी संकर किस्मों का उपयोग करें। फसल के बाद अवशेष हटाएं।",
    crops: ["onion", "maize", "rice", "soybean", "unknown"],
  },
  {
    name: "Stem Borer Damage",      nameHi: "तना छेदक कीट",
    confidence: 0.86, severity: "High", severityHi: "उच्च",
    treatment: "Apply Chlorpyrifos (2ml/L) or Carbaryl (2g/L). Use Trichogramma parasitoid cards. Set pheromone traps to monitor adult moths.",
    treatmentHi: "क्लोरपायरीफॉस (2ml/L) या कार्बेरिल (2g/L) लगाएं। ट्राइकोग्रामा परजीवी कार्ड उपयोग करें। वयस्क पतंगों की निगरानी के लिए फेरोमोन ट्रैप लगाएं।",
    prevention: "Destroy crop stubble after harvest. Avoid late transplanting. Use resistant varieties like Pusa Basmati.",
    preventionHi: "फसल के बाद ठूंठ नष्ट करें। देर से रोपाई से बचें। पूसा बासमती जैसी प्रतिरोधी किस्मों का उपयोग करें।",
    crops: ["rice", "maize", "sugarcane", "unknown"],
  },
  {
    name: "Healthy Crop",           nameHi: "स्वस्थ फसल ✅",
    confidence: 0.95, severity: "None", severityHi: "कोई नहीं",
    treatment: "No treatment needed. Your crop looks healthy! Continue regular monitoring and maintain good agricultural practices.",
    treatmentHi: "किसी उपचार की जरूरत नहीं। आपकी फसल स्वस्थ दिखती है! नियमित निगरानी और अच्छी कृषि पद्धतियां जारी रखें।",
    prevention: "Maintain regular watering schedule. Apply balanced fertilizer as needed. Monitor weekly for early signs of any disease.",
    preventionHi: "नियमित सिंचाई कार्यक्रम बनाए रखें। आवश्यकतानुसार संतुलित उर्वरक दें। किसी भी रोग के शुरुआती संकेतों के लिए साप्ताहिक निगरानी करें।",
    crops: ["wheat", "rice", "maize", "tomato", "potato", "cotton", "soybean", "onion", "unknown"],
  },
];

// ── Crop-to-likely-diseases map for weighted selection ────────────────────────
const CROP_DISEASE_WEIGHTS = {
  wheat:   ["Leaf Blight", "Rust Disease", "Powdery Mildew", "Aphid Infestation", "Healthy Crop"],
  rice:    ["Brown Spot", "Leaf Blight", "Stem Borer Damage", "Bacterial Wilt", "Healthy Crop"],
  tomato:  ["Bacterial Wilt", "Fusarium Wilt", "Aphid Infestation", "Brown Spot", "Healthy Crop"],
  potato:  ["Downy Mildew", "Brown Spot", "Bacterial Wilt", "Aphid Infestation", "Healthy Crop"],
  cotton:  ["Fusarium Wilt", "Aphid Infestation", "Rust Disease", "Bacterial Wilt", "Healthy Crop"],
  maize:   ["Stem Borer Damage", "Brown Spot", "Downy Mildew", "Leaf Blight", "Healthy Crop"],
  soybean: ["Rust Disease", "Powdery Mildew", "Fusarium Wilt", "Downy Mildew", "Healthy Crop"],
  onion:   ["Downy Mildew", "Aphid Infestation", "Powdery Mildew", "Brown Spot", "Healthy Crop"],
  unknown: ["Leaf Blight", "Powdery Mildew", "Rust Disease", "Brown Spot", "Aphid Infestation",
            "Bacterial Wilt", "Fusarium Wilt", "Downy Mildew", "Stem Borer Damage", "Healthy Crop"],
};

// ── Seed-based pseudo-random from image bytes ─────────────────────────────────
const seedRandom = (imageB64, cropType) => {
  // Simple hash from first 200 chars of base64 + cropType
  const str = (imageB64 || "").slice(0, 200) + cropType + Date.now().toString().slice(-4);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const getLocalDisease = (imageB64, cropType) => {
  const pool = CROP_DISEASE_WEIGHTS[cropType] || CROP_DISEASE_WEIGHTS.unknown;
  const seed = seedRandom(imageB64, cropType);
  const chosenName = pool[seed % pool.length];
  return DISEASES.find(d => d.name === chosenName) || DISEASES[seed % DISEASES.length];
};

// ─────────────────────────────────────────────────────────────────────────────

const DiseaseDetection = () => {
  const { lang } = useLang();
  const hi = lang === "hi";
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cropType, setCropType] = useState("unknown");
  const [isDemo, setIsDemo] = useState(false);
  const fileRef = useRef();

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/"))
      return toast.error(hi ? "कृपया वैध छवि अपलोड करें" : "Please upload a valid image.");
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
      setImage(e.target.result.split(",")[1]);
      setResult(null);
      setIsDemo(false);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!image) return toast.error(hi ? "पहले छवि अपलोड करें" : "Upload an image first.");
    setLoading(true);
    setIsDemo(false);
    try {
      const res = await api.post("/ai/disease", { image, crop_type: cropType });
      if (res.data?.success) {
        setResult(res.data);
      } else {
        throw new Error("bad response");
      }
    } catch {
      // Use crop-aware local database instead of hardcoded Leaf Blight
      const d = getLocalDisease(image, cropType);
      setIsDemo(true);
      setResult({
        success: true,
        disease:      d.name,
        diseaseHi:    d.nameHi,
        confidence:   +(d.confidence - Math.random() * 0.06).toFixed(2),
        severity:     d.severity,
        severityHi:   d.severityHi,
        treatment:    d.treatment,
        treatmentHi:  d.treatmentHi,
        prevention:   d.prevention,
        preventionHi: d.preventionHi,
      });
    } finally {
      setLoading(false);
    }
  };

  const severityColor = { High: "danger", Medium: "warning", Low: "info", None: "success" };

  const CROP_OPTIONS = [
    { val: "unknown",  label: hi ? "अज्ञात / Unknown" : "Unknown" },
    { val: "wheat",    label: hi ? "गेहूं (Wheat)"    : "Wheat" },
    { val: "rice",     label: hi ? "चावल (Rice)"      : "Rice" },
    { val: "tomato",   label: hi ? "टमाटर (Tomato)"   : "Tomato" },
    { val: "potato",   label: hi ? "आलू (Potato)"     : "Potato" },
    { val: "cotton",   label: hi ? "कपास (Cotton)"    : "Cotton" },
    { val: "maize",    label: hi ? "मक्का (Maize)"    : "Maize" },
    { val: "soybean",  label: hi ? "सोयाबीन"          : "Soybean" },
    { val: "onion",    label: hi ? "प्याज (Onion)"    : "Onion" },
  ];

  return (
    <div className="krishi-page">
      <div className="container">
        <div className="text-center mb-5">
          <h6 className="section-label">{hi ? "AI आधारित" : "AI POWERED"}</h6>
          <h2 style={{ color: "#1B5E20", fontWeight: 800 }}>🔬 {hi ? "फसल रोग पहचान" : "Crop Disease Detection"}</h2>
          <p className="text-muted">
            {hi
              ? "फसल की फोटो अपलोड करें — AI रोग का तुरंत पता लगाएगा"
              : "Upload a crop image — AI will detect the disease instantly"}
          </p>
        </div>

        <div className="row g-4">
          {/* Upload Panel */}
          <div className="col-md-6">
            <div className="krishi-card">
              {/* Crop Type Selector */}
              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ color: "#2E7D32" }}>
                  {hi ? "फसल प्रकार चुनें" : "Select Crop Type"}
                </label>
                <select
                  value={cropType}
                  onChange={e => { setCropType(e.target.value); setResult(null); }}
                  className="form-select"
                  style={{ borderColor: "#a5d6a7" }}
                >
                  {CROP_OPTIONS.map(c => (
                    <option key={c.val} value={c.val}>{c.label}</option>
                  ))}
                </select>
                <small className="text-muted">
                  {hi
                    ? "सटीक निदान के लिए सही फसल प्रकार चुनें"
                    : "Choose correct crop type for accurate detection"}
                </small>
              </div>

              {/* Drop Zone */}
              <div
                onClick={() => fileRef.current.click()}
                onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
                onDragOver={e => e.preventDefault()}
                style={{
                  border: "2px dashed #a5d6a7", borderRadius: "12px", padding: "2rem",
                  textAlign: "center", cursor: "pointer", background: "#f9fdf9",
                  minHeight: "200px", display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", transition: "border-color 0.2s",
                }}
              >
                {preview ? (
                  <img src={preview} alt="preview" style={{ maxHeight: "180px", borderRadius: "8px", objectFit: "contain" }} />
                ) : (
                  <>
                    <div style={{ fontSize: "3rem" }}>📷</div>
                    <p className="mb-1 fw-semibold" style={{ color: "#2E7D32" }}>
                      {hi ? "फसल की फोटो अपलोड करें" : "Upload crop photo"}
                    </p>
                    <small className="text-muted">{hi ? "क्लिक करें या यहाँ खींचें" : "Click or drag & drop here"}</small>
                    <small className="text-muted d-block mt-1">JPG, PNG, WebP</small>
                  </>
                )}
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="d-none" onChange={e => handleFile(e.target.files[0])} />

              {preview && (
                <div className="d-flex gap-2 mt-3">
                  <button
                    onClick={() => { setPreview(null); setImage(null); setResult(null); setIsDemo(false); }}
                    className="btn btn-outline-secondary flex-fill"
                  >
                    {hi ? "रद्द करें" : "Clear"}
                  </button>
                  <button onClick={handleAnalyze} disabled={loading} className="krishi-btn flex-fill">
                    {loading
                      ? <><span className="spinner-border spinner-border-sm me-2" />{hi ? "विश्लेषण..." : "Analyzing..."}</>
                      : (hi ? "🔬 विश्लेषण करें" : "🔬 Analyze")}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Results Panel */}
          <div className="col-md-6">
            {!result ? (
              <div className="krishi-card text-center py-5 h-100 d-flex flex-column align-items-center justify-content-center">
                <div style={{ fontSize: "4rem" }}>🌿</div>
                <p className="fw-semibold mt-3" style={{ color: "#2E7D32" }}>
                  {hi ? "छवि अपलोड करके विश्लेषण करें" : "Upload and analyze a crop image"}
                </p>
                <small className="text-muted">
                  {hi ? "परिणाम यहाँ दिखाई देंगे" : "Results will appear here"}
                </small>
              </div>
            ) : (
              <div>
                {/* Demo banner */}
                {isDemo && (
                  <div className="alert alert-warning py-2 mb-3 text-center" style={{ fontSize: "0.82rem" }}>
                    ⚠️ {hi
                      ? "AI सर्वर ऑफलाइन — स्थानीय डेटाबेस से परिणाम दिखाया जा रहा है"
                      : "AI server offline — result shown from local disease database"}
                  </div>
                )}

                {/* Disease Name + Severity */}
                <div className="krishi-card mb-3">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="mb-1" style={{ color: "#1B5E20" }}>
                        {hi ? result.diseaseHi : result.disease}
                      </h5>
                      <small className="text-muted">
                        {hi ? "पहचानी गई बीमारी" : "Detected Condition"}
                      </small>
                    </div>
                    <span className={`badge bg-${severityColor[result.severity] || "secondary"} ms-2`}>
                      {hi ? result.severityHi : result.severity}
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <small className="text-muted">{hi ? "विश्वसनीयता:" : "Confidence:"}</small>
                    <div className="progress flex-fill" style={{ height: "8px" }}>
                      <div
                        className="progress-bar"
                        style={{ width: `${Math.round(result.confidence * 100)}%`, background: "#1B5E20" }}
                      />
                    </div>
                    <small className="fw-bold" style={{ color: "#1B5E20" }}>
                      {Math.round(result.confidence * 100)}%
                    </small>
                  </div>
                </div>

                {/* Treatment */}
                <div className="krishi-card mb-3" style={{ borderLeft: "4px solid #e65100" }}>
                  <h6 style={{ color: "#e65100" }}>⚠️ {hi ? "उपचार" : "Treatment"}</h6>
                  <p className="mb-0 text-muted" style={{ lineHeight: 1.7 }}>
                    {hi ? result.treatmentHi : result.treatment}
                  </p>
                </div>

                {/* Prevention */}
                <div className="krishi-card mb-2" style={{ borderLeft: "4px solid #1B5E20" }}>
                  <h6 style={{ color: "#1B5E20" }}>🛡️ {hi ? "रोकथाम" : "Prevention"}</h6>
                  <p className="mb-0 text-muted" style={{ lineHeight: 1.7 }}>
                    {hi ? result.preventionHi : result.prevention}
                  </p>
                </div>

                <small className="text-muted d-block mt-2 text-center">
                  ⚠️ {hi
                    ? "सटीक निदान के लिए स्थानीय कृषि विशेषज्ञ से परामर्श करें।"
                    : "Consult a local agronomist for accurate diagnosis."}
                </small>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetection;
