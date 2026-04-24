// Footer — Bootstrap + original green theme (restored)
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={{ background: "#1B5E20", color: "#fff" }}>
      <div className="container py-5">
        <div className="row g-4">

          {/* Brand */}
          <div className="col-lg-4">
            <Link to="/" className="text-decoration-none">
              <h3 className="fw-bold mb-2">
                <span style={{ color: "#81C784" }}>कृषि</span>
                <span className="text-white">AI</span>
              </h3>
            </Link>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", lineHeight: "1.7" }}>
              Empowering Indian farmers with AI-driven smart agriculture solutions.
            </p>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem" }}>
              भारतीय किसानों को AI तकनीक से सशक्त बनाना।
            </p>
            {/* Socials */}
            <div className="d-flex gap-2 mt-3">
              {[
                { href: "https://instagram.com", icon: "fab fa-instagram" },
                { href: "https://github.com/dai-29", icon: "fab fa-github" },
                { href: "https://linkedin.com/in/anubhavpatwal29", icon: "fab fa-linkedin-in" },
              ].map(s => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "38px", height: "38px", background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}>
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div className="col-sm-4 col-lg-2">
            <h6 className="fw-bold text-uppercase mb-3" style={{ color: "#81C784", letterSpacing: "1px", fontSize: "0.8rem" }}>
              Platform
            </h6>
            <ul className="list-unstyled">
              {[
                { to: "/", label: "होम / Home" },
                { to: "/marketplace", label: "मंडी / Marketplace" },
                { to: "/schemes", label: "योजनाएं / Schemes" },
                { to: "/chat", label: "AI चैट / Chat" },
                { to: "/contact", label: "संपर्क / Contact" },
              ].map(l => (
                <li key={l.to} className="mb-1">
                  <Link to={l.to} className="text-decoration-none" style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.875rem" }}
                    onMouseEnter={e => e.target.style.color="#81C784"}
                    onMouseLeave={e => e.target.style.color="rgba(255,255,255,0.65)"}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Tools */}
          <div className="col-sm-4 col-lg-3">
            <h6 className="fw-bold text-uppercase mb-3" style={{ color: "#81C784", letterSpacing: "1px", fontSize: "0.8rem" }}>
              AI Tools
            </h6>
            <ul className="list-unstyled">
              {[
                { to: "/disease-detection", label: "🔬 फसल रोग पहचान" },
                { to: "/yield-prediction", label: "📈 उपज अनुमान" },
                { to: "/soil-recommendation", label: "🌱 मृदा सुझाव" },
                { to: "/weather", label: "🌤️ मौसम पूर्वानुमान" },
                { to: "/chat", label: "🤖 KrishiBot" },
              ].map(l => (
                <li key={l.to} className="mb-1">
                  <Link to={l.to} className="text-decoration-none" style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.875rem" }}
                    onMouseEnter={e => e.target.style.color="#81C784"}
                    onMouseLeave={e => e.target.style.color="rgba(255,255,255,0.65)"}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-sm-4 col-lg-3">
            <h6 className="fw-bold text-uppercase mb-3" style={{ color: "#81C784", letterSpacing: "1px", fontSize: "0.8rem" }}>
              Contact
            </h6>
            <ul className="list-unstyled">
              {[
                { icon: "bi bi-telephone-fill", text: "+91 98765 43210" },
                { icon: "bi bi-envelope-fill", text: "help@krishiai.in" },
                { icon: "bi bi-geo-alt-fill", text: "New Delhi, India" },
              ].map(c => (
                <li key={c.text} className="d-flex align-items-center gap-2 mb-2">
                  <i className={c.icon} style={{ color: "#81C784", fontSize: "0.85rem" }} />
                  <span style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.875rem" }}>{c.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider + Bottom */}
        <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}>
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">
            <p className="mb-0" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>
              © 2025 KrishiAI. All rights reserved. | सर्वाधिकार सुरक्षित।
            </p>
            <p className="mb-0" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>
              Made with ❤️ for Indian Farmers 🌾
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
