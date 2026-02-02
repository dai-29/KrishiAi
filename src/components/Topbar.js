// Topbar.js
import React from "react";

function Topbar() {
  return (
    <div className="container-fluid px-5 d-none d-lg-block">
      <div className="row gx-5 py-3 align-items-center">
        {/* Left */}
        <div className="col-lg-3">
          <div className="d-flex align-items-center justify-content-start">
            <i className="bi bi-phone-vibrate fs-1 text-primary me-2"></i>
            <h2 className="mb-0">Cause For Good</h2>
          </div>
        </div>

        {/* Center */}
        <div className="col-lg-6">
          <div className="d-flex align-items-center justify-content-center">
            <a href="/" className="navbar-brand ms-lg-5">
              <h1 className="m-0 display-4 text-primary">
                <span className="text-secondary">Krishi</span>Ai
              </h1>
            </a>
          </div>
        </div>

        {/* Right */}
        <div className="col-lg-3">
          <div className="d-flex align-items-center justify-content-end">
            <a
              className="btn btn-primary btn-square rounded-circle me-2"
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              className="btn btn-primary btn-square rounded-circle me-2"
              href="https://github.com/dai-29"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              className="btn btn-primary btn-square rounded-circle me-2"
              href="https://www.linkedin.com/in/anubhavpatwal29"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
