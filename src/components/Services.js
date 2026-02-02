// src/components/Services.js
import React from "react";

function Services() {
  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="row g-5">
          {/* Left Column - Title */}
          <div className="col-lg-4 col-md-6">
            <div className="mb-3">
              <h6 className="text-primary text-uppercase">Services</h6>
              <h1 className="display-5">Organic Farm Services</h1>
            </div>
            <p className="mb-4">
              Tempor erat elitr at rebum at at clita. Diam dolor diam ipsum et
              tempor sit. Clita erat ipsum et lorem et sit, sed stet labore.
            </p>
            <a href="/contact" className="btn btn-primary py-md-3 px-md-5">
              Contact Us
            </a>
          </div>

          {/* Right Column - Service Items with Images */}
          <div className="col-lg-8 col-md-6">
            <div className="row g-4">
              <div className="col-md-6">
                <div className="service-item bg-light text-center p-5 h-100">
                  <img
                    src="/img/vegetables.png"
                    alt="Fresh Vegetables"
                    className="mb-3 img-fluid"
                  />
                  <h4>Fresh Vegetables</h4>
                  <p>
                    Labore justo vero ipsum sit clita erat lorem magna clita
                    nonumy dolor magna dolor vero.
                  </p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="service-item bg-light text-center p-5 h-100">
                  <img
                    src="/img/fruits.png"
                    alt="Fresh Fruits"
                    className="mb-3 img-fluid"
                  />
                  <h4>Fresh Fruits</h4>
                  <p>
                    Labore justo vero ipsum sit clita erat lorem magna clita
                    nonumy dolor magna dolor vero.
                  </p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="service-item bg-light text-center p-5 h-100">
                  <img
                    src="/img/cattle.png"
                    alt="Healthy Cattle"
                    className="mb-3 img-fluid"
                  />
                  <h4>Healthy Cattle</h4>
                  <p>
                    Labore justo vero ipsum sit clita erat lorem magna clita
                    nonumy dolor magna dolor vero.
                  </p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="service-item bg-light text-center p-5 h-100">
                  <img
                    src="/img/truck.png"
                    alt="Modern Truck"
                    className="mb-3 img-fluid"
                  />
                  <h4>Modern Truck</h4>
                  <p>
                    Labore justo vero ipsum sit clita erat lorem magna clita
                    nonumy dolor magna dolor vero.
                  </p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="service-item bg-light text-center p-5 h-100">
                  <img
                    src="/img/farming.png"
                    alt="Farming Plans"
                    className="mb-3 img-fluid"
                  />
                  <h4>Farming Plans</h4>
                  <p>
                    Labore justo vero ipsum sit clita erat lorem magna clita
                    nonumy dolor magna dolor vero.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
