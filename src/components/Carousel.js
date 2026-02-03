import React from "react";

function Carousel() {
  return (
    <div className="container-fluid p-0">
      <div
        id="header-carousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <video
              src="/img/farmer (1).mp4"
              className="d-block w-100"
              alt="Banner"
              autoPlay
              loop
              muted
            />
            <div className="carousel-caption top-0 bottom-0 start-0 end-0 d-flex align-items-center justify-content-center">
              <div
                className="text-start p-5 bg-dark bg-opacity-50 rounded-4"
                style={{ maxWidth: "900px" }}
              >
                <h3 className="text-success fw-semibold">
                  प्राकृतिक • ताज़ा • टिकाऊ
                </h3>

                <h1 className="display-1 fw-bold text-white mb-4 lh-sm">
                  स्मार्ट खेती <br /> स्वस्थ जीवन के लिए
                </h1>

                <button
                  className="btn btn-success btn-lg rounded-pill me-3"
                  onClick={() => {
                    window.scrollBy({
                      top: 800, // 👈 jitna niche scroll chahiye
                      behavior: "smooth",
                    });
                  }}
                >
                  Explore 🌾
                </button>

                <a
                  href="/contact"
                  className="btn btn-outline-light btn-lg rounded-pill"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
