// WeatherPage — Bootstrap green theme with mock + API support
import React, { useState, useEffect } from "react";
import { useLang } from "../context/LanguageContext";
import api from "../utils/api";

const MOCK_WEATHER = {
  city: "New Delhi", temp: 32, feels_like: 36, humidity: 58,
  description: "Partly Cloudy", wind: 14, visibility: 8,
  forecast: [
    { day: "Today",     dayHi: "आज",       icon: "⛅", high: 32, low: 22, desc: "Partly Cloudy" },
    { day: "Tomorrow",  dayHi: "कल",       icon: "🌤️", high: 34, low: 24, desc: "Mostly Sunny" },
    { day: "Day After", dayHi: "परसों",    icon: "🌧️", high: 28, low: 21, desc: "Light Rain" },
    { day: "Thu",       dayHi: "बृहस्पतिवार", icon: "⛅", high: 30, low: 22, desc: "Cloudy" },
    { day: "Fri",       dayHi: "शुक्रवार", icon: "☀️", high: 35, low: 25, desc: "Sunny" },
  ],
  agri_tips: [
    "Temperature is high — irrigate crops early morning or evening.",
    "Moderate humidity — watch for fungal diseases in your crops.",
    "Wind speed is normal — good conditions for spraying pesticides.",
  ],
  agri_tips_hi: [
    "तापमान अधिक है — सुबह या शाम सिंचाई करें।",
    "मध्यम आर्द्रता — फसलों में फंगल रोगों पर ध्यान दें।",
    "हवा की गति सामान्य है — कीटनाशक छिड़काव के लिए अच्छी स्थिति।",
  ]
};

