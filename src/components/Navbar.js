import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleContactClick = () => {
    // Case 1: Already on Home page
    if (location.pathname === "/") {
      document
        .getElementById("contact-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }
    // Case 2: On any other page
    else {
      navigate("/contact", { state: { scrollToContact: true } });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <a href="/" className="navbar-brand d-flex d-lg-none">
        <h1 className="m-0 display-4 text-secondary">
          <span className="text-white">कृषि</span>Ai
        </h1>
      </a>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav mx-auto py-0">
          <a href="/" className="nav-item nav-link active">Home</a>
          <a href="/login" className="nav-item nav-link">Login</a>
          <a href="/register" className="nav-item nav-link">Register</a>

          {/* SMART CONTACT BUTTON */}
          <button
            className="nav-link btn btn-link"
            onClick={handleContactClick}
          >
            Contact
          </button>

          <a href="https://rzp.io/l/wSXTA0m" className="nav-item nav-link">
            Donate
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
