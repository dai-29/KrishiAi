// src/components/Footer.js
import React from "react";

function Footer() {
  return (
    <footer className="bg-primary text-white pt-5 pb-4">
      <div className="container text-center text-md-start">
        <div className="row text-center text-md-start">
          {/* About */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold">KrishiAi</h5>
            <p>
              We produce fresh and organic food for your family. Join us to
              support sustainable farming and healthy living.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold">Quick Links</h5>
            <p>
              <a href="/" className="text-white text-decoration-none">Home</a>
            </p>
            <p>
              <a href="/services" className="text-white text-decoration-none">Services</a>
            </p>
            <p>
              <a href="/products" className="text-white text-decoration-none">Products</a>
            </p>
            <p>
              <a href="/contact" className="text-white text-decoration-none">Contact</a>
            </p>
          </div>

          {/* Contact */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold">Contact</h5>
            <p>
              <i className="fas fa-home me-3"></i> Dehradun, Uttarakhand
            </p>
            <p>
              <i className="fas fa-envelope me-3"></i> info@KrishiAi.com
            </p>
            <p>
              <i className="fas fa-phone me-3"></i> +91 7060150138
            </p>
          </div>

          {/* Social Media */}
          <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold">Follow Us</h5>
            <a href="https://instagram.com" className="btn btn-outline-light btn-floating m-1">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://github.com" className="btn btn-outline-light btn-floating m-1">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://linkedin.com" className="btn btn-outline-light btn-floating m-1">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://facebook.com" className="btn btn-outline-light btn-floating m-1">
              <i className="fab fa-facebook-f"></i>
            </a>
          </div>
        </div>

        <hr className="mb-4" />

        <div className="row align-items-center">
          <div className="col-md-7 col-lg-8">
            <p>
              © {new Date().getFullYear()} KrishiAI. All rights reserved.
            </p>
          </div>
          <div className="col-md-5 col-lg-4">
            <div className="text-center text-md-end">
              <a href="/" className="text-white text-decoration-none me-2">Privacy Policy</a>
              <a href="/" className="text-white text-decoration-none">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
