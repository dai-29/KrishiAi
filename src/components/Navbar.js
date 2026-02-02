import React from 'react';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm py-3 px-3 px-lg-5">
      <a href="/" className="navbar-brand d-flex d-lg-none">
        <h1 className="m-0 display-4 text-secondary">
          <span className="text-white">Farm</span>Fresh
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
          <a href="/contact" className="nav-item nav-link">Contact</a>
          <a href="https://rzp.io/l/wSXTA0m" className="nav-item nav-link">Donate</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
