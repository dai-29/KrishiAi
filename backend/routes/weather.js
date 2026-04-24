// Weather route — proxy to OpenWeatherMap API
import express from "express";
import axios from "axios";

const router = express.Router();

// @route   GET /api/weather?city=Delhi
router.get("/", async (req, res) => {
  try {
    const { city = "Delhi" } = req.query;
    const apiKey = process.env.WEATHER_API_KEY;

    if (!apiKey || apiKey === "your_openweathermap_key_here") {
      return res.json({
        success: true, isMock: true,
        weather: { city, country: "IN", temperature: 32, feelsLike: 35, humidity: 68, description: "partly cloudy", icon: "02d", windSpeed: 12, rainfall: 0, pressure: 1010 },
      });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url, { timeout: 10000 });
    const d = response.data;

    res.json({
      success: true,
      weather: {
        city: d.name, country: d.sys.country,
        temperature: Math.round(d.main.temp), feelsLike: Math.round(d.main.feels_like),
        humidity: d.main.humidity, description: d.weather[0].description, icon: d.weather[0].icon,
        windSpeed: d.wind.speed, rainfall: d.rain?.["1h"] || 0, pressure: d.main.pressure,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Weather service error." });
  }
});

export default router;
