// src/components/Services.js
import React from "react";

function Services() {
  return (
    <div className="container-fluid py-5 bg-light">
      <div className="container">
        <div className="row g-5">

          {/* Left Section */}
          <div className="col-lg-4">
            <h6 className="text-success text-uppercase mb-2">
              हमारी सेवाएँ
            </h6>
            <h1 className="display-5 mb-4">
              किसानों के लिए स्मार्ट समाधान
            </h1>
            <p className="mb-4">
              KrishiAI किसानों को आधुनिक तकनीक और सही जानकारी से जोड़ता है,
              ताकि खेती अधिक लाभदायक, सुरक्षित और टिकाऊ बन सके।
              हमारी सेवाएँ किसानों की वास्तविक समस्याओं को ध्यान में रखकर
              डिज़ाइन की गई हैं।
            </p>
            <a href="/contact" className="btn btn-success px-5 py-3">
              हमसे संपर्क करें
            </a>
          </div>

          {/* Right Section */}
          <div className="col-lg-8">
            <div className="row g-4">

              {/* Service 1 */}
              <div className="col-md-6">
                <div className="bg-white border rounded p-4 h-100 text-center shadow-sm">
                  <i className="fa fa-cloud-sun fa-3x text-success mb-3"></i>
                  <h4>मौसम पूर्वानुमान व अलर्ट</h4>
                  <p className="mb-0">
                    किसानों को सटीक मौसम जानकारी और अलर्ट प्रदान किए जाते हैं
                    ताकि वे बुवाई, सिंचाई और कटाई का सही समय तय कर सकें।
                  </p>
                </div>
              </div>

              {/* Service 2 */}
              <div className="col-md-6">
                <div className="bg-white border rounded p-4 h-100 text-center shadow-sm">
                  <i className="fa fa-landmark fa-3x text-success mb-3"></i>
                  <h4>सरकारी योजनाओं की जानकारी</h4>
                  <p className="mb-0">
                    किसानों को सरकारी योजनाओं, सब्सिडी और बीमा से जुड़ी
                    जानकारी सरल भाषा में उपलब्ध कराई जाती है।
                  </p>
                </div>
              </div>

              {/* Service 3 */}
              <div className="col-md-6">
                <div className="bg-white border rounded p-4 h-100 text-center shadow-sm">
                  <i className="fa fa-book-open fa-3x text-success mb-3"></i>
                  <h4>कृषि ज्ञान केंद्र</h4>
                  <p className="mb-0">
                    खेती से जुड़े लेख, मार्गदर्शिकाएँ और आधुनिक तकनीकों की
                    जानकारी किसानों को एक ही स्थान पर उपलब्ध कराई जाती है।
                  </p>
                </div>
              </div>

              {/* Service 4 */}
              <div className="col-md-6">
                <div className="bg-white border rounded p-4 h-100 text-center shadow-sm">
                  <i className="fa fa-seedling fa-3x text-success mb-3"></i>
                  <h4>मिट्टी व खेती सलाह</h4>
                  <p className="mb-0">
                    मिट्टी की गुणवत्ता और फसल के आधार पर किसानों को
                    खाद, सिंचाई और फसल चयन की स्मार्ट सलाह दी जाती है।
                  </p>
                </div>
              </div>

              {/* Service 5 */}
              <div className="col-md-6">
                <div className="bg-white border rounded p-4 h-100 text-center shadow-sm">
                  <i className="fa fa-store fa-3x text-success mb-3"></i>
                  <h4>किसान बाज़ार (Marketplace)</h4>
                  <p className="mb-0">
                    किसानों को सीधे खरीदारों से जोड़कर बिचौलियों की समस्या
                    कम की जाती है, जिससे किसानों को सही मूल्य मिलता है।
                  </p>
                </div>
              </div>

              {/* Service 6 */}
              <div className="col-md-6">
                <div className="bg-white border rounded p-4 h-100 text-center shadow-sm">
                  <i className="fa fa-leaf fa-3x text-success mb-3"></i>
                  <h4>फसल रोग पहचान प्रणाली</h4>
                  <p className="mb-0">
                    किसान फसल के पत्ते की फोटो अपलोड करके AI आधारित
                    प्रणाली से बीमारी की पहचान और समाधान प्राप्त कर सकते हैं।
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
