import React, { useState } from "react";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.password) {
      alert("कृपया सभी जानकारी भरें");
      return;
    }

    console.log("Registered User:", form);
    alert("पंजीकरण सफल रहा 🎉");

    setForm({ name: "", phone: "", password: "" });
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h2 style={styles.title}>खाता बनाएं 🌱</h2>

        <input
          type="text"
          name="name"
          placeholder="किसान का नाम"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="tel"
          name="phone"
          placeholder="मोबाइल नंबर"
          value={form.phone}
          onChange={handleChange}
          style={styles.input}
          maxLength="10"
        />

        <input
          type="password"
          name="password"
          placeholder="पासवर्ड बनाएं"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          रजिस्टर करें
        </button>

        <p style={styles.text}>
          पहले से खाता है? <a href="/login">लॉगिन करें</a>
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
    marginBottom: "20px",
    color: "#1B5E20",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
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

export default Register;
