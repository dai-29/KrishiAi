import React from 'react';

function Banner() {
  return (
    <div className="container-fluid banner mb-5">
      <div className="container">
        <div className="row gx-0">
          <div className="col-md-6">
            <div
              className="bg-primary bg-vegetable d-flex flex-column justify-content-center p-5"
              style={{ height: '300px' }}
            >
              <h3 className="text-white mb-3">Organic Vegetables</h3>
              <p className="text-white">
                Dolor magna ipsum elitr sea erat elitr amet ipsum stet justo dolor, amet lorem diam no duo sed dolore amet diam
              </p>
              <a href="/" className="text-white fw-bold">
                Read More <i className="bi bi-arrow-right ms-2"></i>
              </a>
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="bg-secondary bg-fruit d-flex flex-column justify-content-center p-5"
              style={{ height: '300px' }}
            >
              <h3 className="text-white mb-3">Organic Fruits</h3>
              <p className="text-white">
                Dolor magna ipsum elitr sea erat elitr amet ipsum stet justo dolor, amet lorem diam no duo sed dolore amet diam
              </p>
              <a href="/" className="text-white fw-bold">
                Read More <i className="bi bi-arrow-right ms-2"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
