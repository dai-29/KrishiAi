import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    phone: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.phone || !form.password) {
      alert("कृपया मोबाइल नंबर और पासवर्ड दर्ज करें");
      return;
    }

    console.log("Login Data:", form);
    alert("लॉगिन सफल रहा 🎉");

    navigate("/welcome");
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h2 style={styles.title}>वापस स्वागत है 🌾</h2>
        <p style={styles.subtitle}>कृषिAI में लॉगिन करें</p>

        <input
          type="tel"
          name="phone"
          placeholder="मोबाइल नंबर"
          value={form.phone}
          onChange={handleChange}
          style={styles.input}
          maxLength="10"
        />

        <div style={{ position: "relative" }}>
          <input
            type={form.showPassword ? "text" : "password"}
            name="password"
            placeholder="पासवर्ड"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
          />
          <span
            onClick={() =>
              setForm({ ...form, showPassword: !form.showPassword })
            }
            style={styles.eye}
          >
            {form.showPassword ? "👁️" : "👁️‍🗨️"}
          </span>
        </div>

        <button type="submit" style={styles.button}>
          लॉगिन करें
        </button>

        <p style={styles.text}>
          खाता नहीं है? <a href="/register">रजिस्टर करें</a>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #e8f5e9, #f0fdf4)",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "10px",
    color: "#1B5E20",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#2E7D32",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  eye: {
    position: "absolute",
    right: "12px",
    top: "12px",
    cursor: "pointer",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#1B5E20",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
  },
  text: {
    marginTop: "15px",
    textAlign: "center",
    fontSize: "14px",
  },
};

export default Login;
