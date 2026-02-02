import React from 'react';

function Carousel() {
  return (
    <div className="container-fluid p-0">
      <div id="header-carousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner">

          {/* Slide 1 - Video */}
          <div className="carousel-item active">
            <video 
              src="/img/farmer (1).mp4" 
              className="d-block w-100" 
              alt="Banner"
              autoPlay
              loop
              muted
            />
            <div className="carousel-caption top-0 bottom-0 start-0 end-0 d-flex flex-column align-items-center justify-content-center">
              <div className="text-start p-5" style={{ maxWidth: '900px' }}>
                <h3 className="text-white">Organic Vegetables</h3>
                <h1 className="display-1 text-white mb-md-4">Organic Vegetables For Healthy Life</h1>
                <a href="/" className="btn btn-primary py-md-3 px-md-5 me-3">Explore</a>
                <a href="/contact" className="btn btn-secondary py-md-3 px-md-5">Contact</a>
              </div>
            </div>
          </div>

          {/* Slide 2 - Image */}
          <div className="carousel-item">
            <img 
              src="/img/banner.jpg" 
              className="d-block w-100" 
              alt="Banner" 
            />
            <div className="carousel-caption top-0 bottom-0 start-0 end-0 d-flex flex-column align-items-center justify-content-center">
              <div className="text-start p-5" style={{ maxWidth: '900px' }}>
                <h3 className="text-white">Fresh Fruits</h3>
                <h1 className="display-1 text-white mb-md-4">Organic Fruits For Healthy Life</h1>
                <a href="/" className="btn btn-primary py-md-3 px-md-5 me-3">Explore</a>
                <a href="/contact" className="btn btn-secondary py-md-3 px-md-5">Contact</a>
              </div>
            </div>
          </div>

        </div>

        {/* Carousel Controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#header-carousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#header-carousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Carousel;
