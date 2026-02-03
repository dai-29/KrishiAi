import React from 'react';

function About() {
  return (
    <div className="container-fluid about pt-5">
      <div className="container">
        <div className="row gx-5">
          
          {/* Image */}
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div className="d-flex h-100 border border-5 border-success border-bottom-0 pt-4">
              <img 
                className="img-fluid mt-auto mx-auto" 
                src={process.env.PUBLIC_URL + '/img/about.png'} 
                alt="KrishiAI About" 
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="col-lg-6 pb-5">
            <div className="mb-3 pb-2">
              <h6 className="text-success text-uppercase">
                हमारे बारे में
              </h6>
              <h1 className="display-5">
                किसानों के लिए स्मार्ट और भरोसेमंद कृषि समाधान
              </h1>
            </div>

            <p className="mb-4">
              KrishiAI एक आधुनिक एग्री-टेक प्लेटफ़ॉर्म है, जिसका उद्देश्य किसानों
              को तकनीक के माध्यम से सशक्त बनाना है। हम खेती की परंपरागत चुनौतियों
              को समझते हुए ऐसे समाधान प्रदान करते हैं जो खेती को अधिक लाभदायक,
              टिकाऊ और आसान बनाते हैं।
            </p>

            <p className="mb-4">
              हमारा प्लेटफ़ॉर्म <strong>बिचौलियों (Middlemen)</strong> की समस्या
              को कम करके किसानों को सीधे बाज़ार से जोड़ता है, जिससे उन्हें उनकी
              फसल का सही मूल्य मिल सके और आय में वृद्धि हो।
            </p>

            {/* Features */}
            <div className="row gx-5 gy-4">

              <div className="col-sm-6">
                <i className="fa fa-leaf display-1 text-success"></i>
                <h4>फसल रोग पहचान</h4>
                <p className="mb-0">
                  किसान पत्ते की फोटो अपलोड करके AI आधारित प्रणाली से
                  फसल की बीमारी की पहचान कर सकते हैं और तुरंत समाधान प्राप्त कर सकते हैं।
                </p>
              </div>

              <div className="col-sm-6">
                <i className="fa fa-cloud-sun display-1 text-success"></i>
                <h4>मौसम पूर्वानुमान</h4>
                <p className="mb-0">
                  उन्नत मौसम पूर्वानुमान प्रणाली किसानों को सही समय पर
                  बुवाई, सिंचाई और कटाई के निर्णय लेने में सहायता करती है।
                </p>
              </div>

              <div className="col-sm-6">
                <i className="fa fa-store display-1 text-success"></i>
                <h4>ग्रामीण बाज़ार</h4>
                <p className="mb-0">
                  KrishiAI किसानों को सीधे खरीदारों से जोड़ता है,
                  जिससे बिचौलियों की भूमिका कम होती है और मुनाफ़ा बढ़ता है।
                </p>
              </div>

              <div className="col-sm-6">
                <i className="fa fa-brain display-1 text-success"></i>
                <h4>AI आधारित सलाह</h4>
                <p className="mb-0">
                  मिट्टी, मौसम और फसल के डेटा के आधार पर
                  स्मार्ट कृषि सलाह दी जाती है ताकि उत्पादन बेहतर हो।
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default About;