const WeatherPage = () => {
  const { lang } = useLang();
  const hi = lang === "hi";
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("New Delhi");
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  // City-specific mock temperature offsets so different cities feel different
  const CITY_OFFSETS = {
    "Delhi":28,"Mumbai":31,"Pune":29,"Lucknow":27,"Chandigarh":24,
    "Jaipur":33,"Bhopal":30,"Hyderabad":32,"Chennai":34,"Kolkata":30,
    "Ahmedabad":35,"Bengaluru":26,"Nagpur":33,"Patna":29,"Indore":30,
  };

  const buildMock = (c) => {
    const base = CITY_OFFSETS[c] || (20 + Math.abs(c.charCodeAt(0) % 15));
    return {
      ...MOCK_WEATHER, city: c, temp: base,
      feels_like: base + 3, humidity: 50 + (c.charCodeAt(0) % 30),
      wind: 8 + (c.charCodeAt(1) % 12),
      description: base > 33 ? "Hot & Sunny" : base > 28 ? "Partly Cloudy" : "Pleasant",
    };
  };

  const fetchWeather = async (c = city) => {
    setLoading(true); setError(false);
    try {
      const res = await api.get(`/weather?city=${encodeURIComponent(c)}`);
      const raw = res.data;
      // Backend returns { success, isMock, weather: { temperature, feelsLike... } }
      const w = raw.weather || raw;
      setWeather({
        ...buildMock(c),
        city: w.city || c,
        temp: w.temperature || w.temp || buildMock(c).temp,
        feels_like: w.feelsLike || w.feels_like || buildMock(c).feels_like,
        humidity: w.humidity || buildMock(c).humidity,
        wind: w.windSpeed || w.wind || buildMock(c).wind,
        description: w.description || buildMock(c).description,
        visibility: w.visibility || buildMock(c).visibility,
        forecast: Array.isArray(w.forecast) ? w.forecast : MOCK_WEATHER.forecast,
        agri_tips: Array.isArray(w.agri_tips) ? w.agri_tips : MOCK_WEATHER.agri_tips,
        agri_tips_hi: Array.isArray(w.agri_tips_hi) ? w.agri_tips_hi : MOCK_WEATHER.agri_tips_hi,
      });
    } catch {
      setWeather(buildMock(c));
      setError(true);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchWeather(); }, []); // eslint-disable-line

  const handleSearch = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setCity(input.trim());
    fetchWeather(input.trim());
    setInput("");
  };

  const tempColor = (t) => t >= 35 ? "#c62828" : t >= 28 ? "#e65100" : t >= 20 ? "#1B5E20" : "#1565C0";

  return (
    <div className="krishi-page">
      <div className="container">
        <div className="text-center mb-4">
          <h6 className="section-label">{hi ? "लाइव मौसम" : "LIVE WEATHER"}</h6>
          <h2 style={{ color: "#1B5E20", fontWeight: 800 }}>🌤️ {hi ? "मौसम पूर्वानुमान" : "Weather Forecast"}</h2>
          <p className="text-muted">{hi ? "खेती के लिए सटीक मौसम जानकारी" : "Accurate weather for smart farming decisions"}</p>
        </div>

        {/* Search */}
        <div className="col-md-6 mx-auto mb-4">
          <form onSubmit={handleSearch} className="d-flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)}
              placeholder={hi ? "शहर या जिला खोजें..." : "Search city or district..."}
              className="krishi-input flex-fill" />
            <button type="submit" className="krishi-btn px-4">🔍</button>
          </form>
          {error && (
            <div className="alert alert-warning py-2 mt-2 text-center mb-0" style={{ fontSize: "0.8rem" }}>
              ⚠️ {hi ? "बैकएंड से कनेक्ट नहीं हो सका — डेमो डेटा दिखाया जा रहा है" : "Backend unavailable — showing demo data for"} <strong>{city}</strong>
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-5"><div className="krishi-spinner mx-auto" /></div>
        ) : weather && (
          <>
            {/* Current Weather */}
            <div className="result-highlight mb-4">
              <div className="row align-items-center">
                <div className="col-md-6 text-center text-md-start">
                  <p className="mb-1 opacity-75">📍 {weather.city}</p>
                  <div style={{ fontSize: "5rem", lineHeight: 1 }}>🌤️</div>
                  <h1 style={{ fontSize: "4rem", fontWeight: 900 }} className="mb-0">{weather.temp}°C</h1>
                  <p className="mb-1 opacity-75">{hi ? "अनुभव" : "Feels like"} {weather.feels_like}°C</p>
                  <p className="opacity-75">{weather.description}</p>
                </div>
                <div className="col-md-6">
                  <div className="row g-3 mt-2">
                    {[
                      { emoji: "💧", label: hi?"आर्द्रता":"Humidity", val: `${weather.humidity}%` },
                      { emoji: "💨", label: hi?"हवा":"Wind",     val: `${weather.wind} km/h` },
                      { emoji: "👁️", label: hi?"दृश्यता":"Visibility", val: `${weather.visibility} km` },
                      { emoji: "🌡️", label: hi?"तापमान":"Temp",  val: `${weather.temp}°C` },
                    ].map(s => (
                      <div key={s.label} className="col-6">
                        <div className="p-3 rounded-3 text-center" style={{ background: "rgba(255,255,255,0.15)" }}>
                          <div style={{ fontSize: "1.5rem" }}>{s.emoji}</div>
                          <div className="fw-bold">{s.val}</div>
                          <small style={{ opacity: 0.75 }}>{s.label}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 5-Day Forecast */}
            <h5 style={{ color: "#1B5E20" }} className="mb-3">📅 {hi ? "5 दिन का पूर्वानुमान" : "5-Day Forecast"}</h5>
            <div className="row g-3 mb-4">
              {(weather.forecast || []).map((f, i) => (
                <div key={i} className="col">
                  <div className="krishi-card text-center py-3" style={{ minWidth: "80px" }}>
                    <small className="fw-bold d-block mb-1" style={{ color: "#1B5E20" }}>{hi ? f.dayHi : f.day}</small>
                    <div style={{ fontSize: "1.8rem" }}>{f.icon}</div>
                    <div className="fw-bold mt-1" style={{ color: tempColor(f.high), fontSize: "1rem" }}>{f.high}°</div>
                    <small className="text-muted">{f.low}°</small>
                    <small className="text-muted d-block" style={{ fontSize: "0.7rem" }}>{f.desc}</small>
                  </div>
                </div>
              ))}
            </div>

            {/* Farming Tips */}
            <div className="krishi-card" style={{ borderLeft: "4px solid #f77f00" }}>
              <h6 style={{ color: "#e65100" }}>🌾 {hi ? "किसानों के लिए मौसम सलाह" : "Farming Weather Tips"}</h6>
              <ul className="mb-0 ps-3">
                {(hi ? (weather.agri_tips_hi || weather.agri_tips || []) : (weather.agri_tips || [])).map((tip, i) => (
                  <li key={i} className="text-muted mb-1">{tip}</li>
                ))}
              </ul>
            </div>

            {/* Quick cities */}
            <div className="mt-4 text-center">
              <small className="text-muted d-block mb-2">{hi ? "प्रमुख शहरों के लिए:" : "Quick city search:"}</small>
              <div className="d-flex flex-wrap gap-2 justify-content-center">
                {["Delhi", "Mumbai", "Pune", "Lucknow", "Chandigarh", "Jaipur", "Bhopal", "Hyderabad"].map(c => (
                  <button key={c} onClick={() => { setCity(c); fetchWeather(c); }}
                    className="btn btn-sm rounded-pill" style={{ background: "#E8F5E9", color: "#1B5E20", border: "1px solid #a5d6a7" }}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherPage;
