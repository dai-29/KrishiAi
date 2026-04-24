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
            <h3 className="mb-0 fw-bold" style={{ color: "#1B5E20" }}>
              {" "}
              खेती का नया डिजिटल रूप!
            </h3>
          </div>
        </div>

        {/* Center */}
        <div className="col-lg-6">
          <div className="d-flex align-items-center justify-content-center">
            <a href="/" className="navbar-brand ms-lg-5 text-decoration-none">
              <h1 className="m-0 display-4 fw-bold">
                <span style={{ color: "#1B5E20" }}>कृषि</span>
                <span style={{ color: "#81C784" }}>AI</span>
              </h1>
            </a>
          </div>
        </div>

        {/* Right */}
        <div className="col-lg-3">
          <div className="d-flex align-items-center justify-content-end">
            <a
              className="btn btn-success rounded-circle me-2 d-flex align-items-center justify-content-center"
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: "45px", height: "45px" }}
            >
              <i className="fab fa-instagram"></i>
            </a>

            <a
              className="btn btn-success rounded-circle me-2 d-flex align-items-center justify-content-center"
              href="https://github.com/dai-29"
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: "45px", height: "45px" }}
            >
              <i className="fab fa-github"></i>
            </a>

            <a
              className="btn btn-success rounded-circle d-flex align-items-center justify-content-center"
              href="https://www.linkedin.com/in/anubhavpatwal29"
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: "45px", height: "45px" }}
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
