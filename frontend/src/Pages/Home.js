// src/Pages/Home.js
import React from "react";

const Home = () => {
  return (
    <section
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #E8F5E9, #C8E6C9, #E8F5E9)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div style={{ maxWidth: "900px", textAlign: "center" }}>
        
        <h1
          style={{
            fontSize: "3.2rem",
            fontWeight: "800",
            color: "#1B5E20",
            marginBottom: "1rem",
            letterSpacing: "1px",
          }}
        >
          कृषिAI
        </h1>

        <h2
          style={{
            fontSize: "1.8rem",
            fontWeight: "600",
            color: "#2E7D32",
            marginBottom: "1.5rem",
          }}
        >
          स्मार्ट खेती का डिजिटल भविष्य
        </h2>

        <p
          style={{
            fontSize: "1.1rem",
            color: "#33691E",
            lineHeight: "1.8",
            marginBottom: "1rem",
          }}
        >
          KrishiAI एक आधुनिक डिजिटल प्लेटफ़ॉर्म है जो किसानों को
          <strong> स्मार्ट कृषि समाधान</strong>,
          <strong> AI-आधारित सलाह</strong> और
          <strong> ग्रामीण बाज़ार से सीधा जुड़ाव</strong> प्रदान करता है।
        </p>

        <p
          style={{
            fontSize: "1rem",
            color: "#388E3C",
            lineHeight: "1.8",
            marginBottom: "2.5rem",
          }}
        >
          हमारा उद्देश्य किसानों को सही जानकारी, बेहतर निर्णय और आधुनिक तकनीक
          के माध्यम से सशक्त बनाना है — ताकि खेती अधिक लाभदायक, टिकाऊ और
          भविष्य के लिए तैयार हो सके।
        </p>

        <a
          href="/register"
          style={{
            padding: "14px 36px",
            backgroundColor: "#1B5E20",
            color: "#fff",
            borderRadius: "40px",
            fontSize: "1.1rem",
            fontWeight: "600",
            textDecoration: "none",
            boxShadow: "0 6px 15px rgba(0,0,0,0.25)",
          }}
        >
          खेती को स्मार्ट बनाएं 🌾
        </a>
      </div>
    </section>
  );
};

export default Home;
