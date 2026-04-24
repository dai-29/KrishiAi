// Restored original Navbar — Bootstrap 5 green theme
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LanguageContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { lang, toggleLanguage } = useLang();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleLogout = () => { logout(); navigate("/"); };

  const active = (path) => location.pathname === path ? "active fw-bold" : "";

  const dashLink = user?.role === "farmer"
    ? { to: "/farmer-dashboard", label: lang === "hi" ? "किसान डैशबोर्ड" : "Farmer Dashboard" }
    : { to: "/buyer-dashboard", label: lang === "hi" ? "खरीदार डैशबोर्ड" : "Buyer Dashboard" };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top px-5 py-lg-0" style={{ background: "#1B5E20" }}>
      {/* Brand */}
      <Link className="navbar-brand" to="/">
        <h2 className="m-0 fw-bold text-white">
          <span style={{ color: "#81C784" }}>कृषि</span>AI
        </h2>
      </Link>

      {/* Mobile Toggle */}
      <button
        className="navbar-toggler"
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      {/* Links */}
      <div className={`collapse navbar-collapse${open ? " show" : ""}`}>
        <div className="navbar-nav ms-auto py-0">
          <Link className={`nav-item nav-link text-white ${active("/")}`} to="/">
            {lang === "hi" ? "होम" : "Home"}
          </Link>
          <Link className={`nav-item nav-link text-white ${active("/marketplace")}`} to="/marketplace">
            {lang === "hi" ? "मंडी" : "Marketplace"}
          </Link>
          <Link className={`nav-item nav-link text-white ${active("/schemes")}`} to="/schemes">
            {lang === "hi" ? "योजनाएं" : "Schemes"}
          </Link>
          <Link className={`nav-item nav-link text-white ${active("/weather")}`} to="/weather">
            {lang === "hi" ? "मौसम" : "Weather"}
          </Link>
          <Link className={`nav-item nav-link text-white ${active("/chat")}`} to="/chat">
            {lang === "hi" ? "AI चैट" : "AI Chat"}
          </Link>
          {isAuthenticated && (
            <Link className={`nav-item nav-link text-white ${active(dashLink.to)}`} to={dashLink.to}>
              {dashLink.label}
            </Link>
          )}
        </div>

        {/* Language + Auth */}
        <div className="d-flex align-items-center gap-2 ms-3">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="btn btn-outline-light btn-sm rounded-pill px-3"
          >
            🌐 {lang === "en" ? "हिंदी" : "English"}
          </button>

          {isAuthenticated ? (
            <div className="dropdown">
              <button
                className="btn btn-light btn-sm dropdown-toggle rounded-pill px-3"
                style={{ color: "#1B5E20", fontWeight: 600 }}
                type="button"
                data-bs-toggle="dropdown"
              >
                👤 {user?.name?.split(" ")[0]}
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow">
                <li>
                  <Link className="dropdown-item" to={dashLink.to}>
                    📊 {dashLink.label}
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item text-danger" onClick={handleLogout}>
                    🚪 {lang === "hi" ? "लॉगआउट" : "Logout"}
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="d-flex gap-2">
              <Link to="/login" className="btn btn-outline-light btn-sm rounded-pill px-3">
                {lang === "hi" ? "लॉगिन" : "Login"}
              </Link>
              <Link to="/register" className="btn btn-light btn-sm rounded-pill px-3" style={{ color: "#1B5E20", fontWeight: 600 }}>
                {lang === "hi" ? "रजिस्टर" : "Register"}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
