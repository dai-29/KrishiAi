// src/components/Blog.js
import React from "react";

function Blog() {
  const farmerReviews = [
    {
      name: "राम सिंह",
      location: "हरिद्वार, उत्तराखंड",
      review:
        "KrishiAI की फसल रोग पहचान सुविधा से मैंने अपनी फसल की बीमारी समय रहते पहचान ली। सही सलाह मिलने से मेरी फसल बच गई और नुकसान नहीं हुआ।",
      image: "/img/farmer-1.jpg",
    },
    {
      name: "सुनीता देवी",
      location: "मुज़फ्फरनगर, उत्तर प्रदेश",
      review:
        "मौसम पूर्वानुमान और खेती सलाह से मुझे सही समय पर बुवाई करने में मदद मिली। KrishiAI किसानों के लिए सच में बहुत उपयोगी प्लेटफ़ॉर्म है।",
      image: "/img/farmer-3.jpg",
    },
    {
      name: "मोहन लाल",
      location: "कोटा, राजस्थान",
      review:
        "Marketplace फीचर से मुझे अपनी फसल का सही दाम मिला। बिचौलियों की समस्या काफी हद तक कम हो गई है।",
      image: "/img/farmer-2.jpg",
    },
  ];

  return (
    <div className="container-fluid py-5 bg-light">
      <div className="container">
        
        {/* Heading */}
        <div className="mx-auto text-center mb-5" style={{ maxWidth: "600px" }}>
          <h6 className="text-success text-uppercase">
            किसान अनुभव
          </h6>
          <h1 className="display-5">
            KrishiAI पर किसानों की राय
          </h1>
        </div>

        {/* Reviews */}
        <div className="row g-4">
          {farmerReviews.map((farmer, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <div className="card border-0 shadow-sm h-100 text-center p-3">
                
                <img
                  src={farmer.image}
                  alt={farmer.name}
                  className="rounded-circle mx-auto mt-3"
                  style={{ width: "200px", height: "200px", objectFit: "cover" }}
                />

                <div className="card-body">
                  <h5 className="card-title mb-1">
                    {farmer.name}
                  </h5>
                  <p className="text-muted small mb-3">
                    {farmer.location}
                  </p>

                  <p className="card-text">
                    “{farmer.review}”
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Blog;
