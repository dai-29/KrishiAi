import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Topbar from "./components/Topbar";
import Navbar from "./components/Navbar";

import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Contact from "./Pages/contact";
// import Welcome from "./Pages/Welcome";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Topbar />
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/welcome" element={<Welcome />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
