// KrishiAI App — restored original UI + new feature routes
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ChatWidget from "./components/ChatWidget";

// Original components (preserved)
import Topbar from "./components/Topbar";
import Navbar from "./components/Navbar";

// Original home page (fully preserved with Carousel, Banner, About, Services, Team, Blog, Footer, BackToTop)
import HomePage from "./Pages/HomePage";

// New feature pages (restyled to match Bootstrap/green theme)
import Login from "./Pages/Login";
import Register from "./Pages/Register";
// eslint-disable-next-line no-unused-vars
import FarmerDashboard from "./Pages/FarmerDashboard";
import BuyerDashboard from "./Pages/BuyerDashboard";
import Marketplace from "./Pages/Marketplace";
import DiseaseDetection from "./Pages/DiseaseDetection";
import YieldPrediction from "./Pages/YieldPrediction";

import GovernmentSchemes from "./Pages/GovernmentSchemes";
import ChatPage from "./Pages/ChatPage";
import WeatherPage from "./Pages/WeatherPage";

// Contact page (original)
import Contact from "./Pages/contact";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import "./index.css";

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <BrowserRouter>
          {/* Original top bar (desktop only) */}
          <Topbar />
          {/* Original Bootstrap Navbar */}
          <Navbar />
          {/* Floating AI Chat Widget — visible on all pages */}
          <ChatWidget />

          <Routes>
            {/* Original home page — fully preserved */}
            <Route path="/" element={<HomePage />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />

            {/* Public feature pages */}
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/schemes" element={<GovernmentSchemes />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/weather" element={<WeatherPage />} />

            {/* AI Tools — public, no login required */}
            <Route path="/disease-detection" element={<DiseaseDetection />} />
            <Route path="/yield-prediction" element={<YieldPrediction />} />


            {/* Protected — Farmer Dashboard */}
            <Route path="/farmer-dashboard" element={
              <ProtectedRoute requiredRole="farmer"><FarmerDashboard /></ProtectedRoute>
            } />

            {/* Protected — Buyer Dashboard */}
            <Route path="/buyer-dashboard" element={
              <ProtectedRoute requiredRole="buyer"><BuyerDashboard /></ProtectedRoute>
            } />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <Toaster
            position="top-right"
            toastOptions={{
              style: { background: "#1B5E20", color: "#fff", borderRadius: "8px" },
              success: { iconTheme: { primary: "#81C784", secondary: "#1B5E20" } },
              error: { style: { background: "#b71c1c", color: "#fff" } },
            }}
          />
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
