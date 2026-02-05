import React, { useState } from "react";

function Banner() {
  const [showVeg, setShowVeg] = useState(false);
  const [showFruit, setShowFruit] = useState(false);

  return (
    <div className="container-fluid banner mb-5">
      <div className="container">
        <div className="row gx-0">

          {/* Vegetables */}
          <div className="col-md-6">
            <div
              className="bg-primary bg-vegetable d-flex flex-column justify-content-center p-5"
              style={{ minHeight: "300px" }}
            >
              <h3 className="text-white mb-3">जैविक सब्ज़ियाँ</h3>

              <p className="text-white">
                KrishiAI किसानों को रसायन-मुक्त और पोषण से भरपूर सब्ज़ियों की
                खेती के लिए स्मार्ट तकनीक और बाज़ार से जोड़ता है।
              </p>

              {showVeg && (
                <p className="text-white mt-2">
                  हमारी AI आधारित प्रणाली मिट्टी की गुणवत्ता, मौसम और फसल
                  चक्र का विश्लेषण कर किसानों को सही समय पर सही सलाह देती है,
                  जिससे लागत कम और उत्पादन अधिक होता है।
                </p>
              )}

              <button
                className="btn btn-link text-white fw-bold p-0 mt-2 text-start"
                onClick={() => setShowVeg(!showVeg)}
              >
                {showVeg ? "कम जानकारी दिखाएँ" : "और जानें"}
                <i className="bi bi-arrow-right ms-2"></i>
              </button>
            </div>
          </div>

          {/* Fruits */}
          <div className="col-md-6">
            <div
              className="bg-secondary bg-fruit d-flex flex-column justify-content-center p-5"
              style={{ minHeight: "300px" }}
            >
              <h3 className="text-white mb-3">जैविक फल</h3>

              <p className="text-white">
                KrishiAI किसानों को उच्च गुणवत्ता वाले जैविक फलों की खेती के
                लिए AI आधारित मार्गदर्शन और सही बाज़ार उपलब्ध कराता है।
              </p>

              {showFruit && (
                <p className="text-white mt-2">
                  स्मार्ट कृषि मॉडल के माध्यम से किसानों को रोग पहचान,
                  उत्पादन अनुमान और बाज़ार मूल्य की जानकारी मिलती है,
                  जिससे उन्हें उनकी फसल का सही मूल्य प्राप्त होता है।
                </p>
              )}

              <button
                className="btn btn-link text-white fw-bold p-0 mt-2 text-start"
                onClick={() => setShowFruit(!showFruit)}
              >
                {showFruit ? "कम जानकारी दिखाएँ" : "और जानें"}
                <i className="bi bi-arrow-right ms-2"></i>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Banner;
