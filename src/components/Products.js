// src/components/Products.js
import React from "react";

function Products() {
  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="mx-auto text-center mb-5" style={{ maxWidth: "500px" }}>
          <h6 className="text-primary text-uppercase">Products</h6>
          <h1 className="display-5">Our Fresh & Organic Products</h1>
        </div>

        {/* Bootstrap Carousel */}
        <div
          id="productCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">

            <div className="carousel-item active">
              <div className="d-flex justify-content-center">
                <div className="product-item position-relative bg-white d-flex flex-column text-center mx-2">
                  <img
                    className="img-fluid mb-4"
                    src="/img/product-1.png"
                    alt="Organic Vegetable 1"
                  />
                  <h6 className="mb-3">Organic Vegetable</h6>
                  <h5 className="text-primary mb-0">$19.00</h5>
                </div>
                <div className="product-item position-relative bg-white d-flex flex-column text-center mx-2">
                  <img
                    className="img-fluid mb-4"
                    src="/img/product-2.png"
                    alt="Organic Vegetable 2"
                  />
                  <h6 className="mb-3">Organic Vegetable</h6>
                  <h5 className="text-primary mb-0">$29.00</h5>
                </div>
              </div>
            </div>

            <div className="carousel-item">
              <div className="d-flex justify-content-center">
                <div className="product-item position-relative bg-white d-flex flex-column text-center mx-2">
                  <img
                    className="img-fluid mb-4"
                    src="/img/product-1.png"
                    alt="Organic Vegetable 3"
                  />
                  <h6 className="mb-3">Organic Vegetable</h6>
                  <h5 className="text-primary mb-0">$19.00</h5>
                </div>
                <div className="product-item position-relative bg-white d-flex flex-column text-center mx-2">
                  <img
                    className="img-fluid mb-4"
                    src="/img/product-2.png"
                    alt="Organic Vegetable 4"
                  />
                  <h6 className="mb-3">Organic Vegetable</h6>
                  <h5 className="text-primary mb-0">$29.00</h5>
                </div>
              </div>
            </div>

          </div>

          {/* Controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#productCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#productCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        {/* Carousel End */}
      </div>
    </div>
  );
}

export default Products;
