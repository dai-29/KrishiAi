// Weather Card — shows real-time weather data
import React, { useState, useEffect } from "react";
import { Cloud, Droplets, Wind, Thermometer, Search } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import api from "../utils/api";

const WeatherCard = ({ defaultCity = "Delhi" }) => {
  const { t } = useLang();
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(defaultCity);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWeather = async (c) => {
    setLoading(true); setError("");
    try {
      const res = await api.get(`/weather?city=${encodeURIComponent(c)}`);
      setWeather(res.data.weather);
    } catch {
      setError("Could not fetch weather.");
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchWeather(city); }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) { setCity(input.trim()); setInput(""); }
  };

  const iconUrl = weather?.icon
    ? `https://openweathermap.org/img/wn/${weather.icon}@2x.png`
    : null;

  return (
    <div className="card glow-green">
      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input value={input} onChange={e=>setInput(e.target.value)}
          placeholder={t("searchCity")}
          className="input-field flex-1 text-sm py-2" />
        <button type="submit" className="btn-primary px-3 py-2">
          <Search size={16}/>
        </button>
      </form>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="w-8 h-8 border-3 border-sage-500 border-t-transparent rounded-full animate-spin"/>
        </div>
      )}

      {error && <p className="text-red-400 text-sm text-center py-4">{error}</p>}

      {weather && !loading && (
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-white font-bold text-lg">{weather.city}, {weather.country}</h3>
              <p className="text-white/50 text-sm capitalize">{weather.description}</p>
            </div>
            {iconUrl && <img src={iconUrl} alt="weather" className="w-14 h-14"/>}
          </div>

          <div className="text-5xl font-bold gradient-text mb-4">{weather.temperature}°C</div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: <Thermometer size={14}/>, label: t("feelsLike"), val: `${weather.feelsLike}°C` },
              { icon: <Droplets size={14}/>, label: t("humidity"), val: `${weather.humidity}%` },
              { icon: <Wind size={14}/>, label: t("wind"), val: `${weather.windSpeed} m/s` },
              { icon: <Cloud size={14}/>, label: t("pressure"), val: `${weather.pressure} hPa` },
            ].map(({ icon, label, val }) => (
              <div key={label} className="flex items-center gap-2 bg-white/5 rounded-xl p-2.5">
                <span className="text-sage-400">{icon}</span>
                <div>
                  <p className="text-white/40 text-xs">{label}</p>
                  <p className="text-white text-sm font-semibold">{val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
