// KrishiAI Backend - Main Express Server
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import cropRoutes from "./routes/crops.js";
import aiRoutes from "./routes/ai.js";
import weatherRoutes from "./routes/weather.js";
import schemeRoutes from "./routes/schemes.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json({ limit: "10mb" })); // 10MB limit for image uploads
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("👉", req.method, req.url);
  next();
});

// Rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use("/api/", limiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/crops", cropRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/schemes", schemeRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "KrishiAI Backend running ✅", time: new Date() });
});

// 404 handler
app.use((req, res) => res.status(404).json({ success: false, message: "Route not found" }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 KrishiAI Backend running on http://localhost:${PORT}`));
