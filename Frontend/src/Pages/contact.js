import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";

const Contact = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToBottom) {
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  }, [location]);

  return (
    <>
      {/* Hero / Contact Heading */}
      <section
        style={{
          minHeight: "60vh",
          background: "linear-gradient(to bottom, #E8F5E9, #C8E6C9, #E8F5E9)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "800px" }}>
          <h2
            style={{
              fontSize: "2.8rem",
              fontWeight: "800",
              color: "#1B5E20",
              marginBottom: "1rem",
              letterSpacing: "1px",
            }}
          >
            हमसे संपर्क करें
          </h2>

          <p
            style={{
              fontSize: "1.1rem",
              color: "#33691E",
              lineHeight: "1.8",
            }}
          >
            किसी भी प्रकार की जानकारी, सुझाव या सहयोग के लिए  
            हमसे निःसंकोच संपर्क करें।  
            <br />
            हम किसानों और ग्रामीण समुदाय के साथ मिलकर  
            एक बेहतर और स्मार्ट कृषि भविष्य बना रहे हैं।
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
