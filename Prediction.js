import React, { useState } from "react";

const TEXT = {
  en: {
    title: "Crop Disease Prediction",
    subtitle: "Upload a leaf image and get a quick disease prediction (dummy demo).",
    uploadTitle: "Upload Image",
    uploadHint: "JPG / PNG recommended. Clear leaf photo is best.",
    predictBtn: "Predict Disease",
    predicting: "Predicting...",
    resultTitle: "Result",
    empty: "Upload an image and click predict to see results.",
    analyzing: "Analyzing image...",
    confidence: "Confidence",
    suggestion: "Suggestion: Remove infected leaves and monitor crop health.",
    toggle: "हिंदी",
  },
  hi: {
    title: "फसल रोग पहचान",
    subtitle: "पत्ते की फोटो अपलोड करें और तुरंत रोग का अनुमान देखें (डेमो).",
    uploadTitle: "छवि अपलोड करें",
    uploadHint: "JPG / PNG सही रहेगा। साफ पत्ते की फोटो बेहतर है।",
    predictBtn: "रोग बताएं",
    predicting: "जांच हो रही है...",
    resultTitle: "परिणाम",
    empty: "छवि अपलोड करें और अनुमान देखने के लिए Predict दबाएं।",
    analyzing: "छवि विश्लेषण हो रहा है...",
    confidence: "विश्वास स्तर",
    suggestion: "सलाह: संक्रमित पत्ते हटाएं और फसल पर नजर रखें।",
    toggle: "English",
  },
};

const DISEASES = [
  { name: "Early Blight", confidence: "87%" },
  { name: "Late Blight", confidence: "78%" },
  { name: "Leaf Spot", confidence: "82%" },
  { name: "Powdery Mildew", confidence: "75%" },
  { name: "Healthy", confidence: "93%" },
];

function Prediction() {
  const [lang, setLang] = useState("en");
  const t = TEXT[lang];

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handlePredict = () => {
    if (!image) return;
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const pick = DISEASES[Math.floor(Math.random() * DISEASES.length)];
      setResult(pick);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="container py-5">
      <div className="prediction-hero mb-4 d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div>
          <h2 className="mb-1">{t.title}</h2>
          <p className="text-muted mb-0">{t.subtitle}</p>
        </div>

        <button
          className="btn btn-outline-success"
          onClick={() => setLang(lang === "en" ? "hi" : "en")}
        >
          {t.toggle}
        </button>
      </div>

      <div className="row g-4 align-items-stretch">
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">{t.uploadTitle}</h5>
              <p className="text-muted small">{t.uploadHint}</p>

              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImageChange}
              />

              {preview && (
                <div className="preview-wrap mt-3">
                  <img
                    src={preview}
                    alt="Leaf preview"
                    className="img-fluid rounded preview-img"
                  />
                </div>
              )}

              <button
                className="btn btn-success mt-3 w-100"
                onClick={handlePredict}
                disabled={!image || loading}
              >
                {loading ? t.predicting : t.predictBtn}
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">{t.resultTitle}</h5>

              {!result && !loading && (
                <div className="empty-result">{t.empty}</div>
              )}

              {loading && <div className="empty-result">{t.analyzing}</div>}

              {result && (
                <div className="result-box">
                  <div className="result-title">{result.name}</div>
                  <div className="result-sub">
                    {t.confidence}: <strong>{result.confidence}</strong>
                  </div>
                  <div className="result-note">{t.suggestion}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prediction;
